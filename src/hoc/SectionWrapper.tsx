"use client";

import type { ComponentType } from "react";
import { m as motion } from "framer-motion";
import { styles } from "@/lib/styles";
import { staggerContainer } from "@/lib/motion";

// Wraps a section with the shared padding, scroll-anchor span and the
// "animate children once 25% in view" behaviour used throughout the site.
export default function SectionWrapper(Component: ComponentType, idName: string) {
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  }
  HOC.displayName = `SectionWrapper(${Component.displayName || Component.name})`;
  return HOC;
}
