import { create } from "zustand";
import type { Course, Unit, Lesson, UserProgress } from "@/types";

interface LearningState {
  courses: Course[];
  currentCourse: Course | null;
  units: Unit[];
  lessons: Lesson[];
  progress: UserProgress[];
  isLoading: boolean;

  setCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course | null) => void;
  setUnits: (units: Unit[]) => void;
  setLessons: (lessons: Lesson[]) => void;
  setProgress: (progress: UserProgress[]) => void;
  setLoading: (loading: boolean) => void;
  markLessonComplete: (lessonId: string, score: number) => void;
  getCourseProgress: (courseId: string) => number;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  courses: [],
  currentCourse: null,
  units: [],
  lessons: [],
  progress: [],
  isLoading: false,

  setCourses: (courses) => set({ courses }),
  setCurrentCourse: (currentCourse) => set({ currentCourse }),
  setUnits: (units) => set({ units }),
  setLessons: (lessons) => set({ lessons }),
  setProgress: (progress) => set({ progress }),
  setLoading: (isLoading) => set({ isLoading }),

  markLessonComplete: (lessonId, score) =>
    set((state) => {
      const existing = state.progress.find((p) => p.lesson_id === lessonId);
      if (existing) {
        return {
          progress: state.progress.map((p) =>
            p.lesson_id === lessonId
              ? { ...p, completed: true, score, completed_at: new Date().toISOString() }
              : p
          ),
        };
      }
      return {
        progress: [
          ...state.progress,
          {
            id: crypto.randomUUID(),
            user_id: "",
            lesson_id: lessonId,
            completed: true,
            score,
            completed_at: new Date().toISOString(),
          },
        ],
      };
    }),

  getCourseProgress: (courseId) => {
    const state = get();
    const courseUnits = state.units.filter((u) => u.course_id === courseId);
    const unitIds = courseUnits.map((u) => u.id);
    const courseLessons = state.lessons.filter((l) => unitIds.includes(l.unit_id));
    if (courseLessons.length === 0) return 0;
    const completedCount = courseLessons.filter((l) =>
      state.progress.some((p) => p.lesson_id === l.id && p.completed)
    ).length;
    return Math.round((completedCount / courseLessons.length) * 100);
  },
}));
