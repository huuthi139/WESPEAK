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
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const containerSizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

export default function MascotAvatar({
  size = "md",
  mood = "happy",
  className,
  animate = true,
}: MascotAvatarProps) {
  const px = sizeMap[size];

  return (
    <motion.div
      className={cn("relative shrink-0", containerSizeMap[size], className)}
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Body gradient — purple to deep blue */}
          <radialGradient id={`body-${size}`} cx="0.4" cy="0.35" r="0.65">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="60%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </radialGradient>

          {/* Head highlight */}
          <radialGradient id={`highlight-${size}`} cx="0.35" cy="0.25" r="0.5">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Eye white gradient */}
          <radialGradient id={`eye-${size}`} cx="0.4" cy="0.35" r="0.6">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>

          {/* Cheek blush */}
          <radialGradient id={`blush-${size}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(244,114,182,0.5)" />
            <stop offset="100%" stopColor="rgba(244,114,182,0)" />
          </radialGradient>

          {/* Shadow under body */}
          <radialGradient id={`shadow-${size}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Antenna glow */}
          <radialGradient id={`glow-${size}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="60%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* Shadow ellipse under body */}
        <ellipse cx="60" cy="112" rx="30" ry="6" fill={`url(#shadow-${size})`} />

        {/* === Body (round blob) === */}
        <ellipse cx="60" cy="60" rx="42" ry="44" fill={`url(#body-${size})`} />

        {/* Body highlight overlay */}
        <ellipse cx="60" cy="60" rx="42" ry="44" fill={`url(#highlight-${size})`} />

        {/* Belly — lighter oval */}
        <ellipse cx="60" cy="68" rx="24" ry="22" fill="rgba(139,92,246,0.3)" />
        <ellipse cx="60" cy="68" rx="24" ry="22" fill="rgba(255,255,255,0.08)" />

        {/* === Antenna === */}
        <line x1="60" y1="16" x2="60" y2="6" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
        <MascotAntennaGlow id={`glow-${size}`} animate={animate && mood === "speaking"} />

        {/* === Ears (small circles on sides) === */}
        <circle cx="20" cy="50" r="7" fill="#6D28D9" />
        <circle cx="20" cy="50" r="4" fill="#8B5CF6" />
        <circle cx="100" cy="50" r="7" fill="#6D28D9" />
        <circle cx="100" cy="50" r="4" fill="#8B5CF6" />

        {/* === Eyes === */}
        <MascotEyes mood={mood} eyeGradientId={`eye-${size}`} />

        {/* === Cheek blush === */}
        <ellipse cx="33" cy="68" rx="8" ry="5" fill={`url(#blush-${size})`} />
        <ellipse cx="87" cy="68" rx="8" ry="5" fill={`url(#blush-${size})`} />

        {/* === Mouth === */}
        <MascotMouth mood={mood} />

        {/* === Arms === */}
        <MascotArms mood={mood} animate={animate} />

        {/* === Feet === */}
        <ellipse cx="45" cy="100" rx="12" ry="6" fill="#6D28D9" />
        <ellipse cx="45" cy="99" rx="10" ry="4" fill="#7C3AED" />
        <ellipse cx="75" cy="100" rx="12" ry="6" fill="#6D28D9" />
        <ellipse cx="75" cy="99" rx="10" ry="4" fill="#7C3AED" />

        {/* Rim light (right side) */}
        <ellipse
          cx="60"
          cy="60"
          rx="42"
          ry="44"
          fill="none"
          stroke="rgba(34,211,238,0.15)"
          strokeWidth="1.5"
          strokeDasharray="0 50 80 0"
        />
      </svg>

      {/* Speaking indicator dot */}
      {mood === "speaking" && animate && (
        <motion.div
          className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-secondary"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

// ---------- Antenna glow ball ----------
function MascotAntennaGlow({
  id,
  animate: shouldAnimate,
}: {
  id: string;
  animate: boolean;
}) {
  if (shouldAnimate) {
    return (
      <motion.circle
        cx="60"
        cy="5"
        r="5"
        fill={`url(#${id})`}
        animate={{ r: [4, 6, 4], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    );
  }
  return <circle cx="60" cy="5" r="5" fill={`url(#${id})`} />;
}

// ---------- Eyes ----------
function MascotEyes({
  mood,
  eyeGradientId,
}: {
  mood: string;
  eyeGradientId: string;
}) {
  if (mood === "happy" || mood === "waving") {
    return (
      <>
        {/* Happy curved eyes (^_^) */}
        <path
          d="M 38 54 Q 44 46, 50 54"
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 70 54 Q 76 46, 82 54"
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tiny sparkles */}
        <circle cx="52" cy="48" r="1.5" fill="rgba(255,255,255,0.6)" />
        <circle cx="84" cy="48" r="1.5" fill="rgba(255,255,255,0.6)" />
      </>
    );
  }

  if (mood === "thinking") {
    return (
      <>
        {/* Left eye — open looking up-right */}
        <ellipse cx="44" cy="52" rx="10" ry="11" fill={`url(#${eyeGradientId})`} />
        <circle cx="47" cy="49" r="5" fill="#1E1B4B" />
        <circle cx="49" cy="47" r="2" fill="white" />
        {/* Right eye — smaller, squinting */}
        <ellipse cx="76" cy="52" rx="10" ry="7" fill={`url(#${eyeGradientId})`} />
        <circle cx="79" cy="51" r="4" fill="#1E1B4B" />
        <circle cx="80" cy="49" r="1.5" fill="white" />
      </>
    );
  }

  // speaking & default — big round eyes
  return (
    <>
      {/* Left eye */}
      <ellipse cx="44" cy="52" rx="10" ry="11" fill={`url(#${eyeGradientId})`} />
      <circle cx="46" cy="52" r="5.5" fill="#1E1B4B" />
      <circle cx="48" cy="50" r="2.5" fill="white" />
      <circle cx="44" cy="54" r="1" fill="white" />
      {/* Right eye */}
      <ellipse cx="76" cy="52" rx="10" ry="11" fill={`url(#${eyeGradientId})`} />
      <circle cx="78" cy="52" r="5.5" fill="#1E1B4B" />
      <circle cx="80" cy="50" r="2.5" fill="white" />
      <circle cx="76" cy="54" r="1" fill="white" />
    </>
  );
}

// ---------- Mouth ----------
function MascotMouth({ mood }: { mood: string }) {
  if (mood === "happy" || mood === "waving") {
    // Big smile
    return (
      <path
        d="M 48 74 Q 60 84, 72 74"
        stroke="#1E1B4B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="rgba(30,27,75,0.3)"
      />
    );
  }

  if (mood === "thinking") {
    // Small "o" mouth, shifted to one side
    return (
      <ellipse cx="63" cy="76" rx="4" ry="5" fill="#1E1B4B" opacity="0.6" />
    );
  }

  if (mood === "speaking") {
    // Open mouth — talking
    return (
      <>
        <ellipse cx="60" cy="76" rx="8" ry="7" fill="#1E1B4B" opacity="0.8" />
        <ellipse cx="60" cy="74" rx="6" ry="3" fill="rgba(239,68,68,0.4)" />
      </>
    );
  }

  // default smile
  return (
    <path
      d="M 50 74 Q 60 82, 70 74"
      stroke="#1E1B4B"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  );
}

// ---------- Arms ----------
function MascotArms({
  mood,
  animate: shouldAnimate,
}: {
  mood: string;
  animate: boolean;
}) {
  if (mood === "waving" && shouldAnimate) {
    return (
      <>
        {/* Left arm — static */}
        <ellipse cx="22" cy="72" rx="6" ry="10" fill="#6D28D9" transform="rotate(-15,22,72)" />
        <circle cx="22" cy="80" r="5" fill="#7C3AED" />
        {/* Right arm — waving! */}
        <motion.g
          animate={{ rotate: [0, -20, 15, -20, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
          style={{ originX: "98px", originY: "62px" }}
        >
          <ellipse cx="98" cy="62" rx="6" ry="12" fill="#6D28D9" transform="rotate(30,98,62)" />
          <circle cx="103" cy="53" r="5" fill="#7C3AED" />
        </motion.g>
      </>
    );
  }

  // Default arms
  return (
    <>
      {/* Left arm */}
      <ellipse cx="22" cy="72" rx="6" ry="10" fill="#6D28D9" transform="rotate(-15,22,72)" />
      <circle cx="22" cy="80" r="5" fill="#7C3AED" />
      {/* Right arm */}
      <ellipse cx="98" cy="72" rx="6" ry="10" fill="#6D28D9" transform="rotate(15,98,72)" />
      <circle cx="98" cy="80" r="5" fill="#7C3AED" />
    </>
  );
}
