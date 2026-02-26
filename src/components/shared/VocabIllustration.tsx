"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VocabIllustrationProps {
  word: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

const emojiSizeMap = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
};

// Word-to-emoji + gradient mapping
const WORD_ILLUSTRATIONS: Record<
  string,
  { emoji: string; bg: string }
> = {
  // Greetings
  hello: { emoji: "👋", bg: "from-amber-500/20 to-orange-500/20" },
  goodbye: { emoji: "🫡", bg: "from-blue-500/20 to-indigo-500/20" },
  "good morning": { emoji: "🌅", bg: "from-yellow-400/20 to-orange-400/20" },
  "good night": { emoji: "🌙", bg: "from-indigo-500/20 to-purple-600/20" },
  "thank you": { emoji: "🙏", bg: "from-pink-500/20 to-rose-500/20" },

  // Family
  mother: { emoji: "👩", bg: "from-pink-400/20 to-rose-400/20" },
  father: { emoji: "👨", bg: "from-blue-400/20 to-cyan-400/20" },
  sister: { emoji: "👧", bg: "from-fuchsia-400/20 to-pink-400/20" },
  brother: { emoji: "👦", bg: "from-sky-400/20 to-blue-400/20" },
  family: { emoji: "👨‍👩‍👧‍👦", bg: "from-violet-400/20 to-purple-400/20" },

  // Numbers
  one: { emoji: "1️⃣", bg: "from-emerald-500/20 to-green-500/20" },
  five: { emoji: "5️⃣", bg: "from-teal-500/20 to-cyan-500/20" },
  ten: { emoji: "🔟", bg: "from-blue-500/20 to-indigo-500/20" },
  fifteen: { emoji: "🕐", bg: "from-purple-500/20 to-violet-500/20" },
  twenty: { emoji: "🔢", bg: "from-amber-500/20 to-yellow-500/20" },

  // Food & Drinks
  rice: { emoji: "🍚", bg: "from-amber-400/20 to-yellow-400/20" },
  water: { emoji: "💧", bg: "from-cyan-400/20 to-blue-400/20" },
  coffee: { emoji: "☕", bg: "from-amber-600/20 to-orange-700/20" },
  chicken: { emoji: "🍗", bg: "from-orange-400/20 to-amber-400/20" },
  bread: { emoji: "🍞", bg: "from-yellow-500/20 to-amber-500/20" },

  // Travel
  airport: { emoji: "✈️", bg: "from-sky-500/20 to-blue-500/20" },
  hotel: { emoji: "🏨", bg: "from-indigo-400/20 to-purple-400/20" },
  passport: { emoji: "🛂", bg: "from-emerald-500/20 to-teal-500/20" },
  ticket: { emoji: "🎫", bg: "from-rose-400/20 to-pink-400/20" },
  luggage: { emoji: "🧳", bg: "from-amber-500/20 to-orange-500/20" },

  // Shopping
  price: { emoji: "💰", bg: "from-yellow-400/20 to-amber-400/20" },
  cheap: { emoji: "🏷️", bg: "from-green-400/20 to-emerald-400/20" },
  expensive: { emoji: "💎", bg: "from-purple-400/20 to-violet-400/20" },
  size: { emoji: "📐", bg: "from-blue-400/20 to-sky-400/20" },
  discount: { emoji: "🔖", bg: "from-red-400/20 to-rose-400/20" },

  // Jobs
  doctor: { emoji: "👨‍⚕️", bg: "from-cyan-400/20 to-teal-400/20" },
  engineer: { emoji: "👷", bg: "from-orange-400/20 to-amber-400/20" },
  teacher: { emoji: "👩‍🏫", bg: "from-green-400/20 to-emerald-400/20" },
  office: { emoji: "🏢", bg: "from-gray-400/20 to-slate-400/20" },
  salary: { emoji: "💵", bg: "from-green-500/20 to-emerald-500/20" },

  // Health
  headache: { emoji: "🤕", bg: "from-red-400/20 to-orange-400/20" },
  fever: { emoji: "🤒", bg: "from-red-500/20 to-rose-500/20" },
  medicine: { emoji: "💊", bg: "from-blue-400/20 to-indigo-400/20" },
  hospital: { emoji: "🏥", bg: "from-red-300/20 to-pink-300/20" },
  cough: { emoji: "🤧", bg: "from-amber-400/20 to-yellow-400/20" },

  // Flashcard words
  opportunity: { emoji: "🚀", bg: "from-violet-500/20 to-purple-500/20" },
  environment: { emoji: "🌿", bg: "from-green-500/20 to-emerald-500/20" },
  communication: { emoji: "💬", bg: "from-blue-500/20 to-cyan-500/20" },
  experience: { emoji: "⭐", bg: "from-amber-500/20 to-yellow-500/20" },
  responsibility: { emoji: "🎯", bg: "from-red-500/20 to-orange-500/20" },
};

// Fallback: generate a color from the word
function getWordColor(word: string): string {
  const colors = [
    "from-violet-500/20 to-purple-500/20",
    "from-blue-500/20 to-cyan-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-amber-500/20 to-orange-500/20",
    "from-rose-500/20 to-pink-500/20",
    "from-indigo-500/20 to-blue-500/20",
  ];
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = word.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function VocabIllustration({
  word,
  size = "md",
  className,
}: VocabIllustrationProps) {
  const key = word.toLowerCase().trim();
  const illustration = WORD_ILLUSTRATIONS[key];

  const emoji = illustration?.emoji || "📖";
  const bg = illustration?.bg || getWordColor(key);

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-2xl",
        `bg-gradient-to-br ${bg}`,
        "border border-white/5",
        sizeMap[size],
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/5" />

      {/* Emoji with float animation */}
      <motion.span
        className={cn(emojiSizeMap[size], "relative z-10 select-none")}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  );
}
