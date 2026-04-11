---
name: speech-assistant-cloud-runbook
description: Run, lint, build, and manually test this Next.js 16 frontend. Use when setting up the dev environment, verifying changes, or debugging prototype flow and localStorage behavior.
---

# Speech Assistant — Cloud agent runbook

Frontend-only Next.js 16 (App Router). No database, backend, API keys, or user login. Prefer [`AGENTS.md`](../../../AGENTS.md) for stack conventions.

## Bootstrap (every fresh workspace)

```bash
cd /workspace   # or repo root
npm install
```

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server at **http://localhost:3000** (Turbopack) |
| `npm run lint` | ESLint (primary automated check; there is no `npm test`) |
| `npm run build` | Production build — catches type and Next compile issues |
| `npm run start` | Serves production build (run `npm run build` first) |

**Auth / login:** Not applicable. Nothing in this app requires signing in.

**Environment variables:** None are required. There is no `.env` usage in source today; do not assume secrets or feature toggles via `process.env` until the codebase adds them.

---

## By codebase area

### App routes (`src/app/`)

- **`/`** — Landing (`src/app/page.tsx` → `Landing` screen).
- **`/prototype`** — Multi-step reflection prototype; all steps share `src/app/prototype/layout.tsx` (`FlowProvider`).
- **Nested `/prototype/*` routes** — One route file per step (e.g. `intention/page.tsx`); behavior is driven by the flow provider and `?step=` (see below).

**Quick manual test:** After `npm run dev`, open `/` then `/prototype`. Use browser devtools if you need to inspect network (should be minimal) or console errors.

### Prototype flow & navigation (`src/components/providers/flow-provider.tsx`, `src/lib/flow.ts`)

- Step is reflected in the URL: **`/prototype?step=<StepId>`**.
- Valid `StepId` values are listed in `src/types/flow-steps.ts` (`landing`, `what-this-is`, `intention`, … `closing`).
- **Deep-link rule:** You can only open a `step` the current session is allowed to reach (`canAccessStep`). Otherwise the app clamps to a valid step and replaces the URL.
- **Escape:** Press **Escape** to go to the previous step when allowed.

**Testing workflow:**

1. Start dev server; go to `/prototype?step=landing`.
2. Walk forward with the UI; confirm URL updates and reload preserves position (localStorage).
3. Paste an invalid `step` in the URL; confirm redirect/clamp matches `getMaxAccessibleStep` / `canAccessStep` logic in `src/lib/flow.ts`.

### Persistence & “mock state” (`src/lib/storage.ts`)

- **localStorage** keys are prefixed with `speech-assistant:`.
- Session blobs live under `speech-assistant:session:<id>` (see `saveSession` / `loadSession` / `listSessions`).
- **sessionStorage** key `speech-assistant:prototype-active-session` pins which session id the prototype uses for this tab.

**Testing workflow:**

1. Complete a few steps, reload — session should restore.
2. To simulate a **new user**: devtools → Application → clear **localStorage** and **sessionStorage** for the origin, then reload `/prototype`.
3. To test **corrupt / legacy data**: edit a `speech-assistant:session:*` value in devtools and reload; the app should skip invalid entries where implemented (`normalizeSession`).

There are **no feature flags** in code today. Treat these as the practical substitutes:

| Goal | How |
|------|-----|
| Jump to a screen | `/prototype?step=<StepId>` within access rules |
| Reset flow | Clear storage keys above, or use in-app navigation to start a new session from **closing** → **landing** (creates a new session and removes the old id) |
| Pin a specific session | Set `sessionStorage` `speech-assistant:prototype-active-session` to that session’s uuid after ensuring a matching `localStorage` key exists |

If the product later adds real flags (e.g. `NEXT_PUBLIC_*`), document the exact names and default behaviors in this skill.

### UI components (`src/components/`)

- Screens live under `src/components/screens/`; shared UI under `src/components/ui/` (basecn / Base UI patterns).
- **`docs/design.md`** is the living UI direction doc — update it when you change layout shell or visual tone in a user-visible way.

**Testing workflow:** Exercise the changed screen in the browser at the route that mounts it; zoom and keyboard where relevant; confirm focus and labels on interactive controls.

### Global styles (`src/app/globals.css`)

Tailwind v4 + `@tailwindcss/postcss`. No `tailwind.config.js`.

**Testing workflow:** Visual check in dev + `npm run build` (ensures CSS pipeline compiles).

---

## Automated vs manual

- **Always run** `npm run lint` before considering work done.
- **Run** `npm run build` when touching types, imports, routing, or anything that might not show until compile.
- **Browser manual pass** is required for prototype flow, animations, and localStorage edge cases — there is no Playwright/Cypress suite in this repo yet.

---

## Updating this skill

When you discover a new repeatable trick (debug URL, storage key, npm script, browser quirk, or future env flag):

1. Add it under the **correct codebase area** above, or extend the **Persistence & “mock state”** table if it is a toggle or reset recipe.
2. Keep commands copy-paste accurate; re-read `package.json` if scripts change.
3. If design or architecture shifts, sync pointers to `AGENTS.md` and `docs/design.md` rather than duplicating long explanations here.

This file should stay **short and procedural** — a fast checklist for Cloud agents, not a product spec.
