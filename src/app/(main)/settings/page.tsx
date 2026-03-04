"use client";

import { useState, useEffect } from "react";
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
  Play,
  Gauge,
  Mic2,
  Bot,
} from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  useSettingsStore,
  SPEED_OPTIONS,
} from "@/stores/settingsStore";
import { FREE_MODELS } from "@/lib/ai-models";
import type { VoiceInfo } from "@/hooks/useSpeech";

const dailyGoals = [5, 10, 15, 20, 30, 60];

export default function SettingsPage() {
  const { signOut } = useAuth();
  const [dailyGoal, setDailyGoal] = useState(20);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showSpeedPicker, setShowSpeedPicker] = useState(false);
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [voices, setVoices] = useState<VoiceInfo[]>([]);

  const {
    speechSpeed,
    selectedVoiceURI,
    pitch,
    aiModel,
    setSpeechSpeed,
    setSelectedVoiceURI,
    setAiModel,
  } = useSettingsStore();

  // Load voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const english = all
        .filter((v) => v.lang.toLowerCase().startsWith("en"))
        .map((v) => ({
          name: v.name,
          lang: v.lang,
          voiceURI: v.voiceURI,
          localService: v.localService,
        }));
      setVoices(english);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Preview voice
  const previewVoice = (voiceURI?: string, speed?: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      "Hello! I'm your AI tutor. Let's practice speaking English together."
    );
    utterance.lang = "en-US";
    utterance.rate = speed ?? speechSpeed;
    utterance.pitch = pitch;

    const uri = voiceURI ?? selectedVoiceURI;
    if (uri) {
      const match = window.speechSynthesis.getVoices().find((v) => v.voiceURI === uri);
      if (match) utterance.voice = match;
    }

    window.speechSynthesis.speak(utterance);
  };

  const selectedVoiceName =
    voices.find((v) => v.voiceURI === selectedVoiceURI)?.name || "Mặc định";

  const currentSpeedLabel =
    SPEED_OPTIONS.find((s) => s.value === speechSpeed)?.label || "1x";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile">
          <ChevronLeft size={24} className="text-slate-400" />
        </Link>
        <h1 className="text-h2 font-bold">Cài đặt</h1>
      </div>

      {/* Learning Settings */}
      <h3 className="text-small text-slate-500 uppercase tracking-wider mb-2 px-1">
        Học tập
      </h3>
      <Card className="divide-y divide-white/[0.06] p-0 overflow-hidden mb-6">
        {/* Daily Goal */}
        <button
          onClick={() => setShowGoalPicker(!showGoalPicker)}
          className="flex items-center justify-between px-4 py-3.5 w-full hover:bg-white/[0.06]/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Target size={18} className="text-primary" />
            <span>Mục tiêu hàng ngày</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-small">{dailyGoal} phút</span>
            <ChevronRight size={16} />
          </div>
        </button>

        {showGoalPicker && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="px-4 py-3 bg-white/[0.06]/30"
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
                      ? "bg-primary text-white btn-3d"
                      : "bg-white/[0.06] text-slate-400 hover:text-white hover:-translate-y-0.5"
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
          <div className="flex items-center gap-1">
            <span className="text-small text-secondary font-medium">English</span>
          </div>
        </div>

        {/* UI Language */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-accent-gems" />
            <span>Ngôn ngữ giao diện</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-small text-secondary font-medium">Tiếng Việt</span>
          </div>
        </div>
      </Card>

      {/* AI Model Settings */}
      <h3 className="text-small text-slate-500 uppercase tracking-wider mb-2 px-1">
        AI Model
      </h3>
      <Card className="divide-y divide-white/[0.06] p-0 overflow-hidden mb-6">
        <button
          onClick={() => setShowModelPicker(!showModelPicker)}
          className="flex items-center justify-between px-4 py-3.5 w-full hover:bg-white/[0.06]/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bot size={18} className="text-primary" />
            <div>
              <span>Model AI</span>
              <p className="text-[11px] text-slate-500">Chọn model cho chat</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-small truncate max-w-[120px]">
              {FREE_MODELS.find((m) => m.id === aiModel)?.name || "Gemini 2.0 Flash"}
            </span>
            <ChevronRight size={16} />
          </div>
        </button>

        {showModelPicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="bg-white/[0.06]/30"
          >
            {FREE_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setAiModel(m.id);
                  setShowModelPicker(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.06]",
                  aiModel === m.id
                    ? "bg-primary/10 btn-3d glass-shine"
                    : "hover:-translate-y-0.5"
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "text-small font-medium",
                        aiModel === m.id ? "text-primary" : "text-white"
                      )}
                    >
                      {m.name}
                    </p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">
                      {m.provider}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {m.description}
                  </p>
                </div>
                {aiModel === m.id && (
                  <span className="text-primary text-small ml-2">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </Card>

      {/* Voice & TTS Settings */}
      <h3 className="text-small text-slate-500 uppercase tracking-wider mb-2 px-1">
        Giọng nói & Phát âm
      </h3>
      <Card className="divide-y divide-white/[0.06] p-0 overflow-hidden mb-6">
        {/* Voice Selection */}
        <button
          onClick={() => setShowVoicePicker(!showVoicePicker)}
          className="flex items-center justify-between px-4 py-3.5 w-full hover:bg-white/[0.06]/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Mic2 size={18} className="text-secondary" />
            <div>
              <span>Giọng AI</span>
              <p className="text-[11px] text-slate-500">Chọn giọng phát âm</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-small truncate max-w-[100px]">
              {selectedVoiceName}
            </span>
            <ChevronRight size={16} />
          </div>
        </button>

        {showVoicePicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="bg-white/[0.06]/30 max-h-[200px] overflow-y-auto"
          >
            {/* Default option */}
            <button
              onClick={() => {
                setSelectedVoiceURI(null);
                setShowVoicePicker(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-white/[0.06]",
                !selectedVoiceURI && "bg-primary/10"
              )}
            >
              <div>
                <p
                  className={cn(
                    "text-small font-medium",
                    !selectedVoiceURI ? "text-primary" : "text-white"
                  )}
                >
                  Mặc định
                </p>
                <p className="text-[11px] text-slate-500">Giọng hệ thống</p>
              </div>
              {!selectedVoiceURI && (
                <span className="text-primary text-small">✓</span>
              )}
            </button>

            {voices.map((voice) => (
              <button
                key={voice.voiceURI}
                onClick={() => {
                  setSelectedVoiceURI(voice.voiceURI);
                  previewVoice(voice.voiceURI);
                  setShowVoicePicker(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-white/[0.06]",
                  selectedVoiceURI === voice.voiceURI && "bg-primary/10"
                )}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-small font-medium truncate",
                      selectedVoiceURI === voice.voiceURI
                        ? "text-primary"
                        : "text-white"
                    )}
                  >
                    {voice.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {voice.lang}
                    {voice.localService ? "" : " · Online"}
                  </p>
                </div>
                {selectedVoiceURI === voice.voiceURI && (
                  <span className="text-primary text-small ml-2">✓</span>
                )}
              </button>
            ))}

            {voices.length === 0 && (
              <p className="px-4 py-3 text-small text-slate-500 text-center">
                Không tìm thấy giọng nói
              </p>
            )}
          </motion.div>
        )}

        {/* Speed Control */}
        <button
          onClick={() => setShowSpeedPicker(!showSpeedPicker)}
          className="flex items-center justify-between px-4 py-3.5 w-full hover:bg-white/[0.06]/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Gauge size={18} className="text-accent-streak" />
            <div>
              <span>Tốc độ phát âm</span>
              <p className="text-[11px] text-slate-500">
                Chậm hơn để nghe rõ hơn
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-small font-mono">{currentSpeedLabel}</span>
            <ChevronRight size={16} />
          </div>
        </button>

        {showSpeedPicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="px-4 py-3 bg-white/[0.06]/30"
          >
            <div className="flex items-center gap-1.5">
              {SPEED_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSpeechSpeed(opt.value);
                    previewVoice(undefined, opt.value);
                    setShowSpeedPicker(false);
                  }}
                  className={cn(
                    "flex-1 py-2 rounded-md text-small font-mono font-medium transition-colors",
                    opt.value === speechSpeed
                      ? "bg-primary text-white"
                      : "bg-white/[0.06] text-slate-400 hover:text-white"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Preview Button */}
        <button
          onClick={() => previewVoice()}
          className="flex items-center justify-between px-4 py-3.5 w-full hover:bg-white/[0.06]/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Play size={18} className="text-accent-gems" />
            <span>Nghe thử giọng nói</span>
          </div>
          <Volume2 size={16} className="text-slate-400" />
        </button>
      </Card>

      {/* Notification Settings */}
      <h3 className="text-small text-slate-500 uppercase tracking-wider mb-2 px-1">
        Thông báo & Âm thanh
      </h3>
      <Card className="divide-y divide-white/[0.06] p-0 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-accent-streak" />
            <div>
              <span>Nhắc nhở học bài</span>
              <p className="text-[11px] text-slate-500">Mỗi ngày lúc 20:00</p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_6px_rgba(0,0,0,0.2)]",
              notificationsEnabled ? "bg-primary" : "bg-slate-700"
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
              "w-11 h-6 rounded-full transition-colors relative shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_6px_rgba(0,0,0,0.2)]",
              soundEnabled ? "bg-primary" : "bg-slate-700"
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
          <div className="text-small text-slate-500">Luôn bật</div>
        </div>
      </Card>

      {/* Other */}
      <h3 className="text-small text-slate-500 uppercase tracking-wider mb-2 px-1">
        Khác
      </h3>
      <Card className="divide-y divide-white/[0.06] p-0 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-slate-400" />
            <span>Quyền riêng tư</span>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <HelpCircle size={18} className="text-slate-400" />
            <span>Trợ giúp & Phản hồi</span>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>
      </Card>

      {/* Logout */}
      <button
        onClick={() => signOut()}
        className="w-full flex items-center justify-center gap-2 py-3 text-status-error rounded-md hover:bg-status-error/10 transition-colors"
      >
        <LogOut size={18} />
        <span className="font-medium">Đăng xuất</span>
      </button>

      <p className="text-center text-[11px] text-slate-600 mt-6 mb-4">
        WeSPEAK v1.0.0
      </p>
    </motion.div>
  );
}
