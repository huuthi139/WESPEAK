import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// GET /api/lessons?courseId=xxx — Get all lessons for a course with units
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

    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    // Get units
    const { data: units, error: unitsError } = await supabase
      .from("units")
      .select("*")
      .eq("course_id", courseId)
      .order("order_index", { ascending: true });

    if (unitsError) {
      return NextResponse.json({ error: "Failed to fetch units" }, { status: 500 });
    }

    // Get lessons for all units
    const unitIds = units?.map((u) => u.id) || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lessons: any[] = [];
    if (unitIds.length > 0) {
      const { data: lessonsData, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .in("unit_id", unitIds)
        .order("order_index", { ascending: true });

      if (lessonsError) {
        return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
      }
      lessons = lessonsData || [];
    }

    // Get user progress
    const lessonIds = lessons?.map((l) => l.id) || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let progress: any[] = [];
    if (lessonIds.length > 0) {
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .in("lesson_id", lessonIds);
      progress = progressData || [];
    }

    // Combine data
    const unitsWithLessons = units?.map((unit) => ({
      ...unit,
      lessons: lessons
        ?.filter((l) => l.unit_id === unit.id)
        .map((lesson) => ({
          ...lesson,
          progress: progress?.find((p) => p.lesson_id === lesson.id) || null,
        })),
    }));

    return NextResponse.json(unitsWithLessons);
  } catch (error) {
    console.error("Lessons API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/lessons — Mark a lesson as complete
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

    const { lessonId, score } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    // Get lesson info for XP
    const { data: lesson } = await supabase
      .from("lessons")
      .select("xp_reward")
      .eq("id", lessonId)
      .single();

    // Upsert progress
    const { error: progressError } = await supabase
      .from("user_progress")
      .upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          score: score || null,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" }
      );

    if (progressError) {
      return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
    }

    // Update user stats
    const xpReward = lesson?.xp_reward || 10;
    const { error: statsError } = await supabase.rpc("add_xp_and_update_stats", {
      p_user_id: user.id,
      p_xp: xpReward,
    });

    // If RPC doesn't exist, fall back to manual increment
    if (statsError) {
      const { data: currentStats } = await supabase
        .from("user_stats")
        .select("total_xp, lessons_completed")
        .eq("user_id", user.id)
        .single();

      if (currentStats) {
        const { error: fallbackError } = await supabase
          .from("user_stats")
          .update({
            total_xp: currentStats.total_xp + xpReward,
            lessons_completed: currentStats.lessons_completed + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id);
        if (fallbackError) {
          console.error("Stats fallback update error:", fallbackError);
        }
      }
    }

    return NextResponse.json({ success: true, xp_earned: xpReward });
  } catch (error) {
    console.error("Lessons API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
