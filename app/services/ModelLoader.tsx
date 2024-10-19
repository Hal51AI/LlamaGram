import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface ModelLoaderProps {
  url: string;
  scale?: [number, number, number];
}

const ModelLoader: React.FC<ModelLoaderProps> = ({ url, scale = [1, 1, 1] }) => {
  const [loading, setLoading] = useState(true);
  const group = useRef<any>();

  const { scene } = useGLTF(url, (loader) => {
    loader.manager.onLoad = () => {
      setLoading(false);
    };
  });

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#FFF" style={styles.loader} />
      )}
      <Canvas>
        <Suspense fallback={null}>
          <Environment preset="park" />
          <group ref={group} scale={scale}>
            <primitive object={scene} />
          </group>
        </Suspense>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
});

export default ModelLoader;
