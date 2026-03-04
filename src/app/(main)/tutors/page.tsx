"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Check, Globe } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "wespeak_tutor";

interface Tutor {
  id: string;
  name: string;
  flag: string;
  initial: string;
  gradient: string;
  tags: string[];
  description: string;
  language: string;
}

const tutors: Tutor[] = [
  {
    id: "emma",
    name: "Emma",
    flag: "\u{1F1FA}\u{1F1F8}",
    initial: "E",
    gradient: "from-pink-500 to-rose-400",
    tags: ["Vui v\u1EBB", "N\u0103ng \u0111\u1ED9ng", "Casual"],
    description:
      "Gi\u00E1o vi\u00EAn tr\u1EBB, phong c\u00E1ch th\u00E2n thi\u1EC7n, ph\u00F9 h\u1EE3p cho giao ti\u1EBFp h\u00E0ng ng\u00E0y",
    language: "Ti\u1EBFng Anh",
  },
  {
    id: "james",
    name: "James",
    flag: "\u{1F1EC}\u{1F1E7}",
    initial: "J",
    gradient: "from-blue-500 to-indigo-400",
    tags: ["Chuy\u00EAn nghi\u1EC7p", "R\u00F5 r\u00E0ng", "Business"],
    description:
      "Chuy\u00EAn gia ti\u1EBFng Anh th\u01B0\u01A1ng m\u1EA1i, gi\u1ECDng British chu\u1EA9n",
    language: "Ti\u1EBFng Anh",
  },
  {
    id: "professor-chen",
    name: "Professor Chen",
    flag: "\u{1F1E8}\u{1F1F3}",
    initial: "\u9648",
    gradient: "from-red-500 to-orange-400",
    tags: ["Ki\u00EAn nh\u1EABn", "Chi ti\u1EBFt", "Academic"],
    description:
      "Gi\u00E1o s\u01B0 ng\u00F4n ng\u1EEF, chuy\u00EAn v\u1EC1 thanh \u0111i\u1EC7u v\u00E0 ng\u1EEF ph\u00E1p",
    language: "Ti\u1EBFng Trung",
  },
  {
    id: "yuki",
    name: "Yuki",
    flag: "\u{1F1EF}\u{1F1F5}",
    initial: "Y",
    gradient: "from-pink-500 to-purple-400",
    tags: ["Th\u00E2n thi\u1EC7n", "Nh\u1EB9 nh\u00E0ng", "Polite"],
    description:
      "Chuy\u00EAn v\u1EC1 ti\u1EBFng Nh\u1EADt giao ti\u1EBFp v\u00E0 v\u0103n h\u00F3a Nh\u1EADt B\u1EA3n",
    language: "Ti\u1EBFng Nh\u1EADt",
  },
  {
    id: "minho",
    name: "Minho",
    flag: "\u{1F1F0}\u{1F1F7}",
    initial: "M",
    gradient: "from-cyan-500 to-teal-400",
    tags: ["Cool", "Trendy", "K-culture"],
    description:
      "Gi\u1EA3ng vi\u00EAn tr\u1EBB, phong c\u00E1ch hi\u1EC7n \u0111\u1EA1i, K-pop & K-drama",
    language: "Ti\u1EBFng H\u00E0n",
  },
];

export default function TutorsPage() {
  const [selectedTutor, setSelectedTutor] = useState<string>("emma");
  const [explainInVietnamese, setExplainInVietnamese] = useState(true);

  // Load saved tutor from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSelectedTutor(saved);
    }
  }, []);

  const handleSelectTutor = (tutorId: string) => {
    setSelectedTutor(tutorId);
    localStorage.setItem(STORAGE_KEY, tutorId);
  };

  const handleSampleVoice = (tutor: Tutor) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Hi! I'm ${tutor.name}. Let's practice together!`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-4 pt-6 pb-4"
      >
        <h1 className="text-h1 font-bold text-white">
          Ch\u1ECDn gia s\u01B0 AI c\u1EE7a b\u1EA1n
        </h1>
        <p className="text-secondary mt-1 text-sm">
          B\u1EA1n c\u00F3 th\u1EC3 \u0111\u1ED5i b\u1EA5t c\u1EE9 l\u00FAc n\u00E0o
        </p>
      </motion.div>

      {/* Tutor Cards */}
      <div className="px-4 space-y-4">
        <AnimatePresence>
          {tutors.map((tutor, index) => {
            const isSelected = selectedTutor === tutor.id;

            return (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card
                  className={cn(
                    "relative transition-all duration-300",
                    isSelected &&
                      "ring-2 ring-[#6C63FF] shadow-glow"
                  )}
                  glow="none"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xl font-bold shrink-0",
                        tutor.gradient
                      )}
                    >
                      {tutor.initial}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-h3 font-semibold text-white">
                          {tutor.name}
                        </h3>
                        <span className="text-lg">{tutor.flag}</span>
                        <span className="text-xs text-text-muted ml-auto">
                          {tutor.language}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {tutor.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-white/[0.08] text-xs text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                        {tutor.description}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSampleVoice(tutor);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] transition-colors text-xs text-text-secondary"
                        >
                          <Volume2 size={14} />
                          Nghe th\u1EED
                        </button>

                        <div className="ml-auto">
                          {isSelected ? (
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6C63FF]/20 text-[#6C63FF] text-xs font-semibold"
                            >
                              <Check size={14} />
                              \u0110ang ch\u1ECDn
                            </motion.div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSelectTutor(tutor.id)}
                            >
                              Ch\u1ECDn
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Vietnamese Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="px-4 mt-6"
      >
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00D4AA]/20 flex items-center justify-center">
              <Globe size={18} className="text-[#00D4AA]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Gi\u1EA3i th\u00EDch b\u1EB1ng ti\u1EBFng Vi\u1EC7t
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                AI s\u1EBD gi\u1EA3i th\u00EDch ng\u1EEF ph\u00E1p b\u1EB1ng ti\u1EBFng Vi\u1EC7t
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => setExplainInVietnamese(!explainInVietnamese)}
            className={cn(
              "relative w-12 h-7 rounded-full transition-colors duration-300",
              explainInVietnamese ? "bg-[#6C63FF]" : "bg-white/[0.12]"
            )}
          >
            <motion.div
              className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
              animate={{ left: explainInVietnamese ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </Card>
      </motion.div>
    </div>
  );
}
