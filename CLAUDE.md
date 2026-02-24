# CLAUDE.md — WESPEAK

This file provides guidance for AI assistants (Claude, etc.) working in this repository.

## Project Overview

**WESPEAK** is an AI-powered language learning app focused on **speaking skills** for Vietnamese learners.

| Field | Value |
|-------|-------|
| App Name | WeSPEAK |
| Tagline | "Speak Like a Native with AI" |
| Target Languages | English, Chinese, Korean, Japanese |
| UI Language | Vietnamese (primary), English |
| Platform | Web (Next.js PWA) → Mobile later |
| Target Users | Vietnamese learners aged 16-45 |
| Owner | `huuthi139` |

## Tech Stack

```
Frontend:
├── Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
├── Zustand (state management)
├── Framer Motion (animations)
└── Lucide React (icons)

Backend:
├── Supabase (Auth, Database, Storage)
├── PostgreSQL (via Supabase)
└── Edge Functions

AI Services:
├── OpenAI GPT-4o-mini (conversation)
├── Web Speech API (TTS - FREE)
├── Web Speech API (STT - FREE)
└── Azure Speech (pronunciation scoring - optional)

Deployment:
├── Vercel (frontend)
├── Supabase (backend)
└── Cloudflare (CDN)
```

## Directory Structure

```
wespeak/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── onboarding/page.tsx
│   │   ├── (main)/
│   │   │   ├── layout.tsx              # Main layout with bottom nav
│   │   │   ├── page.tsx                # Home dashboard
│   │   │   ├── learn/
│   │   │   │   ├── page.tsx            # Course list
│   │   │   │   └── [courseId]/
│   │   │   │       ├── page.tsx        # Course detail
│   │   │   │       └── [lessonId]/page.tsx  # Lesson player
│   │   │   ├── chat/page.tsx           # AI Chat
│   │   │   ├── pronunciation/page.tsx
│   │   │   ├── flashcards/page.tsx
│   │   │   ├── leaderboard/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── chat/route.ts           # OpenAI chat
│   │   │   ├── tts/route.ts            # Text-to-speech
│   │   │   └── pronunciation/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                         # Base UI components
│   │   ├── layout/                     # Header, Nav, Footer
│   │   ├── home/                       # Home page components
│   │   ├── chat/                       # Chat components
│   │   ├── learn/                      # Learning components
│   │   └── shared/                     # Shared components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── openai.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSpeech.ts
│   │   └── useAudio.ts
│   ├── stores/
│   │   ├── userStore.ts
│   │   ├── learningStore.ts
│   │   └── chatStore.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── icons/
│   └── sounds/
├── supabase/
│   └── migrations/
├── .env.local
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Design System

### Colors (Dark Theme Only)

```css
/* Primary */
--primary: #8B5CF6;        /* Purple */
--primary-hover: #7C3AED;

/* Secondary */
--secondary: #22D3EE;      /* Cyan */

/* Background */
--bg-dark: #0F0F1A;
--bg-card: #1A1A2E;
--bg-elevated: #252540;

/* Accent */
--streak: #F97316;         /* Orange */
--xp: #A855F7;             /* Purple */
--gems: #22C55E;           /* Green */

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #9CA3AF;
--text-muted: #6B7280;

/* Status */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
```

### Typography

```
font-family: 'Inter', system-ui, sans-serif;

