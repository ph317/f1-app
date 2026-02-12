import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function CarModel(props: any) {
    const { scene } = useGLTF('/models/car.glb');
    const carRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (carRef.current) {
            // Gentle floating animation
            carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.5;
            // Very slow rotation
            carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + Math.PI / 4;
        }
    });

    return <primitive object={scene} ref={carRef} {...props} />;
}

useGLTF.preload('/models/car.glb');
