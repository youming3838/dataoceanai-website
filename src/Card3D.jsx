import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Card3D({ imageUrl, cardColor, scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  // Ref to store scroll value without rebuilding the Three.js scene
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

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

    // 3. Geometry: Realistic card thickness (0.12)
    const geometry = new THREE.BoxGeometry(3.2, 2, 0.12); 
    
    // 4. Materials
    const safeColor = cardColor || '#ffffff'; 

    const edgeMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(safeColor)
    });
    
    const backMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(safeColor)
    });
    
    const faceMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      metalness: 0, 
      roughness: 0.9 
    });
    
    const materials = [
      edgeMaterial, edgeMaterial, edgeMaterial, edgeMaterial,
      faceMaterial, backMaterial
    ];
    
    const card = new THREE.Mesh(geometry, materials);
    scene.add(card);

    // 5. Load Texture
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

    // 6. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2.5;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 7. Animation Loop (with Cinematic Scroll Effects)
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Get the current scroll progress (0 = top, 1 = scrolled past first screen)
      const sp = scrollRef.current;

      // 🌟 CINEMATIC SCROLL EFFECT
      // Idle bobbing (always active)
      const idleBob = Math.sin(Date.now() * 0.001) * 0.05;
      
      // Smooth lerp toward target values (prevents jittery movement)
      card.rotation.x = THREE.MathUtils.lerp(card.rotation.x, idleBob + (sp * 0.35), 0.08);
      card.rotation.y = THREE.MathUtils.lerp(card.rotation.y, sp * Math.PI * 2, 0.08); // Full 360° spin
      card.position.y = THREE.MathUtils.lerp(card.position.y, sp * 0.6, 0.08); // Lift up
      
      const scale = 1 - (sp * 0.25);
      const currentScale = card.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, scale, 0.08);
      card.scale.set(newScale, newScale, newScale);

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
