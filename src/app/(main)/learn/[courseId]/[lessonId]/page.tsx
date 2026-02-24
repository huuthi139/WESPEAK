"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mic,
  Star,
  Volume2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

// --------------- Types ---------------

interface VocabItem {
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  score: number;
  stars: number;
  phonemes: { text: string; score: number }[];
  tip: string;
}

// --------------- Mock Data ---------------

const MOCK_VOCAB: VocabItem[] = [
  {
    word: "ONE",
    phonetic: "/w\u028Cn/",
    meaning: "M\u1ED9t",
    example: "I have one book.",
    exampleMeaning: "T\u00F4i c\u00F3 m\u1ED9t quy\u1EC3n s\u00E1ch.",
    score: 92,
    stars: 3,
    phonemes: [
      { text: "w", score: 95 },
      { text: "\u028C", score: 88 },
      { text: "n", score: 93 },
    ],
    tip: "H\u00E3y ch\u00FA \u00FD \u00E2m /w/ \u1EDF \u0111\u1EA7u t\u1EEB. Tr\u00F2n m\u00F4i l\u1EA1i nh\u01B0 khi n\u00F3i \u201Cu\u201D.",
  },
  {
    word: "TWO",
    phonetic: "/tu\u02D0/",
    meaning: "Hai",
    example: "There are two cats.",
    exampleMeaning: "C\u00F3 hai con m\u00E8o.",
    score: 78,
    stars: 2,
    phonemes: [
      { text: "t", score: 90 },
      { text: "u\u02D0", score: 65 },
    ],
    tip: "\u00C2m /u\u02D0/ k\u00E9o d\u00E0i h\u01A1n \u00E2m /u/ b\u00ECnh th\u01B0\u1EDDng. H\u00E3y k\u00E9o d\u00E0i nguy\u00EAn \u00E2m.",
  },
  {
    word: "THREE",
    phonetic: "/\u03B8ri\u02D0/",
    meaning: "Ba",
    example: "I see three birds.",
    exampleMeaning: "T\u00F4i th\u1EA5y ba con chim.",
    score: 65,
    stars: 2,
    phonemes: [
      { text: "\u03B8", score: 50 },
      { text: "r", score: 70 },
      { text: "i\u02D0", score: 75 },
    ],
    tip: "\u00C2m /\u03B8/ kh\u00F4ng c\u00F3 trong ti\u1EBFng Vi\u1EC7t. \u0110\u1EB7t l\u01B0\u1EE1i gi\u1EEFa hai h\u00E0m r\u0103ng v\u00E0 th\u1ED5i h\u01A1i nh\u1EB9.",
  },
  {
    word: "FOUR",
    phonetic: "/f\u0254\u02D0r/",
    meaning: "B\u1ED1n",
    example: "We need four chairs.",
    exampleMeaning: "Ch\u00FAng ta c\u1EA7n b\u1ED1n c\u00E1i gh\u1EBF.",
    score: 88,
    stars: 3,
    phonemes: [
      { text: "f", score: 92 },
      { text: "\u0254\u02D0", score: 85 },
      { text: "r", score: 87 },
    ],
    tip: "\u00C2m /f/ nh\u1EB9 nh\u00E0ng h\u01A1n \u00E2m \u201Cph\u201D ti\u1EBFng Vi\u1EC7t. R\u0103ng tr\u00EAn ch\u1EA1m nh\u1EB9 m\u00F4i d\u01B0\u1EDBi.",
  },
  {
    word: "FIVE",
    phonetic: "/fa\u026Av/",
    meaning: "N\u0103m",
    example: "Give me five minutes.",
    exampleMeaning: "Cho t\u00F4i n\u0103m ph\u00FAt.",
    score: 71,
    stars: 2,
    phonemes: [
      { text: "f", score: 90 },
      { text: "a\u026A", score: 55 },
      { text: "v", score: 68 },
    ],
    tip: "Nguy\u00EAn \u00E2m \u0111\u00F4i /a\u026A/ b\u1EAFt \u0111\u1EA7u t\u1EEB /a/ v\u00E0 l\u01B0\u1EDBt l\u00EAn /\u026A/. Gi\u1ED1ng \u00E2m \u201Cai\u201D trong ti\u1EBFng Vi\u1EC7t.",
  },
];

// --------------- Helpers ---------------

