# WESPEAK Audit Overview

**Date**: 2026-03-07
**Branch**: `claude/claude-md-mm08v8y4b4ekbab9-H5F39`
**Mode**: READ-ONLY

## Executive Summary

WESPEAK is an AI-powered language learning web app targeting Vietnamese learners (ages 16-45). Built with Next.js 14 (App Router), it focuses on speaking skills for English, Chinese, Korean, and Japanese.

The project is at **early-to-mid prototype stage** (~45% overall maturity). The UI layer is well-developed with 17 pages and a polished dark glassmorphism theme. The AI Chat feature is the most production-ready subsystem. However, most pages rely on hardcoded mock data rather than live API calls, and there are zero automated tests.

## Codebase Size

| Metric | Value |
|--------|-------|
| Total files (excl. node_modules, .next, .git) | 88 |
| TypeScript/TSX source files | 62 |
| Total LOC (TSX) | 8,821 |
| Total LOC (TS) | 7,273 |
| Total LOC (CSS) | 242 |
| Data files LOC | ~4,716 (english-courses, b1, b2, multi-lang) |
| SQL migrations | 7 files, 917 lines |

## Languages

| Language | Files | LOC |
|----------|-------|-----|
| TypeScript (.tsx) | 27 | 8,821 |
| TypeScript (.ts) | 35 | 7,273 |
| CSS | 1 | 242 |
| SQL | 7 | 917 |

## Top Folders

```
src/
  app/
    (auth)/     — 3 pages: login, register, onboarding
    (main)/     — 14 pages: home, chat, learn (3), pronunciation, flashcards,
                  leaderboard, profile, settings, roleplay, tutors, analysis, premium
    api/        — 12 API routes
  components/   — 7 components (4 ui, 1 layout, 2 shared)
  hooks/        — 3 hooks (useAuth, useSpeech, useAudio)
  stores/       — 4 Zustand stores
  lib/          — 6 lib files (supabase, openai, gemini, openrouter, ai-models, utils)
  data/         — 4 hardcoded course data files
  types/        — 1 type definition file
supabase/
  migrations/   — 7 SQL files (schema + seed data)
```

## Entry Points

| Entry | File | Purpose |
|-------|------|---------|
| Root Layout | `src/app/layout.tsx` | HTML shell, Inter font, globals.css |
| Main Layout | `src/app/(main)/layout.tsx` | Navy gradient bg, BottomNav, max-w-md |
| Auth Layout | `src/app/(auth)/layout.tsx` | Auth pages wrapper |
| Middleware | `src/middleware.ts` | Auth guard, demo mode bypass |
| API Routes | `src/app/api/*/route.ts` | 12 server-side endpoints |

## Key Findings

1. **AI Chat is the strongest feature** — OpenRouter primary, Gemini fallback, 3 free models, 6 scenario prompts, proper error handling and model fallback chain
2. **Learning system uses hardcoded data** — 4 data files with ~4,700 LOC of static course content; pages import directly from `@/data/` instead of fetching from API
3. **API routes exist but are mostly unused** — 12 API routes connect to Supabase properly, but frontend pages don't call most of them
4. **Zero tests** — No test files, no test config, no test runner
5. **Demo mode everywhere** — When Supabase is not configured, app falls back to hardcoded demo data
6. **Pronunciation scoring is fake** — API returns `Math.random()` scores
7. **No PWA manifest** — `manifest.json` referenced but only icon SVG exists in public/

## Audit Scope

- Full codebase read of all 62 source files
- All 12 API routes analyzed
- All 4 Zustand stores analyzed
- All 7 SQL migrations analyzed
- All 17 pages assessed for data source (mock vs real)
- Dependency analysis from package.json

## Unknowns

1. **Supabase project status** — Cannot verify if migrations have been applied or if DB is populated
2. **Vercel deployment status** — `.vercel/` directory exists but cannot verify live deployment state
3. **OpenRouter/Gemini API key validity** — Keys exist in .env.local but cannot test connectivity
4. **Google OAuth configuration** — Cannot verify if Supabase Google provider is configured
5. **Actual user count** — Cannot query production database
