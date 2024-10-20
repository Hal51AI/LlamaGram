import React, { useRef, forwardRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei/native';

interface ModelProps {
  url: string;
  animationsUrl?: string;
  animation?: string;
}

const Model = forwardRef<any, ModelProps>(({ url, animationsUrl, animation }, ref) => {
  const group = useRef<any>(null);
  const { scene } = useGLTF(url);
  const { animations } = useGLTF(animationsUrl || "");
  const { actions, mixer } = useAnimations(animations, group);

  // Handle animation
  useEffect(() => {
    if (animation && actions[animation]) {
      actions[animation].reset().play();

      const onAnimationFinished = () => console.log("Animation finished");

      mixer.addEventListener('finished', onAnimationFinished);

      return () => {
        actions[animation].fadeOut(0.5);
        mixer.removeEventListener('finished', onAnimationFinished);
      };
    }
  }, [animation, actions, mixer]);

  return <group ref={group} scale={[2.2, 2.2, 2.2]} position={[0, -2, 0]}><primitive object={scene} /></group>;
});

export default Model;
