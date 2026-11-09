"use client";

// Shared micro-interactions: a 1.5px lift on hover and a 0.98 press, on a snappy
// spring. Only transform is animated. MotionConfig (reducedMotion) switches these
// off when Motion is OFF or the OS asks for reduced motion.
import Link from "next/link";
import { type HTMLMotionProps, motion } from "framer-motion";

export const SPRING = { type: "spring", stiffness: 400, damping: 30 } as const;

const press = {
  whileHover: { y: -1.5 },
  whileTap: { scale: 0.98 },
  transition: SPRING,
} as const;

export function PressA(props: HTMLMotionProps<"a">) {
  return <motion.a {...press} {...props} />;
}

export function PressButton(props: HTMLMotionProps<"button">) {
  return <motion.button {...press} {...props} />;
}

const MotionNextLink = motion.create(Link);

export function PressLink(props: React.ComponentProps<typeof MotionNextLink>) {
  return <MotionNextLink {...press} {...props} />;
}
