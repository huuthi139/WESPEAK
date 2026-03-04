"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Search, Mic, Clock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// ==================== Types ====================

type Difficulty = "easy" | "medium" | "hard";

interface Scenario {
  key: string;
  icon: string;
  title: string;
  difficulty: Difficulty;
  duration: number; // minutes
  category: string;
}

interface Category {
  icon: string;
  title: string;
  tags: string;
  scenarioKey: string;
}

// ==================== Constants ====================

const CATEGORY_FILTERS = [
  { key: "all", label: "Tat ca" },
  { key: "work", label: "Cong viec" },
  { key: "travel", label: "Du lich" },
  { key: "daily", label: "Hang ngay" },
  { key: "emergency", label: "Khan cap" },
];

const DIFFICULTY_FILTERS: { key: Difficulty | "all"; label: string }[] = [
  { key: "all", label: "Tat ca" },
  { key: "easy", label: "De" },
  { key: "medium", label: "Trung binh" },
  { key: "hard", label: "Kho" },
];

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string; bg: string }
> = {
  easy: {
    label: "De",
    color: "text-emerald-400",
    bg: "bg-emerald-500/20 border-emerald-500/30",
  },
  medium: {
    label: "Trung binh",
    color: "text-amber-400",
    bg: "bg-amber-500/20 border-amber-500/30",
  },
  hard: {
    label: "Kho",
    color: "text-red-400",
    bg: "bg-red-500/20 border-red-500/30",
  },
};

const POPULAR_SCENARIOS: Scenario[] = [
  {
    key: "job_interview",
    icon: "\uD83D\uDCBC",
    title: "Phong van xin viec",
    difficulty: "hard",
    duration: 8,
    category: "work",
  },
  {
    key: "coffee_shop",
    icon: "\u2615",
    title: "Goi do uong",
    difficulty: "easy",
    duration: 5,
    category: "daily",
  },
  {
    key: "airport",
    icon: "\u2708\uFE0F",
    title: "Check-in san bay",
    difficulty: "medium",
    duration: 6,
    category: "travel",
  },
  {
    key: "hotel",
    icon: "\uD83C\uDFE8",
    title: "Nhan phong khach san",
    difficulty: "easy",
    duration: 5,
    category: "travel",
  },
  {
    key: "shopping",
    icon: "\uD83D\uDED2",
    title: "Mac ca",
    difficulty: "medium",
    duration: 7,
    category: "daily",
  },
  {
    key: "restaurant",
    icon: "\uD83C\uDF7D\uFE0F",
    title: "Goi mon",
    difficulty: "easy",
    duration: 5,
    category: "daily",
  },
];

const CATEGORIES: Category[] = [
  {
    icon: "\uD83D\uDCBC",
    title: "Cong viec",
    tags: "Hop, Email, Thuong luong",
    scenarioKey: "job_interview",
  },
  {
    icon: "\u2708\uFE0F",
    title: "Du lich",
    tags: "Khach san, Hoi duong, San bay",
    scenarioKey: "travel",
  },
  {
    icon: "\uD83D\uDED2",
    title: "Mua sam",
    tags: "Mac ca, Doi tra, Hoi gia",
    scenarioKey: "shopping",
  },
  {
    icon: "\uD83C\uDF7D\uFE0F",
    title: "Am thuc",
    tags: "Dat ban, Goi mon, Thanh toan",
    scenarioKey: "restaurant",
  },
  {
    icon: "\uD83C\uDFE5",
    title: "Khan cap",
    tags: "Benh vien, Canh sat, Nho giup",
    scenarioKey: "emergency",
  },
  {
    icon: "\uD83C\uDF93",
    title: "Hoc tap",
    tags: "Thuyet trinh, Thao luan, Hoi bai",
    scenarioKey: "free_chat",
  },
];

// ==================== Animation Variants ====================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ==================== Component ====================

