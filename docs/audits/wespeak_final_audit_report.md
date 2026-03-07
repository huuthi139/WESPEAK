# WESPEAK Final Audit Report

**Date**: 2026-03-07
**Auditor**: Claude (READ-ONLY mode)
**Scope**: Full codebase, 62 source files, 88 total files

---

## 1. Codebase Overview

WESPEAK is an AI-powered language learning web application built with Next.js 14, TypeScript, and Tailwind CSS. It targets Vietnamese learners studying English, Chinese, Korean, and Japanese, with a focus on speaking skills.

**Key Metrics:**
- 16,094 LOC (TSX + TS)
- 17 pages (3 auth + 14 main)
- 12 API routes
- 4 Zustand stores
- 7 SQL migration files
- 4 hardcoded data files (~4,700 LOC)
- 0 test files

**Dependencies:** 11 production packages, 8 dev packages. Key: Next.js 14.2.35, Supabase SSR, OpenAI SDK (unused), Google Generative AI, Framer Motion, Zustand 5, Lucide React.

---

## 2. Runtime Architecture

**Boot:** Next.js → Middleware (auth check / demo bypass) → Root Layout (Inter font, dark theme) → Route Layout → Page Component.

**Key Pattern:** Dual-mode operation — Supabase mode (real auth + DB) and Demo mode (hardcoded data, no auth required). Demo mode activates when `NEXT_PUBLIC_SUPABASE_URL` is missing or contains "your-project".

**State:** 4 Zustand stores (only settingsStore persists to localStorage). All other client state is lost on page refresh.

**No:** workers, cron jobs, queues, WebSockets, or background processes.

---

## 3. Active Subsystems

| Subsystem | Maturity | Notes |
|-----------|----------|-------|
| Authentication | 75% | Full email/password + Google OAuth, Vietnamese errors, demo fallback |
| AI Chat | 80% | 3 AI models, 6 scenarios, fallback chain, JSON parsing, TTS integration |
| Settings | 85% | Persisted preferences (speech speed, voice, AI model, pitch) |
| TTS/STT | 70% | Web Speech API hook with voice selection, rate control |
| XP/Streak API | 65% | Level calculation, daily activity, streak logic (server-side) |
| Bottom Navigation | 90% | 5-tab nav with active state |
| UI Components | 60% | 4 base components (Button, Card, Input, ProgressBar) |

---

## 4. Built but Inactive Subsystems

| Subsystem | LOC | What's Missing |
|-----------|-----|---------------|
| Roleplay Lab | 423 | No AI integration, scenarios are UI-only |
| AI Tutors | 271 | No connection to chat system |
| Analysis Dashboard | 718 | All data hardcoded, no real analytics |
| Premium/Subscriptions | 220 | No payment provider integration |
| Onboarding | 631 | Selections not saved to database |
| Flashcards | 181 | No persistence, no spaced repetition |

**Total "dead" UI code:** ~2,444 LOC (15% of codebase)

---

## 5. Data Layer

### PostgreSQL (Supabase)
- 10 tables defined in migrations
- 6 indexes
- 20 seed achievements
- 5 seed course migrations (EN A1/A2, CN A1, KR A1, JP A1)

### Orphan Tables (defined but never used by code)
- `user_languages` — no reads or writes
- `chat_history` — no reads or writes (chat messages only in Zustand memory)

### Data Duplication
- Course content exists in BOTH Supabase (migrations) AND hardcoded TypeScript files
- Frontend uses hardcoded files exclusively; API routes use Supabase
- These two data sources are likely out of sync

### Schema Issues
- No `updated_at` on most tables (only on `user_stats`)
- No soft delete mechanism
- `user_progress` score is nullable with no default
- No RLS (Row Level Security) policies in migrations — relies on API-level auth checks

---

## 6. Integrations

| Provider | Purpose | Status | Risk Level |
|----------|---------|--------|------------|
| OpenRouter | AI conversations (primary) | Active | Medium — no timeout |
| Google Gemini | AI conversations (fallback) | Active | Medium — no timeout |
| OpenAI | AI conversations (legacy) | Unused (dead code) | Low |
| Supabase Auth | Authentication | Active | Low |
| Supabase DB | Data storage | Active (API), Bypassed (UI) | Medium |
| Web Speech API | TTS + STT | Active (browser-only) | Low |
| Azure Speech | Pronunciation scoring | Stub (mock data) | Medium (product gap) |
| Google Fonts | Inter font delivery | Active | Low |

