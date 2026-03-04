"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Flame, Crown } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Tab = "today" | "week" | "all";

const tabs: { key: Tab; label: string }[] = [
  { key: "today", label: "Hôm nay" },
  { key: "week", label: "Tuần này" },
  { key: "all", label: "Tất cả" },
];

type LeaderboardEntry = {
  rank: number; name: string; xp: number; streak: number;
  initial: string; color: string; isUser?: boolean;
};

const LEADERBOARD_DATA: Record<Tab, LeaderboardEntry[]> = {
  today: [
    { rank: 1, name: "Hùng Trần", xp: 320, streak: 25, initial: "H", color: "bg-accent-streak" },
    { rank: 2, name: "Mai Phạm", xp: 280, streak: 20, initial: "M", color: "bg-slate-400" },
    { rank: 3, name: "Nguyễn Minh", xp: 250, streak: 15, initial: "N", color: "bg-primary", isUser: true },
    { rank: 4, name: "Linh Nguyễn", xp: 220, streak: 28, initial: "L", color: "bg-slate-600" },
    { rank: 5, name: "Tú Lê", xp: 190, streak: 28, initial: "T", color: "bg-slate-600" },
    { rank: 6, name: "Hà Vũ", xp: 160, streak: 22, initial: "H", color: "bg-slate-600" },
    { rank: 7, name: "Dũng Đỗ", xp: 140, streak: 19, initial: "D", color: "bg-slate-600" },
    { rank: 8, name: "Lan Hoàng", xp: 120, streak: 16, initial: "L", color: "bg-slate-600" },
    { rank: 9, name: "Quang Bùi", xp: 95, streak: 14, initial: "Q", color: "bg-slate-600" },
    { rank: 10, name: "Thảo Đinh", xp: 80, streak: 12, initial: "T", color: "bg-slate-600" },
  ],
  week: [
    { rank: 1, name: "Linh Nguyễn", xp: 2420, streak: 28, initial: "L", color: "bg-accent-streak" },
    { rank: 2, name: "Hùng Trần", xp: 2150, streak: 25, initial: "H", color: "bg-slate-400" },
    { rank: 3, name: "Mai Phạm", xp: 1900, streak: 20, initial: "M", color: "bg-accent-streak" },
    { rank: 4, name: "Tú Lê", xp: 1750, streak: 28, initial: "T", color: "bg-slate-600" },
    { rank: 5, name: "Nguyễn Minh", xp: 1650, streak: 15, initial: "N", color: "bg-primary", isUser: true },
    { rank: 6, name: "Hà Vũ", xp: 1480, streak: 22, initial: "H", color: "bg-slate-600" },
    { rank: 7, name: "Dũng Đỗ", xp: 1350, streak: 19, initial: "D", color: "bg-slate-600" },
    { rank: 8, name: "Lan Hoàng", xp: 1200, streak: 16, initial: "L", color: "bg-slate-600" },
    { rank: 9, name: "Quang Bùi", xp: 1050, streak: 14, initial: "Q", color: "bg-slate-600" },
    { rank: 10, name: "Thảo Đinh", xp: 950, streak: 12, initial: "T", color: "bg-slate-600" },
  ],
  all: [
    { rank: 1, name: "Linh Nguyễn", xp: 15420, streak: 28, initial: "L", color: "bg-accent-streak" },
    { rank: 2, name: "Hùng Trần", xp: 14850, streak: 25, initial: "H", color: "bg-slate-400" },
    { rank: 3, name: "Mai Phạm", xp: 13200, streak: 20, initial: "M", color: "bg-accent-streak" },
    { rank: 4, name: "Tú Lê", xp: 12450, streak: 28, initial: "T", color: "bg-slate-600" },
    { rank: 5, name: "Nguyễn Minh", xp: 12450, streak: 15, initial: "N", color: "bg-primary", isUser: true },
    { rank: 6, name: "Hà Vũ", xp: 11800, streak: 22, initial: "H", color: "bg-slate-600" },
    { rank: 7, name: "Dũng Đỗ", xp: 10950, streak: 19, initial: "D", color: "bg-slate-600" },
    { rank: 8, name: "Lan Hoàng", xp: 10200, streak: 16, initial: "L", color: "bg-slate-600" },
    { rank: 9, name: "Quang Bùi", xp: 9850, streak: 14, initial: "Q", color: "bg-slate-600" },
    { rank: 10, name: "Thảo Đinh", xp: 9500, streak: 12, initial: "T", color: "bg-slate-600" },
  ],
};

