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
    camera.position.set(0, 0, 4.2); // 📸 Camera moved closer to fill the frame

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const blueLight = new THREE.DirectionalLight(0x3b82f6, 1);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    // 3. Load Texture and Create Card Mesh
    const geometry = new THREE.BoxGeometry(3.2, 2, 0.05);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      metalness: 0.5, 
      roughness: 0.3 
    });
    const card = new THREE.Mesh(geometry, material);
    scene.add(card);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      material.map = texture;
      material.needsUpdate = true;
      setLoading(false);
    });

    // 4. Controls (Allows user to rotate/swipe)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2.5;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 5. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      // Gentle floating animation
      card.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 6. Handle Resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Cleanup
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
  }, [imageUrl]); // Re-run when imageUrl changes

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
