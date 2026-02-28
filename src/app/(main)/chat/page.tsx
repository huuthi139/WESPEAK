"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  X,
  ChevronDown,
  Send,
  Mic,
  Volume2,
  Clock,
  Gauge,
} from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import MascotAvatar from "@/components/shared/MascotAvatar";
import { useChatStore } from "@/stores/chatStore";
import { useSettingsStore, SPEED_OPTIONS } from "@/stores/settingsStore";
import { useSpeech } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";
import type { ChatScenario, ScenarioInfo } from "@/types";

// ==================== Constants ====================

const SCENARIOS: ScenarioInfo[] = [
  {
    key: "free_chat",
    label: "Trò chuyện tự do",
    description: "Trò chuyện tự do với AI",
    icon: "\u{1F4AC}",
  },
  {
    key: "job_interview",
    label: "Phỏng vấn xin việc",
    description: "Luyện tập phỏng vấn",
    icon: "\u{1F4BC}",
  },
  {
    key: "restaurant",
    label: "Nhà hàng",
    description: "Gọi món tại nhà hàng",
    icon: "\u{1F37D}\u{FE0F}",
  },
  {
    key: "shopping",
    label: "Mua sắm",
    description: "Mua sắm tại cửa hàng",
    icon: "\u{1F6CD}\u{FE0F}",
  },
  {
    key: "travel",
    label: "Du lịch",
    description: "Hỏi đường và du lịch",
    icon: "\u2708\u{FE0F}",
  },
  {
    key: "hotel",
    label: "Khách sạn",
    description: "Nhận phòng khách sạn",
    icon: "\u{1F3E8}",
  },
];

const SCENARIO_GREETINGS: Record<ChatScenario, { content: string; translation: string }> = {
  free_chat: {
    content: "Hi there! I'm your AI tutor. What would you like to talk about today? Feel free to speak about anything!",
    translation: "Xin chào! Tôi là gia sư AI của bạn. Hôm nay bạn muốn nói về điều gì? Hãy thoải mái nói về bất cứ điều gì!",
  },
  job_interview: {
    content: "Welcome! I'm the HR manager. Please have a seat. Let's start with a simple question: Can you tell me a little about yourself?",
    translation: "Chào mừng! Tôi là quản lý nhân sự. Mời bạn ngồi. Hãy bắt đầu với một câu hỏi đơn giản: Bạn có thể giới thiệu đôi chút về bản thân không?",
  },
  restaurant: {
    content: "Good evening! Welcome to our restaurant. Here is the menu. Are you ready to order, or would you like a few more minutes?",
    translation: "Chào buổi tối! Chào mừng đến nhà hàng của chúng tôi. Đây là thực đơn. Bạn đã sẵn sàng gọi món chưa, hay cần thêm vài phút?",
  },
  shopping: {
    content: "Hello! Welcome to our store. Is there anything specific you're looking for today? I'd be happy to help!",
    translation: "Xin chào! Chào mừng đến cửa hàng của chúng tôi. Hôm nay bạn đang tìm gì cụ thể không? Tôi rất vui được giúp!",
  },
  travel: {
    content: "Hey! Welcome to the city! I'm your local guide. Where would you like to go? I can help you with directions and recommendations.",
    translation: "Xin chào! Chào mừng đến thành phố! Tôi là hướng dẫn viên địa phương. Bạn muốn đi đâu? Tôi có thể giúp bạn chỉ đường và gợi ý.",
  },
  hotel: {
    content: "Good afternoon! Welcome to Grand Hotel. Do you have a reservation? I'd be happy to help you check in.",
    translation: "Chào buổi chiều! Chào mừng đến Grand Hotel. Bạn đã đặt phòng chưa? Tôi rất vui được giúp bạn nhận phòng.",
  },
};

// ==================== Timer Hook ====================

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return { seconds, formatted, start, stop, reset, isRunning };
}

// ==================== Bouncing Dots ====================

function BouncingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-gray-400"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ==================== Speed Pill ====================

function SpeedPill() {
  const [open, setOpen] = useState(false);
  const { speechSpeed, setSpeechSpeed } = useSettingsStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full bg-dark-elevated px-2.5 py-1 text-small font-mono text-gray-400 transition-colors hover:text-white hover:bg-dark-elevated/80"
      >
        <Gauge className="h-3 w-3" />
        {speechSpeed}x
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            className="absolute right-0 top-full mt-1 z-30 rounded-lg border border-gray-800/50 bg-dark-card shadow-lg shadow-black/40 overflow-hidden"
          >
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setSpeechSpeed(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-small font-mono transition-colors hover:bg-dark-elevated",
                  opt.value === speechSpeed
                    ? "text-primary bg-primary/10"
                    : "text-gray-300"
                )}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== Message Bubble ====================

