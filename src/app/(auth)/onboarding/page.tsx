"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  Mic,
  Globe,
  TrendingUp,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// --- Welcome Slides Data ---

interface WelcomeSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WELCOME_SLIDES: WelcomeSlide[] = [
  {
    icon: <Mic className="h-16 w-16 text-primary" />,
    title: "Luyện phát âm chuẩn với AI",
    description: "Trợ lý AI phân tích và sửa phát âm theo thời gian thực",
  },
  {
    icon: <Globe className="h-16 w-16 text-secondary" />,
    title: "Học 4 ngôn ngữ",
    description: "Tiếng Anh, Tiếng Trung, Tiếng Hàn, Tiếng Nhật",
  },
  {
    icon: <TrendingUp className="h-16 w-16 text-emerald-400" />,
    title: "Tiến bộ thật sự",
    description: "Theo dõi sự tiến bộ với hệ thống phân tích 5 yếu tố",
  },
];

const FLAG_EMOJIS = ["🇬🇧", "🇨🇳", "🇰🇷", "🇯🇵"];

// --- Language Data ---

interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  learners: string;
}

const LANGUAGES: Language[] = [
  { id: "english", name: "Tiếng Anh", nativeName: "English", flag: "🇬🇧", learners: "50M+ người học" },
  { id: "chinese", name: "Tiếng Trung", nativeName: "中文", flag: "🇨🇳", learners: "30M+ người học" },
  { id: "korean", name: "Tiếng Hàn", nativeName: "한국어", flag: "🇰🇷", learners: "20M+ người học" },
  { id: "japanese", name: "Tiếng Nhật", nativeName: "日本語", flag: "🇯🇵", learners: "25M+ người học" },
];

// --- Level Data ---

interface Level {
  id: string;
  emoji: string;
  label: string;
  cefr: string;
}

const LEVELS: Level[] = [
  { id: "beginner", emoji: "🌱", label: "Mới bắt đầu", cefr: "A1" },
  { id: "elementary", emoji: "📗", label: "Cơ bản", cefr: "A2" },
  { id: "intermediate", emoji: "📘", label: "Trung cấp", cefr: "B1-B2" },
  { id: "advanced", emoji: "📕", label: "Nâng cao", cefr: "C1-C2" },
];

// --- Daily Goal Data ---

interface DailyGoal {
  minutes: number;
  emoji: string;
  label: string;
  description: string;
  recommended?: boolean;
}

const DAILY_GOALS: DailyGoal[] = [
  { minutes: 5, emoji: "☕", label: "5 phút/ngày", description: "Nhẹ nhàng" },
  { minutes: 15, emoji: "📚", label: "15 phút/ngày", description: "Bình thường", recommended: true },
  { minutes: 30, emoji: "💪", label: "30 phút/ngày", description: "Nghiêm túc" },
  { minutes: 60, emoji: "🔥", label: "60 phút/ngày", description: "Siêu chăm chỉ" },
];

// Steps: 0 = welcome slides, 1 = language, 2 = level, 3 = daily goal
const TOTAL_STEPS = 4;

// --- Animation variants ---

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
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

