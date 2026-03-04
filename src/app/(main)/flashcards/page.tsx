"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Volume2, RotateCcw, Check, X } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import VocabIllustration from "@/components/shared/VocabIllustration";
import { useSpeech } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";

const flashcards = [
  { word: "Opportunity", phonetic: "/ˌɑːpərˈtuːnəti/", meaning: "Cơ hội", example: "This is a great opportunity for you." },
  { word: "Environment", phonetic: "/ɪnˈvaɪrənmənt/", meaning: "Môi trường", example: "We need to protect the environment." },
  { word: "Communication", phonetic: "/kəˌmjuːnɪˈkeɪʃən/", meaning: "Giao tiếp", example: "Good communication is essential." },
  { word: "Experience", phonetic: "/ɪkˈspɪriəns/", meaning: "Kinh nghiệm", example: "She has a lot of work experience." },
  { word: "Responsibility", phonetic: "/rɪˌspɑːnsəˈbɪləti/", meaning: "Trách nhiệm", example: "It's your responsibility to finish the task." },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [unknown, setUnknown] = useState<number[]>([]);
  const { speak } = useSpeech({ lang: "en-US" });

  const current = flashcards[currentIndex];
  const total = flashcards.length;
  const reviewed = known.length + unknown.length;

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleKnow = () => {
    setKnown([...known, currentIndex]);
    goNext();
  };

  const handleDontKnow = () => {
    setUnknown([...unknown, currentIndex]);
    goNext();
  };

  const goNext = () => {
    setIsFlipped(false);
    if (currentIndex < total - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnown([]);
    setUnknown([]);
  };

  const isDone = reviewed >= total;

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <ChevronLeft size={24} className="text-slate-400" />
          </Link>
          <h1 className="text-h2 font-bold">Flashcards</h1>
        </div>
        <span className="text-small text-slate-400">
          {Math.min(reviewed + 1, total)}/{total}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-white/[0.06] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${(reviewed / total) * 100}%` }}
        />
      </div>

      {isDone ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <span className="text-5xl mb-4 block">🎉</span>
          <h2 className="text-h1 font-bold mb-2">Hoàn thành!</h2>
          <p className="text-slate-400 mb-6">
            Đã biết: {known.length}/{total} • Cần ôn: {unknown.length}/{total}
          </p>
          <div className="flex gap-3 max-w-xs mx-auto">
            <Button variant="outline" fullWidth onClick={restart}>
              <RotateCcw size={16} className="mr-2" />
              Học lại
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="primary" fullWidth>
                Xong
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Card */}
          <div className="perspective-1000 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${isFlipped}`}
                initial={{ opacity: 0, rotateY: isFlipped ? -90 : 0 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleFlip}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "glass-3d glass-shine rounded-xl border border-slate-800 bg-dark-card p-8 min-h-[280px] flex flex-col items-center justify-center text-center",
                    isFlipped && "border-primary/30"
                  )}
                >
                  {!isFlipped ? (
                    <>
                      <VocabIllustration word={current.word} size="lg" className="mx-auto mb-4" />
                      <h2 className="text-3xl font-bold mb-2">{current.word}</h2>
                      <p className="text-secondary text-small mb-4 shadow-glow rounded-full px-3 py-0.5">{current.phonetic}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); speak(current.word); }}
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                      >
                        <Volume2 size={16} />
                        <span className="text-small">Nghe</span>
                      </button>
                      <p className="text-small text-slate-600 mt-6">Nhấn để xem nghĩa</p>
                    </>
                  ) : (
                    <>
                      <VocabIllustration word={current.word} size="md" className="mx-auto mb-3" />
                      <p className="text-h1 font-bold text-primary mb-2">{current.meaning}</p>
                      <h3 className="text-h3 text-slate-300 mb-4">{current.word}</h3>
                      <p className="text-small text-slate-400 italic">
                        &ldquo;{current.example}&rdquo;
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={handleDontKnow}
                className="btn-3d flex flex-col items-center gap-1 px-8 py-3 rounded-xl bg-status-error/10 text-status-error hover:bg-status-error/20 transition-colors"
              >
                <X size={24} />
                <span className="text-small font-medium">Chưa biết</span>
              </button>
              <button
                onClick={handleKnow}
                className="btn-3d flex flex-col items-center gap-1 px-8 py-3 rounded-xl bg-status-success/10 text-status-success hover:bg-status-success/20 transition-colors"
              >
                <Check size={24} />
                <span className="text-small font-medium">Đã biết</span>
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
