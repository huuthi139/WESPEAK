import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const period = request.nextUrl.searchParams.get("period") || "week";

    let leaderboardData;

    if (period === "today") {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("daily_activity")
        .select("user_id, xp_earned")
        .eq("date", today)
        .order("xp_earned", { ascending: false })
        .limit(50);

      const userIds = data?.map((d) => d.user_id) || [];
      const { data: users } = await supabase
        .from("users")
        .select("id, name, avatar_url")
        .in("id", userIds);

      leaderboardData = data?.map((entry, index) => {
        const userInfo = users?.find((u) => u.id === entry.user_id);
        return {
          rank: index + 1,
          user_id: entry.user_id,
          name: userInfo?.name || "Unknown",
          avatar_url: userInfo?.avatar_url,
          total_xp: entry.xp_earned,
          is_current_user: entry.user_id === user.id,
        };
      });
    } else {
      // Week or all time — use user_stats
      const { data } = await supabase
        .from("user_stats")
        .select("user_id, total_xp, current_streak")
        .order("total_xp", { ascending: false })
        .limit(50);

      const userIds = data?.map((d) => d.user_id) || [];
      const { data: users } = await supabase
        .from("users")
        .select("id, name, avatar_url")
        .in("id", userIds);

      leaderboardData = data?.map((entry, index) => {
        const userInfo = users?.find((u) => u.id === entry.user_id);
        return {
          rank: index + 1,
          user_id: entry.user_id,
          name: userInfo?.name || "Unknown",
          avatar_url: userInfo?.avatar_url,
          total_xp: entry.total_xp,
          current_streak: entry.current_streak,
          is_current_user: entry.user_id === user.id,
        };
      });
    }

    return NextResponse.json(leaderboardData || []);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
