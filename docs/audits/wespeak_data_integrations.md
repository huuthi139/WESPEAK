# WESPEAK Data Layer & Integrations

## Databases / Stores

### 1. Supabase PostgreSQL (Primary DB)
- **Connection**: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Client**: `src/lib/supabase/client.ts` (browser), `src/lib/supabase/server.ts` (server)
- **Used by**: All API routes, useAuth hook, middleware

### Database Schema (from migrations)

| Table | Columns | Purpose | Used By |
|-------|---------|---------|---------|
| `users` | id, email, name, avatar_url, native_language, daily_goal_minutes, created_at | User profiles | useAuth, api/user/* |
| `user_stats` | user_id, total_xp, current_streak, longest_streak, gems, level, lessons_completed, total_minutes, last_active_date, updated_at | Gamification stats | api/xp, api/streak, api/user/stats |
| `user_languages` | id, user_id, language, current_level, created_at | Languages per user | **NOT USED** by any code |
| `courses` | id, language, title, description, level, total_lessons, duration_hours, thumbnail_url, is_premium, order_index | Course catalog | api/courses |
| `units` | id, course_id, title, description, order_index | Course units | api/lessons |
| `lessons` | id, unit_id, title, type, content (JSONB), duration_minutes, xp_reward, order_index | Lesson content | api/lessons |
| `user_progress` | id, user_id, lesson_id, completed, score, completed_at | Per-lesson progress | api/lessons, api/progress |
| `daily_activity` | id, user_id, date, minutes_learned, xp_earned, lessons_completed, goal_reached | Daily tracking | api/xp, api/progress |
| `achievements` | id, name, description, icon, category, requirement, xp_reward | Achievement definitions | api/achievements |
| `user_achievements` | user_id, achievement_id, unlocked_at | Unlocked achievements | api/achievements |
| `chat_history` | id, user_id, scenario, messages (JSONB), created_at | AI chat logs | **NOT USED** by any code |

### Indexes
- `idx_user_progress_user` on user_progress(user_id)
- `idx_daily_activity_user_date` on daily_activity(user_id, date)
- `idx_lessons_unit` on lessons(unit_id)
- `idx_user_languages_user` on user_languages(user_id)
- `idx_chat_history_user` on chat_history(user_id)
- `idx_units_course` on units(course_id)

### Seed Data (from migrations)
- `002_seed_courses.sql` — Course definitions for EN/CN/KR/JP
- `003-007` — Lesson content for English A1, A2, Chinese A1, Korean A1, Japanese A1
- `001` seeds 20 achievements

### 2. Zustand Stores (Client Memory)

| Store | File | Persisted? | Purpose |
|-------|------|-----------|---------|
| userStore | `stores/userStore.ts` | No | User, stats, languages, daily activity |
| chatStore | `stores/chatStore.ts` | No | Chat messages, scenario, UI state |
| learningStore | `stores/learningStore.ts` | No | Courses, units, lessons, progress |
| settingsStore | `stores/settingsStore.ts` | **Yes** (localStorage) | Speech speed, voice, pitch, AI model |

### 3. Hardcoded Data Files

| File | LOC | Content |
|------|-----|---------|
| `data/english-courses.ts` | 1,708 | English A1 course with vocabulary, grammar, conversations |
| `data/english-b1-course.ts` | 837 | English B1 course content |
| `data/english-b2-course.ts` | 1,613 | English B2 course content |
| `data/multi-lang-courses.ts` | 558 | Multi-language course index + helper functions |

## Data Flow Issues

### Orphan Tables
- **`user_languages`** — Table exists in schema, indexed, but NO code reads or writes to it
- **`chat_history`** — Table exists, indexed, but NO code persists chat conversations to it

### Missing Idempotency
- **XP addition** (`api/xp/route.ts`): No idempotency key. Double-submitting adds XP twice
- **Lesson completion** (`api/lessons/route.ts`): Uses UPSERT (idempotent for progress), but XP reward is added every time even for re-completion

### Missing Audit Trail
- No logging of who changed what, when
- `updated_at` field only on `user_stats`, not on other tables
- No soft deletes anywhere

### Duplicate Data Responsibilities
- Course/lesson data exists in BOTH Supabase (via migrations) AND hardcoded files (`src/data/`)
- Frontend prefers hardcoded data, API returns Supabase data — these may diverge

### Stale State Risk
- Zustand stores (userStore, learningStore, chatStore) are not persisted
- Page refresh loses all state except settingsStore
- No rehydration strategy for user data on navigation

---

## Integrations

### 1. OpenRouter API
- **Type**: AI/LLM Provider
- **File**: `src/lib/openrouter.ts`, `src/app/api/chat/route.ts`
- **Purpose**: Primary AI conversation provider
- **Status**: **ACTIVE**
- **Models**: Gemini 2.0 Flash (free), Qwen3 235B (free), GPT-4.1 Mini
- **Error Handling**: Yes — catches errors, tries fallback models
- **Timeout/Retry**: No explicit timeout. Fallback across models but no retry for same model
- **Config**: `OPENROUTER_API_KEY` in .env.local

### 2. Google Gemini
- **Type**: AI/LLM Provider (fallback)
- **File**: `src/lib/gemini.ts`, `src/app/api/chat/route.ts`
- **Purpose**: Last-resort fallback when all OpenRouter models fail
- **Status**: **ACTIVE**
- **Model**: gemini-2.0-flash
- **Error Handling**: Catches at chat route level
- **Config**: `GEMINI_API_KEY` in .env.local

### 3. OpenAI
- **Type**: AI/LLM Provider (legacy)
- **File**: `src/lib/openai.ts`
- **Purpose**: Originally primary, now unused
- **Status**: **CONFIGURED but INACTIVE**
- **Evidence**: `openai.ts` creates client, exports `CHAT_MODEL = "gpt-4o-mini"`, but `api/chat/route.ts` does NOT import or call it
- **Config**: `OPENAI_API_KEY` in .env.local
- **Risk**: Dead dependency — `openai` package (6.24.0) still in package.json

### 4. Supabase Auth
- **Type**: Authentication Provider
- **File**: `src/lib/supabase/client.ts`, `server.ts`, `hooks/useAuth.ts`, `middleware.ts`
- **Purpose**: User authentication (email/password + Google OAuth)
- **Status**: **ACTIVE** with demo fallback
- **Error Handling**: Yes — Vietnamese error messages, graceful degradation
- **Config**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Supabase Database
- **Type**: PostgreSQL via Supabase
- **File**: All `api/` routes use `createServerSupabaseClient()`
- **Purpose**: Persistent data storage
- **Status**: **ACTIVE** (API routes), **BYPASSED** (frontend uses hardcoded data)
- **Error Handling**: All routes check for null client, return 503

### 6. Google Fonts CDN
- **Type**: Font delivery
- **File**: `src/app/layout.tsx` (link tags)
- **Purpose**: Load Inter font
- **Status**: **ACTIVE**
- **Risk**: No local fallback font files (Geist fonts in `/fonts/` are unused)

### 7. Web Speech API
- **Type**: Browser API (TTS + STT)
- **File**: `src/hooks/useSpeech.ts`
- **Purpose**: Text-to-speech and speech-to-text
- **Status**: **ACTIVE** (client-side only)
- **Risk**: Not available in all browsers. No feature detection warning to users

### 8. Azure Speech (Planned)
- **Type**: Pronunciation scoring
- **File**: `src/app/api/pronunciation/route.ts` (placeholder comment)
- **Status**: **STUB** — returns mock random scores
- **Evidence**: Line 15: `"This endpoint is a placeholder for future Azure Speech integration"`

### Integration Risk Summary

| Integration | Active | Error Handling | Timeout | Retry | Fallback |
|------------|--------|---------------|---------|-------|----------|
| OpenRouter | Yes | Yes | No | No (model switch) | Gemini |
| Gemini | Yes | Yes | No | No | None (final) |
| OpenAI | No | N/A | N/A | N/A | N/A (unused) |
| Supabase Auth | Yes | Yes | No | No | Demo mode |
| Supabase DB | Yes | Yes | No | No | 503 error |
| Web Speech | Yes | Partial | N/A | N/A | Graceful degrade |
| Azure Speech | Stub | N/A | N/A | N/A | Mock data |
