# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Peekaboo Play House (artifacts/peekaboo-playhouse)

Bilingual (Arabic/English) kids' learning app — letters, numbers, animals, colors, songs, videos, quiz, and AI smart teacher.

### Architecture
- **Routing**: `wouter`. Pages in `src/pages/` (Home, Letters, Numbers, Animals, Colors, Songs, Videos, Quiz, Teacher).
- **Language**: `src/contexts/LanguageContext.tsx` provides `lang`, `dir`, `t()` and a toggle. Persists to `localStorage` and sets `<html lang/dir>`.
- **Translations**: `src/i18n/translations.ts` — `t("nav.letters")` style lookup.
- **Rewards**: `src/contexts/RewardsContext.tsx` — star counter (localStorage), confetti burst, audio "ding" via Web Audio API, toast notifications.
- **Speech (TTS)**: `src/lib/speech.ts` — Web Speech API wrapper, picks AR/EN voice automatically.
- **Learning data**: `src/data/learning.ts` — Arabic + English alphabets, numbers 1-20, animals with sounds, colors, default songs/videos (YouTube), quiz questions.
- **Songs/Videos**: `src/pages/MediaPage.tsx` — generic gallery with YouTube thumbnail, click-to-play iframe, language filter, user can add YouTube URLs (saved per-page in localStorage under `peekaboo.songs` / `peekaboo.videos`).
- **AI Teacher**: reuses `PeekabooCreatorAssistant` which streams from `/api/chat/stream` (Gemini via Replit AI Integrations).

### Theme
- Fonts: Fredoka (display), Nunito (body) — loaded in `index.html`.
- Brand palette CSS vars in `src/index.css` (peekaboo-yellow/teal/pink/blue/purple/orange).
- Polka-dot bg utility `.bg-polka`.
