import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TTSVoiceOption {
  name: string;
  lang: string;
  voiceURI: string;
}

export type SpeechSpeed = 0.5 | 0.75 | 0.9 | 1 | 1.25 | 1.5 | 2;

interface SettingsState {
  // TTS settings
  speechSpeed: SpeechSpeed;
  selectedVoiceURI: string | null;
  pitch: number;

  // Actions
  setSpeechSpeed: (speed: SpeechSpeed) => void;
  setSelectedVoiceURI: (uri: string | null) => void;
  setPitch: (pitch: number) => void;
}

export const SPEED_OPTIONS: { value: SpeechSpeed; label: string }[] = [
  { value: 0.5, label: "0.5x" },
  { value: 0.75, label: "0.75x" },
  { value: 0.9, label: "0.9x" },
  { value: 1, label: "1x" },
  { value: 1.25, label: "1.25x" },
  { value: 1.5, label: "1.5x" },
  { value: 2, label: "2x" },
];

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      speechSpeed: 0.9,
      selectedVoiceURI: null,
      pitch: 0.95,

      setSpeechSpeed: (speechSpeed) => set({ speechSpeed }),
      setSelectedVoiceURI: (selectedVoiceURI) => set({ selectedVoiceURI }),
      setPitch: (pitch) => set({ pitch }),
    }),
    {
      name: "wespeak-settings",
    }
  )
);
