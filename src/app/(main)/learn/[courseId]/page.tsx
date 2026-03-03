"use client";

import { useState, useEffect } from "react";
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
  PenLine,
  ChevronRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import {
  findCourse,
  getUnitsForCourse,
  type MockCourse,
  type MockUnit,
  type MockLesson,
} from "@/data/multi-lang-courses";
import type { LessonType } from "@/types";

// --------------- Helpers ---------------

function getLevelColor(level: string): string {
  if (level === "A1") return "bg-status-success/20 text-status-success";
  if (level === "A2") return "bg-secondary/20 text-secondary";
  if (level.startsWith("B")) return "bg-status-warning/20 text-status-warning";
  return "bg-accent-xp/20 text-accent-xp";
}

function getLessonTypeLabel(type: LessonType): string {
  switch (type) {
    case "vocabulary": return "Từ vựng";
    case "listening": return "Nghe";
    case "speaking": return "Nói";
    case "grammar": return "Ngữ pháp";
    case "quiz": return "Kiểm tra";
    default: return type;
  }
}

function getLessonTypeColor(type: LessonType): string {
  switch (type) {
    case "vocabulary": return "bg-primary/20 text-primary";
    case "listening": return "bg-secondary/20 text-secondary";
    case "speaking": return "bg-accent-streak/20 text-accent-streak";
    case "grammar": return "bg-accent-gems/20 text-accent-gems";
    case "quiz": return "bg-status-warning/20 text-status-warning";
    default: return "bg-gray-500/20 text-gray-400";
  }
}

