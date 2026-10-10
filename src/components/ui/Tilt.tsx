"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

// Port of the `react-tilt` component bundled in the original site,
// preserving its defaults, math and transition behaviour.
export type TiltOptions = {
  reverse?: boolean;
  max?: number;
  perspective?: number;
  easing?: string;
  scale?: number;
  speed?: number;
  transition?: boolean;
  axis?: "x" | "y" | null;
  reset?: boolean;
};

const defaults: Required<TiltOptions> = {
  reverse: false,
  max: 35,
  perspective: 1000,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  scale: 1.1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
};

type TiltProps = {
  options?: TiltOptions;
  className?: string;
  children: ReactNode;
};

export default function Tilt({ options, className, children }: TiltProps) {
  const settings = { ...defaults, ...options };
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const frame = useRef<number | null>(null);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  // No 3D tilt for visitors who prefer reduced motion.
  const reduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    []
  );

  const setTransition = useCallback(() => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    setStyle((s) => ({ ...s, transition: `${settings.speed}ms ${settings.easing}` }));
    transitionTimeout.current = setTimeout(() => {
      setStyle((s) => ({ ...s, transition: "" }));
    }, settings.speed);
  }, [settings.speed, settings.easing]);

  const onMouseEnter = () => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rect.current = { width: el.offsetWidth, height: el.offsetHeight, left: r.left, top: r.top };
    setStyle((s) => ({ ...s, willChange: "transform" }));
    setTransition();
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const { clientX, clientY } = e.nativeEvent;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const { width, height, left, top } = rect.current;
      const reverse = settings.reverse ? -1 : 1;
      const x = Math.min(Math.max((clientX - left) / width, 0), 1);
      const y = Math.min(Math.max((clientY - top) / height, 0), 1);
      const tiltX = (reverse * (settings.max / 2 - x * settings.max)).toFixed(2);
      const tiltY = (reverse * (y * settings.max - settings.max / 2)).toFixed(2);
      const s = settings.scale;
      setStyle((prev) => ({
        ...prev,
        transform: `perspective(${settings.perspective}px) rotateX(${
          settings.axis === "x" ? 0 : tiltY
        }deg) rotateY(${settings.axis === "y" ? 0 : tiltX}deg) scale3d(${s}, ${s}, ${s})`,
      }));
      frame.current = null;
    });
  };

  const onMouseLeave = () => {
    if (reduceMotion) return;
    setTransition();
    if (settings.reset) {
      requestAnimationFrame(() => {
        setStyle((s) => ({
          ...s,
          transform: `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        }));
      });
    }
  };

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
