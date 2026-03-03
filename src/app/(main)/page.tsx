"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Play,
  MessageCircle,
  Users,
  BookOpen,
  Layers,
  Mic,
  HelpCircle,
  Trophy,
  Flame,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import MascotAvatar from "@/components/shared/MascotAvatar";
import { useAuth } from "@/hooks/useAuth";
import { cn, getGreeting, formatXP } from "@/lib/utils";
import { ALL_COURSES } from "@/data/multi-lang-courses";

// --------------- Animation variants ---------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// --------------- Mock data ---------------

const DAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

// --------------- Circular Progress SVG ---------------

function CircularProgress({
  current,
  goal,
}: {
  current: number;
  goal: number;
}) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const percentage = Math.min(current / goal, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="#252540"
          strokeWidth={stroke}
        />
        {/* Progress circle */}
        <motion.circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-h3 text-white">
          {current}/{goal}
        </span>
        <span className="text-small text-gray-400">phút</span>
      </div>
    </div>
  );
}

// --------------- Page Component ---------------

export default function HomePage() {
  const { user, stats, isLoading } = useAuth();
  const router = useRouter();

  // Get last accessed course or default to first English A1 course
  const [continueCourse, setContinueCourse] = useState(ALL_COURSES[0]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wespeak_last_course");
      if (stored) {
        const found = ALL_COURSES.find((c) => c.id === stored);
        if (found) setContinueCourse(found);
      }
    } catch { /* ignore */ }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <motion.div
          className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const name = user?.name || "Bạn";
  const streak = stats?.current_streak ?? 0;
  const xp = stats?.total_xp ?? 0;
  const gems = stats?.gems ?? 0;
  const dailyGoal = user?.daily_goal_minutes ?? 15;
  const totalMinutes = stats?.total_minutes ?? 0;
  const dailyCurrent = Math.min(totalMinutes % dailyGoal === 0 && totalMinutes > 0 ? dailyGoal : totalMinutes % dailyGoal, dailyGoal);
  const remaining = Math.max(dailyGoal - dailyCurrent, 0);
  const lessonsCompleted = stats?.lessons_completed ?? 0;

  // Build streak calendar from current streak count
  const today = new Date().getDay(); // 0=Sun
  const streakDays = DAY_LABELS.map((_, idx) => {
    const daysAgo = (today - idx + 7) % 7;
    return daysAgo < streak;
  });

  return (
    <motion.div
      className="flex flex-col gap-5 px-4 pt-6 pb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ========== 1. Header ========== */}
      <motion.header
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-h3 text-white">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-small text-gray-400">{getGreeting()}</p>
            <h1 className="text-h3 text-white">{name}</h1>
          </div>
        </div>

        {/* Notification bell */}
        <button className="relative rounded-lg p-2 transition-colors hover:bg-dark-elevated">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-status-error" />
        </button>
      </motion.header>

      {/* Stats row */}
      <motion.div
        className="flex items-center justify-around rounded-lg bg-dark-card px-3 py-3 border border-gray-800/50"
        variants={itemVariants}
      >
        <div className="flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-accent-streak" />
          <span className="text-body font-semibold text-accent-streak">
            {streak}
          </span>
        </div>
        <div className="h-4 w-px bg-gray-700" />
        <div className="flex items-center gap-1.5">
          <span className="text-body text-accent-xp">⭐</span>
          <span className="text-body font-semibold text-accent-xp">
            {formatXP(xp)}
          </span>
        </div>
        <div className="h-4 w-px bg-gray-700" />
        <div className="flex items-center gap-1.5">
          <span className="text-body text-accent-gems">💎</span>
          <span className="text-body font-semibold text-accent-gems">
            {gems}
          </span>
        </div>
      </motion.div>

      {/* ========== 2. AI Mascot Card ========== */}
      <motion.div variants={itemVariants}>
        <Card
          className="bg-gradient-to-br from-primary/20 via-dark-card to-secondary/10 border-primary/30"
          animated={false}
        >
          <div className="flex items-start gap-3">
            <MascotAvatar size="lg" mood="waving" />
            <div className="flex-1">
              <h2 className="text-h3 text-white">
                Chào {name}! {getGreeting()}
              </h2>
              <p className="mt-1 text-small text-gray-400">
                Hôm nay bạn muốn luyện tập gì?
              </p>
            </div>
          </div>

          {/* Quick action buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => router.push("/chat")}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-small font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </button>
            <button
              onClick={() => router.push("/chat")}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-dark-elevated py-2.5 text-small font-semibold text-white transition-colors hover:bg-gray-700"
            >
              <Users className="h-4 w-4" />
              Role-play
            </button>
            <button
              onClick={() => router.push("/learn")}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-dark-elevated py-2.5 text-small font-semibold text-white transition-colors hover:bg-gray-700"
            >
              <BookOpen className="h-4 w-4" />
              Học
            </button>
          </div>
        </Card>
      </motion.div>

      {/* ========== 3. Continue Learning ========== */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-3 text-h3 text-white">Tiếp tục học</h2>
        <Card
          className="flex items-center gap-3"
          onClick={() => router.push(`/learn/${continueCourse.id}`)}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
            <BookOpen className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-body font-semibold text-white truncate">
              {continueCourse.title}
            </h3>
            <p className="text-small text-gray-400 truncate">
              {lessonsCompleted > 0 ? `Đã hoàn thành ${lessonsCompleted} bài` : "Bắt đầu ngay"}
            </p>
            <div className="mt-2">
              <ProgressBar
                value={Math.min(lessonsCompleted * 5, 100)}
                max={100}
                color="bg-secondary"
                size="sm"
                showLabel
              />
            </div>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <Play className="h-5 w-5 text-dark fill-dark" />
          </div>
        </Card>
      </motion.div>

      {/* ========== 4. Daily Goal ========== */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-3 text-h3 text-white">Mục tiêu hôm nay</h2>
        <Card className="flex items-center gap-5" animated={false}>
          <CircularProgress
            current={dailyCurrent}
            goal={dailyGoal}
          />
          <div className="flex-1">
            <h3 className="text-h3 text-white">
              {dailyCurrent}/{dailyGoal} phút
            </h3>
            <p className="mt-1 text-small text-gray-400">
              {remaining > 0
                ? `Còn ${remaining} phút nữa`
                : "Hoàn thành mục tiêu! 🎉"}
            </p>
            <div className="mt-3">
              <ProgressBar
                value={dailyCurrent}
                max={dailyGoal}
                color="bg-primary"
                size="sm"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* ========== 5. Quick Practice ========== */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-3 text-h3 text-white">Luyện tập nhanh</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {[
            {
              label: "Flashcard",
              icon: Layers,
              color: "text-accent-xp",
              bg: "bg-accent-xp/15",
              route: "/flashcards",
            },
            {
              label: "Phát âm",
              icon: Mic,
              color: "text-secondary",
              bg: "bg-secondary/15",
              route: "/pronunciation",
            },
            {
              label: "Quiz",
              icon: HelpCircle,
              color: "text-status-warning",
              bg: "bg-status-warning/15",
              route: "/learn",
            },
          ].map((item) => (
            <Card
              key={item.label}
              className="flex min-w-[110px] flex-col items-center gap-2 py-5"
              onClick={() => router.push(item.route)}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  item.bg
                )}
              >
                <item.icon className={cn("h-6 w-6", item.color)} />
              </div>
              <span className="text-small font-semibold text-white">
                {item.label}
              </span>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* ========== 6. Streak Calendar ========== */}
      <motion.div variants={itemVariants}>
        <Card animated={false}>
          <div className="mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-accent-streak" />
            <h3 className="text-h3 text-white">
              {streak} ngày liên tục
            </h3>
          </div>
          <div className="flex items-center justify-between">
            {DAY_LABELS.map((day, idx) => {
              const active = streakDays[idx];
              return (
                <div
                  key={day}
                  className="flex flex-col items-center gap-1.5"
                >
                  <motion.div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-small font-semibold transition-colors",
                      active
                        ? "bg-accent-streak text-white"
                        : "bg-dark-elevated text-gray-500"
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.5 + idx * 0.05,
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                  >
                    {active ? "✓" : ""}
                  </motion.div>
                  <span
                    className={cn(
                      "text-small",
                      active ? "text-accent-streak" : "text-gray-500"
                    )}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* ========== 7. Weekly Challenge ========== */}
      <motion.div variants={itemVariants}>
        <Card animated={false}>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-status-warning" />
            <h3 className="text-h3 text-white">
              Thử thách tuần: Học 7 ngày
            </h3>
          </div>
          <ProgressBar
            value={Math.min(streak, 7)}
            max={7}
            color="bg-status-warning"
            size="md"
          />
          <p className="mt-2 text-small text-gray-400">
            <span className="text-white font-semibold">
              {Math.min(streak, 7)}/7
            </span>
            {" | "}
            {streak >= 7 ? "Hoàn thành!" : `${7 - streak} ngày còn`}
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
}
