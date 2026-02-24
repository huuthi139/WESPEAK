import { create } from "zustand";
import type { ChatMessage, ChatScenario } from "@/types";
import { generateId } from "@/lib/utils";

interface ChatState {
  messages: ChatMessage[];
  scenario: ChatScenario;
  isLoading: boolean;
  isSpeaking: boolean;
  isListening: boolean;

  setScenario: (scenario: ChatScenario) => void;
  addMessage: (role: "user" | "assistant", content: string, translation?: string, feedback?: ChatMessage["feedback"]) => void;
  setLoading: (loading: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  setListening: (listening: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  scenario: "free_chat",
  isLoading: false,
  isSpeaking: false,
  isListening: false,

  setScenario: (scenario) => set({ scenario, messages: [] }),

  addMessage: (role, content, translation, feedback) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: generateId(),
          role,
          content,
          translation,
          feedback,
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setSpeaking: (isSpeaking) => set({ isSpeaking }),
  setListening: (isListening) => set({ isListening }),
  clearMessages: () => set({ messages: [] }),
}));
