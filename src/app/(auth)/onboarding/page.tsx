"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Languages, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// --- Data ---

interface Language {
  id: string;
  name: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { id: "english", name: "Ti\u1ebfng Anh", flag: "\ud83c\uddfa\ud83c\uddf8" },
  {
    id: "chinese",
    name: "Ti\u1ebfng Trung",
    flag: "\ud83c\udde8\ud83c\uddf3",
  },
  {
    id: "korean",
    name: "Ti\u1ebfng H\u00e0n",
    flag: "\ud83c\uddf0\ud83c\uddf7",
  },
  {
    id: "japanese",
    name: "Ti\u1ebfng Nh\u1eadt",
    flag: "\ud83c\uddef\ud83c\uddf5",
  },
];

interface Level {
  id: string;
  label: string;
  description: string;
}

const LEVELS: Level[] = [
  {
    id: "beginner",
    label: "M\u1edbi b\u1eaft \u0111\u1ea7u",
    description:
      "Ch\u01b0a bi\u1ebft g\u00ec ho\u1eb7c bi\u1ebft r\u1ea5t \u00edt",
  },
  {
    id: "intermediate",
    label: "Trung b\u00ecnh",
    description:
      "C\u00f3 th\u1ec3 giao ti\u1ebfp c\u01a1 b\u1ea3n",
  },
  {
    id: "advanced",
    label: "N\u00e2ng cao",
    description:
      "Giao ti\u1ebfp t\u1ed1t, mu\u1ed1n ho\u00e0n thi\u1ec7n",
  },
];

interface DailyGoal {
  minutes: number;
  label: string;
  description: string;
}

const DAILY_GOALS: DailyGoal[] = [
  {
    minutes: 5,
    label: "5 ph\u00fat",
    description: "Nh\u1eb9 nh\u00e0ng",
  },
  {
    minutes: 10,
    label: "10 ph\u00fat",
    description: "B\u00ecnh th\u01b0\u1eddng",
  },
  {
    minutes: 15,
    label: "15 ph\u00fat",
    description: "Nghi\u00eam t\u00fac",
  },
  {
    minutes: 20,
    label: "20 ph\u00fat",
    description: "Ch\u0103m ch\u1ec9",
  },
  {
    minutes: 30,
    label: "30 ph\u00fat",
    description: "Quy\u1ebft t\u00e2m",
  },
  {
    minutes: 60,
    label: "60 ph\u00fat",
    description: "Si\u00eau n\u0103ng",
  },
];

const TOTAL_STEPS = 3;

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

// --- Component ---

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
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
        return selectedLanguages.length > 0;
      case 1:
        return selectedLevel !== null;
      case 2:
        return selectedGoal !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;

    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      // Onboarding complete — save preferences to localStorage
      try {
        localStorage.setItem(
          "wespeak_onboarding",
          JSON.stringify({
            languages: selectedLanguages,
            level: selectedLevel,
            dailyGoalMinutes: selectedGoal,
          })
        );
      } catch { /* ignore */ }
      router.push("/");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark px-4 py-8">
      {/* Header with back button and progress */}
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-body text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Quay l\u1ea1i</span>
            </button>
          ) : (
            <div />
          )}
          <span className="text-small text-gray-500">
            {step + 1}/{TOTAL_STEPS}
          </span>
        </div>

        {/* Progress dots */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "h-2 rounded-full transition-colors",
                i === step
                  ? "bg-primary w-8"
                  : i < step
                    ? "bg-primary/50 w-2"
                    : "bg-dark-elevated w-2"
              )}
              layout
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="relative mx-auto w-full max-w-sm flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
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
              <div className="mb-2 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20"
                >
                  <Languages className="h-7 w-7 text-primary" />
                </motion.div>
                <h1 className="text-h1 text-white">
                  Ch\u1ecdn ng\u00f4n ng\u1eef
                </h1>
                <p className="mt-1 text-body text-gray-400">
                  B\u1ea1n mu\u1ed1n h\u1ecdc ng\u00f4n ng\u1eef n\u00e0o?
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguages.includes(lang.id);
                  return (
                    <motion.button
                      key={lang.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLanguage(lang.id)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 rounded-lg border-2 p-5 transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-gray-700 bg-dark-card hover:border-gray-600"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                      <span className="text-3xl">{lang.flag}</span>
                      <span
                        className={cn(
                          "text-body font-medium",
                          isSelected ? "text-white" : "text-gray-400"
                        )}
                      >
                        {lang.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <p className="mt-4 text-center text-small text-gray-500">
                B\u1ea1n c\u00f3 th\u1ec3 ch\u1ecdn nhi\u1ec1u ng\u00f4n
                ng\u1eef
              </p>
            </motion.div>
          )}

          {step === 1 && (
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
              <div className="mb-2 text-center">
                <h1 className="text-h1 text-white">
                  Tr\u00ecnh \u0111\u1ed9 c\u1ee7a b\u1ea1n
                </h1>
                <p className="mt-1 text-body text-gray-400">
                  Ch\u1ecdn tr\u00ecnh \u0111\u1ed9 hi\u1ec7n t\u1ea1i c\u1ee7a
                  b\u1ea1n
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {LEVELS.map((level) => {
                  const isSelected = selectedLevel === level.id;
                  return (
                    <motion.button
                      key={level.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedLevel(level.id)}
                      className={cn(
                        "flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-gray-700 bg-dark-card hover:border-gray-600"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-600"
                        )}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <p
                          className={cn(
                            "text-h3",
                            isSelected ? "text-white" : "text-gray-300"
                          )}
                        >
                          {level.label}
                        </p>
                        <p className="text-small text-gray-500">
                          {level.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
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
              <div className="mb-2 text-center">
                <h1 className="text-h1 text-white">
                  M\u1ee5c ti\u00eau h\u00e0ng ng\u00e0y
                </h1>
                <p className="mt-1 text-body text-gray-400">
                  B\u1ea1n mu\u1ed1n h\u1ecdc bao l\u00e2u m\u1ed7i
                  ng\u00e0y?
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {DAILY_GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.minutes;
                  return (
                    <motion.button
                      key={goal.minutes}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedGoal(goal.minutes)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-lg border-2 p-4 transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-gray-700 bg-dark-card hover:border-gray-600"
                      )}
                    >
                      <span
                        className={cn(
                          "text-h2",
                          isSelected ? "text-primary" : "text-gray-300"
                        )}
                      >
                        {goal.label}
                      </span>
                      <span className="text-small text-gray-500">
                        {goal.description}
                      </span>
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
              Ti\u1ebfp t\u1ee5c
              <ChevronRight className="h-5 w-5" />
            </>
          ) : (
            "B\u1eaft \u0111\u1ea7u h\u1ecdc"
          )}
        </Button>
      </div>
    </div>
  );
}
