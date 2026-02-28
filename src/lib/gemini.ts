import { GoogleGenerativeAI } from "@google/generative-ai";

let _genAI: GoogleGenerativeAI | null = null;

export const isGeminiConfigured = !!process.env.GEMINI_API_KEY;

export function getGemini(): GoogleGenerativeAI {
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  return _genAI;
}

export const GEMINI_MODEL = "gemini-2.0-flash";
