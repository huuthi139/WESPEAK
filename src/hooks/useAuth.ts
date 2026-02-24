"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import type { User, UserStats } from "@/types";

// Mock data for UI-first development
const MOCK_USER: User = {
  id: "mock-user-1",
  email: "minh@example.com",
  name: "Minh",
  avatar_url: null,
  native_language: "vietnamese",
  daily_goal_minutes: 20,
  created_at: new Date().toISOString(),
};

const MOCK_STATS: UserStats = {
  user_id: "mock-user-1",
  total_xp: 2450,
  current_streak: 15,
  longest_streak: 22,
  gems: 180,
  level: 8,
  lessons_completed: 42,
  total_minutes: 1260,
  last_active_date: new Date().toISOString().split("T")[0],
  updated_at: new Date().toISOString(),
};

export function useAuth() {
  const { user, stats, isLoading, setUser, setStats, setLoading, reset } =
    useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Mock: auto-login for development
    // Replace with Supabase auth when ready
    const timer = setTimeout(() => {
      setUser(MOCK_USER);
      setStats(MOCK_STATS);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [setUser, setStats, setLoading]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // TODO: Implement Supabase signIn using email + password
    void email;
    void password;
    setUser(MOCK_USER);
    setStats(MOCK_STATS);
    setLoading(false);
    router.push("/");
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    // TODO: Implement Supabase signUp using email + password
    void password;
    setUser({ ...MOCK_USER, email, name });
    setStats({ ...MOCK_STATS, total_xp: 0, current_streak: 0, level: 1 });
    setLoading(false);
    router.push("/onboarding");
  };

  const signOut = async () => {
    // TODO: Implement Supabase signOut
    reset();
    router.push("/login");
  };

  return {
    user,
    stats,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };
}