const podiumColors = {
  1: "from-yellow-500/20 to-yellow-600/5",
  2: "from-gray-400/20 to-gray-500/5",
  3: "from-orange-500/20 to-orange-600/5",
};

const crownColors = {
  1: "text-yellow-400",
  2: "text-slate-400",
  3: "text-orange-400",
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("week");

  const currentData = LEADERBOARD_DATA[activeTab];
  const top3 = currentData.slice(0, 3);
  const rest = currentData.slice(3);
  const userEntry = currentData.find((e) => e.isUser);

  // Rearrange top 3 for podium: [2nd, 1st, 3rd]
  const podiumOrder = [top3[1], top3[0], top3[2]];

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/">
          <ChevronLeft size={24} className="text-slate-400" />
        </Link>
        <h1 className="text-h2 font-bold flex items-center gap-2">
          🏆 Bảng xếp hạng
        </h1>
      </div>

      {/* Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-center gap-3 mb-6 px-4"
      >
        {podiumOrder.map((entry, i) => {
          const podiumRank = [2, 1, 3][i];
          const heights = { 1: "h-28", 2: "h-20", 3: "h-16" };
          const avatarSizes = { 1: "w-16 h-16", 2: "w-12 h-12", 3: "w-12 h-12" };

          return (
            <div key={entry.rank} className="flex flex-col items-center flex-1">
              <div className={cn("rounded-full flex items-center justify-center text-lg font-bold mb-2", avatarSizes[podiumRank as 1 | 2 | 3], entry.color)}>
                {entry.initial}
              </div>
              <div className={cn(
                "w-full rounded-t-lg flex flex-col items-center justify-center bg-gradient-to-b",
                podiumColors[podiumRank as 1 | 2 | 3],
                heights[podiumRank as 1 | 2 | 3]
              )}>
                <Crown size={podiumRank === 1 ? 24 : 18} className={crownColors[podiumRank as 1 | 2 | 3]} />
                <span className="text-h3 font-bold mt-1">{podiumRank}</span>
              </div>
              <p className="text-small font-medium mt-2 text-center">{entry.name.split(" ")[0]}</p>
              <p className="text-[11px] text-primary">{entry.xp.toLocaleString()} XP</p>
            </div>
          );
        })}
      </motion.div>

      {/* Tabs */}
      <div className="flex bg-dark-card rounded-lg p-1 mb-4 border border-white/[0.08]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex-1 py-2 text-small font-medium rounded-md transition-all",
              activeTab === tab.key
                ? "bg-white/[0.06] text-white"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Your rank highlight */}
      {userEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3"
        >
          <Card className="border-primary/30 bg-primary/5">
            <div className="flex items-center gap-3">
              <span className="text-h3 font-bold text-primary w-8">#{userEntry.rank}</span>
              <div className={cn("w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm", userEntry.color)}>
                {userEntry.initial}
              </div>
              <div className="flex-1">
                <p className="text-body font-semibold text-primary">{userEntry.name} (Bạn)</p>
                <div className="flex items-center gap-2 text-small text-slate-400">
                  <span>{userEntry.xp.toLocaleString()} XP</span>
                  <span className="flex items-center gap-0.5">
                    <Flame size={12} className="text-accent-streak" /> {userEntry.streak}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Rankings list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-2"
        >
          {rest.map((entry) => (
            <Card
              key={entry.rank}
              className={cn(
                entry.isUser && "border-primary/30 bg-primary/5"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-body font-bold text-slate-400 w-8">{entry.rank}</span>
                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm", entry.color)}>
                  {entry.initial}
                </div>
                <div className="flex-1">
                  <p className={cn("text-body font-semibold", entry.isUser && "text-primary")}>
                    {entry.name}{entry.isUser ? " (Bạn)" : ""}
                  </p>
                  <div className="flex items-center gap-2 text-small text-slate-400">
                    <span>{entry.xp.toLocaleString()} XP</span>
                    <span className="flex items-center gap-0.5">
                      <Flame size={12} className="text-accent-streak" /> {entry.streak}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
