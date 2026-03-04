"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  Settings,
  Pencil,
  Star,
  Flame,
  BookOpen,
  Clock,
  Target,
  Bell,
  Languages,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { useAuth } from "@/hooks/useAuth";
import { getLevelTitle } from "@/lib/utils";

const mockAchievements = [
  { icon: "🌟", name: "Khởi đầu", desc: "Hoàn thành bài học đầu tiên" },
  { icon: "🔥", name: "7 Ngày", desc: "Streak 7 ngày liên tục" },
  { icon: "📚", name: "10 Bài", desc: "Hoàn thành 10 bài học" },
  { icon: "💬", name: "Chat Master", desc: "Chat 10 lần với AI" },
  { icon: "⭐", name: "100 XP", desc: "Đạt 100 XP" },
  { icon: "🏆", name: "30 Ngày", desc: "Streak 30 ngày liên tục" },
];

const settingsItems = [
  { icon: Target, label: "Mục tiêu hàng ngày", value: "20 phút" },
  { icon: Bell, label: "Thời gian nhắc nhở", value: "20:00" },
  { icon: Languages, label: "Ngôn ngữ đang học", value: "English" },
  { icon: MessageSquare, label: "Ngôn ngữ giao diện", value: "Tiếng Việt" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function ProfilePage() {
  const { user, stats } = useAuth();

  const name = user?.name || "Minh";
  const email = user?.email || "minh@example.com";
  const level = stats?.level || 8;
  const totalXP = stats?.total_xp || 12450;
  const streak = stats?.current_streak || 15;
  const lessonsCompleted = stats?.lessons_completed || 87;
  const totalMinutes = stats?.total_minutes || 1440;
  const totalHours = Math.round(totalMinutes / 60);
  const levelTitle = getLevelTitle(level);

  // XP thresholds per level range from CLAUDE.md
  const LEVEL_THRESHOLDS = [0, 200, 400, 600, 800, 1000, 1800, 2600, 3400, 4200, 5000, 6500, 8000, 9500, 11000, 12500, 15000, 17500, 20000, 22500, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000];
  const currentThreshold = LEVEL_THRESHOLDS[Math.min(level - 1, 30)] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[Math.min(level, 30)] || currentThreshold + 5000;
  const xpInLevel = totalXP - currentThreshold;
  const xpForLevel = nextThreshold - currentThreshold;
  const levelProgress = Math.min(Math.round((xpInLevel / xpForLevel) * 100), 100);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-4"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <ChevronLeft size={24} className="text-slate-400" />
          </Link>
          <h1 className="text-h2 font-bold">Hồ sơ</h1>
        </div>
        <Link href="/settings">
          <Settings size={22} className="text-slate-400" />
        </Link>
      </motion.div>

      {/* Profile Card */}
      <motion.div variants={item}>
        <Card className="text-center mb-4">
          <div className="relative inline-block mx-auto mb-3">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold mx-auto">
              {name.charAt(0).toUpperCase()}
            </div>
            <Link
              href="/settings"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white/[0.06] border border-slate-700 flex items-center justify-center hover:border-primary transition-colors"
            >
              <Pencil size={14} className="text-slate-400" />
            </Link>
          </div>
          <h2 className="text-h2 font-bold">Nguyễn {name}</h2>
          <p className="text-small text-slate-400 mb-4">{email}</p>

          <div className="text-left">
            <div className="flex justify-between text-small mb-1">
              <span className="text-slate-400">Level: {levelTitle}</span>
              <span className="text-primary font-semibold">{levelProgress}%</span>
            </div>
            <ProgressBar value={levelProgress} max={100} color="bg-primary" size="sm" />
            <p className="text-small text-slate-500 mt-1 text-center">
              Còn {100 - levelProgress}% để lên {level <= 10 ? "Intermediate" : "Advanced"}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-4 gap-2 mb-6">
        {[
          { icon: <Star size={20} className="text-accent-xp" />, value: totalXP.toLocaleString(), label: "XP tổng" },
          { icon: <Flame size={20} className="text-accent-streak" />, value: streak, label: "Ngày streak" },
          { icon: <BookOpen size={20} className="text-accent-gems" />, value: lessonsCompleted, label: "Bài học" },
          { icon: <Clock size={20} className="text-secondary" />, value: totalHours, label: "Giờ học" },
        ].map((stat, i) => (
          <Card key={i} className="text-center py-3 px-2">
            <div className="flex justify-center mb-1">{stat.icon}</div>
            <p className="text-h3 font-bold">{stat.value}</p>
            <p className="text-[11px] text-slate-500">{stat.label}</p>
          </Card>
        ))}
      </motion.div>

      {/* Achievements */}
      <motion.div variants={item} className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-h3 font-semibold flex items-center gap-2">
            🏅 Thành tích
          </h3>
          <Link href="/leaderboard" className="text-small text-primary hover:text-primary-hover transition-colors">Xem tất cả</Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {mockAchievements.map((achievement, i) => (
            <Card key={i} className="text-center py-3 px-2">
              <span className="text-2xl block mb-1">{achievement.icon}</span>
              <p className="text-small font-semibold">{achievement.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{achievement.desc}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div variants={item}>
        <h3 className="text-h3 font-semibold mb-3">Cài đặt</h3>
        <Card className="divide-y divide-white/[0.06] p-0 overflow-hidden">
          {settingsItems.map((setting, i) => {
            const Icon = setting.icon;
            return (
              <Link
                key={i}
                href="/settings"
                className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.06]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-slate-400" />
                  <span className="text-body">{setting.label}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="text-small">{setting.value}</span>
                  <ChevronRight size={16} />
                </div>
              </Link>
            );
          })}
        </Card>
      </motion.div>
    </motion.div>
  );
}
