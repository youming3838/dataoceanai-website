import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Card3D({ imageUrl, cardColor, scrollProgress = 0, burstTrigger = 0 }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  
  const edgeMaterialRef = useRef(null);
  const backMaterialRef = useRef(null);
  const faceMaterialRef = useRef(null);
  const textureLoaderRef = useRef(null);
  
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;
  const burstFnRef = useRef(null);

  useEffect(() => {
    if (burstTrigger > 0 && burstFnRef.current) {
      burstFnRef.current();
    }
  }, [burstTrigger]);

  useEffect(() => {
    if (edgeMaterialRef.current && backMaterialRef.current) {
      const safeColor = cardColor || '#ffffff';
      const color = new THREE.Color(safeColor);
      edgeMaterialRef.current.color.copy(color);
      backMaterialRef.current.color.copy(color);
    }
  }, [cardColor]);

  useEffect(() => {
    if (!textureLoaderRef.current || !faceMaterialRef.current) return;
    textureLoaderRef.current.load(imageUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = faceMaterialRef.current.userData.maxAniso || 1;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      faceMaterialRef.current.map = texture;
      faceMaterialRef.current.needsUpdate = true;
    });
  }, [imageUrl]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2.0));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const geometry = new THREE.BoxGeometry(3.2, 2, 0.12);
    const edgeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(cardColor || '#ffffff') });
    const backMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(cardColor || '#ffffff') });
    const faceMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0.9 });
    
    faceMaterial.userData.maxAniso = renderer.capabilities.getMaxAnisotropy();
    edgeMaterialRef.current = edgeMaterial;
    backMaterialRef.current = backMaterial;
    faceMaterialRef.current = faceMaterial;
    
    const materials = [edgeMaterial, edgeMaterial, edgeMaterial, edgeMaterial, faceMaterial, backMaterial];
    const card = new THREE.Mesh(geometry, materials);
    scene.add(card);

    const textureLoader = new THREE.TextureLoader();
    textureLoaderRef.current = textureLoader;
    textureLoader.load(imageUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      faceMaterial.map = texture;
      faceMaterial.needsUpdate = true;
      setLoading(false);
    });

    // Particle system
    const PARTICLE_COUNT = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 1000;
      positions[i * 3 + 2] = 0;
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(140, 220, 255, 0.9)');
    grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      color: 0x60c8ff,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particleSystem.frustumCulled = false;
    scene.add(particleSystem);

    let burstTime = -1000;
    const BURST_DURATION = 1.6;

    burstFnRef.current = () => {
      burstTime = performance.now() / 1000;
      const posAttr = particleGeometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posAttr[i * 3] = (Math.random() - 0.5) * 0.3;
        posAttr[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
        posAttr[i * 3 + 2] = 0.15;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.02 + Math.random() * 0.07;
        velocities[i * 3] = Math.cos(angle) * speed;
        velocities[i * 3 + 1] = Math.sin(angle) * speed + 0.01;
        velocities[i * 3 + 2] = 0.02 + Math.random() * 0.06;
      }
      particleGeometry.attributes.position.needsUpdate = true;
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2.5;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const sp = scrollRef.current;
      const idleBob = Math.sin(Date.now() * 0.001) * 0.05;
      card.rotation.x = THREE.MathUtils.lerp(card.rotation.x, idleBob + (sp * 0.35), 0.08);
      card.rotation.y = THREE.MathUtils.lerp(card.rotation.y, sp * Math.PI * 2, 0.08);
      card.position.y = THREE.MathUtils.lerp(card.position.y, sp * 0.6, 0.08);
      const scale = 1 - (sp * 0.25);
      const newScale = THREE.MathUtils.lerp(card.scale.x, scale, 0.08);
      card.scale.set(newScale, newScale, newScale);

      const timeSinceBurst = (performance.now() / 1000) - burstTime;
      if (timeSinceBurst < BURST_DURATION) {
        particleMaterial.opacity = 1 - Math.pow(timeSinceBurst / BURST_DURATION, 1.5);
        particleMaterial.size = 0.18 * (1 - (timeSinceBurst / BURST_DURATION) * 0.5);
        const posAttr = particleGeometry.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          posAttr[i * 3] += velocities[i * 3];
          posAttr[i * 3 + 1] += velocities[i * 3 + 1];
          posAttr[i * 3 + 2] += velocities[i * 3 + 2];
          velocities[i * 3] *= 0.97;
          velocities[i * 3 + 1] *= 0.97;
          velocities[i * 3 + 2] *= 0.97;
        }
        particleGeometry.attributes.position.needsUpdate = true;
      } else {
        particleMaterial.opacity = 0;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      geometry.dispose();
      materials.forEach(m => m.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 🌟 RESPONSIVE HEIGHT - smaller on phones (280px), larger on desktop (400px)
  return (
    <div style={{ width: '100%', height: 'clamp(280px, 45vw, 400px)', position: 'relative' }}>
      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#a3e4ff', fontSize: '0.9rem' }}>
          Loading 3D Card...
        </div>
      )}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
