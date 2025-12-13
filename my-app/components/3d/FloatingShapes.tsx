"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, geometry }: { position: [number, number, number], color: string, geometry: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {geometry === "box" && <boxGeometry args={[1, 1, 1]} />}
                {geometry === "octahedron" && <octahedronGeometry args={[1]} />}
                {geometry === "torus" && <torusGeometry args={[0.6, 0.2, 16, 32]} />}
                {geometry === "icosahedron" && <icosahedronGeometry args={[1]} />}
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </mesh>
        </Float>
    );
}

export function FloatingShapes() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Environment preset="city" />

                <FloatingShape position={[-3, 2, 0]} color="#6366f1" geometry="box" />
                <FloatingShape position={[3, -2, -2]} color="#ec4899" geometry="octahedron" />
                <FloatingShape position={[-2, -3, 2]} color="#14b8a6" geometry="torus" />
                <FloatingShape position={[4, 3, -1]} color="#8b5cf6" geometry="icosahedron" />
            </Canvas>
        </div>
    );
}
