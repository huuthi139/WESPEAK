import { create } from "zustand";
import type { User, UserStats, UserLanguage, DailyActivity } from "@/types";

interface UserState {
  user: User | null;
  stats: UserStats | null;
  languages: UserLanguage[];
  todayActivity: DailyActivity | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setStats: (stats: UserStats | null) => void;
  setLanguages: (languages: UserLanguage[]) => void;
  setTodayActivity: (activity: DailyActivity | null) => void;
  setLoading: (loading: boolean) => void;
  addXP: (amount: number) => void;
  updateStreak: (streak: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  stats: null,
  languages: [],
  todayActivity: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setStats: (stats) => set({ stats }),
  setLanguages: (languages) => set({ languages }),
  setTodayActivity: (activity) => set({ todayActivity: activity }),
  setLoading: (isLoading) => set({ isLoading }),

  addXP: (amount) =>
    set((state) => ({
      stats: state.stats
        ? { ...state.stats, total_xp: state.stats.total_xp + amount }
        : null,
    })),

  updateStreak: (streak) =>
    set((state) => ({
      stats: state.stats
        ? { ...state.stats, current_streak: streak }
        : null,
    })),

  reset: () =>
    set({
      user: null,
      stats: null,
      languages: [],
      todayActivity: null,
      isLoading: false,
    }),
}));
