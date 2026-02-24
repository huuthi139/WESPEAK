"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Target,
  Bell,
  Volume2,
  Languages,
  MessageSquare,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const dailyGoals = [5, 10, 15, 20, 30, 60];

export default function SettingsPage() {
  const [dailyGoal, setDailyGoal] = useState(20);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showGoalPicker, setShowGoalPicker] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile">
          <ChevronLeft size={24} className="text-gray-400" />
        </Link>
        <h1 className="text-h2 font-bold">Cài đặt</h1>
      </div>

      {/* Learning Settings */}
      <h3 className="text-small text-gray-500 uppercase tracking-wider mb-2 px-1">
        Học tập
      </h3>
      <Card className="divide-y divide-gray-800/50 p-0 overflow-hidden mb-6">
        {/* Daily Goal */}
        <button
          onClick={() => setShowGoalPicker(!showGoalPicker)}
          className="flex items-center justify-between px-4 py-3.5 w-full hover:bg-dark-elevated/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Target size={18} className="text-primary" />
            <span>Mục tiêu hàng ngày</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span className="text-small">{dailyGoal} phút</span>
            <ChevronRight size={16} />
          </div>
        </button>

        {showGoalPicker && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="px-4 py-3 bg-dark-elevated/30"
          >
            <div className="grid grid-cols-3 gap-2">
              {dailyGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    setDailyGoal(goal);
                    setShowGoalPicker(false);
                  }}
                  className={cn(
                    "py-2 rounded-md text-small font-medium transition-colors",
                    goal === dailyGoal
                      ? "bg-primary text-white"
                      : "bg-dark-elevated text-gray-400 hover:text-white"
                  )}
                >
                  {goal} phút
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Language */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Languages size={18} className="text-secondary" />
            <span>Ngôn ngữ đang học</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span className="text-small">English</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* UI Language */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-accent-gems" />
            <span>Ngôn ngữ giao diện</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span className="text-small">Tiếng Việt</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <h3 className="text-small text-gray-500 uppercase tracking-wider mb-2 px-1">
        Thông báo & Âm thanh
      </h3>
      <Card className="divide-y divide-gray-800/50 p-0 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-accent-streak" />
            <div>
              <span>Nhắc nhở học bài</span>
              <p className="text-[11px] text-gray-500">Mỗi ngày lúc 20:00</p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative",
              notificationsEnabled ? "bg-primary" : "bg-gray-700"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
                notificationsEnabled && "translate-x-5"
              )}
            />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-secondary" />
            <span>Hiệu ứng âm thanh</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative",
              soundEnabled ? "bg-primary" : "bg-gray-700"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
                soundEnabled && "translate-x-5"
              )}
            />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-accent-xp" />
            <span>Giao diện tối</span>
          </div>
          <div className="text-small text-gray-500">Luôn bật</div>
        </div>
      </Card>

      {/* Other */}
      <h3 className="text-small text-gray-500 uppercase tracking-wider mb-2 px-1">
        Khác
      </h3>
      <Card className="divide-y divide-gray-800/50 p-0 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-gray-400" />
            <span>Quyền riêng tư</span>
          </div>
          <ChevronRight size={16} className="text-gray-500" />
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <HelpCircle size={18} className="text-gray-400" />
            <span>Trợ giúp & Phản hồi</span>
          </div>
          <ChevronRight size={16} className="text-gray-500" />
        </div>
      </Card>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 py-3 text-status-error rounded-md hover:bg-status-error/10 transition-colors">
        <LogOut size={18} />
        <span className="font-medium">Đăng xuất</span>
      </button>

      <p className="text-center text-[11px] text-gray-600 mt-6 mb-4">
        WeSPEAK v1.0.0
      </p>
    </motion.div>
  );
}
