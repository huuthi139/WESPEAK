import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: stats } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!stats) {
      return NextResponse.json({ error: "Stats not found" }, { status: 404 });
    }

    const today = new Date().toISOString().split("T")[0];
    const lastActive = stats.last_active_date;

    let newStreak = stats.current_streak;

    if (lastActive === today) {
      // Already active today, no change
      return NextResponse.json({
        current_streak: newStreak,
        longest_streak: stats.longest_streak,
        streak_maintained: true,
      });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastActive === yesterdayStr) {
      // Consecutive day
      newStreak += 1;
    } else if (lastActive) {
      // Streak broken
      newStreak = 1;
    } else {
      // First activity ever
      newStreak = 1;
    }

    const longestStreak = Math.max(newStreak, stats.longest_streak);

    // Update stats
    const { error: updateError } = await supabase
      .from("user_stats")
      .update({
        current_streak: newStreak,
        longest_streak: longestStreak,
        last_active_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Streak update error:", updateError);
      return NextResponse.json({ error: "Failed to update streak" }, { status: 500 });
    }

    // Calculate streak XP bonus
    const streakXP = 5 * newStreak;

    return NextResponse.json({
      current_streak: newStreak,
      longest_streak: longestStreak,
      streak_xp_bonus: streakXP,
      streak_maintained: true,
    });
  } catch (error) {
    console.error("Streak API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
