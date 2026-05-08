import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function PlayheadIcon({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (meshRef.current && !prefersReducedMotion) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        <MeshDistortMaterial
          color="#18B0A9"
          emissive="#18B0A9"
          emissiveIntensity={0.5}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function ColorWheel({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (meshRef.current && !prefersReducedMotion) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <MeshDistortMaterial
          color="#FF4DB0"
          emissive="#FF4DB0"
          emissiveIntensity={0.5}
          distort={0.15}
          speed={3}
        />
      </mesh>
    </Float>
  );
}

function Waveform({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (groupRef.current && !prefersReducedMotion) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.scale.y = 0.5 + Math.sin(state.clock.getElapsedTime() * 2 + i * 0.5) * 0.5;
      });
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef} position={position}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[(i - 2) * 0.15, 0, 0]}>
            <boxGeometry args={[0.08, 0.5, 0.08]} />
            <meshStandardMaterial
              color="#F5A623"
              emissive="#F5A623"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function ThreeDIcons() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#18B0A9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF4DB0" />
        
        <PlayheadIcon position={[-1, 0.8, 0]} />
        <ColorWheel position={[0.8, -0.5, 0]} />
        <Waveform position={[-0.5, -1, 0]} />
      </Canvas>
    </div>
  );
}