// --- Component ---

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [welcomeSlide, setWelcomeSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const toggleLanguage = useCallback((languageId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId]
    );
  }, []);

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return true; // welcome slides always allow proceeding
      case 1:
        return selectedLanguages.length > 0;
      case 2:
        return selectedLevel !== null;
      case 3:
        return selectedGoal !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    // Handle welcome slides navigation
    if (step === 0) {
      if (welcomeSlide < WELCOME_SLIDES.length - 1) {
        setDirection(1);
        setWelcomeSlide((prev) => prev + 1);
      } else {
        // Move to language selection
        setDirection(1);
        setStep(1);
      }
      return;
    }

    if (!canProceed()) return;

    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      // Onboarding complete
      try {
        localStorage.setItem(
          "wespeak_onboarding",
          JSON.stringify({
            languages: selectedLanguages,
            level: selectedLevel,
            dailyGoalMinutes: selectedGoal,
            completedAt: new Date().toISOString(),
          })
        );
      } catch {
        /* ignore */
      }
      router.push("/");
    }
  };

  const handleBack = () => {
    if (step === 0 && welcomeSlide > 0) {
      setDirection(-1);
      setWelcomeSlide((prev) => prev - 1);
    } else if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleSkipWelcome = () => {
    setDirection(1);
    setStep(1);
  };

  // --- Render helpers ---

  const renderWelcomeSlides = () => (
    <div className="flex flex-1 flex-col">
      {/* Skip button */}
      <div className="flex justify-end px-4 pt-4">
        <button
          onClick={handleSkipWelcome}
          className="text-body text-slate-400 hover:text-white transition-colors"
        >
          Bỏ qua
        </button>
      </div>

      {/* Slide content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`welcome-${welcomeSlide}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon area */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4, type: "spring", stiffness: 200 }}
              className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl glass-3d"
            >
              {WELCOME_SLIDES[welcomeSlide].icon}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="text-h1 text-white mb-3"
            >
              {WELCOME_SLIDES[welcomeSlide].title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="text-body text-slate-400 max-w-xs"
            >
              {WELCOME_SLIDES[welcomeSlide].description}
            </motion.p>

            {/* Flag emojis for slide 2 */}
            {welcomeSlide === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="mt-6 flex gap-4"
              >
                {FLAG_EMOJIS.map((flag, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                    className="text-4xl"
                  >
                    {flag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pb-6">
        {WELCOME_SLIDES.map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === welcomeSlide
                ? "bg-primary w-8"
                : i < welcomeSlide
                  ? "bg-primary/50 w-2"
                  : "bg-white/[0.12] w-2"
            )}
            layout
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-8">
        <Button fullWidth size="lg" onClick={handleNext} className="gap-2">
          {welcomeSlide < WELCOME_SLIDES.length - 1 ? (
            <>
              Tiếp theo
              <ChevronRight className="h-5 w-5" />
            </>
          ) : (
            "Bắt đầu"
          )}
        </Button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    // Steps 1-3: Language, Level, Goal
    const actualStep = step; // step 1, 2, 3

    return (
      <div className="flex flex-1 flex-col px-4 py-6">
        {/* Header with back button and progress */}
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-2 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-body text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
              <span>Quay lại</span>
            </button>
            <span className="text-small text-slate-500">
              {actualStep}/3
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-8 flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  i <= actualStep
                    ? "bg-primary"
                    : "bg-white/[0.08]"
                )}
                layout
              />
            ))}
          </div>
        </div>

        {/* Step content area */}
        <div className="relative mx-auto w-full max-w-sm flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Language Selection */}
            {actualStep === 1 && (
              <motion.div
                key="step-language"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="mb-6 text-center">
                  <h1 className="text-h1 text-white">Tôi muốn học...</h1>
                  <p className="mt-2 text-body text-slate-400">
                    Bạn có thể chọn nhiều ngôn ngữ
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {LANGUAGES.map((lang, i) => {
                    const isSelected = selectedLanguages.includes(lang.id);
                    return (
                      <motion.button
                        key={lang.id}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleLanguage(lang.id)}
                        className={cn(
                          "glass-3d relative flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-glow"
                            : "border-white/[0.06] hover:border-white/[0.15]"
                        )}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                          >
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                        <span className="text-4xl">{lang.flag}</span>
                        <span
                          className={cn(
                            "text-h3 font-semibold",
                            isSelected ? "text-white" : "text-slate-300"
                          )}
                        >
                          {lang.nativeName}
                        </span>
                        <span className="text-small text-slate-500">
                          {lang.learners}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Level Selection */}
            {actualStep === 2 && (
              <motion.div
                key="step-level"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="mb-6 text-center">
                  <h1 className="text-h1 text-white">
                    Trình độ hiện tại của bạn?
                  </h1>
                  <p className="mt-2 text-body text-slate-400">
                    Chúng tôi sẽ tùy chỉnh nội dung phù hợp
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {LEVELS.map((level, i) => {
                    const isSelected = selectedLevel === level.id;
                    return (
                      <motion.button
                        key={level.id}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedLevel(level.id)}
                        className={cn(
                          "glass-3d flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-glow"
                            : "border-white/[0.06] hover:border-white/[0.15]"
                        )}
                      >
                        <span className="text-3xl">{level.emoji}</span>
                        <div className="flex-1">
                          <p
                            className={cn(
                              "text-h3 font-semibold",
                              isSelected ? "text-white" : "text-slate-300"
                            )}
                          >
                            {level.label}
                          </p>
                          <p className="text-small text-slate-500">
                            {level.cefr}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-slate-600"
                          )}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Check className="h-3.5 w-3.5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Daily Goal */}
            {actualStep === 3 && (
              <motion.div
                key="step-goal"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="mb-6 text-center">
                  <h1 className="text-h1 text-white">
                    Mục tiêu hàng ngày
                  </h1>
                  <p className="mt-2 text-body text-slate-400">
                    Bạn muốn học bao lâu mỗi ngày?
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {DAILY_GOALS.map((goal, i) => {
                    const isSelected = selectedGoal === goal.minutes;
                    return (
                      <motion.button
                        key={goal.minutes}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedGoal(goal.minutes)}
                        className={cn(
                          "glass-3d relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-glow"
                            : "border-white/[0.06] hover:border-white/[0.15]"
                        )}
                      >
                        <span className="text-3xl">{goal.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p
                              className={cn(
                                "text-h3 font-semibold",
                                isSelected ? "text-white" : "text-slate-300"
                              )}
                            >
                              {goal.label}
                            </p>
                            {goal.recommended && (
                              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                                Phổ biến
                              </span>
                            )}
                          </div>
                          <p className="text-small text-slate-500">
                            {goal.description}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-slate-600"
                          )}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Check className="h-3.5 w-3.5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom action button */}
        <div className="mx-auto mt-8 w-full max-w-sm">
          <Button
            fullWidth
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {step < TOTAL_STEPS - 1 ? (
              <>
                Tiếp tục
                <ChevronRight className="h-5 w-5" />
              </>
            ) : (
              "Bắt đầu học"
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-navy-gradient">
      {step === 0 ? renderWelcomeSlides() : renderStepContent()}
    </div>
  );
}
