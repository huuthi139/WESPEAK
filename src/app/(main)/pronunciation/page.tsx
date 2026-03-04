"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Volume2,
  Mic,
  MicOff,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Headphones,
  Target,
  AlertTriangle,
  TrendingUp,
  Play,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useSpeech } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────
type PracticeMode = "read" | "listen" | "problem" | null;

interface PhonemeResult {
  phoneme: string;
  expected: string;
  actual: string;
  status: "correct" | "close" | "wrong";
}

interface PracticeWord {
  word: string;
  phonetic: string;
  meaning: string;
  exampleSentence: string;
  exampleTranslation: string;
  phonemeResults: PhonemeResult[];
  tip: string;
}

interface ProblemSound {
  phoneme: string;
  description: string;
  errorCount: number;
  totalAttempts: number;
  exampleWords: string[];
}

// ─── Mock Data ───────────────────────────────────────────────────────
const practiceWords: PracticeWord[] = [
  {
    word: "technology",
    phonetic: "/tekˈnɒlədʒi/",
    meaning: "Công nghệ",
    exampleSentence: "Technology is changing the world.",
    exampleTranslation: "Công nghệ đang thay đổi thế giới.",
    phonemeResults: [
      { phoneme: "/t/", expected: "/t/", actual: "/t/", status: "correct" },
      { phoneme: "/e/", expected: "/e/", actual: "/ɪ/", status: "close" },
      { phoneme: "/k/", expected: "/k/", actual: "/k/", status: "correct" },
      { phoneme: "/n/", expected: "/n/", actual: "/n/", status: "correct" },
      { phoneme: "/ɒ/", expected: "/ɒ/", actual: "/ɔ/", status: "close" },
      { phoneme: "/l/", expected: "/l/", actual: "/l/", status: "correct" },
      { phoneme: "/dʒ/", expected: "/dʒ/", actual: "-", status: "wrong" },
      { phoneme: "/i/", expected: "/i/", actual: "/i/", status: "correct" },
    ],
    tip: "Âm /dʒ/: Đặt đầu lưỡi chạm phía sau răng trên, phát âm giống chữ 'gi' trong 'giờ'.",
  },
  {
    word: "through",
    phonetic: "/θruː/",
    meaning: "Xuyên qua",
    exampleSentence: "We walked through the park.",
    exampleTranslation: "Chúng tôi đi bộ xuyên qua công viên.",
    phonemeResults: [
      { phoneme: "/θ/", expected: "/θ/", actual: "/t/", status: "wrong" },
      { phoneme: "/r/", expected: "/r/", actual: "/r/", status: "correct" },
      { phoneme: "/uː/", expected: "/uː/", actual: "/uː/", status: "correct" },
    ],
    tip: "Âm /θ/: Đặt đầu lưỡi giữa hai hàm răng, thổi hơi nhẹ. Không phải âm /t/!",
  },
  {
    word: "weather",
    phonetic: "/ˈweðər/",
    meaning: "Thời tiết",
    exampleSentence: "The weather is nice today.",
    exampleTranslation: "Thời tiết hôm nay đẹp.",
    phonemeResults: [
      { phoneme: "/w/", expected: "/w/", actual: "/w/", status: "correct" },
      { phoneme: "/e/", expected: "/e/", actual: "/e/", status: "correct" },
      { phoneme: "/ð/", expected: "/ð/", actual: "/d/", status: "wrong" },
      { phoneme: "/ər/", expected: "/ər/", actual: "/ə/", status: "close" },
    ],
    tip: "Âm /ð/: Giống /θ/ nhưng có rung dây thanh. Đặt lưỡi giữa răng và phát âm có tiếng.",
  },
  {
    word: "beautiful",
    phonetic: "/ˈbjuːtɪfəl/",
    meaning: "Xinh đẹp",
    exampleSentence: "What a beautiful day!",
    exampleTranslation: "Thật là một ngày đẹp!",
    phonemeResults: [
      { phoneme: "/b/", expected: "/b/", actual: "/b/", status: "correct" },
      { phoneme: "/juː/", expected: "/juː/", actual: "/juː/", status: "correct" },
      { phoneme: "/t/", expected: "/t/", actual: "/t/", status: "correct" },
      { phoneme: "/ɪ/", expected: "/ɪ/", actual: "/i/", status: "close" },
      { phoneme: "/f/", expected: "/f/", actual: "/f/", status: "correct" },
      { phoneme: "/əl/", expected: "/əl/", actual: "/əl/", status: "correct" },
    ],
    tip: "Âm /ɪ/: Mở miệng hẹp hơn /i/, lưỡi hơi thấp hơn. Giống âm 'i' ngắn.",
  },
  {
    word: "comfortable",
    phonetic: "/ˈkʌmftəbəl/",
    meaning: "Thoải mái",
    exampleSentence: "This chair is very comfortable.",
    exampleTranslation: "Cái ghế này rất thoải mái.",
    phonemeResults: [
      { phoneme: "/k/", expected: "/k/", actual: "/k/", status: "correct" },
      { phoneme: "/ʌ/", expected: "/ʌ/", actual: "/ʌ/", status: "correct" },
      { phoneme: "/m/", expected: "/m/", actual: "/m/", status: "correct" },
      { phoneme: "/f/", expected: "/f/", actual: "/p/", status: "wrong" },
      { phoneme: "/t/", expected: "/t/", actual: "/t/", status: "correct" },
      { phoneme: "/ə/", expected: "/ə/", actual: "/ə/", status: "correct" },
      { phoneme: "/b/", expected: "/b/", actual: "/b/", status: "correct" },
      { phoneme: "/əl/", expected: "/əl/", actual: "/əl/", status: "correct" },
    ],
    tip: "Chú ý: chỉ có 3 âm tiết 'KUMF-ter-bul', không phải 4 âm tiết!",
  },
];

