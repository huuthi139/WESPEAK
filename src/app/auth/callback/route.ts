import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      const supabase = createServerSupabaseClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(
          new URL("/login?error=auth", requestUrl.origin)
        );
      }
    } catch (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(
        new URL("/login?error=auth", requestUrl.origin)
      );
    }
  }

  // Redirect to home on success, or if no code was provided
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
