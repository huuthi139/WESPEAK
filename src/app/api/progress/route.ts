import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all user progress
    const { data: progress, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
    }

    // Get today's activity
    const today = new Date().toISOString().split("T")[0];
    const { data: todayActivity } = await supabase
      .from("daily_activity")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .single();

    // Get weekly activity
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { data: weekActivity } = await supabase
      .from("daily_activity")
      .select("*")
      .eq("user_id", user.id)
      .gte("date", weekAgo.toISOString().split("T")[0])
      .order("date", { ascending: true });

    return NextResponse.json({
      progress: progress || [],
      today: todayActivity || null,
      weekly: weekActivity || [],
      total_completed: progress?.filter((p) => p.completed).length || 0,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
