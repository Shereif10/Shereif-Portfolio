"use client";

import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Vector3 } from "three";

// Suspense fallback shown while a model loads: the load percentage pinned to
// the projected scene origin, matching drei's <Html> placement in the
// original. Implemented imperatively because drei's <Html> creates a nested
// React root whose synchronous unmount races Suspense under React 19.
// The original's spinner span uses `canvas-load` (no matching CSS), so only
// the percentage is visible.
export default function CanvasLoader() {
  const { progress } = useProgress();
  const { gl, camera, size } = useThree();
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const parent = gl.domElement.parentNode as HTMLElement | null;
    if (!parent) return;

    const origin = new Vector3(0, 0, 0).project(camera);
    const x = ((origin.x + 1) / 2) * size.width;
    const y = ((1 - origin.y) / 2) * size.height;

    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, {
      position: "absolute",
      top: "0",
      left: "0",
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transformOrigin: "0 0",
      pointerEvents: "none",
    });

    const spinner = document.createElement("span");
    spinner.className = "canvas-load";

    const text = document.createElement("p");
    Object.assign(text.style, {
      fontSize: "14px",
      color: "#f1f1f1",
      fontWeight: "800",
      marginTop: "40px",
    });

    wrapper.append(spinner, text);
    parent.appendChild(wrapper);
    textRef.current = text;

    return () => {
      wrapper.remove();
      textRef.current = null;
    };
  }, [gl, camera, size]);

  useLayoutEffect(() => {
    if (textRef.current) textRef.current.textContent = `${progress.toFixed(2)}%`;
  }, [progress]);

  return null;
}
