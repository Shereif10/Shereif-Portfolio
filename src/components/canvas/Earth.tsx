"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import CanvasLoader from "./Loader";
import { useInView } from "@/lib/useInView";

// Meshopt-compressed with WebP textures (source model in assets-src/).
const MODEL_URL = "/planet/scene.glb";

function Earth() {
  const earth = useGLTF(MODEL_URL);
  return <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />;
}

// Mounted lazily by its parent (LazyMount); only renders frames while visible. Auto-rotation is off for reduced motion.
export default function EarthCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="w-full h-full" aria-hidden>
      <Canvas
          shadows="percentage"
          frameloop={visible ? "always" : "never"}
          gl={{ preserveDrawingBuffer: true }}
          camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate={!reduceMotion}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Earth />
          </Suspense>
        </Canvas>
    </div>
  );
}
