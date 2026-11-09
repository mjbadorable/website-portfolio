"use client";

import { MotionConfig, motion } from "framer-motion";

// One fade-up per block, once, when it enters the viewport.
export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
