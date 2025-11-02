"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type * as THREE from "three";

function generateParticles(particlesCount: number) {
  const positions = new Float32Array(particlesCount * 3);
  const velocities = new Float32Array(particlesCount);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20; // x
    positions[i * 3 + 1] = Math.random() * 20 - 5; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    velocities[i] = Math.random() * 0.05 + 0.05;
  }

  return { positions, velocities };
}

function RainParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particlesCount = 1000;

  const particles = useMemo(
    () => generateParticles(particlesCount),
    [particlesCount]
  );

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 1] -= particles.velocities[i];

      if (positions[i * 3 + 1] < -10) {
        positions[i * 3 + 1] = 10;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#88ccff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function RainEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <RainParticles />
      </Canvas>
    </div>
  );
}
