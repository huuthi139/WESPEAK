# WESPEAK Runtime Architecture

## Boot Sequence

```
1. Next.js starts → loads next.config.mjs (minimal config)
2. Middleware (src/middleware.ts) runs on every non-API, non-static request
   ├── If Supabase NOT configured → allow all (demo mode)
   └── If Supabase configured:
       ├── Refresh auth session via getUser()
       ├── Protected routes → redirect to /login if no user
       └── Login/register → redirect to / if user exists
3. Root Layout (src/app/layout.tsx) renders
   ├── Loads Inter font via Google Fonts <link>
   └── Sets lang="vi", dark theme color #0A0E1A
4. Route-specific layout loads
   ├── (auth)/layout.tsx → auth pages
   └── (main)/layout.tsx → main app with BottomNav
5. Page component renders (all are 'use client')
   └── useAuth() hook initializes in page components
       ├── If Supabase NOT configured → set DEMO_USER + DEMO_STATS
       └── If configured → getSession() → fetchUserProfile()
```

## Runtime Roles

| Role | Technology | Status |
|------|-----------|--------|
| Web Server | Next.js 14 (Vercel) | ACTIVE |
| Database | Supabase PostgreSQL | ACTIVE (with demo fallback) |
| Auth Provider | Supabase Auth | ACTIVE (with demo fallback) |
| AI Provider | OpenRouter (primary) | ACTIVE |
| AI Fallback | Google Gemini | ACTIVE |
| AI Legacy | OpenAI (gpt-4o-mini) | CONFIGURED but unused by chat |
| TTS/STT | Web Speech API (browser) | ACTIVE (client-side) |
| State Management | Zustand (client memory) | ACTIVE |

## Main Request Flows

### Flow 1: AI Chat Conversation (Core Feature)
```
User types message
  → chat/page.tsx sendMessage()
  → POST /api/chat { message, scenario, history, model }
  → chat/route.ts:
      ├── Try OpenRouter (preferred model)
      │   ├── If fails → try remaining FREE_MODELS
      │   └── If all fail → try Gemini
      └── parseAiResponse(raw) → extract message + translation + feedback
  → Response { message, translation, feedback }
  → chatStore.addMessage()
  → UI renders with TTS speak button
```

### Flow 2: Course Learning
```
User navigates to /learn
  → learn/page.tsx:
      ├── Try fetch /api/courses (requires Supabase auth)
      └── Fallback → import from @/data/multi-lang-courses
  → User selects course → /learn/[courseId]
      ├── Try fetch /api/lessons?courseId=xxx
      └── Fallback → getUnitsForCourse() from @/data/
  → User opens lesson → /learn/[courseId]/[lessonId]
      └── findLesson() from @/data/multi-lang-courses (always mock)
```

### Flow 3: Authentication
```
Register:
  User → register/page.tsx → useAuth().signUp()
    → supabase.auth.signUp({ email, password, options: { data: { name } } })
    → Insert into users table
    → Insert into user_stats table
    → Redirect to /onboarding

Login:
  User → login/page.tsx → useAuth().signIn()
    → supabase.auth.signInWithPassword()
    → onAuthStateChange fires → fetchUserProfile()
    → Redirect to /

Google OAuth:
  User → signInWithGoogle()
    → supabase.auth.signInWithOAuth({ provider: 'google' })
    → Redirect to /auth/callback → exchange code → redirect to /
```

### Flow 4: XP & Streak
```
Lesson complete:
  → POST /api/lessons { lessonId, score }
    → Upsert user_progress
    → Try RPC add_xp_and_update_stats (may not exist)
    → Fallback: manual UPDATE user_stats

Streak check:
  → POST /api/streak
    → Compare last_active_date with today/yesterday
    → Update current_streak, longest_streak, last_active_date
```

## Scheduled Jobs / Workers

**NONE** — No cron jobs, no background workers, no queue consumers, no scheduled tasks.

Evidence: No worker files, no cron config, no queue setup in codebase.

## Active Surfaces

| Surface | URL Pattern | Status |
|---------|-------------|--------|
| Home Dashboard | / | ACTIVE (mock data) |
| AI Chat | /chat | ACTIVE (real AI) |
| Course List | /learn | ACTIVE (mock + API fallback) |
| Course Detail | /learn/[id] | ACTIVE (mock + API fallback) |
| Lesson Player | /learn/[id]/[id] | ACTIVE (mock data only) |
| Pronunciation | /pronunciation | ACTIVE (mock scoring) |
| Flashcards | /flashcards | ACTIVE (hardcoded cards) |
| Leaderboard | /leaderboard | ACTIVE (hardcoded data) |
| Profile | /profile | ACTIVE (mock achievements) |
| Settings | /settings | ACTIVE (persisted via Zustand) |
| Roleplay | /roleplay | ACTIVE (UI only, not wired) |
| Tutors | /tutors | ACTIVE (UI only, not wired) |
| Analysis | /analysis | ACTIVE (hardcoded charts) |
| Premium | /premium | ACTIVE (UI only, no payment) |
| Login | /login | ACTIVE (real auth or demo) |
| Register | /register | ACTIVE (real auth or demo) |
| Onboarding | /onboarding | ACTIVE (UI only) |

## State/Flow Summary

```
App State Sources:
├── Zustand Stores (client memory, lost on refresh)
│   ├── userStore — user profile, stats, languages, daily activity
│   ├── chatStore — messages, scenario, loading states
│   ├── learningStore — courses, units, lessons, progress
│   └── settingsStore — speech speed, voice, AI model (PERSISTED to localStorage)
├── Supabase (server-side, persistent)
│   └── Used by API routes only, NOT directly by pages
└── Hardcoded Data (src/data/)
    └── 4 files with course content, used directly by learn pages
```
