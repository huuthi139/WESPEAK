"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animated?: boolean;
}

export default function Card({
  children,
  className,
  onClick,
  animated = true,
}: CardProps) {
  const Component = animated ? motion.div : "div";
  const animationProps = animated
    ? { whileTap: onClick ? { scale: 0.98 } : undefined }
    : {};

  return (
    <Component
      className={cn(
        "glass rounded-xl p-4 shadow-glass-sm",
        onClick && "cursor-pointer hover:border-white/[0.14] transition-all",
        className
      )}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
