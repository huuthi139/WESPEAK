import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, activity } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid XP amount required" }, { status: 400 });
    }

    // Get current stats
    const { data: stats, error: statsError } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (statsError || !stats) {
      return NextResponse.json({ error: "Stats not found" }, { status: 404 });
    }

    const newXP = stats.total_xp + amount;

    // Calculate new level
    const thresholds = [
      0, 200, 400, 600, 800, 1000, 1800, 2600, 3400, 4200,
      5000, 6500, 8000, 9500, 11000, 12500, 15000, 17500, 20000, 22500,
      25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000,
      100000,
    ];
    let newLevel = 1;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (newXP >= thresholds[i]) {
        newLevel = i + 1;
        break;
      }
    }

    // Update stats
    const { error: updateError } = await supabase
      .from("user_stats")
      .update({
        total_xp: newXP,
        level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (updateError) {
      return NextResponse.json({ error: "Failed to add XP" }, { status: 500 });
    }

    // Update daily activity
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await supabase
      .from("daily_activity")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .single();

    if (existing) {
      await supabase
        .from("daily_activity")
        .update({
          xp_earned: existing.xp_earned + amount,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("daily_activity").insert({
        user_id: user.id,
        date: today,
        xp_earned: amount,
      });
    }

    const leveledUp = newLevel > stats.level;

    return NextResponse.json({
      total_xp: newXP,
      level: newLevel,
      xp_added: amount,
      leveled_up: leveledUp,
      activity: activity || "unknown",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
