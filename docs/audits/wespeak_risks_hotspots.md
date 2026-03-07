# WESPEAK Risks & Hotspots

## Top Risky Files

| File | LOC | Risk | Reason |
|------|-----|------|--------|
| `data/english-courses.ts` | 1,708 | HIGH | Massive hardcoded data, duplicates DB content |
| `data/english-b2-course.ts` | 1,613 | HIGH | Same — hardcoded, unmaintainable at scale |
| `learn/[courseId]/[lessonId]/page.tsx` | 1,020 | HIGH | God component — handles vocab, listening, speaking, quiz, all UI + logic in one file |
| `pronunciation/page.tsx` | 967 | MEDIUM | Large file, mock scoring, complex but nonfunctional scoring |
| `chat/page.tsx` | 777 | MEDIUM | Large but well-structured; has DEMO_FLOWS fallback mixing concerns |
| `analysis/page.tsx` | 718 | LOW | Pure UI, all hardcoded — no risk to production, but tech debt |
| `(auth)/onboarding/page.tsx` | 631 | MEDIUM | Elaborate UI flow that saves nothing to database |

## Structural Risks

### S1. Hardcoded Data Duplication — CRITICAL
- **Files**: `src/data/english-courses.ts`, `english-b1-course.ts`, `english-b2-course.ts`, `multi-lang-courses.ts`
- **Evidence**: 4,716 LOC of static course data that also exists in Supabase migrations (002-007)
- **Why it matters**: Two sources of truth. Frontend uses hardcoded files; API uses Supabase. Changes in one won't reflect in the other. Unmaintainable as content grows.
- **Severity**: CRITICAL
- **Fix**: Remove hardcoded data files, make frontend fetch from API exclusively

### S2. God Component: Lesson Player — HIGH
- **File**: `src/app/(main)/learn/[courseId]/[lessonId]/page.tsx` (1,020 LOC)
- **Evidence**: Single component handles vocabulary display, audio playback, speech recognition, quiz logic, scoring, progress tracking, and all associated UI states
- **Why it matters**: Impossible to test, debug, or extend individual lesson types. Any change risks breaking other lesson types
- **Severity**: HIGH
- **Fix**: Split into LessonVocab, LessonListening, LessonSpeaking, LessonQuiz sub-components

### S3. Frontend-API Disconnect — HIGH
- **Evidence**: 12 API routes exist and connect to Supabase, but frontend pages import from `@/data/` directly. Only `api/chat` is actually called by the frontend.
- **Files**: `learn/page.tsx:14` imports `ALL_COURSES` from data, `page.tsx:28` imports `ALL_COURSES`
- **Why it matters**: Backend work is wasted. Two code paths to maintain. Real users never hit the database for learning content.
- **Severity**: HIGH
- **Fix**: Wire frontend pages to fetch from API routes

### S4. OpenAI Dead Dependency — LOW
- **File**: `src/lib/openai.ts`
- **Evidence**: Creates OpenAI client, exports `CHAT_MODEL`, but nothing imports or calls it. `openai` package still in package.json (6.24.0)
- **Why it matters**: Unnecessary dependency weight, confusion for developers
- **Severity**: LOW
- **Fix**: Remove `openai` from package.json and delete `lib/openai.ts`

## Runtime Risks

### R1. No Request Timeouts on AI Calls — HIGH
- **File**: `src/lib/openrouter.ts:27`, `src/app/api/chat/route.ts`
- **Evidence**: `fetch()` call has no `AbortController`, no timeout. If OpenRouter hangs, the request hangs forever.
- **Why it matters**: User waits indefinitely. Vercel has a 10s default timeout for serverless, but edge functions may differ.
- **Severity**: HIGH
- **Fix**: Add AbortController with 15s timeout to all AI fetch calls

### R2. XP Double-Award on Lesson Re-completion — MEDIUM
- **File**: `src/app/api/lessons/route.ts:128-155`
- **Evidence**: Progress is UPSERTED (safe), but XP is ADDED every time regardless. No check if lesson was already completed.
- **Why it matters**: Users can farm XP by re-completing lessons
- **Severity**: MEDIUM
- **Fix**: Check if progress.completed was already true before adding XP

### R3. No Rate Limiting on Chat API — HIGH
- **File**: `src/app/api/chat/route.ts`
- **Evidence**: No rate limit middleware, no per-user throttle
- **Why it matters**: A user could spam the chat endpoint, running up OpenRouter/Gemini costs rapidly
- **Severity**: HIGH
- **Fix**: Add rate limiting (e.g., Vercel KV rate limiter or custom middleware)

