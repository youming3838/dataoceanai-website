import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Card3D({ imageUrl, cardColor, scrollProgress = 0, burstTrigger = 0 }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;
  const burstFnRef = useRef(null);

  // 🌟 Watch for color changes and trigger the particle burst
  useEffect(() => {
    if (burstTrigger > 0 && burstFnRef.current) {
      burstFnRef.current();
    }
  }, [burstTrigger]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4.2); 

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3)); 
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0); 
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 3. Card Geometry (0.12 thickness)
    const geometry = new THREE.BoxGeometry(3.2, 2, 0.12); 
    const safeColor = cardColor || '#ffffff'; 
    const edgeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(safeColor) });
    const backMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(safeColor) });
    const faceMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0.9 });
    const materials = [edgeMaterial, edgeMaterial, edgeMaterial, edgeMaterial, faceMaterial, backMaterial];
    const card = new THREE.Mesh(geometry, materials);
    scene.add(card);

    // 4. Load Card Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace; 
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); 
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      faceMaterial.map = texture;
      faceMaterial.needsUpdate = true;
      setLoading(false);
    });

    // ============================================================
    // 🌟 5. PARTICLE BURST SYSTEM
    // ============================================================
    const PARTICLE_COUNT = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    
    // Initialize all particles off-screen
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 1000; // Far above screen (hidden)
      positions[i * 3 + 2] = 0;
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create a radial gradient glow texture for the particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(140, 220, 255, 0.9)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
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
      color: 0x60c8ff, // Bright cyan glow
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particleSystem.frustumCulled = false;
    scene.add(particleSystem);

    // State for the burst
    let burstTime = -1000; // Long ago
    const BURST_DURATION = 1.6; // Seconds

    // Function that triggers a burst (exposed via ref)
    const burst = () => {
      burstTime = performance.now() / 1000;
      
      const posAttr = particleGeometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Start at card center
        posAttr[i * 3] = (Math.random() - 0.5) * 0.3;
        posAttr[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
        posAttr[i * 3 + 2] = 0.15;
        
        // Random velocity: mostly outward on X/Y, slightly forward on Z
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.02 + Math.random() * 0.07;
        velocities[i * 3] = Math.cos(angle) * speed;
        velocities[i * 3 + 1] = Math.sin(angle) * speed + 0.01;
        velocities[i * 3 + 2] = 0.02 + Math.random() * 0.06;
      }
      particleGeometry.attributes.position.needsUpdate = true;
    };
    burstFnRef.current = burst;

    // 6. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2.5;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 7. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // === Cinematic scroll effect ===
      const sp = scrollRef.current;
      const idleBob = Math.sin(Date.now() * 0.001) * 0.05;
      card.rotation.x = THREE.MathUtils.lerp(card.rotation.x, idleBob + (sp * 0.35), 0.08);
      card.rotation.y = THREE.MathUtils.lerp(card.rotation.y, sp * Math.PI * 2, 0.08);
      card.position.y = THREE.MathUtils.lerp(card.position.y, sp * 0.6, 0.08);
      const scale = 1 - (sp * 0.25);
      const newScale = THREE.MathUtils.lerp(card.scale.x, scale, 0.08);
      card.scale.set(newScale, newScale, newScale);

      // === Particle burst update ===
      const timeSinceBurst = (performance.now() / 1000) - burstTime;
      if (timeSinceBurst < BURST_DURATION) {
        // Fade out over the duration
        particleMaterial.opacity = 1 - Math.pow(timeSinceBurst / BURST_DURATION, 1.5);
        particleMaterial.size = 0.18 * (1 - (timeSinceBurst / BURST_DURATION) * 0.5);
        
        // Move particles based on velocity
        const posAttr = particleGeometry.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          posAttr[i * 3]     += velocities[i * 3];
          posAttr[i * 3 + 1] += velocities[i * 3 + 1];
          posAttr[i * 3 + 2] += velocities[i * 3 + 2];
          
          // Gentle drag (particles slow down)
          velocities[i * 3]     *= 0.97;
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

    // 8. Handle Resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Cleanup
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
  }, [imageUrl, cardColor]);

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#a3e4ff' }}>
          Loading 3D Card...
        </div>
      )}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
