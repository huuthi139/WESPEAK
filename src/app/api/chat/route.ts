import { NextRequest, NextResponse } from "next/server";
import { getOpenAI, CHAT_MODEL } from "@/lib/openai";
import type { ChatApiRequest, ChatScenario } from "@/types";

const SCENARIO_PROMPTS: Record<ChatScenario, string> = {
  free_chat: `You are a friendly English tutor for Vietnamese learners. Have a natural conversation while gently correcting grammar and vocabulary mistakes. Provide Vietnamese translations in parentheses for difficult words. Keep responses concise (2-3 sentences). If the student makes a mistake, correct it kindly with an explanation.`,

  job_interview: `You are an HR manager conducting a job interview in English. Ask professional questions one at a time. If the student makes grammar/vocabulary mistakes, note them after your response. Keep the interview realistic but supportive. Provide Vietnamese translations for difficult terms.`,

  restaurant: `You are a friendly waiter at an English-speaking restaurant. Help the student practice ordering food, asking about the menu, and making special requests. Correct any language mistakes gently. Provide Vietnamese translations for food-related vocabulary.`,

  shopping: `You are a helpful store assistant. Help the student practice shopping conversations - asking about products, prices, sizes, and colors. Correct language mistakes naturally. Provide Vietnamese translations for shopping vocabulary.`,

  travel: `You are a friendly tour guide. Help the student practice asking for directions, booking tickets, and making travel plans. Correct language mistakes gently. Provide Vietnamese translations for travel-related vocabulary.`,

  hotel: `You are a hotel receptionist. Help the student practice checking in, asking about amenities, and making requests. Correct language mistakes naturally. Provide Vietnamese translations for hotel vocabulary.`,
};

export async function POST(request: NextRequest) {
  try {
    const body: ChatApiRequest = await request.json();
    const { message, scenario, history } = body;

    if (!message || !scenario) {
      return NextResponse.json(
        { error: "Message and scenario are required" },
        { status: 400 }
      );
    }

    const systemPrompt = SCENARIO_PROMPTS[scenario] || SCENARIO_PROMPTS.free_chat;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.slice(-10).map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    const completion = await getOpenAI().chat.completions.create({
      model: CHAT_MODEL,
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiMessage = completion.choices[0]?.message?.content || "I'm sorry, I didn't understand that.";

    // Simple correction detection
    const hasCorrection =
      aiMessage.toLowerCase().includes("correct") ||
      aiMessage.toLowerCase().includes("should be") ||
      aiMessage.toLowerCase().includes("instead of") ||
      aiMessage.toLowerCase().includes("remember to");

    return NextResponse.json({
      message: aiMessage,
      feedback: {
        hasCorrection,
        corrections: hasCorrection ? [aiMessage.split(".")[0]] : [],
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
