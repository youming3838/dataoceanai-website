import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture, OrbitControls, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// The 3D Card Mesh Component
function CardMesh({ imageUrl }) {
  // Load the image as a texture
  const texture = useTexture(imageUrl);

  return (
    // A thin box geometry to give the card physical depth
    <mesh rotation={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[3.2, 2, 0.05]} /> 
      <meshStandardMaterial map={texture} metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

export default function Card3D({ imageUrl }) {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      {/* Suspense is required for loading the texture */}
      <Suspense fallback={<div style={{ color: '#a3e4ff', textAlign: 'center', paddingTop: '200px' }}>Loading 3D Card...</div>}>
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }} 
          shadows 
          dpr={[1, 1.5]} // Limit resolution on mobile for performance
        >
          {/* Soft, cinematic lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#3b82f6" />
          
          {/* The 3D Card */}
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <CardMesh imageUrl={imageUrl} />
          </Float>

          {/* Controls: Allows the user to rotate the card */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 1.5} 
          />
          
          {/* A soft shadow underneath the card */}
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#3b82f6" />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
