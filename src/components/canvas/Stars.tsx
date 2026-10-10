"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Preload } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { inSphere } from "maath/random";
import type { Points as ThreePoints } from "three";
import { useInView } from "@/lib/useInView";

// 1666 xyz points. (The original used length 5000, which isn't a multiple of
// 3 and left a half-written point that made three.js log a NaN error.)
const POSITIONS_LENGTH = 1666 * 3;

function Stars({ animate }: { animate: boolean }) {
  const ref = useRef<ThreePoints>(null);
  const [sphere] = useState(
    () => inSphere(new Float32Array(POSITIONS_LENGTH), { radius: 1.2 }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      <Canvas
          frameloop={visible && !reduceMotion ? "always" : "demand"}
          camera={{ position: [0, 0, 1] }}
        >
          <Suspense fallback={null}>
            <Stars animate={!reduceMotion} />
          </Suspense>
          <Preload all />
        </Canvas>
    </div>
  );
}
