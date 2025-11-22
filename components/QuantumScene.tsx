
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const HistoryParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Box ref={ref} args={[0.5, 0.7, 0.1]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.1}
        transparent
        opacity={0.9}
      />
    </Box>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Abstract Books/Documents floating */}
          <HistoryParticle position={[0, 0, 0]} color="#C5A059" scale={1.5} />
          <HistoryParticle position={[-2, 1, -2]} color="#002147" scale={1} />
          <HistoryParticle position={[2, -1.5, -1]} color="#8B4513" scale={1.2} />
          <HistoryParticle position={[3, 2, -3]} color="#F5F5DC" scale={0.8} />
        </Float>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const TowerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 2, 8], fov: 35 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#C5A059" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Environment preset="city" />
        
        <Float rotationIntensity={0.1} floatIntensity={0.2} speed={1}>
          <group rotation={[0, -0.2, 0]} position={[0, -2, 0]}>
            
            {/* Base */}
            <Box args={[2, 0.2, 2]} position={[0, 0, 0]}>
               <meshStandardMaterial color="#DBB68F" />
            </Box>

            {/* Main Shaft */}
            <Box args={[1.2, 4, 1.2]} position={[0, 2, 0]}>
               <meshStandardMaterial color="#E5E4E2" />
            </Box>

            {/* Clock Section */}
            <Box args={[1.3, 1.3, 1.3]} position={[0, 4.5, 0]}>
               <meshStandardMaterial color="#C5A059" metalness={0.5} roughness={0.2} />
            </Box>

            {/* Clock Face (White Circle) */}
            <Cylinder args={[0.5, 0.5, 0.1, 32]} position={[0, 4.5, 0.66]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#FFFFFF" />
            </Cylinder>
             {/* Clock Hands */}
            <Box args={[0.05, 0.4, 0.02]} position={[0, 4.6, 0.72]} rotation={[0, 0, 0]}>
               <meshStandardMaterial color="#000" />
            </Box>
             <Box args={[0.05, 0.3, 0.02]} position={[0.1, 4.5, 0.72]} rotation={[0, 0, -Math.PI/2]}>
               <meshStandardMaterial color="#000" />
            </Box>

            {/* Top Roof */}
            <Cylinder args={[0, 1.5, 1, 4]} position={[0, 5.6, 0]} rotation={[0, Math.PI/4, 0]}>
                <meshStandardMaterial color="#002147" />
            </Cylinder>

          </group>
        </Float>
      </Canvas>
    </div>
  );
}