function getLessonTypeIcon(type: LessonType) {
  switch (type) {
    case "vocabulary": return BookOpen;
    case "listening": return Volume2;
    case "speaking": return Mic;
    case "grammar": return PenLine;
    case "quiz": return HelpCircle;
    default: return BookOpen;
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

// --------------- Types for API response ---------------

interface ApiUnit {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  lessons: ApiLesson[];
}

interface ApiLesson {
  id: string;
  unit_id: string;
  title: string;
  type: LessonType;
  duration_minutes: number;
  xp_reward: number;
  order_index: number;
  progress: { completed: boolean; score: number | null } | null;
}

// --------------- Page Component ---------------

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<MockCourse | null>(null);
  const [units, setUnits] = useState<MockUnit[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Save as last visited course
    try { localStorage.setItem("wespeak_last_course", courseId); } catch { /* ignore */ }

    // Load mock data immediately
    const mockCourse = findCourse(courseId);
    const mockUnits = getUnitsForCourse(courseId);
    if (mockCourse) setCourse(mockCourse);
    if (mockUnits.length > 0) setUnits(mockUnits);

    // Save last accessed course for "Continue Learning"
    try { localStorage.setItem("wespeak_last_course", courseId); } catch { /* ignore */ }

    // Try API
    let cancelled = false;
    async function fetchFromApi() {
      try {
        const res = await fetch(`/api/lessons?courseId=${courseId}`);
        if (!res.ok) throw new Error("api");
        const data: ApiUnit[] = await res.json();
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          const completed = new Set<string>();
          const apiUnits: MockUnit[] = data.map((u) => ({
            id: u.id,
            course_id: u.course_id,
            title: u.title,
            description: u.description || "",
            order_index: u.order_index,
            lessons: (u.lessons || []).map((l: ApiLesson) => {
              if (l.progress?.completed) completed.add(l.id);
              return {
                id: l.id,
                unit_id: l.unit_id,
                title: l.title,
                type: l.type,
                content: {},
                duration_minutes: l.duration_minutes,
                xp_reward: l.xp_reward,
                order_index: l.order_index,
                progress: l.progress,
              };
            }),
          }));
          setUnits(apiUnits);
          setCompletedIds(completed);
        }
      } catch {
        // Keep mock data
      }
    }
    fetchFromApi();
    return () => { cancelled = true; };
  }, [courseId]);

  // Read completedIds from localStorage too
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wespeak_completed");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        setCompletedIds((prev) => new Set([...Array.from(prev), ...ids]));
      }
    } catch { /* ignore */ }
  }, []);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const totalLessons = units.reduce((sum, u) => sum + u.lessons.length, 0);
  const completedCount = units.reduce(
    (sum, u) => sum + u.lessons.filter((l) => completedIds.has(l.id) || l.progress?.completed).length,
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Determine lesson status: first uncompleted = current, before = completed, after = unlocked (not locked for now)
  function getLessonStatus(lesson: MockLesson): "completed" | "current" | "available" {
    if (completedIds.has(lesson.id) || lesson.progress?.completed) return "completed";
    return "available";
  }

  // Find first uncompleted lesson for "current" highlight
  let foundCurrent = false;
  function getLessonDisplayStatus(lesson: MockLesson): "completed" | "current" | "available" {
    const base = getLessonStatus(lesson);
    if (base === "completed") return "completed";
    if (!foundCurrent) {
      foundCurrent = true;
      return "current";
    }
    return "available";
  }

  // Unit status
  function getUnitStatus(unit: MockUnit): "completed" | "current" | "locked" {
    const allCompleted = unit.lessons.every(
      (l) => completedIds.has(l.id) || l.progress?.completed
    );
    if (allCompleted) return "completed";
    const anyCompleted = unit.lessons.some(
      (l) => completedIds.has(l.id) || l.progress?.completed
    );
    if (anyCompleted || !foundCurrent) return "current";
    return "locked";
  }

  // Reset for render
  foundCurrent = false;

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
        <span className="text-body">Khóa học</span>
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
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-dark-elevated text-[32px] shrink-0">
              {course.language === "chinese" ? "🇨🇳" : course.language === "korean" ? "🇰🇷" : course.language === "japanese" ? "🇯🇵" : "🇬🇧"}
            </div>
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
                <span className="text-h3">{totalLessons}</span>
              </div>
              <span className="text-small text-gray-400">bài học</span>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-white">
                <Clock size={14} className="text-accent-streak" />
                <span className="text-h3">{course.duration_hours}</span>
              </div>
              <span className="text-small text-gray-400">giờ</span>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-white">
                <CheckCircle2 size={14} className="text-status-success" />
                <span className="text-h3">{progressPercent}%</span>
              </div>
              <span className="text-small text-gray-400">hoàn thành</span>
            </div>
          </div>

          {/* Progress bar */}
          <ProgressBar
            value={completedCount}
            max={totalLessons || 1}
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
        {units.map((unit) => {
          const unitStatus = getUnitStatus(unit);

          return (
            <motion.div key={unit.id} variants={itemVariants}>
              {/* Unit header */}
              <div className="mb-2 flex items-center gap-2">
                {unitStatus === "completed" && (
                  <CheckCircle2 size={20} className="text-status-success" />
                )}
                {unitStatus === "current" && (
                  <Play size={20} className="text-primary" />
                )}
                {unitStatus === "locked" && (
                  <Lock size={20} className="text-gray-600" />
                )}
                <h2
                  className={cn(
                    "text-h3 flex-1",
                    unitStatus === "locked" ? "text-gray-500" : "text-white"
                  )}
                >
                  {unit.title}
                </h2>
              </div>

              {/* Lessons list */}
              <div className="ml-2.5 border-l-2 border-gray-800 pl-5 flex flex-col gap-2">
                {unit.lessons.map((lesson) => {
                  const status = getLessonDisplayStatus(lesson);
                  const TypeIcon = getLessonTypeIcon(lesson.type);
                  const isCompleted = status === "completed";
                  const isCurrent = status === "current";

                  return (
                    <motion.div
                      key={lesson.id}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 rounded-lg p-3 transition-colors cursor-pointer",
                          isCurrent
                            ? "bg-primary/10 border border-primary/30"
                            : isCompleted
                            ? "bg-dark-card border border-gray-800/50"
                            : "bg-dark-card/50 border border-gray-800/30",
                          "hover:border-gray-600"
                        )}
                        onClick={() =>
                          router.push(`/learn/${courseId}/${lesson.id}`)
                        }
                      >
                        {/* Status icon */}
                        <div className="shrink-0">
                          {isCompleted && (
                            <CheckCircle2 size={16} className="text-status-success" />
                          )}
                          {isCurrent && (
                            <div className="flex h-4 w-4 items-center justify-center">
                              <Play size={14} className="text-primary fill-primary" />
                            </div>
                          )}
                          {!isCompleted && !isCurrent && (
                            <div className="h-4 w-4 rounded-full border-2 border-gray-600" />
                          )}
                        </div>

                        {/* Lesson info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-body text-white truncate">
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
                              +{lesson.xp_reward} XP
                            </span>
                          </div>
                        </div>

                        {/* Chevron */}
                        <ChevronRight size={16} className="text-gray-500 shrink-0" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