function getScoreColor(score: number): string {
  if (score >= 85) return "text-status-success";
  if (score >= 60) return "text-status-warning";
  return "text-status-error";
}

function getScoreBg(score: number): string {
  if (score >= 85) return "bg-status-success";
  if (score >= 60) return "bg-status-warning";
  return "bg-status-error";
}

function getPhonemeColor(score: number): string {
  if (score >= 85) return "text-status-success";
  if (score >= 60) return "text-status-warning";
  return "text-status-error";
}

function getPhonemeBarColor(score: number): string {
  if (score >= 85) return "bg-status-success";
  if (score >= 60) return "bg-status-warning";
  return "bg-status-error";
}

// --------------- Slide Animation Variants ---------------

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// --------------- Page Component ---------------

export default function LessonPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const totalSteps = MOCK_VOCAB.length;
  const vocab = MOCK_VOCAB[currentStep];

  const goToStep = (newStep: number) => {
    if (newStep < 0 || newStep >= totalSteps) return;
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
    setShowResult(true);
    setIsRecording(false);
  };

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording -> show result
      setIsRecording(false);
      setShowResult(true);
    } else {
      // Start recording
      setIsRecording(true);
      setShowResult(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark">
      {/* ===== Top Bar ===== */}
      <motion.div
        className="sticky top-0 z-10 bg-dark/95 backdrop-blur-sm px-4 py-3 border-b border-gray-800/50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-dark-elevated transition-colors"
            onClick={() => router.push(`/learn/${courseId}`)}
          >
            <ArrowLeft size={20} />
          </button>

          {/* Lesson title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-h3 text-white truncate">
              T\u1EEB v\u1EF1ng: S\u1ED1 1-5
            </h1>
            <p className="text-small text-gray-400">
              B\u01B0\u1EDBc {currentStep + 1}/{totalSteps}
            </p>
          </div>

          {/* Step indicator */}
          <span className="shrink-0 rounded-full bg-primary/20 px-2.5 py-0.5 text-small font-semibold text-primary">
            {currentStep + 1}/{totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2">
          <ProgressBar
            value={currentStep + 1}
            max={totalSteps}
            color="bg-primary"
            size="sm"
          />
        </div>
      </motion.div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 overflow-hidden px-4 py-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* ---- Word Display ---- */}
            <motion.div
              className="mb-2 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-[48px] font-bold tracking-wider text-white leading-tight">
                {vocab.word}
              </h2>
              <p className="text-h2 text-secondary mt-1">{vocab.phonetic}</p>
              <p className="text-h3 text-gray-400 mt-1">{vocab.meaning}</p>
            </motion.div>

            {/* ---- Example sentence ---- */}
            <motion.div
              className="mb-6 rounded-lg bg-dark-card border border-gray-800/50 px-4 py-3 w-full max-w-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-body text-white">{vocab.example}</p>
              <p className="text-small text-gray-400 mt-1">
                {vocab.exampleMeaning}
              </p>
            </motion.div>

            {/* ---- Speed Buttons ---- */}
            <div className="flex items-center gap-3 mb-6">
              {[
                { label: "Ch\u1EADm", speed: 0.5 },
                { label: "B\u00ECnh th\u01B0\u1EDDng", speed: 1.0 },
                { label: "Nhanh", speed: 1.5 },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="flex items-center gap-1.5 rounded-full border border-gray-700 bg-dark-elevated px-3 py-2 text-small text-gray-300 hover:border-secondary hover:text-secondary transition-colors"
                >
                  <Volume2 size={14} />
                  {btn.label}
                </button>
              ))}
            </div>

            {/* ---- Record Button ---- */}
            <motion.div className="mb-6 flex flex-col items-center gap-2">
              <motion.button
                className={cn(
                  "relative flex h-20 w-20 items-center justify-center rounded-full transition-colors",
                  isRecording
                    ? "bg-status-error shadow-lg shadow-status-error/30"
                    : "bg-primary shadow-lg shadow-primary/30"
                )}
                whileTap={{ scale: 0.92 }}
                onClick={handleRecord}
              >
                {/* Pulsing ring when recording */}
                {isRecording && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-status-error"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <Mic size={32} className="text-white" />
              </motion.button>
              <p className="text-small text-gray-400">
                {isRecording
                  ? "\u0110ang ghi \u00E2m... Nh\u1EA5n \u0111\u1EC3 d\u1EEBng"
                  : "Nh\u1EA5n \u0111\u1EC3 ghi \u00E2m"}
              </p>
            </motion.div>

            {/* ---- Result Section ---- */}
            {showResult && !isRecording && (
              <motion.div
                className="w-full max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                {/* Score & Stars */}
                <div className="rounded-lg bg-dark-card border border-gray-800/50 p-4 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    {/* Score */}
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full",
                          vocab.score >= 85
                            ? "bg-status-success/20"
                            : vocab.score >= 60
                            ? "bg-status-warning/20"
                            : "bg-status-error/20"
                        )}
                      >
                        <span
                          className={cn(
                            "text-h2 font-bold",
                            getScoreColor(vocab.score)
                          )}
                        >
                          {vocab.score}
                        </span>
                      </div>
                      <div>
                        <p className="text-small text-gray-400">\u0110i\u1EC3m ph\u00E1t \u00E2m</p>
                        <p
                          className={cn(
                            "text-body font-semibold",
                            getScoreColor(vocab.score)
                          )}
                        >
                          {vocab.score >= 85
                            ? "Xu\u1EA5t s\u1EAFc!"
                            : vocab.score >= 60
                            ? "Kh\u00E1 t\u1ED1t!"
                            : "C\u1EA7n luy\u1EC7n th\u00EAm"}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.3 + star * 0.15,
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                        >
                          <Star
                            size={24}
                            className={cn(
                              star <= vocab.stars
                                ? "text-status-warning fill-status-warning"
                                : "text-gray-600"
                            )}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Overall score bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-small mb-1">
                      <span className="text-gray-400">T\u1ED5ng \u0111i\u1EC3m</span>
                      <span className={getScoreColor(vocab.score)}>
                        {vocab.score}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-dark-elevated overflow-hidden">
                      <motion.div
                        className={cn("h-full rounded-full", getScoreBg(vocab.score))}
                        initial={{ width: 0 }}
                        animate={{ width: `${vocab.score}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Phoneme Breakdown */}
                  <div>
                    <p className="text-small text-gray-400 mb-2">
                      Ph\u00E2n t\u00EDch \u00E2m v\u1ECB
                    </p>
                    <div className="flex flex-col gap-2">
                      {vocab.phonemes.map((phoneme, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-8 text-center text-h3 font-mono",
                              getPhonemeColor(phoneme.score)
                            )}
                          >
                            /{phoneme.text}/
                          </span>
                          <div className="flex-1">
                            <div className="h-1.5 w-full rounded-full bg-dark-elevated overflow-hidden">
                              <motion.div
                                className={cn(
                                  "h-full rounded-full",
                                  getPhonemeBarColor(phoneme.score)
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: `${phoneme.score}%` }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.3 + idx * 0.1,
                                }}
                              />
                            </div>
                          </div>
                          <span
                            className={cn(
                              "w-8 text-right text-small font-semibold",
                              getPhonemeColor(phoneme.score)
                            )}
                          >
                            {phoneme.score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tip */}
                <motion.div
                  className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-small text-primary font-semibold mb-1">
                    \uD83D\uDCA1 M\u1EB9o ph\u00E1t \u00E2m
                  </p>
                  <p className="text-small text-gray-300">{vocab.tip}</p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== Bottom Navigation ===== */}
      <motion.div
        className="sticky bottom-0 bg-dark/95 backdrop-blur-sm border-t border-gray-800/50 px-4 py-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => goToStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} className="mr-1" />
            Tr\u01B0\u1EDBc
          </Button>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {MOCK_VOCAB.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentStep
                    ? "w-6 bg-primary"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                )}
                onClick={() => goToStep(idx)}
              />
            ))}
          </div>

          <Button
            variant={currentStep === totalSteps - 1 ? "primary" : "outline"}
            className="flex-1"
            onClick={() => {
              if (currentStep === totalSteps - 1) {
                // Finish lesson -> go back to course
                router.push(`/learn/${courseId}`);
              } else {
                goToStep(currentStep + 1);
              }
            }}
          >
            {currentStep === totalSteps - 1 ? (
              "Ho\u00E0n th\u00E0nh"
            ) : (
              <>
                Ti\u1EBFp
                <ChevronRight size={16} className="ml-1" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
