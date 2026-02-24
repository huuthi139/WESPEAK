"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  Lock,
  Play,
  Volume2,
  Mic,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

// --------------- Types ---------------

interface Lesson {
  id: string;
  title: string;
  type: "vocabulary" | "listening" | "speaking" | "quiz";
  status: "completed" | "current" | "locked";
  xp: number;
}

interface Unit {
  id: string;
  title: string;
  status: "completed" | "current" | "locked";
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  flag: string;
  title: string;
  level: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  durationHours: number;
  units: Unit[];
}

// --------------- Mock Data ---------------

const MOCK_COURSE: CourseData = {
  id: "english-basics",
  flag: "\uD83C\uDDEC\uD83C\uDDE7",
  title: "English Basics",
  level: "A1",
  description: "N\u1EC1n t\u1EA3ng ti\u1EBFng Anh cho ng\u01B0\u1EDDi m\u1EDBi b\u1EAFt \u0111\u1EA7u",
  totalLessons: 30,
  completedLessons: 7,
  durationHours: 15,
  units: [
    {
      id: "unit-1",
      title: "Unit 1: Ch\u00E0o h\u1ECFi & Gi\u1EDBi thi\u1EC7u",
      status: "completed",
      lessons: [
        {
          id: "lesson-1-1",
          title: "T\u1EEB v\u1EF1ng: L\u1EDDi ch\u00E0o",
          type: "vocabulary",
          status: "completed",
          xp: 15,
        },
        {
          id: "lesson-1-2",
          title: "Nghe: H\u1ED9i tho\u1EA1i ch\u00E0o h\u1ECFi",
          type: "listening",
          status: "completed",
          xp: 15,
        },
        {
          id: "lesson-1-3",
          title: "N\u00F3i: T\u1EF1 gi\u1EDBi thi\u1EC7u",
          type: "speaking",
          status: "completed",
          xp: 20,
        },
      ],
    },
    {
      id: "unit-2",
      title: "Unit 2: S\u1ED1 \u0111\u1EBFm & Ng\u00E0y th\u00E1ng",
      status: "current",
      lessons: [
        {
          id: "lesson-2-1",
          title: "T\u1EEB v\u1EF1ng: S\u1ED1 1-100",
          type: "vocabulary",
          status: "completed",
          xp: 15,
        },
        {
          id: "lesson-2-2",
          title: "Nghe: Ng\u00E0y & gi\u1EDD",
          type: "listening",
          status: "current",
          xp: 15,
        },
        {
          id: "lesson-2-3",
          title: "Ki\u1EC3m tra: S\u1ED1 & Ng\u00E0y",
          type: "quiz",
          status: "locked",
          xp: 20,
        },
      ],
    },
    {
      id: "unit-3",
      title: "Unit 3: Gia \u0111\u00ECnh & B\u1EA1n b\u00E8",
      status: "locked",
      lessons: [
        {
          id: "lesson-3-1",
          title: "T\u1EEB v\u1EF1ng: Gia \u0111\u00ECnh",
          type: "vocabulary",
          status: "locked",
          xp: 15,
        },
        {
          id: "lesson-3-2",
          title: "N\u00F3i: M\u00F4 t\u1EA3 gia \u0111\u00ECnh",
          type: "speaking",
          status: "locked",
          xp: 20,
        },
        {
          id: "lesson-3-3",
          title: "Ki\u1EC3m tra: Gia \u0111\u00ECnh",
          type: "quiz",
          status: "locked",
          xp: 20,
        },
      ],
    },
  ],
};

// --------------- Helpers ---------------

function getLevelColor(level: string): string {
  if (level === "A1") return "bg-status-success/20 text-status-success";
  if (level === "A2") return "bg-secondary/20 text-secondary";
  if (level.startsWith("B")) return "bg-status-warning/20 text-status-warning";
  return "bg-accent-xp/20 text-accent-xp";
}

function getLessonTypeLabel(type: Lesson["type"]): string {
  switch (type) {
    case "vocabulary":
      return "T\u1EEB v\u1EF1ng";
    case "listening":
      return "Nghe";
    case "speaking":
      return "N\u00F3i";
    case "quiz":
      return "Quiz";
  }
}

function getLessonTypeColor(type: Lesson["type"]): string {
  switch (type) {
    case "vocabulary":
      return "bg-primary/20 text-primary";
    case "listening":
      return "bg-secondary/20 text-secondary";
    case "speaking":
      return "bg-accent-streak/20 text-accent-streak";
    case "quiz":
      return "bg-status-warning/20 text-status-warning";
  }
}

function getLessonTypeIcon(type: Lesson["type"]) {
  switch (type) {
    case "vocabulary":
      return BookOpen;
    case "listening":
      return Volume2;
    case "speaking":
      return Mic;
    case "quiz":
      return HelpCircle;
  }
}

