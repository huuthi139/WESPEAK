"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Volume2,
  Mic,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  Star,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { useSpeech } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";
import { findLesson, type MockLesson } from "@/data/english-courses";
import type { LessonContent, VocabularyWord, LessonQuestion, SpeakingPhrase } from "@/types";

// ==================== Slide Variants ====================

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

// ==================== Vocabulary Lesson ====================

function VocabularyLesson({
  words,
  onComplete,
}: {
  words: VocabularyWord[];
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { speak } = useSpeech({ lang: "en-US" });

  const word = words[step];
  const total = words.length;

  const goTo = (next: number) => {
    if (next < 0 || next >= total) return;
    setDir(next > step ? 1 : -1);
    setStep(next);
    setFlipped(false);
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center w-full max-w-sm"
        >
          {/* Card */}
          <div
            className="w-full rounded-xl bg-dark-card border border-gray-800/50 p-6 text-center cursor-pointer"
            onClick={() => setFlipped(!flipped)}
          >
            <h2 className="text-[40px] font-bold tracking-wider text-white mb-1">
              {word.word}
            </h2>
            <p className="text-h3 text-secondary mb-1">{word.phonetic}</p>

            <AnimatePresence mode="wait">
              {flipped && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 border-t border-gray-700 pt-3"
                >
                  <p className="text-h2 text-primary mb-2">{word.translation}</p>
                  <p className="text-body text-gray-300">{word.example}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!flipped && (
              <p className="text-small text-gray-500 mt-3">Nhấn để xem nghĩa</p>
            )}
          </div>

          {/* Listen buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              className="flex items-center gap-1.5 rounded-full border border-gray-700 bg-dark-elevated px-3 py-2 text-small text-gray-300 hover:border-secondary hover:text-secondary transition-colors"
              onClick={() => speak(word.word, 0.7)}
            >
              <Volume2 size={14} />
              Chậm
            </button>
            <button
              className="flex items-center gap-1.5 rounded-full border border-gray-700 bg-dark-elevated px-3 py-2 text-small text-gray-300 hover:border-secondary hover:text-secondary transition-colors"
              onClick={() => speak(word.word)}
            >
              <Volume2 size={14} />
              Nghe
            </button>
            <button
              className="flex items-center gap-1.5 rounded-full border border-gray-700 bg-dark-elevated px-3 py-2 text-small text-gray-300 hover:border-secondary hover:text-secondary transition-colors"
              onClick={() => speak(word.example)}
            >
              <Volume2 size={14} />
              Ví dụ
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="mt-auto pt-6 w-full flex items-center gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => goTo(step - 1)}
          disabled={step === 0}
        >
          <ChevronLeft size={16} className="mr-1" />
          Trước
        </Button>
        <div className="flex items-center gap-1.5">
          {words.map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-2 rounded-full transition-all",
                i === step ? "w-6 bg-primary" : "w-2 bg-gray-600"
              )}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <Button
          variant={step === total - 1 ? "primary" : "outline"}
          className="flex-1"
          onClick={() => {
            if (step === total - 1) onComplete();
            else goTo(step + 1);
          }}
        >
          {step === total - 1 ? (
            "Hoàn thành"
          ) : (
            <>
              Tiếp <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ==================== Listening Lesson ====================

function ListeningLesson({
  audioText,
  questions,
  onComplete,
}: {
  audioText: string;
  questions: LessonQuestion[];
  onComplete: (score: number) => void;
}) {
  const { speak, isSpeaking } = useSpeech({ lang: "en-US" });
  const [phase, setPhase] = useState<"listen" | "questions" | "result">("listen");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (optIdx: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIdx;
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (qIndex < questions.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        const correct = newAnswers.filter((a, i) => a === questions[i].correct).length;
        const score = Math.round((correct / questions.length) * 100);
        onComplete(score);
      }
    }, 1200);
  };

  if (phase === "listen") {
    return (
      <div className="flex flex-col items-center flex-1">
        <div className="w-full max-w-sm">
          <div className="rounded-xl bg-dark-card border border-gray-800/50 p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 size={18} className="text-secondary" />
              <span className="text-h3 text-white">Nghe đoạn hội thoại</span>
            </div>
            <p className="text-body text-gray-300 leading-relaxed whitespace-pre-wrap">
              {audioText}
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => speak(audioText)}
              disabled={isSpeaking}
            >
              <Volume2 size={16} className="mr-2" />
              {isSpeaking ? "Đang phát..." : "Nghe"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => speak(audioText, 0.6)}
              disabled={isSpeaking}
            >
              <Volume2 size={16} className="mr-2" />
              Nghe chậm
            </Button>
            <Button
              variant="secondary"
              className="w-full mt-2"
              onClick={() => setPhase("questions")}
            >
              Trả lời câu hỏi
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[qIndex];
  const userAnswer = answers[qIndex];
  const isCorrect = userAnswer === q.correct;

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-full max-w-sm">
        <p className="text-small text-gray-400 mb-2">
          Câu {qIndex + 1}/{questions.length}
        </p>
        <h3 className="text-h2 text-white mb-6">{q.question}</h3>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            let optClass =
              "bg-dark-card border border-gray-700 text-white hover:border-primary";
            if (showFeedback && i === q.correct) {
              optClass =
                "bg-status-success/20 border border-status-success text-status-success";
            } else if (showFeedback && userAnswer === i && !isCorrect) {
              optClass =
                "bg-status-error/20 border border-status-error text-status-error";
            } else if (userAnswer === i && !showFeedback) {
              optClass = "bg-primary/20 border border-primary text-primary";
            }

            return (
              <motion.button
                key={i}
                className={cn(
                  "w-full rounded-lg px-4 py-3 text-left text-body transition-colors",
                  optClass
                )}
                onClick={() => handleAnswer(i)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2 font-semibold text-gray-500">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 rounded-lg px-4 py-3 flex items-center gap-2",
              isCorrect
                ? "bg-status-success/10 border border-status-success/30"
                : "bg-status-error/10 border border-status-error/30"
            )}
          >
            {isCorrect ? (
              <CheckCircle2 size={18} className="text-status-success" />
            ) : (
              <XCircle size={18} className="text-status-error" />
            )}
            <span
              className={cn(
                "text-body font-semibold",
                isCorrect ? "text-status-success" : "text-status-error"
              )}
            >
              {isCorrect ? "Chính xác!" : `Sai rồi! Đáp án: ${q.options[q.correct]}`}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ==================== Speaking Lesson ====================

function SpeakingLesson({
  phrases,
  onComplete,
}: {
  phrases: SpeakingPhrase[];
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(0);
  const { speak, startListening, stopListening, isListening, transcript } =
    useSpeech({ lang: "en-US" });

  const phrase = phrases[step];
  const total = phrases.length;

  const goTo = (next: number) => {
    if (next < 0 || next >= total) return;
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center w-full max-w-sm"
        >
          {/* Phrase card */}
          <div className="w-full rounded-xl bg-dark-card border border-gray-800/50 p-6 text-center">
            <h2 className="text-h1 text-white mb-2">{phrase.text}</h2>
            <p className="text-body text-gray-400">{phrase.translation}</p>
          </div>

          {/* Listen */}
          <button
            className="mt-4 flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-body text-secondary hover:bg-secondary/30 transition-colors"
            onClick={() => speak(phrase.text)}
          >
            <Volume2 size={16} />
            Nghe mẫu
          </button>

          {/* Mic */}
          <motion.button
            className={cn(
              "mt-6 flex h-20 w-20 items-center justify-center rounded-full transition-colors",
              isListening
                ? "bg-status-error shadow-lg shadow-status-error/30"
                : "bg-primary shadow-lg shadow-primary/30"
            )}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (isListening) stopListening();
              else startListening();
            }}
          >
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-status-error"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <Mic size={32} className="text-white" />
          </motion.button>
          <p className="text-small text-gray-400 mt-2">
            {isListening ? "Đang nghe... Nhấn để dừng" : "Nhấn để nói"}
          </p>

          {/* Transcript */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 w-full rounded-lg bg-primary/10 border border-primary/30 px-4 py-3"
            >
              <p className="text-small text-gray-400 mb-1">Bạn nói:</p>
              <p className="text-body text-white">{transcript}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="mt-auto pt-6 w-full flex items-center gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => goTo(step - 1)}
          disabled={step === 0}
        >
          <ChevronLeft size={16} className="mr-1" />
          Trước
        </Button>
        <div className="flex items-center gap-1.5">
          {phrases.map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-2 rounded-full transition-all",
                i === step ? "w-6 bg-primary" : "w-2 bg-gray-600"
              )}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <Button
          variant={step === total - 1 ? "primary" : "outline"}
          className="flex-1"
          onClick={() => {
            if (step === total - 1) onComplete();
            else goTo(step + 1);
          }}
        >
          {step === total - 1 ? (
            "Hoàn thành"
          ) : (
            <>
              Tiếp <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ==================== Grammar Lesson ====================

function GrammarLesson({
  content,
  onComplete,
}: {
  content: LessonContent;
  onComplete: (score: number) => void;
}) {
  const [phase, setPhase] = useState<"learn" | "exercises" | "done">("learn");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(content.exercises?.length || 0).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const exercises = content.exercises || [];

  if (phase === "learn") {
    return (
      <div className="flex flex-col items-center flex-1">
        <div className="w-full max-w-sm">
          {/* Explanation */}
          <div className="rounded-xl bg-dark-card border border-gray-800/50 p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-accent-gems" />
              <span className="text-h3 text-white">Ngữ pháp</span>
            </div>
            <div className="text-body text-gray-300 leading-relaxed whitespace-pre-wrap">
              {content.explanation}
            </div>
          </div>

          {/* Examples */}
          {content.examples && content.examples.length > 0 && (
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-6">
              <p className="text-small text-primary font-semibold mb-2">
                Ví dụ:
              </p>
              {content.examples.map((ex, i) => (
                <p key={i} className="text-body text-gray-300 mb-1">
                  {ex}
                </p>
              ))}
            </div>
          )}

          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              if (exercises.length > 0) setPhase("exercises");
              else onComplete(100);
            }}
          >
            {exercises.length > 0 ? "Làm bài tập" : "Hoàn thành"}
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  // Exercises phase (same as quiz)
  const q = exercises[qIndex];
  const userAnswer = answers[qIndex];
  const isCorrect = userAnswer === q.correct;

  const handleAnswer = (optIdx: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIdx;
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (qIndex < exercises.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        const correct = newAnswers.filter((a, i) => a === exercises[i].correct).length;
        const score = Math.round((correct / exercises.length) * 100);
        onComplete(score);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-full max-w-sm">
        <p className="text-small text-gray-400 mb-2">
          Bài tập {qIndex + 1}/{exercises.length}
        </p>
        <h3 className="text-h2 text-white mb-6">{q.question}</h3>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            let optClass =
              "bg-dark-card border border-gray-700 text-white hover:border-primary";
            if (showFeedback && i === q.correct) {
              optClass =
                "bg-status-success/20 border border-status-success text-status-success";
            } else if (showFeedback && userAnswer === i && !isCorrect) {
              optClass =
                "bg-status-error/20 border border-status-error text-status-error";
            }

            return (
              <motion.button
                key={i}
                className={cn(
                  "w-full rounded-lg px-4 py-3 text-left text-body transition-colors",
                  optClass
                )}
                onClick={() => handleAnswer(i)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2 font-semibold text-gray-500">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 rounded-lg px-4 py-3 flex items-center gap-2",
              isCorrect
                ? "bg-status-success/10 border border-status-success/30"
                : "bg-status-error/10 border border-status-error/30"
            )}
          >
            {isCorrect ? (
              <CheckCircle2 size={18} className="text-status-success" />
            ) : (
              <XCircle size={18} className="text-status-error" />
            )}
            <span
              className={cn(
                "text-body font-semibold",
                isCorrect ? "text-status-success" : "text-status-error"
              )}
            >
              {isCorrect ? "Chính xác!" : `Sai rồi! Đáp án: ${q.options[q.correct]}`}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ==================== Quiz Lesson ====================

function QuizLesson({
  questions,
  onComplete,
}: {
  questions: LessonQuestion[];
  onComplete: (score: number) => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const q = questions[qIndex];
  const userAnswer = answers[qIndex];
  const isCorrect = userAnswer === q.correct;

  const handleAnswer = (optIdx: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIdx;
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (qIndex < questions.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        const correct = newAnswers.filter((a, i) => a === questions[i].correct).length;
        const score = Math.round((correct / questions.length) * 100);
        onComplete(score);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-full max-w-sm">
        <p className="text-small text-gray-400 mb-2">
          Câu {qIndex + 1}/{questions.length}
        </p>
        <h3 className="text-h2 text-white mb-6">{q.question}</h3>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            let optClass =
              "bg-dark-card border border-gray-700 text-white hover:border-primary";
            if (showFeedback && i === q.correct) {
              optClass =
                "bg-status-success/20 border border-status-success text-status-success";
            } else if (showFeedback && userAnswer === i && !isCorrect) {
              optClass =
                "bg-status-error/20 border border-status-error text-status-error";
            }

            return (
              <motion.button
                key={i}
                className={cn(
                  "w-full rounded-lg px-4 py-3 text-left text-body transition-colors",
                  optClass
                )}
                onClick={() => handleAnswer(i)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2 font-semibold text-gray-500">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 rounded-lg px-4 py-3 flex items-center gap-2",
              isCorrect
                ? "bg-status-success/10 border border-status-success/30"
                : "bg-status-error/10 border border-status-error/30"
            )}
          >
            {isCorrect ? (
              <CheckCircle2 size={18} className="text-status-success" />
            ) : (
              <XCircle size={18} className="text-status-error" />
            )}
            <span
              className={cn(
                "text-body font-semibold",
                isCorrect ? "text-status-success" : "text-status-error"
              )}
            >
              {isCorrect ? "Chính xác!" : `Sai rồi! Đáp án: ${q.options[q.correct]}`}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ==================== Result Screen ====================

function ResultScreen({
  xp,
  score,
  lessonTitle,
  onContinue,
}: {
  xp: number;
  score: number | null;
  lessonTitle: string;
  onContinue: () => void;
}) {
  const stars = score !== null ? (score >= 90 ? 3 : score >= 60 ? 2 : 1) : 3;

  return (
    <motion.div
      className="flex flex-col items-center justify-center flex-1 px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Stars */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <motion.div
            key={s}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2 + s * 0.15,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <Star
              size={40}
              className={cn(
                s <= stars
                  ? "text-status-warning fill-status-warning"
                  : "text-gray-600"
              )}
            />
          </motion.div>
        ))}
      </div>

      <motion.h2
        className="text-h1 text-white mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {stars === 3 ? "Xuất sắc!" : stars === 2 ? "Tốt lắm!" : "Cố gắng hơn!"}
      </motion.h2>

      <motion.p
        className="text-body text-gray-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {lessonTitle}
      </motion.p>

      {/* Stats */}
      <motion.div
        className="w-full max-w-xs rounded-xl bg-dark-card border border-gray-800/50 p-5 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-body text-gray-400">XP nhận được</span>
          <span className="text-h3 text-accent-xp">+{xp} XP</span>
        </div>
        {score !== null && (
          <div className="flex items-center justify-between">
            <span className="text-body text-gray-400">Điểm số</span>
            <span
              className={cn(
                "text-h3",
                score >= 80
                  ? "text-status-success"
                  : score >= 50
                  ? "text-status-warning"
                  : "text-status-error"
              )}
            >
              {score}%
            </span>
          </div>
        )}
      </motion.div>

      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button variant="primary" className="w-full" onClick={onContinue}>
          Tiếp tục
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ==================== Main Page Component ====================

export default function LessonPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<MockLesson | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const found = findLesson(lessonId);
    if (found) setLesson(found);
  }, [lessonId]);

  const handleComplete = useCallback(
    async (lessonScore?: number) => {
      const finalScore = lessonScore ?? null;
      setScore(finalScore);
      setCompleted(true);

      // Save to localStorage
      try {
        const stored = localStorage.getItem("wespeak_completed");
        const ids: string[] = stored ? JSON.parse(stored) : [];
        if (!ids.includes(lessonId)) {
          ids.push(lessonId);
          localStorage.setItem("wespeak_completed", JSON.stringify(ids));
        }
      } catch { /* ignore */ }

      // Try API
      try {
        await fetch("/api/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId, score: finalScore }),
        });
      } catch {
        // Offline or no Supabase — progress saved locally
      }
    },
    [lessonId]
  );

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <motion.div
          className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const content = lesson.content;
  const lessonTypeLabels: Record<string, string> = {
    vocabulary: "Từ vựng",
    listening: "Nghe hiểu",
    speaking: "Luyện nói",
    grammar: "Ngữ pháp",
    quiz: "Kiểm tra",
  };

  // Determine total steps for progress bar
  function getTotalSteps(): number {
    switch (lesson!.type) {
      case "vocabulary": return content.words?.length || 1;
      case "listening": return (content.questions?.length || 0) + 1;
      case "speaking": return content.phrases?.length || 1;
      case "grammar": return (content.exercises?.length || 0) + 1;
      case "quiz": return content.questions?.length || 1;
      default: return 1;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-dark">
      {/* Top Bar */}
      <motion.div
        className="sticky top-0 z-10 bg-dark/95 backdrop-blur-sm px-4 py-3 border-b border-gray-800/50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <button
            className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-dark-elevated transition-colors"
            onClick={() => router.push(`/learn/${courseId}`)}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-h3 text-white truncate">{lesson.title}</h1>
            <p className="text-small text-gray-400">
              {lessonTypeLabels[lesson.type] || lesson.type} | +{lesson.xp_reward} XP
            </p>
          </div>
        </div>
        {!completed && (
          <div className="mt-2">
            <ProgressBar
              value={1}
              max={getTotalSteps()}
              color="bg-primary"
              size="sm"
            />
          </div>
        )}
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 py-6">
        {completed ? (
          <ResultScreen
            xp={lesson.xp_reward}
            score={score}
            lessonTitle={lesson.title}
            onContinue={() => router.push(`/learn/${courseId}`)}
          />
        ) : (
          <>
            {lesson.type === "vocabulary" && content.words && (
              <VocabularyLesson
                words={content.words}
                onComplete={() => handleComplete()}
              />
            )}

            {lesson.type === "listening" &&
              content.audio_text &&
              content.questions && (
                <ListeningLesson
                  audioText={content.audio_text}
                  questions={content.questions}
                  onComplete={(s) => handleComplete(s)}
                />
              )}

            {lesson.type === "speaking" && content.phrases && (
              <SpeakingLesson
                phrases={content.phrases}
                onComplete={() => handleComplete()}
              />
            )}

            {lesson.type === "grammar" && content.explanation && (
              <GrammarLesson
                content={content}
                onComplete={(s) => handleComplete(s)}
              />
            )}

            {lesson.type === "quiz" && content.questions && (
              <QuizLesson
                questions={content.questions}
                onComplete={(s) => handleComplete(s)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
