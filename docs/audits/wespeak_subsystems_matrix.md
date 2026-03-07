# WESPEAK Subsystems Matrix

## Subsystem Classification

| Subsystem | Purpose | Main Files | Dependencies | Status | Evidence | Notes |
|-----------|---------|-----------|--------------|--------|----------|-------|
| **Authentication** | User login/register/OAuth | `hooks/useAuth.ts`, `middleware.ts`, `(auth)/*.tsx`, `auth/callback/route.ts` | Supabase Auth | **ACTIVE** | Full signIn/signUp/signOut/Google OAuth implementation with demo fallback | Production-ready with Supabase; degrades to demo mode gracefully |
| **AI Chat** | Conversational AI tutor | `(main)/chat/page.tsx`, `api/chat/route.ts`, `lib/openrouter.ts`, `lib/gemini.ts`, `lib/ai-models.ts` | OpenRouter, Gemini, chatStore | **ACTIVE** | 6 scenario prompts, multi-model fallback, JSON response parsing | Most complete feature. OpenRouter primary → Gemini fallback |
| **Course Learning** | Browse/study courses | `(main)/learn/*.tsx`, `api/courses/route.ts`, `api/lessons/route.ts`, `data/*.ts` | Supabase, hardcoded data | **PARTIAL** | Pages try API first but always fall back to `@/data/` imports | API routes are complete but frontend doesn't actually use them in practice |
| **Lesson Player** | Interactive lesson UI | `learn/[courseId]/[lessonId]/page.tsx` (1020 LOC) | Hardcoded data, useSpeech | **PARTIAL** | Imports `findLesson` from mock data, has vocab/listening/speaking/quiz modes | Large file, only uses hardcoded content, TTS works via Web Speech API |
| **Pronunciation** | Speech practice + scoring | `(main)/pronunciation/page.tsx` (967 LOC), `api/pronunciation/route.ts` | Web Speech API, mock scoring | **PARTIAL** | Client-side STT works, but scoring is `Math.random()` | Scoring is fake. Azure Speech integration placeholder exists but not implemented |
| **Flashcards** | Spaced repetition vocab | `(main)/flashcards/page.tsx` (181 LOC) | None (self-contained) | **BUILT_INACTIVE** | All card data is hardcoded in the component, no persistence | Cards reset on page refresh. No spaced repetition algorithm |
| **Leaderboard** | XP ranking | `(main)/leaderboard/page.tsx`, `api/leaderboard/route.ts` | Supabase (API), hardcoded (UI) | **PARTIAL** | API connects to Supabase, but page uses hardcoded mock users | UI exists, API exists, but they're not connected |
| **Profile** | User stats + achievements | `(main)/profile/page.tsx`, `api/achievements/route.ts` | Supabase (API), hardcoded (UI) | **PARTIAL** | `mockAchievements` array hardcoded at line 24, API exists separately | Page uses mock data, doesn't call the achievements API |
| **Settings** | App preferences | `(main)/settings/page.tsx`, `stores/settingsStore.ts` | Zustand persist | **ACTIVE** | Speech speed, voice selection, AI model selector all persist to localStorage | Functional and persisted. Only subsystem using Zustand persist |
| **Roleplay Lab** | Scenario-based practice | `(main)/roleplay/page.tsx` (423 LOC) | None | **BUILT_INACTIVE** | UI-only with hardcoded scenarios, no backend, no AI integration | Beautiful UI but clicking scenarios does nothing |
| **AI Tutors** | Tutor character selection | `(main)/tutors/page.tsx` (271 LOC) | None | **BUILT_INACTIVE** | UI-only with hardcoded tutor profiles | No connection to chat or any backend |
| **Analysis** | Learning analytics dashboard | `(main)/analysis/page.tsx` (718 LOC) | None | **BUILT_INACTIVE** | All charts/data hardcoded, no API calls | Large file with elaborate UI but zero real data |
| **Premium** | Subscription plans | `(main)/premium/page.tsx` (220 LOC) | None | **BUILT_INACTIVE** | UI-only pricing page, no payment integration | No Stripe/payment provider |
| **Onboarding** | New user setup | `(auth)/onboarding/page.tsx` (631 LOC) | None | **BUILT_INACTIVE** | 3-step flow (language, level, goal) but selections not saved to DB | User completes onboarding but preferences aren't persisted |
| **XP System** | Experience points | `api/xp/route.ts`, `api/streak/route.ts` | Supabase | **ACTIVE** | Full XP add + level calc + daily activity tracking in API | API works, but only called from lesson completion flow |
| **Gamification** | Streaks, gems, levels | `api/streak/route.ts`, `userStore.ts` | Supabase | **PARTIAL** | Streak logic complete in API, but no streak freeze/repair, no gem spending | Streak updates on API call but no scheduled daily check |
| **TTS/STT** | Text-to-speech / Speech-to-text | `hooks/useSpeech.ts` | Web Speech API | **ACTIVE** | Full TTS with voice selection + rate/pitch control, STT with transcript | Works in Chrome/Edge. Limited in Firefox/Safari |
| **Bottom Navigation** | App navigation bar | `components/layout/BottomNav.tsx` | Next.js router | **ACTIVE** | 5 nav items: Home, Learn, Chat, Leaderboard, Profile | Functional with active state indicator |
| **UI Component Library** | Reusable UI primitives | `components/ui/Button.tsx`, `Card.tsx`, `Input.tsx`, `ProgressBar.tsx` | Tailwind, clsx | **ACTIVE** | 4 base components with variants | Minimal but functional |
| **Notification System** | Push/in-app notifications | — | — | **MISSING** | No notification code anywhere | Not implemented |
| **Search** | Content search | — | — | **MISSING** | Client-side filter only in learn page | No backend search |
| **Admin Panel** | Content/user management | — | — | **MISSING** | No admin routes or pages | Not implemented |
| **Audit Logging** | Activity tracking | — | — | **MISSING** | No audit trail beyond daily_activity table | Minimal |
| **Caching** | Performance optimization | — | — | **MISSING** | No caching strategy | No Redis, no ISR config |
| **Observability** | Logging/monitoring | — | — | **MISSING** | Only `console.error` in API routes | No structured logging, no error tracking service |

## Dependency Graph

```
Authentication ──→ Supabase Auth
     │
     ├──→ AI Chat ──→ OpenRouter ──→ Gemini (fallback)
     │       │
     │       └──→ chatStore (Zustand)
     │
     ├──→ Course Learning ──→ Hardcoded Data (primary)
     │       │                     └──→ Supabase API (fallback, rarely used)
     │       └──→ Lesson Player ──→ Hardcoded Data
     │               └──→ TTS/STT (Web Speech API)
     │
     ├──→ XP System ──→ Supabase
     │       └──→ Gamification (streaks, levels)
     │
     ├──→ Settings ──→ Zustand persist (localStorage)
     │
     └──→ [UNCONNECTED UI-ONLY SUBSYSTEMS]
             ├── Roleplay Lab
             ├── AI Tutors
             ├── Analysis
             ├── Premium
             └── Onboarding (saves nothing)
```