function MessageBubble({
  message,
  onSpeak,
  isSpeaking,
}: {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    translation?: string;
    feedback?: { hasCorrection: boolean; corrections: string[] };
    timestamp: string;
  };
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex w-full gap-2", isUser ? "justify-end" : "justify-start")}
    >
      {/* AI avatar */}
      {!isUser && (
        <MascotAvatar
          size="sm"
          mood={isSpeaking ? "speaking" : "happy"}
          animate={false}
        />
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-lg px-4 py-3",
          isUser
            ? "rounded-br-sm bg-primary text-white"
            : "rounded-bl-sm bg-dark-card text-white border border-gray-800/50"
        )}
      >
        {/* Message content */}
        <p className="text-body leading-relaxed">{message.content}</p>

        {/* Translation for AI messages */}
        {!isUser && message.translation && (
          <p className="mt-2 text-small text-gray-400 italic">
            ({message.translation})
          </p>
        )}

        {/* Listen button for AI messages */}
        {!isUser && (
          <button
            onClick={() => onSpeak(message.content)}
            className="mt-2 flex items-center gap-1 rounded-md bg-dark-elevated px-2.5 py-1 text-small text-secondary transition-colors hover:bg-dark-elevated/80"
          >
            <Volume2 className="h-3 w-3" />
            Nghe
          </button>
        )}

        {/* Grammar corrections */}
        {message.feedback?.hasCorrection && message.feedback.corrections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 rounded-md border border-status-warning/30 bg-status-warning/10 px-3 py-2"
          >
            <p className="text-small font-semibold text-status-warning">
              Gợi ý sửa lỗi:
            </p>
            {message.feedback.corrections.map((correction, idx) => (
              <p key={idx} className="mt-1 text-small text-gray-300">
                {correction}
              </p>
            ))}
          </motion.div>
        )}

        {/* Timestamp */}
        <p
          className={cn(
            "mt-1 text-[10px]",
            isUser ? "text-white/50 text-right" : "text-gray-500"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}

// ==================== Page Component ====================

export default function ChatPage() {
  const router = useRouter();
  const {
    messages,
    scenario,
    isLoading,
    setScenario,
    addMessage,
    setLoading,
    clearMessages,
  } = useChatStore();

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    startListening,
    stopListening,
    isListening,
    transcript,
    setTranscript,
  } = useSpeech({ lang: "en-US" });

  const timer = useTimer();

  const [inputText, setInputText] = useState("");
  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  // Get current scenario info
  const currentScenario = SCENARIOS.find((s) => s.key === scenario) || SCENARIOS[0];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Send initial greeting when scenario changes or on first mount
  useEffect(() => {
    if (hasInitialized.current && messages.length > 0) return;
    hasInitialized.current = true;

    const greeting = SCENARIO_GREETINGS[scenario];
    clearMessages();
    setTimeout(() => {
      addMessage("assistant", greeting.content, greeting.translation);
      timer.start();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scenario change
  const handleScenarioChange = useCallback(
    (newScenario: ChatScenario) => {
      setShowScenarioDropdown(false);
      if (newScenario === scenario) return;

      stopSpeaking();
      setScenario(newScenario);
      timer.reset();

      const greeting = SCENARIO_GREETINGS[newScenario];
      setTimeout(() => {
        addMessage("assistant", greeting.content, greeting.translation);
        timer.start();
      }, 300);
    },
    [scenario, setScenario, addMessage, timer, stopSpeaking]
  );

  // Handle transcript from speech recognition
  useEffect(() => {
    if (transcript && !isListening) {
      setInputText(transcript);
      setTranscript("");
      // Auto-send after speech recognition ends
      handleSendMessage(transcript);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  // Send message handler
  const handleSendMessage = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText || inputText).trim();
      if (!text || isLoading) return;

      setInputText("");

      // Capture history BEFORE adding user message (so current msg isn't duplicated)
      const historySnapshot = useChatStore.getState().messages;

      addMessage("user", text);
      setLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            scenario,
            history: historySnapshot,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          if (response.status === 503) {
            addMessage(
              "assistant",
              "Sorry, the AI service is not configured yet. Please set up your GEMINI_API_KEY to enable AI conversations.",
              "Xin lỗi, dịch vụ AI chưa được cấu hình. Vui lòng thiết lập GEMINI_API_KEY để kích hoạt hội thoại AI."
            );
            return;
          }
          throw new Error(errorData?.error || "API request failed");
        }

        const data = await response.json();
        addMessage(
          "assistant",
          data.message,
          data.translation,
          data.feedback
        );
      } catch {
        addMessage(
          "assistant",
          "I'm having trouble connecting right now. Please check your internet connection and try again.",
          "Tôi đang gặp sự cố kết nối. Vui lòng kiểm tra kết nối mạng và thử lại."
        );
      } finally {
        setLoading(false);
      }
    },
    [inputText, isLoading, scenario, addMessage, setLoading]
  );

  // Toggle microphone
  const handleMicToggle = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      setInputText("");
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Handle key press in input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle close/exit chat
  const handleClose = () => {
    stopSpeaking();
    timer.stop();
    clearMessages();
    router.back();
  };

  return (
    <div className="flex h-screen flex-col bg-dark">
      {/* ==================== Header ==================== */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 flex items-center justify-between border-b border-gray-800/50 bg-dark px-4 py-3"
      >
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-dark-elevated"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>

        <div className="flex items-center gap-2">
          <MascotAvatar size="sm" mood={isSpeaking ? "speaking" : "happy"} animate={false} />
          <h1 className="text-h3 text-white">AI Tutor</h1>
          <div className="flex items-center gap-1 rounded-md bg-dark-elevated px-2 py-0.5">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-small font-mono text-gray-400">
              {timer.formatted}
            </span>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-dark-elevated"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </motion.header>

      {/* ==================== Scenario + Speed Bar ==================== */}
      <div className="relative z-10 border-b border-gray-800/50 bg-dark px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScenarioDropdown(!showScenarioDropdown)}
            className="flex flex-1 items-center justify-between rounded-lg bg-dark-card px-3 py-2 transition-colors hover:bg-dark-elevated"
          >
            <div className="flex items-center gap-2">
              <span className="text-body">{currentScenario.icon}</span>
              <span className="text-body font-semibold text-white">
                {currentScenario.label}
              </span>
            </div>
            <motion.div
              animate={{ rotate: showScenarioDropdown ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </motion.div>
          </button>

          {/* Speed pill */}
          <SpeedPill />
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {showScenarioDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 right-4 top-full mt-1 overflow-hidden rounded-lg border border-gray-800/50 bg-dark-card shadow-lg shadow-black/40"
            >
              {SCENARIOS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => handleScenarioChange(s.key)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-dark-elevated",
                    scenario === s.key && "bg-primary/10"
                  )}
                >
                  <span className="text-body">{s.icon}</span>
                  <div>
                    <p
                      className={cn(
                        "text-body font-semibold",
                        scenario === s.key ? "text-primary" : "text-white"
                      )}
                    >
                      {s.label}
                    </p>
                    <p className="text-small text-gray-500">{s.description}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== Message List ==================== */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        onClick={() => setShowScenarioDropdown(false)}
      >
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onSpeak={speak}
                isSpeaking={isSpeaking}
              />
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 justify-start"
            >
              <MascotAvatar size="sm" mood="thinking" animate={false} />
              <div className="rounded-lg rounded-bl-sm border border-gray-800/50 bg-dark-card">
                <BouncingDots />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ==================== Listening Indicator ==================== */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-center gap-2 border-t border-gray-800/50 bg-dark-card px-4 py-2"
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-status-error"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-small text-gray-400">
              Đang nghe... Hãy nói gì đó
            </span>
            {transcript && (
              <span className="ml-2 text-small text-white italic">
                &ldquo;{transcript}&rdquo;
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== Input Area ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="border-t border-gray-800/50 bg-dark px-4 py-3"
      >
        <div className="flex items-center gap-2">
          {/* Microphone button */}
          <button
            onClick={handleMicToggle}
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
              isListening
                ? "bg-status-error text-white"
                : "bg-dark-elevated text-gray-400 hover:text-white"
            )}
          >
            {/* Pulsing ring when recording */}
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-status-error"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <Mic className="h-5 w-5" />
          </button>

          {/* Text input */}
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={isListening ? transcript : inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              disabled={isListening}
              className="w-full rounded-lg border border-gray-800/50 bg-dark-card px-4 py-2.5 text-body text-white placeholder-gray-500 outline-none transition-colors focus:border-primary/50"
            />
          </div>

          {/* Send button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSendMessage()}
            disabled={(!inputText.trim() && !isListening) || isLoading}
            className="h-10 w-10 shrink-0 !rounded-full !p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Safe area spacer for mobile */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </motion.div>
    </div>
  );
}
