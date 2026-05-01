'use client';

import { Canvas } from '@react-three/fiber';
import RubiksCube from '@/components/three/RubiksCube';

export default function LoaderScene({ t }: { t: number }) {
  return (
    <Canvas camera={{ position: [4.2, 4.0, 4.2], fov: 38 }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 6]} intensity={2} />
      <RubiksCube t={t} />
    </Canvas>
  );
}