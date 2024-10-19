import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene } from 'three';

interface UseAsyncGLTFResult {
  scene: Scene | null;
  loading: boolean;
  error: Error | null;
}

const useAsyncGLTF = (url: string): UseAsyncGLTFResult => {
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    setLoading(true);
    loader.load(
      url,
      (gltf) => {
        // Set the loaded scene
        setScene(gltf.scene);
        setLoading(false);
      },
      undefined,
      (err) => {
        setLoading(false);
        setError(err);
      }
    );
  }, [url]);

  return { scene, loading, error };
};

export default useAsyncGLTF;
