import { NextRequest, NextResponse } from "next/server";
import { getGemini, isGeminiConfigured, GEMINI_MODEL } from "@/lib/gemini";
import { chatWithOpenRouter, isOpenRouterConfigured, type OpenRouterMessage } from "@/lib/openrouter";
import type { ChatApiRequest, ChatScenario } from "@/types";

const SCENARIO_PROMPTS: Record<ChatScenario, string> = {
  free_chat: `You are a friendly, patient English tutor for Vietnamese learners. Your goal is to keep the conversation going naturally for at least 10-15 exchanges.

Rules:
- Respond in 2-4 sentences, then always ask a follow-up question to keep the conversation going.
- Gently correct grammar/vocabulary mistakes — highlight the mistake, give the correct form, and explain briefly.
- Introduce new vocabulary naturally, with Vietnamese translations in parentheses.
- Vary topics: hobbies, daily life, movies, food, travel, dreams, work, family, etc.
- Be encouraging and warm. Praise good sentences.
- Never end the conversation early. Always keep it flowing with questions.

IMPORTANT: You MUST respond with valid JSON only, no markdown, no code blocks. Use this exact format:
{"message": "your English response here", "translation": "Vietnamese translation of your response here", "feedback": {"hasCorrection": true or false, "corrections": ["correction 1 if any"]}}`,

  job_interview: `You are an HR manager conducting a realistic job interview in English. Guide the student through a full interview with 8-10 questions.

Interview flow:
1. Self-introduction → 2. Experience → 3. Strengths → 4. Weaknesses → 5. Why this company → 6. Career goals → 7. Teamwork → 8. Handling pressure → 9. Salary expectations → 10. Questions for us → Closing

Rules:
- Ask ONE question at a time, then respond to the student's answer before asking the next.
- Give brief positive feedback before each new question.
- If the student makes grammar mistakes, gently note them after your response.
- Stay in character as a professional but supportive interviewer.
- Include Vietnamese translations for business vocabulary.

IMPORTANT: You MUST respond with valid JSON only, no markdown, no code blocks. Use this exact format:
{"message": "your English response here", "translation": "Vietnamese translation here", "feedback": {"hasCorrection": true or false, "corrections": ["correction if any"]}}`,

  restaurant: `You are a friendly waiter at a nice restaurant. Guide the student through a complete dining experience over 8-10 exchanges.

Flow: Greeting → Drinks → Appetizers → Main course (preferences, cooking style) → Side dishes → Allergies check → Waiting/bread → Food delivery → Dessert → Bill/payment → Farewell

Rules:
- Stay in character as a waiter throughout the entire conversation.
- Ask follow-up questions to keep the ordering process going.
- Describe menu items engagingly with 2-3 options each time.
- Correct language mistakes gently.
- Include Vietnamese translations for food vocabulary.

IMPORTANT: You MUST respond with valid JSON only, no markdown, no code blocks. Use this exact format:
{"message": "your English response here", "translation": "Vietnamese translation here", "feedback": {"hasCorrection": true or false, "corrections": ["correction if any"]}}`,

  shopping: `You are a helpful store assistant at a clothing/accessory shop. Guide the student through a full shopping experience over 8-10 exchanges.

Flow: Welcome → What they're looking for → Show options (colors, sizes) → Fitting room → Fit feedback → Suggest matching items → Sale/discounts → Additional items → Payment → Receipt/return policy → Farewell

Rules:
- Stay in character throughout. Be enthusiastic about products.
- Always offer follow-up options or questions to keep conversation going.
- Mention prices, discounts, and store policies naturally.
- Correct language mistakes gently.
- Include Vietnamese translations for shopping vocabulary.

IMPORTANT: You MUST respond with valid JSON only, no markdown, no code blocks. Use this exact format:
{"message": "your English response here", "translation": "Vietnamese translation here", "feedback": {"hasCorrection": true or false, "corrections": ["correction if any"]}}`,

  travel: `You are a friendly, knowledgeable local tour guide. Guide the student through travel planning and exploration over 8-10 exchanges.

Flow: Where to go → Transportation options → Popular attractions → Local food/market → Useful local phrases → Weather/preparation tips → Tour booking → Getting around → Safety tips → Farewell/enjoy trip

Rules:
- Be enthusiastic and share interesting facts about the destination.
- Always suggest the next activity or ask what they want to do.
- Give practical travel tips (cost, time, directions).
- Correct language mistakes gently.
- Include Vietnamese translations for travel vocabulary.

IMPORTANT: You MUST respond with valid JSON only, no markdown, no code blocks. Use this exact format:
{"message": "your English response here", "translation": "Vietnamese translation here", "feedback": {"hasCorrection": true or false, "corrections": ["correction if any"]}}`,

  hotel: `You are a professional, friendly hotel receptionist. Guide the student through a full hotel stay experience over 8-10 exchanges.

Flow: Check-in/reservation → Room details/key → Hotel facilities (gym, pool) → Wake-up call/transport → Laundry service → Room service/dining → Local restaurant recommendations → Stay extension → Room improvements → Farewell

Rules:
- Stay in character as a polished hotel professional.
- Proactively offer services and ask follow-up questions.
- Mention specific details (room numbers, times, prices) for realism.
- Correct language mistakes gently.
- Include Vietnamese translations for hotel vocabulary.

IMPORTANT: You MUST respond with valid JSON only, no markdown, no code blocks. Use this exact format:
{"message": "your English response here", "translation": "Vietnamese translation here", "feedback": {"hasCorrection": true or false, "corrections": ["correction if any"]}}`,
};

