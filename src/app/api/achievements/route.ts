import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all achievements
    const { data: achievements, error } = await supabase
      .from("achievements")
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
    }

    // Get user's unlocked achievements
    const { data: unlocked } = await supabase
      .from("user_achievements")
      .select("achievement_id, unlocked_at")
      .eq("user_id", user.id);

    const unlockedIds = new Set(unlocked?.map((u) => u.achievement_id));

    const achievementsWithStatus = achievements?.map((a) => ({
      ...a,
      unlocked: unlockedIds.has(a.id),
      unlocked_at: unlocked?.find((u) => u.achievement_id === a.id)?.unlocked_at || null,
    }));

    return NextResponse.json(achievementsWithStatus);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
