"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { siteBasePath } from "@/lib/site";

// Meshopt-compressed with WebP textures (source model in assets-src/).
const MODEL_URL = `${siteBasePath}/desktop_pc/scene.glb`;

function Computers({ isMobile }: { isMobile: boolean }) {
  const computer = useGLTF(MODEL_URL);

  return (
    <mesh>
      <hemisphereLight intensity={4} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={4} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
}

export default function ComputersCanvas() {
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <Canvas
      aria-hidden
      frameloop="demand"
      // PCF shadows: what three.js already fell back to (soft PCF was removed).
      shadows="percentage"
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