h1: 24px, font-weight: 700
h2: 20px, font-weight: 600
h3: 16px, font-weight: 600
body: 14px, font-weight: 400
small: 12px, font-weight: 400
```

### Spacing & Radius

```
spacing: 4px base (4, 8, 12, 16, 20, 24, 32, 40, 48)
border-radius: 8px (sm), 12px (md), 16px (lg), 24px (xl)
```

## Key Design Decisions

- **Dark theme only** — simpler to maintain, single theme
- **Mobile-first** — design for 375px width
- **Vietnamese UI** — all user-facing text in Vietnamese
- **Web Speech API** — free TTS/STT, no additional API costs
- **OpenAI gpt-4o-mini** — cost-effective conversation model
- **Zustand** — lightweight state management, no boilerplate
- **Framer Motion** — smooth, performant animations

## Screens & Features

### Priority P0 (MVP Core)

| Screen | Route | Description |
|--------|-------|-------------|
| Login | `(auth)/login` | Email/password + Google OAuth |
| Register | `(auth)/register` | Name, email, password + validation |
| Onboarding | `(auth)/onboarding` | 3 steps: language, level, daily goal |
| Home Dashboard | `(main)/` | Greeting, stats, continue learning, streak, quick practice |
| AI Chat | `(main)/chat` | Core feature — conversation with AI tutor by scenario |
| Course List | `(main)/learn` | Browse and search courses |
| Course Detail | `(main)/learn/[courseId]` | Units and lessons tree |
| Lesson Player | `(main)/learn/[courseId]/[lessonId]` | Vocab, listening, speaking, quiz |

### Priority P1

| Screen | Route | Description |
|--------|-------|-------------|
| Pronunciation | `(main)/pronunciation` | Word/sentence practice with phoneme scoring |
| Flashcards | `(main)/flashcards` | Spaced repetition vocabulary |
| Leaderboard | `(main)/leaderboard` | Weekly XP ranking, league tiers |
| Profile | `(main)/profile` | Avatar, stats, achievements |
| Settings | `(main)/settings` | Daily goal, notifications, sounds, language |

### AI Chat Scenarios

Each scenario has a distinct system prompt:

| Scenario Key | Description | AI Role |
|-------------|-------------|---------|
| `free_chat` | Free conversation | Friendly tutor, gentle corrections |
| `job_interview` | Job interview practice | HR manager, professional questions |
| `restaurant` | Restaurant ordering | Waiter taking orders |
| `shopping` | Shopping assistance | Store assistant |
| `travel` | Travel directions | Tour guide |
| `hotel` | Hotel check-in | Receptionist |

### Lesson Types

- **Vocabulary**: word + audio + image
- **Listening**: audio + comprehension questions
- **Speaking**: read aloud + pronunciation scoring
- **Conversation**: AI dialogue practice
- **Grammar**: explanation + practice exercises
- **Quiz**: multiple choice assessment

## Gamification System

### XP Rewards

| Activity | XP |
|----------|-----|
| Complete lesson | 10-20 |
| AI conversation (5 min) | 15 |
| Perfect score | +5 bonus |
| Daily goal reached | 10 |
| Streak day | 5 x day_count |

### Level System (30 levels)

| Range | Title | XP Required |
|-------|-------|-------------|
| 1-5 | Beginner | 0-1,000 |
| 6-10 | Elementary | 1,000-5,000 |
| 11-15 | Intermediate | 5,000-12,500 |
| 16-20 | Advanced | 12,500-25,000 |
| 21-25 | Expert | 25,000-50,000 |
| 26-30 | Master | 50,000-100,000 |

### Streak & Achievements

- Daily streak counter with 7-day calendar
- Streak freeze (200 gems) / repair (400 gems)
- Milestones: 7, 14, 30, 60, 100, 365 days
- 20 achievements across categories: streak, learning, speaking, social, special

## Database Schema (Supabase/PostgreSQL)

Key tables:

| Table | Purpose |
|-------|---------|
| `users` | User accounts (email, name, avatar, daily goal) |
| `user_stats` | XP, streak, gems, level, total minutes |
| `user_languages` | Languages each user is learning |
| `courses` | Language courses (title, level, lesson count) |
| `units` | Course units (ordered) |
| `lessons` | Individual lessons (type, content as JSONB, XP reward) |
| `user_progress` | Per-lesson completion + score |
| `daily_activity` | Daily minutes, XP, goal tracking |
| `achievements` | Achievement definitions |
| `user_achievements` | Unlocked achievements per user |
| `chat_history` | AI conversation logs (scenario + messages as JSONB) |

Important indexes:
- `idx_user_progress_user` on `user_progress(user_id)`
- `idx_daily_activity_user_date` on `daily_activity(user_id, date)`
- `idx_lessons_unit` on `lessons(unit_id)`

## API Endpoints

### Authentication (Supabase Auth)

```
POST /auth/signup
POST /auth/signin
POST /auth/signout
POST /auth/reset-password
GET  /auth/user
```

### Chat API

```
POST /api/chat
  Body: { message: string, scenario: string, history: ChatMessage[] }
  Response: { message: string, feedback?: { hasCorrection: boolean, corrections: string[] } }