export default function RolePlayLabPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState<
    Difficulty | "all"
  >("all");

  // Filter scenarios
  const filteredScenarios = POPULAR_SCENARIOS.filter((s) => {
    const matchesCategory =
      activeCategory === "all" || s.category === activeCategory;
    const matchesDifficulty =
      activeDifficulty === "all" || s.difficulty === activeDifficulty;
    const matchesSearch =
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const navigateToChat = (scenarioKey: string) => {
    router.push(`/chat?scenario=${scenarioKey}`);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(
      Math.random() * POPULAR_SCENARIOS.length
    );
    navigateToChat(POPULAR_SCENARIOS[randomIndex].key);
  };

  return (
    <div className="min-h-screen pb-24">
      <motion.div
        className="px-4 pt-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-h1 font-bold text-white">
            Role-Play Lab{" "}
            <span role="img" aria-label="theater">
              🎭
            </span>
          </h1>
          <p className="text-secondary-text text-small mt-1">
            Luyen noi qua cac tinh huong thuc te
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants}>
          <div className="glass-3d rounded-xl px-4 py-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-text shrink-0" />
            <input
              type="text"
              placeholder="Tim kich ban..."
              className="bg-transparent flex-1 text-body text-white placeholder:text-muted-text outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="text-muted-text hover:text-primary transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Category Filter Chips */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORY_FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveCategory(filter.key)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-small font-medium transition-all border",
                  activeCategory === filter.key
                    ? "bg-primary-gradient text-white border-primary shadow-glow"
                    : "glass-3d text-secondary-text border-white/10 hover:border-primary/40"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2">
            {DIFFICULTY_FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveDifficulty(filter.key)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-small font-medium transition-all border",
                  activeDifficulty === filter.key
                    ? "bg-secondary-gradient text-white border-secondary shadow-glow-green"
                    : "glass-3d text-secondary-text border-white/10 hover:border-secondary/40"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Special Cards - Suggestions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-h3 font-semibold text-white mb-3">
            Goi y cho ban
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Random Scenario */}
            <Card
              onClick={handleRandom}
              glow="primary"
              className="relative overflow-hidden"
            >
              <div className="flex flex-col items-center text-center py-2">
                <span className="text-3xl mb-2">🎲</span>
                <span className="text-body font-semibold text-white">
                  Ngau nhien
                </span>
                <span className="text-small text-secondary-text mt-1">
                  Thu thach bat ngo
                </span>
              </div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
            </Card>

            {/* Custom Scenario */}
            <Card
              onClick={() => navigateToChat("free_chat")}
              glow="secondary"
              className="relative overflow-hidden"
            >
              <div className="flex flex-col items-center text-center py-2">
                <span className="text-3xl mb-2">✨</span>
                <span className="text-body font-semibold text-white">
                  Tao kich ban rieng
                </span>
                <span className="text-small text-secondary-text mt-1">
                  Tu thiet ke tinh huong
                </span>
              </div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full blur-xl" />
            </Card>
          </div>
        </motion.div>

        {/* Popular Scenarios - Horizontal Scroll */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-h3 font-semibold text-white">
              Kich ban pho bien
            </h2>
            <span className="text-small text-primary flex items-center gap-1">
              Xem tat ca <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {filteredScenarios.map((scenario) => (
              <motion.div
                key={scenario.key}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" as const } }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 w-[200px]"
              >
                <div
                  className="glass-3d glass-shine rounded-xl p-4 cursor-pointer press-glow h-full flex flex-col"
                  onClick={() => navigateToChat(scenario.key)}
                >
                  <span className="text-3xl mb-3">{scenario.icon}</span>
                  <h3 className="text-body font-semibold text-white mb-2">
                    {scenario.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <span
                      className={cn(
                        "text-small px-2 py-0.5 rounded-md border font-medium",
                        DIFFICULTY_CONFIG[scenario.difficulty].bg,
                        DIFFICULTY_CONFIG[scenario.difficulty].color
                      )}
                    >
                      {DIFFICULTY_CONFIG[scenario.difficulty].label}
                    </span>
                    <span className="text-small text-muted-text flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {scenario.duration} phut
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredScenarios.length === 0 && (
              <div className="w-full text-center py-8 text-secondary-text text-body">
                Khong tim thay kich ban phu hop
              </div>
            )}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="text-h3 font-semibold text-white mb-3">
            Danh muc
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" as const } }}
                whileTap={{ scale: 0.97 }}
              >
                <div
                  className="glass-3d glass-shine rounded-xl p-4 cursor-pointer press-glow"
                  onClick={() => navigateToChat(category.scenarioKey)}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-body font-semibold text-white mt-2">
                    {category.title}
                  </h3>
                  <p className="text-small text-muted-text mt-1">
                    {category.tags}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </motion.div>
    </div>
  );
}
