"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, GraduationCap } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import {
  ALL_COURSES,
  getCoursesByLanguage,
  type MockCourse,
} from "@/data/multi-lang-courses";

// --- Language tabs ---

interface LanguageTab {
  key: string;
  label: string;
  flag: string;
}

const LANGUAGE_TABS: LanguageTab[] = [
  { key: "all", label: "Tất cả", flag: "🌍" },
  { key: "english", label: "Tiếng Anh", flag: "🇬🇧" },
  { key: "chinese", label: "Tiếng Trung", flag: "🇨🇳" },
  { key: "korean", label: "Tiếng Hàn", flag: "🇰🇷" },
  { key: "japanese", label: "Tiếng Nhật", flag: "🇯🇵" },
];

function getLanguageFlag(language: string): string {
  const tab = LANGUAGE_TABS.find((t) => t.key === language);
  return tab?.flag ?? "🌍";
}

// --- Helpers ---

function getLevelColor(level: string): string {
  if (level === "A1") return "bg-status-success/20 text-status-success";
  if (level === "A2") return "bg-secondary/20 text-secondary";
  if (level.startsWith("B")) return "bg-status-warning/20 text-status-warning";
  return "bg-accent-xp/20 text-accent-xp";
}

// --- Animation variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// --- Component ---

export default function LearnPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("all");
  const [courses, setCourses] = useState<MockCourse[]>(ALL_COURSES);

  // Try fetching from API; fall back to mock data
  useEffect(() => {
    let cancelled = false;
    async function fetchCourses() {
      try {
        const url =
          activeLanguage === "all"
            ? "/api/courses"
            : `/api/courses?language=${activeLanguage}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("api");
        const data = await res.json();
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setCourses(
            data.map((c: Record<string, unknown>) => ({
              id: c.id as string,
              language: c.language as string,
              title: c.title as string,
              description: (c.description as string) || "",
              level: c.level as string,
              total_lessons: c.total_lessons as number,
              duration_hours: c.duration_hours as number,
              is_premium: c.is_premium as boolean,
              order_index: c.order_index as number,
              progress: (c.progress as number) || 0,
              completed_lessons: (c.completed_lessons as number) || 0,
            }))
          );
        }
      } catch {
        // Use mock data based on active language filter
        if (!cancelled) {
          setCourses(
            activeLanguage === "all"
              ? ALL_COURSES
              : getCoursesByLanguage(activeLanguage)
          );
        }
      }
    }
    fetchCourses();
    return () => {
      cancelled = true;
    };
  }, [activeLanguage]);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const enrolled = filtered.filter((c) => c.progress > 0);
  const explore = filtered.filter((c) => c.progress === 0);

  const activeTab = LANGUAGE_TABS.find((t) => t.key === activeLanguage);
  const pageTitle =
    activeLanguage === "all"
      ? "Tất cả ngôn ngữ"
      : activeTab?.label ?? "Khóa học";

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <motion.div
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-[28px]">{activeTab?.flag ?? "🌍"}</span>
        <h1 className="text-h1 text-white">{pageTitle}</h1>
      </motion.div>

      {/* Language filter tabs */}
      <motion.div
        className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 }}
      >
        {LANGUAGE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveLanguage(tab.key)}
            className={cn(
              "flex items-center gap-1.5 shrink-0 rounded-full px-3.5 py-2 text-small font-medium transition-colors",
              activeLanguage === tab.key
                ? "bg-primary text-white"
                : "bg-dark-elevated text-gray-400 hover:bg-dark-elevated/80"
            )}
          >
            <span className="text-[16px]">{tab.flag}</span>
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Search bar */}
      <motion.div
        className="relative mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md bg-dark-elevated border border-gray-700 pl-10 pr-4 py-2.5 text-body text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
        />
      </motion.div>

      {/* Enrolled courses */}
      {enrolled.length > 0 && (
        <section className="mb-8">
          <motion.h2
            className="text-h2 text-white mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Đang học
          </motion.h2>

          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {enrolled.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card
                  className="flex flex-col gap-3"
                  onClick={() => router.push(`/learn/${course.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-dark-elevated text-[28px] shrink-0">
                      {getLanguageFlag(course.language)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-h3 text-white truncate">
                          {course.title}
                        </h3>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            getLevelColor(course.level)
                          )}
                        >
                          {course.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-small text-gray-400">
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {course.total_lessons} bài
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {course.duration_hours} giờ
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar
                      value={course.progress}
                      max={100}
                      size="sm"
                      className="flex-1"
                    />
                    <span className="text-small font-semibold text-primary shrink-0">
                      {course.progress}%
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Explore courses */}
      {explore.length > 0 && (
        <section>
          <motion.h2
            className="text-h2 text-white mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {enrolled.length > 0 ? "Khám phá thêm" : "Khóa học"}
          </motion.h2>

          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {explore.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card
                  className="flex items-start gap-3"
                  onClick={() => router.push(`/learn/${course.id}`)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-dark-elevated text-[28px] shrink-0">
                    {getLanguageFlag(course.language)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-h3 text-white truncate">
                        {course.title}
                      </h3>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          getLevelColor(course.level)
                        )}
                      >
                        {course.level}
                      </span>
                    </div>
                    <p className="text-small text-gray-400 mb-1.5">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 text-small text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {course.total_lessons} bài
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {course.duration_hours} giờ
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap size={12} />
                        {course.level}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Empty search */}
      {filtered.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search size={40} className="mb-3 text-gray-600" />
          <p className="text-body">Không tìm thấy khóa học nào</p>
          <p className="text-small text-gray-600 mt-1">
            Thử tìm với từ khóa khác
          </p>
        </motion.div>
      )}
    </div>
  );
}