---

## 7. Tests & Coverage

| Category | Status |
|----------|--------|
| Test files | 0 |
| Test runner config | None |
| Unit tests | None |
| Integration tests | None |
| E2E tests | None |
| CI/CD testing | None |

**Assessment:** Zero test coverage. This is the #1 operational risk.

**Build verification:** `npm run build` succeeds. `npm run lint` passes with 1 warning (font loading).

---

## 8. Risk Hotspots

### Critical
1. **Zero test coverage** — No safety net for any changes
2. **Hardcoded data duplication** — Frontend and backend use different data sources

### High
3. **Frontend-API disconnect** — 12 API routes exist but frontend doesn't use most of them
4. **No request timeouts on AI calls** — Requests can hang indefinitely
5. **No rate limiting on chat API** — Cost exposure risk
6. **No error tracking** — Production errors are invisible
7. **God component: Lesson Player** — 1,020 LOC single file handling all lesson types

### Medium
8. **XP double-award bug** — Re-completing lessons adds XP every time
9. **Zustand state loss on refresh** — Chat history, user data lost on page reload
10. **Silent auth failures** — Middleware allows access on any auth error
11. **Pronunciation scoring is fake** — Returns random numbers

---

## 9. System Maturity Assessment

| Layer | Score | Assessment |
|-------|-------|-----------|
| **Core Application (UI)** | 55% — Partial Working | 17 pages built, polished dark theme, responsive design. But many pages are UI shells with no backend connection. |
| **AI/LLM Module** | 75% — Operational | Best part of the app. Multi-model, fallback chain, 6 scenarios, proper error handling. Missing: timeout, rate limit. |
| **Authentication** | 70% — Operational | Email + Google OAuth, demo fallback, Vietnamese error messages. Missing: password reset UI, email verification flow. |
| **Data Layer** | 35% — Prototype | Schema exists, API routes work, but frontend bypasses everything with hardcoded data. Two sources of truth. |
| **Integrations** | 50% — Partial Working | AI works well. Supabase works but is bypassed. OpenAI is dead code. Azure Speech is stub. |
| **Testing** | 0% — Concept | Zero tests, zero config. |
| **Observability** | 5% — Concept | Only console.error. No monitoring, no alerts, no health checks. |
| **Gamification** | 40% — Prototype | XP/streak logic works in API but isn't fully wired to frontend. No streak freeze, no gem economy. |
| **Content/Learning** | 45% — Partial Working | Course browsing works (mock data), lesson player functional but monolithic. |
| **Automation/DevOps** | 20% — Concept | Just `npm run build/dev/lint/start`. No CI/CD, no staging, no preview deploys. |

**Overall System Maturity: ~45% — Early Prototype / Partial Working**

---

## 10. Recommended Next Steps

### Phase 1: Foundation (Priority — Do First)
1. **Wire frontend to API routes** — Remove `src/data/` dependency, make all pages fetch from `/api/` endpoints. This is the single most impactful change.
2. **Set up Vitest** — Add test config, write tests for API routes (chat, lessons, xp, streak).
3. **Add request timeouts** — AbortController on all AI fetch calls (15s timeout).
4. **Add rate limiting** — Protect `/api/chat` from abuse.

### Phase 2: Reliability
5. **Add Sentry** — Error tracking for production.
6. **Fix XP double-award** — Check completion status before awarding XP.
7. **Persist chat history** — Use the existing `chat_history` table.
8. **Add health check endpoint** — `/api/health`.

### Phase 3: Feature Completion
9. **Connect Roleplay Lab to AI Chat** — Route scenarios through existing chat API.
10. **Connect AI Tutors to Chat** — Use tutor personas as chat system prompts.
11. **Wire Onboarding to database** — Save language/level/goal preferences.
12. **Split Lesson Player** — Break 1,020 LOC into per-type components.

### Phase 4: Production Readiness
13. **Add RLS policies** — Row Level Security in Supabase.
14. **Implement real pronunciation scoring** — Azure Speech or alternative.
15. **Add CI/CD pipeline** — GitHub Actions with lint + build + test.
16. **Remove dead code** — Delete `lib/openai.ts`, unused font files, unused `openai` package.

---

## Confirmation

- No code was modified
- No commits were made
- No database writes or migrations were run
- No services were started or stopped
- No side effects were produced
- This audit is purely observational
