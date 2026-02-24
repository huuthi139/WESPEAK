"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Volume2, Mic, RotateCcw } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const words = [
  {
    word: "BEAUTIFUL",
    phonetic: "/ˈbjuːtɪfəl/",
    meaning: "Xinh đẹp",
    phonemes: [
      { sound: "/b/", score: 95 },
      { sound: "/juː/", score: 72 },
      { sound: "/t/", score: 88 },
      { sound: "/ɪ/", score: 92 },
      { sound: "/f/", score: 58 },
      { sound: "/əl/", score: 85 },
    ],
    tip: "Âm /f/: Đặt răng trên lên môi dưới, thổi hơi nhẹ",
  },
  {
    word: "OPPORTUNITY",
    phonetic: "/ˌɑːpərˈtuːnəti/",
    meaning: "Cơ hội",
    phonemes: [
      { sound: "/ɑː/", score: 80 },
      { sound: "/p/", score: 90 },
      { sound: "/ər/", score: 65 },
      { sound: "/tuː/", score: 88 },
      { sound: "/nə/", score: 92 },
      { sound: "/ti/", score: 85 },
    ],
    tip: "Âm /ər/: Cuộn lưỡi nhẹ, giống âm 'ơ' trong tiếng Việt",
  },
  {
    word: "COMFORTABLE",
    phonetic: "/ˈkʌmftəbəl/",
    meaning: "Thoải mái",
    phonemes: [
      { sound: "/k/", score: 95 },
      { sound: "/ʌm/", score: 78 },
      { sound: "/f/", score: 82 },
      { sound: "/tə/", score: 90 },
      { sound: "/bəl/", score: 70 },
    ],
    tip: "Chú ý: chỉ có 3 âm tiết, không phải 4. Đọc 'KUMF-ter-bul'",
  },
];

function getScoreColor(score: number) {
  if (score >= 85) return "text-status-success";
  if (score >= 70) return "text-status-warning";
  return "text-status-error";
}

function getScoreBarColor(score: number) {
  if (score >= 85) return "bg-status-success";
  if (score >= 70) return "bg-status-warning";
  return "bg-status-error";
}

function getScoreIcon(score: number) {
  if (score >= 85) return "✅";
  if (score >= 70) return "⚠️";
  return "❌";
}

export default function PronunciationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const current = words[currentIndex];
  const overallScore = hasResult
    ? Math.round(
        current.phonemes.reduce((sum, p) => sum + p.score, 0) /
          current.phonemes.length
      )
    : 0;

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasResult(true);
    } else {
      setIsRecording(true);
      setHasResult(false);
      setTimeout(() => {
        setIsRecording(false);
        setHasResult(true);
      }, 2000);
    }
  };

  const handleNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, words.length - 1));
    setHasResult(false);
  };

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
    setHasResult(false);
  };

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/">
          <ChevronLeft size={24} className="text-gray-400" />
        </Link>
        <h1 className="text-h2 font-bold">Luyện phát âm</h1>
      </div>

      {/* Word Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="text-center py-8 mb-4">
            <h2 className="text-3xl font-bold tracking-wider mb-2">
              {current.word}
            </h2>
            <p className="text-body text-secondary mb-1">{current.phonetic}</p>
            <p className="text-small text-gray-400">{current.meaning}</p>

            <div className="flex justify-center gap-3 mt-6">
              {["Chậm", "Bình thường", "Nhanh"].map((speed) => (
                <button
                  key={speed}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-dark-elevated text-small text-gray-300 hover:text-white transition-colors"
                >
                  <Volume2 size={14} />
                  {speed}
                </button>
              ))}
            </div>
          </Card>

          {/* Record Button */}
          <div className="flex justify-center my-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRecord}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all",
                isRecording
                  ? "bg-status-error animate-pulse shadow-lg shadow-status-error/30"
                  : "bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30"
              )}
            >
              <Mic size={32} className="text-white" />
            </motion.button>
          </div>
          <p className="text-center text-small text-gray-500 mb-4">
            {isRecording ? "Đang ghi âm..." : "Nhấn để ghi âm"}
          </p>

          {/* Results */}
          {hasResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="mb-4">
                <div className="text-center mb-4">
                  <span className={cn("text-4xl font-bold", getScoreColor(overallScore))}>
                    {overallScore}%
                  </span>
                  <div className="flex justify-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={cn(
                          "text-lg",
                          star <= Math.round(overallScore / 20)
                            ? "text-status-warning"
                            : "text-gray-700"
                        )}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="text-small font-semibold text-gray-400 mb-3">
                  📊 Phân tích chi tiết
                </h4>
                <div className="space-y-2">
                  {current.phonemes.map((phoneme, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-small text-gray-300 w-10 font-mono">
                        {phoneme.sound}
                      </span>
                      <div className="flex-1 h-2 bg-dark-elevated rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", getScoreBarColor(phoneme.score))}
                          initial={{ width: 0 }}
                          animate={{ width: `${phoneme.score}%` }}
                          transition={{ delay: i * 0.1 }}
                        />
                      </div>
                      <span className={cn("text-small w-10 text-right", getScoreColor(phoneme.score))}>
                        {phoneme.score}%
                      </span>
                      <span className="text-small">{getScoreIcon(phoneme.score)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="mb-4 border-primary/20 bg-primary/5">
                <p className="text-small">
                  💡 {current.tip}
                </p>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        {hasResult && (
          <Button
            variant="outline"
            fullWidth
            onClick={() => setHasResult(false)}
          >
            <RotateCcw size={16} className="mr-2" />
            Thử lại
          </Button>
        )}
        <div className="flex gap-2 flex-1">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            ← Trước
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            className="flex-1"
          >
            Tiếp →
          </Button>
        </div>
      </div>
    </div>
  );
}
