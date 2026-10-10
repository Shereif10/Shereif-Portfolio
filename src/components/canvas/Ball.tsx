"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  useTexture,
  View,
} from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

// The original technology ball: a floating cream icosahedron with the logo
// as a decal. Geometry, material, lights and float settings are unchanged.
function Ball({ imgUrl }: { imgUrl: string }) {
  const [decal] = useTexture([imgUrl]);
  const reduceMotion = useReducedMotion();

  return (
    <Float
      speed={1.75}
      rotationIntensity={reduceMotion ? 0 : 1}
      floatIntensity={reduceMotion ? 0 : 2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} map={decal} />
      </mesh>
    </Float>
  );
}

// One ball as a drei <View>: a DOM box whose 3D content is drawn by the
// shared <BallsCanvas>. Each view gets its own camera (same defaults as the
// original per-ball canvas) so dragging one ball doesn't rotate the others.
export function BallView({ icon, className }: { icon: string; className?: string }) {
  const [track, setTrack] = useState<HTMLElement | null>(null);
  // Drag-to-rotate only for mouse users; on touch screens OrbitControls would
  // swallow the swipe and block page scrolling across the ball grid.
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  return (
    // Decorative: the skill name is rendered as text by the parent list.
    <div aria-hidden className={className}>
      <View
        // Outside a <Canvas>, View renders a DOM element (never a three Group).
        ref={(el) => setTrack(el instanceof HTMLElement ? el : null)}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <Suspense fallback={null}>
          <Ball imgUrl={icon} />
        </Suspense>
        {track && finePointer && <OrbitControls domElement={track} enableZoom={false} />}
      </View>
    </div>
  );
}

// A single WebGL context that renders every BallView on the page. The
// original used one canvas per ball, which doesn't scale past the
// browser's ~16 live WebGL contexts.
// While the skills grid is off-screen it stops rendering and is hidden, so a
// stale frame never lingers on top of other sections.
export default function BallsCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      aria-hidden
      frameloop={active ? "always" : "never"}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        visibility: active ? "visible" : "hidden",
      }}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
