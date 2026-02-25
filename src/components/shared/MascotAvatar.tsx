"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MascotAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  mood?: "happy" | "thinking" | "waving" | "speaking";
  className?: string;
  animate?: boolean;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const fontSizeMap = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

export default function MascotAvatar({
  size = "md",
  mood = "happy",
  className,
  animate = true,
}: MascotAvatarProps) {
  return (
    <motion.div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full",
        "bg-gradient-to-br from-primary via-purple-500 to-secondary",
        "shadow-lg shadow-primary/25",
        sizeMap[size],
        className
      )}
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Inner face circle */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          "bg-gradient-to-b from-white/20 to-transparent",
          size === "sm" ? "h-6 w-6" : "",
          size === "md" ? "h-10 w-10" : "",
          size === "lg" ? "h-13 w-13" : "",
          size === "xl" ? "h-20 w-20" : ""
        )}
      >
        <MascotFace mood={mood} size={size} />
      </div>

      {/* Glow effect */}
      {size !== "sm" && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10" />
      )}

      {/* Speaking indicator */}
      {mood === "speaking" && animate && (
        <>
          <motion.div
            className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-secondary"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-secondary/40"
            animate={{ scale: [1, 1.15], opacity: [0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </>
      )}
    </motion.div>
  );
}

function MascotFace({
  mood,
  size,
}: {
  mood: string;
  size: string;
}) {
  const fontSize = fontSizeMap[size as keyof typeof fontSizeMap];

  const faces: Record<string, string> = {
    happy: "😊",
    thinking: "🤔",
    waving: "👋",
    speaking: "🗣️",
  };

  return (
    <motion.span
      className={cn(fontSize, "select-none")}
      animate={
        mood === "waving"
          ? { rotate: [0, 14, -8, 14, -4, 10, 0] }
          : mood === "speaking"
            ? { scale: [1, 1.05, 1] }
            : undefined
      }
      transition={
        mood === "waving"
          ? { duration: 1.5, repeat: Infinity, repeatDelay: 2 }
          : mood === "speaking"
            ? { duration: 0.6, repeat: Infinity }
            : undefined
      }
    >
      {faces[mood] || faces.happy}
    </motion.span>
  );
}
