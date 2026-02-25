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

    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("language");

    let query = supabase
      .from("courses")
      .select("*")
      .order("order_index", { ascending: true });

    if (language) {
      query = query.eq("language", language);
    }

    const { data: courses, error } = await query;

    if (error) {
      return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }

    // Get user progress for each course
    const { data: progress } = await supabase
      .from("user_progress")
      .select("lesson_id, completed, score")
      .eq("user_id", user.id);

    const { data: lessons } = await supabase
      .from("lessons")
      .select("id, unit_id");

    const { data: units } = await supabase
      .from("units")
      .select("id, course_id");

    // Calculate progress per course
    const coursesWithProgress = courses?.map((course) => {
      const courseUnits = units?.filter((u) => u.course_id === course.id) || [];
      const unitIds = courseUnits.map((u) => u.id);
      const courseLessons = lessons?.filter((l) => unitIds.includes(l.unit_id)) || [];
      const completedLessons = courseLessons.filter((l) =>
        progress?.some((p) => p.lesson_id === l.id && p.completed)
      );
      const progressPercent = courseLessons.length > 0
        ? Math.round((completedLessons.length / courseLessons.length) * 100)
        : 0;

      return {
        ...course,
        progress: progressPercent,
        completed_lessons: completedLessons.length,
      };
    });

    return NextResponse.json(coursesWithProgress);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
