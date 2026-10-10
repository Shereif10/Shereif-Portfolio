"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// - LazyMotion + domAnimation: components use the lightweight `m` element and
//   load only the animation features the site uses (variants, whileInView,
//   animate), keeping the initial JavaScript smaller.
// - reducedMotion="user": honours the visitor's "reduce motion" OS setting;
//   transform/position animations are skipped, fades still run.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