function getUnitStatusIcon(status: Unit["status"]) {
  switch (status) {
    case "completed":
      return <CheckCircle2 size={20} className="text-status-success" />;
    case "current":
      return <Play size={20} className="text-primary" />;
    case "locked":
      return <Lock size={20} className="text-gray-600" />;
  }
}

function getLessonStatusIcon(status: Lesson["status"]) {
  switch (status) {
    case "completed":
      return <CheckCircle2 size={16} className="text-status-success" />;
    case "current":
      return (
        <div className="flex h-4 w-4 items-center justify-center">
          <Play size={14} className="text-primary fill-primary" />
        </div>
      );
    case "locked":
      return <Lock size={16} className="text-gray-600" />;
  }
}

// --------------- Animation Variants ---------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// --------------- Page Component ---------------

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  // In a real app, fetch course data based on courseId
  const course = MOCK_COURSE;

  const progressPercent = Math.round(
    (course.completedLessons / course.totalLessons) * 100
  );

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status === "locked") return;
    router.push(`/learn/${courseId}/${lesson.id}`);
  };

  return (
    <div className="px-4 pt-4 pb-4">
      {/* Back button */}
      <motion.button
        className="mb-4 flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
        onClick={() => router.push("/learn")}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft size={18} />
        <span className="text-body">Kh\u00F3a h\u1ECDc</span>
      </motion.button>

      {/* Course header card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className="bg-gradient-to-br from-primary/15 via-dark-card to-secondary/10 border-primary/20"
          animated={false}
        >
          <div className="flex items-start gap-3 mb-4">
            {/* Flag */}
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-dark-elevated text-[32px] shrink-0">
              {course.flag}
            </div>

            {/* Title & Level */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-h1 text-white truncate">{course.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-small font-semibold",
                    getLevelColor(course.level)
                  )}
                >
                  {course.level}
                </span>
                <span className="text-small text-gray-400">
                  {course.description}
                </span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-around rounded-lg bg-dark/50 py-3 mb-4">
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-white">
                <BookOpen size={14} className="text-secondary" />
                <span className="text-h3">{course.totalLessons}</span>
              </div>
              <span className="text-small text-gray-400">b\u00E0i h\u1ECDc</span>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-white">
                <Clock size={14} className="text-accent-streak" />
                <span className="text-h3">{course.durationHours}</span>
              </div>
              <span className="text-small text-gray-400">gi\u1EDD</span>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-white">
                <CheckCircle2 size={14} className="text-status-success" />
                <span className="text-h3">{progressPercent}%</span>
              </div>
              <span className="text-small text-gray-400">ho\u00E0n th\u00E0nh</span>
            </div>
          </div>

          {/* Progress bar */}
          <ProgressBar
            value={course.completedLessons}
            max={course.totalLessons}
            color="bg-primary"
            size="md"
            showLabel
          />
        </Card>
      </motion.div>

      {/* Units list */}
      <motion.div
        className="mt-6 flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {course.units.map((unit) => (
          <motion.div key={unit.id} variants={itemVariants}>
            {/* Unit header */}
            <div className="mb-2 flex items-center gap-2">
              {getUnitStatusIcon(unit.status)}
              <h2
                className={cn(
                  "text-h3 flex-1",
                  unit.status === "locked" ? "text-gray-500" : "text-white"
                )}
              >
                {unit.title}
              </h2>
            </div>

            {/* Lessons list */}
            <div className="ml-2.5 border-l-2 border-gray-800 pl-5 flex flex-col gap-2">
              {unit.lessons.map((lesson) => {
                const TypeIcon = getLessonTypeIcon(lesson.type);
                const isClickable = lesson.status !== "locked";

                return (
                  <motion.div
                    key={lesson.id}
                    whileTap={isClickable ? { scale: 0.98 } : undefined}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-lg p-3 transition-colors",
                        lesson.status === "current"
                          ? "bg-primary/10 border border-primary/30"
                          : lesson.status === "completed"
                          ? "bg-dark-card border border-gray-800/50"
                          : "bg-dark-card/50 border border-gray-800/30",
                        isClickable
                          ? "cursor-pointer hover:border-gray-600"
                          : "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => handleLessonClick(lesson)}
                    >
                      {/* Status icon */}
                      <div className="shrink-0">
                        {getLessonStatusIcon(lesson.status)}
                      </div>

                      {/* Lesson info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-body truncate",
                            lesson.status === "locked"
                              ? "text-gray-500"
                              : "text-white"
                          )}
                        >
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                              getLessonTypeColor(lesson.type)
                            )}
                          >
                            <TypeIcon size={10} />
                            {getLessonTypeLabel(lesson.type)}
                          </span>
                          <span className="text-small text-gray-500">
                            +{lesson.xp} XP
                          </span>
                        </div>
                      </div>

                      {/* Chevron */}
                      {isClickable && (
                        <ChevronRight size={16} className="text-gray-500 shrink-0" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
