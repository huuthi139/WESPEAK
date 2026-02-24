"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, GraduationCap } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

// --- Mock data ---

interface MockCourse {
  id: string;
  flag: string;
  title: string;
  level: string;
  totalLessons: number;
  durationHours: number;
  description: string;
  enrolled: boolean;
  progress: number; // 0-100
}

const mockCourses: MockCourse[] = [
  {
    id: "english-basics",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    title: "English Basics",
    level: "A1",
    totalLessons: 30,
    durationHours: 15,
    description: "N\u1EC1n t\u1EA3ng ti\u1EBFng Anh cho ng\u01B0\u1EDDi m\u1EDBi b\u1EAFt \u0111\u1EA7u",
    enrolled: true,
    progress: 85,
  },
  {
    id: "daily-conversation",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    title: "Daily Conversation",
    level: "A2",
    totalLessons: 40,
    durationHours: 20,
    description: "H\u1ED9i tho\u1EA1i h\u00E0ng ng\u00E0y th\u1EF1c t\u1EBF",
    enrolled: true,
    progress: 45,
  },
  {
    id: "business-english",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    title: "Business English",
    level: "B1-B2",
    totalLessons: 60,
    durationHours: 30,
    description: "Ti\u1EBFng Anh th\u01B0\u01A1ng m\u1EA1i chuy\u00EAn nghi\u1EC7p",
    enrolled: false,
    progress: 0,
  },
  {
    id: "toeic-prep",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    title: "TOEIC Preparation",
    level: "B1-B2",
    totalLessons: 70,
    durationHours: 35,
    description: "Luy\u1EC7n thi TOEIC t\u1EEB 500-800+",
    enrolled: false,
    progress: 0,
  },
  {
    id: "ielts-speaking",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    title: "IELTS Speaking",
    level: "B2-C1",
    totalLessons: 50,
    durationHours: 25,
    description: "Luy\u1EC7n n\u00F3i IELTS band 6.0-7.5",
    enrolled: false,
    progress: 0,
  },
];

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

  const filteredCourses = mockCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const enrolledCourses = filteredCourses.filter((c) => c.enrolled);
  const exploreCourses = filteredCourses.filter((c) => !c.enrolled);

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Page header */}
      <motion.h1
        className="text-h1 text-white mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Kh\u00F3a h\u1ECDc
      </motion.h1>

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
          placeholder="T\u00ECm ki\u1EBFm kh\u00F3a h\u1ECDc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md bg-dark-elevated border border-gray-700 pl-10 pr-4 py-2.5 text-body text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
        />
      </motion.div>

      {/* Enrolled courses */}
      {enrolledCourses.length > 0 && (
        <section className="mb-8">
          <motion.h2
            className="text-h2 text-white mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Kh\u00F3a h\u1ECDc c\u1EE7a b\u1EA1n
          </motion.h2>

          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {enrolledCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card
                  className="flex flex-col gap-3"
                  onClick={() => router.push(`/learn/${course.id}`)}
                >
                  <div className="flex items-start gap-3">
                    {/* Flag */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-dark-elevated text-[28px] shrink-0">
                      {course.flag}
                    </div>

                    {/* Info */}
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
                          {course.totalLessons} b\u00E0i
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {course.durationHours} gi\u1EDD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
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
      {exploreCourses.length > 0 && (
        <section>
          <motion.h2
            className="text-h2 text-white mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Kh\u00E1m ph\u00E1 th\u00EAm
          </motion.h2>

          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {exploreCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card
                  className="flex items-start gap-3"
                  onClick={() => router.push(`/learn/${course.id}`)}
                >
                  {/* Flag */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-dark-elevated text-[28px] shrink-0">
                    {course.flag}
                  </div>

                  {/* Info */}
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
                        {course.totalLessons} b\u00E0i
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {course.durationHours} gi\u1EDD
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
      {filteredCourses.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search size={40} className="mb-3 text-gray-600" />
          <p className="text-body">Kh\u00F4ng t\u00ECm th\u1EA5y kh\u00F3a h\u1ECDc n\u00E0o</p>
          <p className="text-small text-gray-600 mt-1">
            Th\u1EED t\u00ECm v\u1EDBi t\u1EEB kh\u00F3a kh\u00E1c
          </p>
        </motion.div>
      )}
    </div>
  );
}