### R4. Zustand State Loss on Refresh — MEDIUM
- **Files**: `stores/userStore.ts`, `chatStore.ts`, `learningStore.ts`
- **Evidence**: Only `settingsStore` uses `persist()`. All other stores lose data on page refresh.
- **Why it matters**: Chat history disappears. Learning progress in UI is lost. User appears logged out momentarily.
- **Severity**: MEDIUM
- **Fix**: Add `persist` to userStore and chatStore, or implement proper data fetching on page mount

### R5. Silent Auth Failures in Middleware — MEDIUM
- **File**: `src/middleware.ts:58-61`
- **Evidence**: `catch { return supabaseResponse; }` — any auth error silently allows the request through
- **Why it matters**: If Supabase has issues, all protected routes become publicly accessible
- **Severity**: MEDIUM
- **Fix**: Log the error, potentially return 503 instead of allowing access

### R6. Missing RPC Function Fallback — LOW
- **File**: `src/app/api/lessons/route.ts:129`
- **Evidence**: Calls `supabase.rpc("add_xp_and_update_stats")` which doesn't exist in migrations. Falls back to manual update.
- **Why it matters**: Always hits the fallback path, extra DB round-trip
- **Severity**: LOW
- **Fix**: Either create the RPC function or remove the attempted call

### R7. Pronunciation Scoring is Fake — MEDIUM
- **File**: `src/app/api/pronunciation/route.ts:17`
- **Evidence**: `const mockScore = Math.floor(Math.random() * 30) + 70;`
- **Why it matters**: Users get meaningless feedback. Core feature promise (pronunciation practice) is broken.
- **Severity**: MEDIUM (product risk, not technical risk)
- **Fix**: Integrate Azure Speech SDK or use Web Speech API confidence scores

## Operational Risks

### O1. Zero Test Coverage — CRITICAL
- **Evidence**: No test files (`*.test.*`, `*.spec.*`), no test config (jest/vitest), no test runner
- **Why it matters**: No safety net for changes. Any refactor could break features undetected.
- **Severity**: CRITICAL
- **Fix**: Set up Vitest, write tests for API routes first (highest value), then hooks

### O2. No Error Tracking — HIGH
- **Evidence**: Only `console.error` throughout codebase. No Sentry, no LogRocket, no error reporting.
- **Why it matters**: Production errors are invisible. No way to know if users hit failures.
- **Severity**: HIGH
- **Fix**: Add Sentry or similar error tracking

### O3. No Health Check — MEDIUM
- **Evidence**: No `/api/health` or similar endpoint
- **Why it matters**: No way to monitor if the app is up and DB is connected
- **Severity**: MEDIUM
- **Fix**: Add `/api/health` that checks Supabase connectivity

### O4. Font Loading Strategy — LOW
- **File**: `src/app/layout.tsx:34-38`
- **Evidence**: Uses `<link>` tags for Google Fonts (eslint warning: "Custom fonts not added in pages/_document.js will only load for a single page")
- **Why it matters**: Potential FOUT (Flash of Unstyled Text), single-page font loading
- **Severity**: LOW
- **Fix**: Use `next/font/google` for proper font optimization

### O5. Unused Font Files — LOW
- **Files**: `src/app/fonts/GeistVF.woff`, `src/app/fonts/GeistMonoVF.woff`
- **Evidence**: Files exist but are not imported or referenced anywhere
- **Why it matters**: Dead assets, 200KB+ wasted
- **Severity**: LOW

## Suggested Order of Fixing

| Priority | Action | Impact |
|----------|--------|--------|
| 1 | Wire frontend to API routes (remove hardcoded data dependency) | Fixes S1, S3 |
| 2 | Add basic tests for API routes + useAuth | Fixes O1 partially |
| 3 | Add rate limiting to chat API | Fixes R3 |
| 4 | Add request timeouts to AI calls | Fixes R1 |
| 5 | Fix XP double-award bug | Fixes R2 |
| 6 | Add error tracking (Sentry) | Fixes O2 |
| 7 | Split lesson player into sub-components | Fixes S2 |
| 8 | Connect Roleplay/Tutors to Chat system | Activates built-but-inactive features |
| 9 | Implement real pronunciation scoring | Fixes R7 |
| 10 | Add health check endpoint | Fixes O3 |
