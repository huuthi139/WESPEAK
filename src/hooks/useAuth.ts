"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { createClient } from "@/lib/supabase/client";
import type { User, UserStats } from "@/types";

export function useAuth() {
  const { user, stats, isLoading, setUser, setStats, setLoading, reset } =
    useUserStore();
  const router = useRouter();
  const initialized = useRef(false);

  const fetchUserProfile = useCallback(
    async (userId: string, email: string, metadataName?: string) => {
      const supabase = createClient();

      // Fetch user profile from users table
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError && profileError.code === "PGRST116") {
        // No row found — new user, create profile
        const newUser: User = {
          id: userId,
          email,
          name: metadataName || email.split("@")[0],
          avatar_url: null,
          native_language: "vietnamese",
          daily_goal_minutes: 15,
          created_at: new Date().toISOString(),
        };

        const { error: insertUserError } = await supabase
          .from("users")
          .insert(newUser);

        if (insertUserError) {
          console.error("Error creating user profile:", insertUserError);
          return;
        }

        // Create default stats
        const newStats: UserStats = {
          user_id: userId,
          total_xp: 0,
          current_streak: 0,
          longest_streak: 0,
          gems: 50,
          level: 1,
          lessons_completed: 0,
          total_minutes: 0,
          last_active_date: null,
          updated_at: new Date().toISOString(),
        };

        const { error: insertStatsError } = await supabase
          .from("user_stats")
          .insert(newStats);

        if (insertStatsError) {
          console.error("Error creating user stats:", insertStatsError);
        }

        setUser(newUser);
        setStats(newStats);
        return;
      }

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        return;
      }

      setUser(profile as User);

      // Fetch stats
      const { data: statsData, error: statsError } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (statsError && statsError.code === "PGRST116") {
        // No stats row — create default
        const newStats: UserStats = {
          user_id: userId,
          total_xp: 0,
          current_streak: 0,
          longest_streak: 0,
          gems: 50,
          level: 1,
          lessons_completed: 0,
          total_minutes: 0,
          last_active_date: null,
          updated_at: new Date().toISOString(),
        };

        const { error: insertStatsError } = await supabase
          .from("user_stats")
          .insert(newStats);

        if (insertStatsError) {
          console.error("Error creating user stats:", insertStatsError);
        }

        setStats(newStats);
        return;
      }

      if (statsError) {
        console.error("Error fetching user stats:", statsError);
        return;
      }

      setStats(statsData as UserStats);
    },
    [setUser, setStats]
  );

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const supabase = createClient();

    // Check current session on mount
    const initSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          await fetchUserProfile(
            session.user.id,
            session.user.email ?? "",
            session.user.user_metadata?.name as string | undefined
          );
        }
      } catch (error) {
        console.error("Error initializing session:", error);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await fetchUserProfile(
          session.user.id,
          session.user.email ?? "",
          session.user.user_metadata?.name as string | undefined
        );
        setLoading(false);
      } else if (event === "SIGNED_OUT") {
        reset();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, setLoading, reset]);

  const signIn = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      // Return Vietnamese error messages
      if (error.message === "Invalid login credentials") {
        return "Email hoặc mật khẩu không đúng";
      }
      if (error.message === "Email not confirmed") {
        return "Vui lòng xác nhận email trước khi đăng nhập";
      }
      if (error.message.includes("Too many requests")) {
        return "Quá nhiều lần thử. Vui lòng đợi một lát";
      }
      return error.message;
    }

    // Profile will be fetched by onAuthStateChange
    router.push("/");
    return null;
  };

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<string | null> => {
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      setLoading(false);
      if (error.message.includes("already registered")) {
        return "Email này đã được đăng ký";
      }
      if (error.message.includes("Password")) {
        return "Mật khẩu phải có ít nhất 6 ký tự";
      }
      if (error.message.includes("valid email")) {
        return "Địa chỉ email không hợp lệ";
      }
      if (error.message.includes("Too many requests")) {
        return "Quá nhiều lần thử. Vui lòng đợi một lát";
      }
      return error.message;
    }

    if (data.user) {
      // Insert user profile and stats
      const newUser: User = {
        id: data.user.id,
        email,
        name,
        avatar_url: null,
        native_language: "vietnamese",
        daily_goal_minutes: 15,
        created_at: new Date().toISOString(),
      };

      const { error: insertUserError } = await supabase
        .from("users")
        .insert(newUser);

      if (insertUserError) {
        console.error("Error creating user profile:", insertUserError);
        setLoading(false);
        return "Không thể tạo hồ sơ người dùng";
      }

      const newStats: UserStats = {
        user_id: data.user.id,
        total_xp: 0,
        current_streak: 0,
        longest_streak: 0,
        gems: 50,
        level: 1,
        lessons_completed: 0,
        total_minutes: 0,
        last_active_date: null,
        updated_at: new Date().toISOString(),
      };

      const { error: insertStatsError } = await supabase
        .from("user_stats")
        .insert(newStats);

      if (insertStatsError) {
        console.error("Error creating user stats:", insertStatsError);
      }

      setUser(newUser);
      setStats(newStats);
      setLoading(false);
      router.push("/onboarding");
    }

    return null;
  };

  const signInWithGoogle = async (): Promise<void> => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const signOut = async (): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signOut();
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
    signInWithGoogle,
    signOut,
  };
}
