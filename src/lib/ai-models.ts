// AI model definitions — safe to import in both client and server components

export interface AIModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
}

export const FREE_MODELS: AIModelOption[] = [
  {
    id: "google/gemini-2.0-flash-exp:free",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    description: "Nhanh, thông minh, miễn phí",
  },
  {
    id: "qwen/qwen3-235b-a22b:free",
    name: "Qwen3 235B",
    provider: "Alibaba",
    description: "Model lớn, trả lời chi tiết",
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "OpenAI",
    description: "Chính xác, tự nhiên",
  },
];

export const DEFAULT_MODEL = FREE_MODELS[0].id;