const problemSounds: ProblemSound[] = [
  {
    phoneme: "/θ/",
    description: "Âm 'th' vô thanh",
    errorCount: 12,
    totalAttempts: 15,
    exampleWords: ["think", "through", "three"],
  },
  {
    phoneme: "/ð/",
    description: "Âm 'th' hữu thanh",
    errorCount: 9,
    totalAttempts: 14,
    exampleWords: ["this", "weather", "brother"],
  },
  {
    phoneme: "/dʒ/",
    description: "Âm 'j' / 'ge'",
    errorCount: 7,
    totalAttempts: 12,
    exampleWords: ["technology", "judge", "age"],
  },
  {
    phoneme: "/ɪ/",
    description: "Âm 'i' ngắn",
    errorCount: 5,
    totalAttempts: 18,
    exampleWords: ["sit", "bit", "beautiful"],
  },
  {
    phoneme: "/f/",
    description: "Âm 'f'",
    errorCount: 4,
    totalAttempts: 16,
    exampleWords: ["comfortable", "life", "fifty"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────
function getStatusIcon(status: PhonemeResult["status"]) {
  switch (status) {
    case "correct":
      return "✅";
    case "close":
      return "🟡";
    case "wrong":
      return "❌";
  }
}

function getStatusColor(status: PhonemeResult["status"]) {
  switch (status) {
    case "correct":
      return "text-status-success";
    case "close":
      return "text-status-warning";
    case "wrong":
      return "text-status-error";
  }
}

// ─── Animation Variants ─────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Score Ring Component ────────────────────────────────────────────
function ScoreRing({ score, size = 100 }: { score: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 85
      ? "#10B981"
      : score >= 70
        ? "#F59E0B"
        : "#EF4444";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          {score}%
        </motion.span>
        <span className="text-[10px] text-slate-400 mt-0.5">Điểm số</span>
      </div>
    </div>
  );
}

// ─── Waveform Animation ─────────────────────────────────────────────
function WaveformBars({ active }: { active: boolean }) {
  const barCount = 20;
  return (
    <div className="flex items-center justify-center gap-[3px] h-10 my-3">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-primary"
          animate={
            active
              ? {
                  height: [8, 24 + Math.random() * 16, 8],
                  opacity: [0.4, 1, 0.4],
                }
              : { height: 4, opacity: 0.2 }
          }
          transition={
            active
              ? {
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: i * 0.04,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// ─── Mode Selection Card ─────────────────────────────────────────────
function ModeCard({
  icon,
  title,
  description,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <Card onClick={onClick} className="relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0",
            color
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-h3 font-semibold text-white mb-1">{title}</h3>
          <p className="text-small text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
        <ChevronRight size={20} className="text-slate-500 mt-1 shrink-0" />
      </div>
    </Card>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ─── Main Component ─────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════
export default function PronunciationPage() {
  const [mode, setMode] = useState<PracticeMode>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [mockScore] = useState(85);

  const { speak, startListening, stopListening, isListening } = useSpeech({
    lang: "en-US",
  });

  const current = practiceWords[currentIndex];

  // Calculate overall score from phoneme results
  const overallScore = hasResult ? mockScore : 0;

  // ─── Handlers ───────────────────────────────────────────────────
  const handleRecord = useCallback(() => {
    if (isRecording || isListening) {
      stopListening();
      setIsRecording(false);
      // Simulate processing delay then show results
      setTimeout(() => {
        setHasResult(true);
      }, 600);
    } else {
      setHasResult(false);
      setIsRecording(true);
      startListening();
      // Auto-stop after 4 seconds
      setTimeout(() => {
        stopListening();
        setIsRecording(false);
        setTimeout(() => {
          setHasResult(true);
        }, 600);
      }, 4000);
    }
  }, [isRecording, isListening, startListening, stopListening]);

  const handleRetry = () => {
    setHasResult(false);
    setIsRecording(false);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % practiceWords.length);
    setHasResult(false);
    setIsRecording(false);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (i) => (i - 1 + practiceWords.length) % practiceWords.length
    );
    setHasResult(false);
    setIsRecording(false);
  };

  const handleBackToModes = () => {
    setMode(null);
    setCurrentIndex(0);
    setHasResult(false);
    setIsRecording(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  // ─── Mode Selection View ────────────────────────────────────────
  if (mode === null) {
    return (
      <div className="px-4 py-4 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/">
            <ChevronLeft size={24} className="text-slate-400" />
          </Link>
          <h1 className="text-h2 font-bold text-white">Luyện phát âm</h1>
        </div>
        <p className="text-small text-slate-400 mb-6 ml-9">
          Chọn chế độ luyện tập phù hợp với bạn
        </p>

        {/* Stats Overview */}
        <motion.div
          className="glass-3d glass-shine rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">127</p>
              <p className="text-[11px] text-slate-400">Từ đã luyện</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">78%</p>
              <p className="text-[11px] text-slate-400">Điểm TB</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent-streak">5</p>
              <p className="text-[11px] text-slate-400">Âm cần cải thiện</p>
            </div>
          </div>
        </motion.div>

        {/* Mode Cards */}
        <motion.div
          className="space-y-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <ModeCard
              icon={<span>📖</span>}
              title="Đọc theo"
              description="Đọc to các từ và câu, nhận điểm phát âm chi tiết từng âm"
              onClick={() => setMode("read")}
              color="bg-primary/20"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ModeCard
              icon={<span>🔊</span>}
              title="Nghe & Lặp lại"
              description="Nghe phát âm chuẩn, sau đó lặp lại và so sánh kết quả"
              onClick={() => setMode("listen")}
              color="bg-secondary/20"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ModeCard
              icon={<span>🎯</span>}
              title="Âm khó"
              description="Tập trung luyện những âm bạn hay phát âm sai nhất"
              onClick={() => setMode("problem")}
              color="bg-accent-streak/20"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ─── Problem Sounds Dashboard ───────────────────────────────────
  if (mode === "problem") {
    return (
      <div className="px-4 py-4 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button onClick={handleBackToModes}>
            <ChevronLeft size={24} className="text-slate-400" />
          </button>
          <div>
            <h1 className="text-h2 font-bold text-white flex items-center gap-2">
              <Target size={20} className="text-accent-streak" />
              Âm khó
            </h1>
          </div>
        </div>
        <p className="text-small text-slate-400 mb-6 ml-9">
          Những âm bạn cần luyện tập thêm
        </p>

        {/* Problem sounds list */}
        <motion.div
          className="space-y-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {problemSounds.map((sound, idx) => {
            const accuracy = Math.round(
              ((sound.totalAttempts - sound.errorCount) / sound.totalAttempts) *
                100
            );
            const barColor =
              accuracy >= 70
                ? "bg-status-warning"
                : "bg-status-error";

            return (
              <motion.div key={sound.phoneme} variants={fadeUp}>
                <Card className="!p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center">
                      <span className="text-lg font-mono font-bold text-white">
                        {sound.phoneme}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-body font-semibold text-white">
                          {sound.description}
                        </span>
                        <span
                          className={cn(
                            "text-small font-bold",
                            accuracy >= 70
                              ? "text-status-warning"
                              : "text-status-error"
                          )}
                        >
                          {accuracy}%
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", barColor)}
                          initial={{ width: 0 }}
                          animate={{ width: `${accuracy}%` }}
                          transition={{ delay: idx * 0.1 + 0.3, duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between ml-[60px]">
                    <div className="flex gap-2">
                      {sound.exampleWords.map((w) => (
                        <button
                          key={w}
                          onClick={() => speak(w)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] text-[11px] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                        >
                          <Volume2 size={10} />
                          {w}
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {sound.errorCount} lỗi / {sound.totalAttempts} lần
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Practice All button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => {
              setMode("read");
              setCurrentIndex(0);
            }}
          >
            <Play size={18} className="mr-2" />
            Luyện tất cả
          </Button>
        </motion.div>

        {/* Tip card */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="!bg-primary/[0.06] border border-primary/20">
            <div className="flex gap-3">
              <AlertTriangle
                size={18}
                className="text-primary shrink-0 mt-0.5"
              />
              <div>
                <p className="text-small text-slate-300">
                  Người Việt thường gặp khó khăn với âm /θ/ và /ð/ vì
                  tiếng Việt không có các âm này. Hãy luyện tập mỗi ngày!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ─── Practice Mode (read / listen) ─────────────────────────────
  const modeLabel = mode === "read" ? "Đọc theo" : "Nghe & Lặp lại";
  const ModeIcon = mode === "read" ? BookOpen : Headphones;

  return (
    <div className="px-4 py-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={handleBackToModes}>
          <ChevronLeft size={24} className="text-slate-400" />
        </button>
        <div className="flex-1">
          <h1 className="text-h3 font-bold text-white flex items-center gap-2">
            <ModeIcon size={18} className="text-primary" />
            {modeLabel}
          </h1>
        </div>
        {/* Progress indicator */}
        <div className="flex items-center gap-1.5">
          {practiceWords.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "bg-primary w-5"
                  : i < currentIndex
                    ? "bg-primary/40"
                    : "bg-white/10"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        >
          {/* Word Display Card */}
          <Card className="glass-3d-heavy glass-shine text-center py-6 px-5 mb-4">
            {/* Word counter */}
            <p className="text-[11px] text-slate-500 mb-3">
              {currentIndex + 1} / {practiceWords.length}
            </p>

            {/* Main word */}
            <h2 className="text-3xl font-bold tracking-wide text-white mb-2">
              {current.word}
            </h2>

            {/* IPA Phonetic */}
            <p className="text-body text-secondary font-mono mb-1">
              {current.phonetic}
            </p>

            {/* Vietnamese meaning */}
            <p className="text-small text-slate-400 mb-4">{current.meaning}</p>

            {/* Example sentence */}
            <div className="bg-white/[0.04] rounded-xl p-3 mb-4 text-left">
              <p className="text-body text-slate-200 italic mb-0.5">
                &ldquo;{current.exampleSentence}&rdquo;
              </p>
              <p className="text-small text-slate-500">
                {current.exampleTranslation}
              </p>
            </div>

            {/* Audio Speed Controls */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => speak(current.word, 0.6)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] text-small text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all active:scale-95"
              >
                <Volume2 size={14} />
                Nghe chậm
              </button>
              <button
                onClick={() => speak(current.word, 1.0)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/20 text-small text-primary hover:bg-primary/30 transition-all active:scale-95"
              >
                <Volume2 size={14} />
                Nghe chuẩn
              </button>
              <button
                onClick={() => speak(current.word, 1.4)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] text-small text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all active:scale-95"
              >
                <Volume2 size={14} />
                Nghe nhanh
              </button>
            </div>
          </Card>

          {/* Listen mode: auto-play instruction */}
          {mode === "listen" && !hasResult && !isRecording && (
            <motion.p
              className="text-center text-small text-slate-400 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Nhấn &quot;Nghe chuẩn&quot; trước, sau đó ghi âm giọng của bạn
            </motion.p>
          )}

          {/* Waveform + Recording indicator */}
          <WaveformBars active={isRecording} />

          {/* Microphone Button */}
          <div className="flex flex-col items-center mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRecord}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 relative",
                isRecording
                  ? "bg-status-error shadow-lg shadow-status-error/40"
                  : "bg-primary-gradient shadow-glow btn-3d"
              )}
            >
              {/* Pulse rings when recording */}
              {isRecording && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-status-error/50"
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-status-error/30"
                    animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.3,
                    }}
                  />
                </>
              )}
              {isRecording ? (
                <MicOff size={32} className="text-white relative z-10" />
              ) : (
                <Mic size={32} className="text-white relative z-10" />
              )}
            </motion.button>
            <p className="text-small text-slate-500 mt-3">
              {isRecording
                ? "Đang ghi âm... Nhấn để dừng"
                : hasResult
                  ? "Nhấn để ghi âm lại"
                  : "Nhấn để ghi âm"}
            </p>
          </div>

          {/* ─── Results Panel ──────────────────────────────────────── */}
          <AnimatePresence>
            {hasResult && (
              <motion.div
                variants={slideUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: 20 }}
              >
                {/* Score Card */}
                <Card className="glass-3d-heavy mb-4">
                  <div className="flex items-center gap-5">
                    {/* Score Ring */}
                    <ScoreRing score={overallScore} size={96} />

                    <div className="flex-1">
                      <p className="text-h3 font-bold text-white mb-1">
                        {overallScore >= 85
                          ? "Tuyệt vời! 🎉"
                          : overallScore >= 70
                            ? "Khá tốt! 👍"
                            : "Cần cải thiện 💪"}
                      </p>
                      <p className="text-small text-slate-400 leading-relaxed">
                        {overallScore >= 85
                          ? "Phát âm rất chuẩn. Tiếp tục phát huy!"
                          : overallScore >= 70
                            ? "Gần đúng rồi. Chú ý một vài âm nhé."
                            : "Hãy nghe lại và thử lần nữa."}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Phoneme Breakdown */}
                <Card className="glass-3d mb-4">
                  <h4 className="text-small font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
                    <TrendingUp size={14} />
                    Phân tích từng âm
                  </h4>

                  {/* Table header */}
                  <div className="grid grid-cols-[1fr_1fr_1fr_40px] gap-2 px-2 mb-2">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Âm
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Chuẩn
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Bạn
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium text-center">
                      Kết quả
                    </span>
                  </div>

                  {/* Phoneme rows */}
                  <motion.div
                    className="space-y-1"
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                  >
                    {current.phonemeResults.map((pr, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className={cn(
                          "grid grid-cols-[1fr_1fr_1fr_40px] gap-2 px-2 py-1.5 rounded-lg",
                          pr.status === "wrong"
                            ? "bg-status-error/[0.08]"
                            : pr.status === "close"
                              ? "bg-status-warning/[0.06]"
                              : "bg-white/[0.02]"
                        )}
                      >
                        <span className="text-small font-mono text-slate-300">
                          {pr.phoneme}
                        </span>
                        <span className="text-small font-mono text-slate-400">
                          {pr.expected}
                        </span>
                        <span
                          className={cn(
                            "text-small font-mono font-semibold",
                            getStatusColor(pr.status)
                          )}
                        >
                          {pr.actual}
                        </span>
                        <span className="text-center text-small">
                          {getStatusIcon(pr.status)}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </Card>

                {/* Tip Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="!bg-primary/[0.06] border border-primary/20 mb-4">
                    <div className="flex gap-3">
                      <span className="text-lg shrink-0">💡</span>
                      <p className="text-small text-slate-300 leading-relaxed">
                        {current.tip}
                      </p>
                    </div>
                  </Card>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleRetry}
                    className="flex-1"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Thử lại
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Tiếp theo
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation when no result */}
          {!hasResult && (
            <div className="flex gap-3 mt-2">
              <Button
                variant="ghost"
                onClick={handlePrev}
                className="flex-1"
              >
                ← Trước
              </Button>
              <Button
                variant="ghost"
                onClick={handleNext}
                className="flex-1"
              >
                Tiếp →
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
