"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";

// Renders its children only once the wrapper comes within `rootMargin` of the
// viewport. Used to keep code-split 3D scenes (and three.js itself) from
// loading until they are about to be seen.
export default function LazyMount({
  className,
  rootMargin = "400px",
  children,
}: {
  className?: string;
  rootMargin?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { rootMargin, once: true });
  return (
    <div ref={ref} className={className} aria-hidden>
      {near && children}
    </div>
  );
}
