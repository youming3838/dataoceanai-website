import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Card3D({ imageUrl }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);

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
    // 🌟 SHARPNESS FIX 1: Use full device pixel ratio (up to 3 for high-res screens)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3)); 
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting (Soft and even)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 3. Geometry: Flat Plane (No gray frame)
    const geometry = new THREE.PlaneGeometry(3.2, 2); 
    
    // 4. Material: Perfectly matte
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      metalness: 0, 
      roughness: 0.9, 
      side: THREE.DoubleSide 
    });
    
    const card = new THREE.Mesh(geometry, material);
    scene.add(card);

    // 5. Load Texture with Maximum Sharpness
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      // 🌟 SHARPNESS FIX 2: Correct color space (prevents washed out colors)
      texture.colorSpace = THREE.SRGBColorSpace; 
      // 🌟 SHARPNESS FIX 3: Anisotropy makes angled textures look sharp
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); 
      // 🌟 SHARPNESS FIX 4: Prevent blurry mipmaps
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      
      material.map = texture;
      material.needsUpdate = true;
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

    // 7. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      card.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
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
      material.dispose();
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl]);

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
