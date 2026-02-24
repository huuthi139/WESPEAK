import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, lang } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // TTS is handled client-side via Web Speech API
    // This endpoint is a placeholder for future server-side TTS (e.g., Azure)
    return NextResponse.json({
      message: "Use Web Speech API for TTS on the client side",
      text,
      lang: lang || "en-US",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process TTS request" },
      { status: 500 }
    );
  }
}
