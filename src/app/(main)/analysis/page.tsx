"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mic,
  Music,
  Zap,
  BookOpen,
  Languages,
  ChevronRight,
  CheckCircle2,
  Star,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ── Mock Data ──────────────────────────────────────────────

const SCORES = {
  pronunciation: 82,
  intonation: 75,
  fluency: 80,
  grammar: 70,
  vocabulary: 68,
};

const OVERALL_SCORE = 78;
const LEVEL_BADGE = "B1";

const TABS = [
  { key: "pronunciation", label: "Phát âm", icon: Mic },
  { key: "intonation", label: "Ngữ điệu", icon: Music },
  { key: "fluency", label: "Lưu loát", icon: Zap },
  { key: "grammar", label: "Ngữ pháp", icon: BookOpen },
  { key: "vocabulary", label: "Từ vựng", icon: Languages },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// ── Radar Chart ────────────────────────────────────────────

function RadarChart() {
  const labels = ["Phát âm", "Ngữ điệu", "Lưu loát", "Ngữ pháp", "Từ vựng"];
  const values = [
    SCORES.pronunciation,
    SCORES.intonation,
    SCORES.fluency,
    SCORES.grammar,
    SCORES.vocabulary,
  ];

  const cx = 150;
  const cy = 150;
  const maxR = 100;
  const levels = [25, 50, 75, 100];
  const angleOffset = -Math.PI / 2; // start from top

  function getPoint(index: number, value: number) {
    const angle = (2 * Math.PI * index) / 5 + angleOffset;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  function polygonPoints(value: number) {
    return Array.from({ length: 5 })
      .map((_, i) => {
        const p = getPoint(i, value);
        return `${p.x},${p.y}`;
      })
      .join(" ");
  }

  const dataPoints = polygonPoints(0); // for animation start
  const dataPointsFinal = values
    .map((v, i) => {
      const p = getPoint(i, v);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div className="flex justify-center py-4">
      <svg viewBox="0 0 300 300" className="w-[280px] h-[280px]">
        {/* Grid levels */}
        {levels.map((level) => (
          <polygon
            key={level}
            points={polygonPoints(level)}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const p = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          initial={{ points: dataPoints }}
          animate={{ points: dataPointsFinal }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          fill="rgba(139,92,246,0.25)"
          stroke="#8B5CF6"
          strokeWidth="2"
        />

        {/* Data points (dots) */}
        {values.map((v, i) => {
          const p = getPoint(i, v);
          return (
            <motion.circle
              key={i}
              initial={{ cx: cx, cy: cy, r: 0 }}
              animate={{ cx: p.x, cy: p.y, r: 4 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
              fill="#8B5CF6"
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const p = getPoint(i, 125);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9CA3AF"
              fontSize="11"
              fontWeight="500"
            >
              {label}
            </text>
          );
        })}

        {/* Score values */}
        {values.map((v, i) => {
          const p = getPoint(i, 112);
          return (
            <text
              key={`val-${i}`}
              x={p.x}
              y={p.y + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#8B5CF6"
              fontSize="10"
              fontWeight="700"
            >
              {v}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ── Score Ring ──────────────────────────────────────────────

function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return "#10B981";
    if (s >= 60) return "#F59E0B";
    return "#EF4444";
  };

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
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{score}</span>
        <span className="text-[10px] text-gray-400">/100</span>
      </div>
    </div>
  );
}

// ── Tab Content Components ─────────────────────────────────

function PronunciationTab() {
  const sounds = [
    { sound: "/θ/ (th)", errors: 23 },
    { sound: "/ð/ (the)", errors: 18 },
    { sound: "/r/ vs /l/", errors: 15 },
  ];

  const wrongWords = ["technology", "through", "weather"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex justify-center">
        <ScoreRing score={SCORES.pronunciation} />
      </div>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-orange-400" />
          Các âm cần luyện
        </h3>
        <div className="space-y-2">
          {sounds.map((s) => (
            <div
              key={s.sound}
              className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-purple-400 font-semibold">
                  {s.sound}
                </span>
                <span className="text-xs text-red-400">{s.errors} lỗi</span>
              </div>
              <Button variant="outline" size="sm">
                Luyện tập
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Từ sai nhiều nhất</h3>
        <div className="flex flex-wrap gap-2">
          {wrongWords.map((w) => (
            <span
              key={w}
              className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400"
            >
              {w}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function IntonationTab() {
  const pitchLevels = [
    { label: "Đơn điệu", value: 20 },
    { label: "Trung bình", value: 55 },
    { label: "Tự nhiên", value: 75 },
    { label: "Biểu cảm", value: 90 },
  ];

  const userPitch = 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex justify-center">
        <ScoreRing score={SCORES.intonation} />
      </div>

      <Card className="space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Music className="w-4 h-4 text-cyan-400" />
          Phân bố cao độ giọng nói
        </h3>
        <div className="space-y-2">
          <div className="relative h-8 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-yellow-500/60 via-green-500/60 to-cyan-500/60"
              initial={{ width: 0 }}
              animate={{ width: `${userPitch}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-cyan-400 shadow-lg"
              initial={{ left: 0 }}
              animate={{ left: `calc(${userPitch}% - 8px)` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between">
            {pitchLevels.map((p) => (
              <span
                key={p.label}
                className={cn(
                  "text-[10px]",
                  Math.abs(p.value - userPitch) < 20
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-500"
                )}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Card className="space-y-2">
        <h3 className="text-sm font-semibold text-white">Gợi ý cải thiện</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Thay đổi cao độ giọng nói để tự nhiên hơn. Hãy nhấn mạnh các từ quan
          trọng trong câu và hạ giọng ở cuối câu trần thuật.
        </p>
        <Button variant="outline" size="sm" className="mt-2">
          Xem bài luyện
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </Card>
    </motion.div>
  );
}

function FluencyTab() {
  const fillerWords = [
    { word: "uhh", count: 42 },
    { word: "hmm", count: 28 },
    { word: "like", count: 15 },
  ];

  const wpm = 111;
  const idealMin = 120;
  const idealMax = 150;
  const maxWpm = 200;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex justify-center">
        <ScoreRing score={SCORES.fluency} />
      </div>

      <Card className="space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          Tốc độ nói
        </h3>
        <div className="flex items-end justify-center gap-2">
          <span className="text-4xl font-bold text-white">{wpm}</span>
          <span className="text-sm text-gray-400 pb-1">WPM</span>
        </div>
        <div className="space-y-1.5">
          <div className="relative h-6 rounded-full bg-white/[0.04] overflow-hidden">
            {/* Ideal range indicator */}
            <div
              className="absolute inset-y-0 bg-green-500/15 border-x border-green-500/30"
              style={{
                left: `${(idealMin / maxWpm) * 100}%`,
                width: `${((idealMax - idealMin) / maxWpm) * 100}%`,
              }}
            />
            {/* User position */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-400 shadow-lg"
              initial={{ left: 0 }}
              animate={{ left: `calc(${(wpm / maxWpm) * 100}% - 6px)` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>Chậm</span>
            <span className="text-green-400">Lý tưởng (120-150)</span>
            <span>Nhanh</span>
          </div>
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Từ lấp đầy (filler words)</h3>
        <div className="space-y-2">
          {fillerWords.map((f) => (
            <div
              key={f.word}
              className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2.5"
            >
              <span className="text-sm font-mono text-orange-400 font-semibold">
                &quot;{f.word}&quot;
              </span>
              <span className="text-xs text-gray-400">{f.count} lần</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function GrammarTab() {
  const mastered = [
    { grammar: "Present simple", status: "done" },
    { grammar: "Past simple", status: "done" },
    { grammar: "Basic questions", status: "done" },
  ];

  const toExpand = [
    { grammar: "Conditionals", status: "expand" },
    { grammar: "Relative clauses", status: "expand" },
  ];

  const recentErrors = [
    { wrong: "I go yesterday", correct: "I went yesterday" },
    { wrong: "She have two cat", correct: "She has two cats" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex justify-center">
        <ScoreRing score={SCORES.grammar} />
      </div>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          Đã dùng tốt
        </h3>
        <div className="space-y-1.5">
          {mastered.map((g) => (
            <div
              key={g.grammar}
              className="flex items-center gap-2 rounded-lg bg-green-500/[0.06] px-3 py-2 text-sm text-green-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              {g.grammar}
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          Cần mở rộng
        </h3>
        <div className="space-y-1.5">
          {toExpand.map((g) => (
            <div
              key={g.grammar}
              className="flex items-center gap-2 rounded-lg bg-yellow-500/[0.06] px-3 py-2 text-sm text-yellow-400"
            >
              <Star className="w-4 h-4" />
              {g.grammar}
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          Lỗi gần đây
        </h3>
        <div className="space-y-2">
          {recentErrors.map((e, i) => (
            <div
              key={i}
              className="rounded-lg bg-white/[0.04] px-3 py-2.5 space-y-1"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="line-through text-red-400">{e.wrong}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ArrowRight className="w-3 h-3 text-green-400" />
                <span className="text-green-400 font-medium">{e.correct}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function VocabularyTab() {
  const cefrData = [
    { level: "A1", percent: 57, color: "#10B981" },
    { level: "A2", percent: 12, color: "#22D3EE" },
    { level: "B1", percent: 23, color: "#8B5CF6" },
    { level: "B2", percent: 8, color: "#F59E0B" },
  ];

  const suggestions = [
    { basic: "use", advanced: ["apply", "utilize"] },
    { basic: "good", advanced: ["excellent", "outstanding"] },
    { basic: "big", advanced: ["enormous", "substantial"] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex justify-center">
        <ScoreRing score={SCORES.vocabulary} />
      </div>

      <Card className="space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Languages className="w-4 h-4 text-cyan-400" />
          Phân bố theo CEFR
        </h3>
        <div className="space-y-2.5">
          {cefrData.map((d) => (
            <div key={d.level} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">{d.level}</span>
                <span className="text-gray-400">{d.percent}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: d.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${d.percent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Gợi ý mở rộng</h3>
        <div className="space-y-2">
          {suggestions.map((s) => (
            <div
              key={s.basic}
              className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2.5"
            >
              <span className="text-sm text-gray-400 font-mono">
                &quot;{s.basic}&quot;
              </span>
              <ArrowRight className="w-3 h-3 text-gray-500 flex-shrink-0" />
              <div className="flex flex-wrap gap-1.5">
                {s.advanced.map((a) => (
                  <span
                    key={a}
                    className="rounded-md bg-purple-500/15 border border-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-400"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("pronunciation");
  const router = useRouter();

  const tabContent: Record<TabKey, React.ReactNode> = {
    pronunciation: <PronunciationTab />,
    intonation: <IntonationTab />,
    fluency: <FluencyTab />,
    grammar: <GrammarTab />,
    vocabulary: <VocabularyTab />,
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0F0F1A]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg p-1.5 hover:bg-white/[0.06] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-lg font-bold text-white">Phân tích chi tiết</h1>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="relative">
            <ScoreRing score={OVERALL_SCORE} size={140} strokeWidth={10} />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-400">Trình độ hiện tại</span>
            <span className="rounded-md bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 text-xs font-bold text-purple-400">
              {LEVEL_BADGE}
            </span>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <Card animated={false} className="!p-2">
          <RadarChart />
        </Card>

        {/* Tab Navigation */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap",
                    isActive
                      ? "bg-primary-gradient text-white shadow-glow"
                      : "bg-white/[0.06] text-gray-400 hover:bg-white/[0.1]"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Content */}
        <AnimatePresence mode="wait">
          <div key={activeTab}>{tabContent[activeTab]}</div>
        </AnimatePresence>
      </div>
    </div>
  );
}
