import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
}

function Stars({ count = 5000 }: StarFieldProps) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Random positions in a large sphere
    const i3 = i * 3;
    const radius = Math.random() * 2000 + 500;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    // Random star colors (white to blue to purple)
    const colorChoice = Math.random();
    if (colorChoice < 0.6) {
      // White stars
      colors[i3] = 1;
      colors[i3 + 1] = 1;
      colors[i3 + 2] = 1;
    } else if (colorChoice < 0.8) {
      // Blue stars
      colors[i3] = 0.7;
      colors[i3 + 1] = 0.8;
      colors[i3 + 2] = 1;
    } else {
      // Purple stars
      colors[i3] = 1;
      colors[i3 + 1] = 0.7;
      colors[i3 + 2] = 1;
    }
  }
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.0001;
      ref.current.rotation.y = state.clock.elapsedTime * 0.0002;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={2}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 1000;
    positions[i3 + 1] = (Math.random() - 0.5) * 1000;
    positions[i3 + 2] = (Math.random() - 0.5) * 1000;
    
    // Bright cosmic colors
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      // Electric blue
      colors[i3] = 0.2;
      colors[i3 + 1] = 0.6;
      colors[i3 + 2] = 1;
    } else if (colorChoice < 0.66) {
      // Cosmic purple
      colors[i3] = 0.7;
      colors[i3 + 1] = 0.3;
      colors[i3 + 2] = 1;
    } else {
      // Stellar gold
      colors[i3] = 1;
      colors[i3 + 1] = 0.8;
      colors[i3 + 2] = 0.2;
    }
  }
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      ref.current.rotation.y = Math.cos(time * 0.15) * 0.1;
      ref.current.rotation.z = Math.sin(time * 0.05) * 0.05;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function GalacticBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0a0a1a', 100, 2000]} />
        <Stars count={8000} />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}