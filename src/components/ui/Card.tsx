"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animated?: boolean;
  glow?: "primary" | "secondary" | "none";
}

export default function Card({
  children,
  className,
  onClick,
  animated = true,
  glow = "none",
}: CardProps) {
  const Component = animated ? motion.div : "div";

  const glowMap = {
    primary: "hover:shadow-glow",
    secondary: "hover:shadow-glow-green",
    none: "",
  };

  const animationProps = animated
    ? {
        whileHover: onClick
          ? { y: -3, transition: { duration: 0.2, ease: "easeOut" as const } }
          : undefined,
        whileTap: onClick
          ? { y: 1, scale: 0.98, transition: { duration: 0.1 } }
          : undefined,
      }
    : {};

  return (
    <Component
      className={cn(
        "glass-3d glass-shine rounded-xl p-4",
        onClick &&
          "cursor-pointer transition-all press-glow",
        glowMap[glow],
        className
      )}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
