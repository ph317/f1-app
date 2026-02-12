import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows, SpotLight } from '@react-three/drei';
import { CarModel } from './CarModel';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function CinematicCamera() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame((state) => {
        if (cameraRef.current) {
            const time = state.clock.elapsedTime;

            // Cinematic camera movement logic
            const radius = 6 + Math.sin(time * 0.2) * 2;
            const angle = time * 0.15;

            cameraRef.current.position.x = Math.sin(angle) * radius;
            cameraRef.current.position.z = Math.cos(angle) * radius;
            cameraRef.current.position.y = 2 + Math.sin(time * 0.3) * 0.5;

            cameraRef.current.lookAt(0, 0, 0);

            // Add slight drift/noise
            cameraRef.current.position.x += Math.sin(time * 0.5) * 0.2;
        }
    });

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[5, 2, 5]} fov={45} />;
}

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}>
                <Suspense fallback={null}>
                    <CinematicCamera />

                    {/* Moody Environment */}
                    <Environment preset="city" environmentIntensity={0.2} />

                    {/* Key Light - Warm */}
                    <SpotLight
                        position={[10, 10, 10]}
                        angle={0.25}
                        penumbra={1}
                        intensity={200}
                        castShadow
                        color="#ffecd1"
                    />

                    {/* Rim Light - F1 Red */}
                    <spotLight
                        position={[-10, 5, -10]}
                        angle={0.5}
                        penumbra={1}
                        intensity={300}
                        color="#FF1801"
                        distance={30}
                    />

                    {/* Rim Light - Cool Blue */}
                    <spotLight
                        position={[10, 0, -10]}
                        angle={0.5}
                        penumbra={1}
                        intensity={200}
                        color="#00a8ff"
                        distance={30}
                        decay={2}
                    />

                    {/* Fill Light */}
                    <ambientLight intensity={0.2} />

                    <CarModel scale={1.5} position={[0, -0.5, 0]} />

                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.6} far={2} color="#000000" />
                </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
        </div>
    );
}