// Parse AI response text into structured format
function parseAiResponse(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return {
      message: parsed.message || raw,
      translation: parsed.translation || undefined,
      feedback: parsed.feedback || { hasCorrection: false, corrections: [] },
    };
  } catch {
    // Fallback: AI returned plain text instead of JSON
    const hasCorrection =
      raw.toLowerCase().includes("correct") ||
      raw.toLowerCase().includes("should be") ||
      raw.toLowerCase().includes("instead of") ||
      raw.toLowerCase().includes("remember to");

    return {
      message: raw,
      feedback: {
        hasCorrection,
        corrections: hasCorrection ? [raw.split(".")[0]] : [],
      },
    };
  }
}

// Strategy 1: OpenRouter (primary)
async function callOpenRouter(
  systemPrompt: string,
  message: string,
  history: { role: string; content: string }[]
): Promise<string> {
  const messages: OpenRouterMessage[] = [
    { role: "system", content: systemPrompt },
    ...history.slice(-30).map((msg) => ({
      role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user", content: message },
  ];

  return chatWithOpenRouter(messages);
}

// Strategy 2: Gemini (fallback)
async function callGemini(
  systemPrompt: string,
  message: string,
  history: { role: string; content: string }[]
): Promise<string> {
  const chatHistory = history.slice(-30).map((msg) => ({
    role: msg.role === "user" ? "user" as const : "model" as const,
    parts: [{ text: msg.content }],
  }));

  const model = getGemini().getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 500,
      responseMimeType: "application/json",
    },
  });

  const chat = model.startChat({ history: chatHistory });
  const result = await chat.sendMessage(message);
  return result.response.text();
}

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

    if (!isOpenRouterConfigured && !isGeminiConfigured) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 503 }
      );
    }

    const systemPrompt = SCENARIO_PROMPTS[scenario] || SCENARIO_PROMPTS.free_chat;

    let raw: string;

    // Try OpenRouter first, then Gemini as fallback
    if (isOpenRouterConfigured) {
      try {
        raw = await callOpenRouter(systemPrompt, message, history);
      } catch (openRouterError) {
        console.error("OpenRouter failed, trying Gemini:", openRouterError);
        if (isGeminiConfigured) {
          raw = await callGemini(systemPrompt, message, history);
        } else {
          throw openRouterError;
        }
      }
    } else {
      raw = await callGemini(systemPrompt, message, history);
    }

    return NextResponse.json(parseAiResponse(raw));
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
