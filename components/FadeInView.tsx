"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function FadeInView({
  children,
  delay = 0,
  direction = "up",
  duration = 0.65,
  style,
  className,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const offset = { up: { y: 40, x: 0 }, left: { x: 40, y: 0 }, right: { x: -40, y: 0 }, none: { x: 0, y: 0 } };
  const { x, y } = offset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
