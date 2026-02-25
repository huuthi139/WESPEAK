// ==================== User ====================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  native_language: string;
  daily_goal_minutes: number;
  created_at: string;
}

export interface UserStats {
  user_id: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  gems: number;
  level: number;
  lessons_completed: number;
  total_minutes: number;
  last_active_date: string | null;
  updated_at: string;
}

export interface UserLanguage {
  id: string;
  user_id: string;
  language: TargetLanguage;
  current_level: LanguageLevel;
  created_at: string;
}

// ==================== Learning ====================

export interface Course {
  id: string;
  language: TargetLanguage;
  title: string;
  description: string | null;
  level: string;
  total_lessons: number;
  duration_hours: number;
  thumbnail_url: string | null;
  is_premium: boolean;
  order_index: number;
}

export interface Unit {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  type: LessonType;
  content: LessonContent;
  duration_minutes: number;
  xp_reward: number;
  order_index: number;
}

export type LessonType =
  | "vocabulary"
  | "listening"
  | "speaking"
  | "conversation"
  | "grammar"
  | "quiz";

// Content matches JSONB in seed data migrations
export interface LessonContent {
  // vocabulary
  words?: VocabularyWord[];
  // listening
  audio_text?: string;
  questions?: LessonQuestion[];
  // speaking
  phrases?: SpeakingPhrase[];
  // grammar
  explanation?: string;
  examples?: string[];
  exercises?: LessonQuestion[];
}

export interface VocabularyWord {
  word: string;
  translation: string;
  phonetic: string;
  example: string;
}

export interface LessonQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface SpeakingPhrase {
  text: string;
  translation: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number | null;
  completed_at: string | null;
}

// ==================== Chat ====================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  translation?: string;
  feedback?: ChatFeedback;
  timestamp: string;
}

export interface ChatFeedback {
  hasCorrection: boolean;
  corrections: string[];
}

export type ChatScenario =
  | "free_chat"
  | "job_interview"
  | "restaurant"
  | "shopping"
  | "travel"
  | "hotel";

export interface ChatSession {
  id: string;
  user_id: string;
  scenario: ChatScenario;
  messages: ChatMessage[];
  created_at: string;
}

export interface ScenarioInfo {
  key: ChatScenario;
  label: string;
  description: string;
  icon: string;
}

// ==================== Gamification ====================

export interface Achievement {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: AchievementCategory;
  requirement: number;
  xp_reward: number;
}

export type AchievementCategory =
  | "streak"
  | "learning"
  | "speaking"
  | "social"
  | "special";

export interface UserAchievement {
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface DailyActivity {
  id: string;
  user_id: string;
  date: string;
  minutes_learned: number;
  xp_earned: number;
  lessons_completed: number;
  goal_reached: boolean;
}

export interface LeaderboardEntry {
  user_id: string;
  name: string;
  avatar_url: string | null;
  total_xp: number;
  rank: number;
}

// ==================== Enums ====================

export type TargetLanguage = "english" | "chinese" | "korean" | "japanese";
export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

// ==================== API ====================

export interface ChatApiRequest {
  message: string;
  scenario: ChatScenario;
  history: ChatMessage[];
}

export interface ChatApiResponse {
  message: string;
  translation?: string;
  feedback?: ChatFeedback;
}
