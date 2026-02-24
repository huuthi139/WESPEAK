import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { targetText } = await request.json();

    if (!targetText) {
      return NextResponse.json(
        { error: "Target text is required" },
        { status: 400 }
      );
    }

    // Pronunciation scoring is handled client-side for MVP
    // This endpoint is a placeholder for future Azure Speech integration
    // For now, return mock scoring data
    const mockScore = Math.floor(Math.random() * 30) + 70;

    return NextResponse.json({
      overallScore: mockScore,
      phonemes: targetText.split("").map((char: string) => ({
        sound: char,
        score: Math.floor(Math.random() * 40) + 60,
      })),
      feedback:
        mockScore >= 85
          ? "Tuyệt vời! Phát âm rất tốt!"
          : mockScore >= 70
          ? "Khá tốt! Hãy thử luyện thêm."
          : "Cần luyện tập thêm. Hãy nghe lại và thử lại.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process pronunciation" },
      { status: 500 }
    );
  }
}
