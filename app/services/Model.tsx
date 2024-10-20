import React, { useRef, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

interface ModelProps {
  url: string;
  animationsUrl?: string;
  animation?: string;
  scale?: [number, number, number];
  position?: [number, number, number];
}

const Model = forwardRef<any, ModelProps>(({ url, animationsUrl, animation, scale = [1, 1, 1], position = [0, 0, 0] }, ref) => {
  const group = useRef<any>(null);
  const { scene } = useGLTF(url);

  // Optionally, you can handle animation logic here
  
  return (
    <group ref={group} scale={scale} position={position}>
      <primitive object={scene} />
    </group>
  );
});

export default Model;