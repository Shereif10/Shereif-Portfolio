import type { Transition, Variants } from "framer-motion";

export type Direction = "left" | "right" | "up" | "down" | "";
// The original passes "" as a transition type in places; framer-motion then
// falls back to its default (tween) behaviour. Kept as-is for parity.
type TransitionType = "spring" | "tween" | "";

const asType = (type: TransitionType) =>
  (type || undefined) as Transition["type"];

export const textVariant = (delay?: number): Variants => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay },
  },
});

export const fadeIn = (
  direction: Direction,
  type: TransitionType,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: asType(type), delay, duration, ease: "easeOut" },
  },
});

export const slideIn = (
  direction: Direction,
  type: TransitionType,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" || direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: { type: asType(type), delay, duration, ease: "easeOut" },
  },
});

export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren: delayChildren || 0 },
  },
});
