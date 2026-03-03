// OpenRouter API client — compatible with OpenAI chat completions format
// Docs: https://openrouter.ai/docs/quickstart

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export const isOpenRouterConfigured = !!process.env.OPENROUTER_API_KEY;

// Free models on OpenRouter (no credit needed)
export const OPENROUTER_MODEL = "google/gemini-2.0-flash-exp:free";

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterChoice {
  message: { role: string; content: string };
}

interface OpenRouterResponse {
  choices: OpenRouterChoice[];
}

export async function chatWithOpenRouter(
  messages: OpenRouterMessage[],
  model?: string
): Promise<string> {
  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://wespeak-ten.vercel.app",
      "X-Title": "WeSPEAK",
    },
    body: JSON.stringify({
      model: model || OPENROUTER_MODEL,
      messages,
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${errorBody}`);
  }

  const data: OpenRouterResponse = await res.json();
  return data.choices[0]?.message?.content || "";
}