```

### User API

```
GET  /api/user/profile
PUT  /api/user/profile
GET  /api/user/stats
PUT  /api/user/daily-goal
```

### Learning API

```
GET  /api/courses
GET  /api/courses/:id
GET  /api/courses/:id/lessons
POST /api/lessons/:id/complete
GET  /api/progress
```

### Gamification API

```
POST /api/xp/add
GET  /api/leaderboard
GET  /api/achievements
POST /api/streak/check
```

## Build & Test Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

## Development Workflow

### Branch Naming

- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- Claude-generated branches: `claude/<description>-<session-id>`

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in imperative mood (e.g., "Add", "Fix", "Update", "Remove")
- Keep the first line under 72 characters

### Pull Requests

- Provide a summary of changes
- Include a test plan when applicable

### Development Phases

| Phase | Scope | Timeline |
|-------|-------|----------|
| 1: MVP Core | Project setup, auth, home, AI chat, TTS/STT, basic gamification | Week 1-2 |
| 2: Learning | Courses, lesson player, vocabulary, speaking, progress tracking | Week 3-4 |
| 3: Gamification | Leaderboard, achievements, profile, settings | Week 5 |
| 4: Polish | Bug fixes, performance, PWA, deploy, sample content (20 lessons) | Week 6 |

## Code Conventions

- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS utility classes, no custom CSS unless necessary
- **State**: Zustand stores in `src/stores/`
- **Components**: Functional components with hooks, co-located in feature folders
- **API routes**: Next.js App Router route handlers in `src/app/api/`
- **Database**: Supabase client in `src/lib/supabase/`, server-side uses `server.ts`
- **Types**: Centralized in `src/types/index.ts`
- Keep functions small and focused
- Write descriptive variable and function names
- Add comments only where the intent is non-obvious

## Key Files to Know

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant guidance (this file) |
| `src/app/(main)/layout.tsx` | Main layout with bottom navigation |
| `src/app/(main)/page.tsx` | Home dashboard |
| `src/app/(main)/chat/page.tsx` | AI chat (core feature) |
| `src/app/api/chat/route.ts` | OpenAI chat API endpoint |
| `src/lib/supabase/client.ts` | Supabase browser client |
| `src/lib/supabase/server.ts` | Supabase server client |
| `src/lib/openai.ts` | OpenAI client setup |
| `src/hooks/useSpeech.ts` | Web Speech API hook (TTS + STT) |
| `src/stores/userStore.ts` | User state (auth, profile, stats) |
| `src/stores/chatStore.ts` | Chat state (messages, scenario) |
| `src/stores/learningStore.ts` | Learning state (courses, progress) |
| `src/types/index.ts` | All TypeScript types |
| `supabase/migrations/` | Database migration files |
| `tailwind.config.ts` | Tailwind config with design tokens |

## AI Assistant Guidelines

1. **Read before writing** — Always read existing files before proposing changes.
2. **Minimal changes** — Only change what is necessary to accomplish the task.
3. **No over-engineering** — Keep solutions simple; don't add features beyond what's requested.
4. **Security first** — Never expose API keys, never introduce XSS/injection vulnerabilities. Use server-side route handlers for OpenAI calls.
5. **UI first approach** — Build screens with mock data first, then wire up backends.
6. **Vietnamese UI** — All user-facing text must be in Vietnamese. Keep code (variables, comments) in English.
7. **Dark theme only** — Use the design system colors above. Do not implement a light theme.
8. **Mobile-first** — Design for 375px width. Use responsive Tailwind classes.
9. **Use Web Speech API** — For TTS and STT. Avoid paid speech services unless specifically requested.
10. **Update this file** — When significant architectural decisions are made, update CLAUDE.md.
11. **Test your changes** — Run `npm run build` and `npm run lint` after making changes.
12. **Respect existing patterns** — Follow conventions already present in the codebase.
