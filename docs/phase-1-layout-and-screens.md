# Phase 1 — Layout + Screens

**Routing approach:** Separate routes under `src/app/prototype/*` (one URL per screen). `/prototype` is a flow index with links to each step. Phase 2 can add redirects or a step manager without replacing these pages.

**Focus:** Build the visual skeleton — the app shell, all screen containers, and static UI for each step of the reflection flow.

**Depends on:** Nothing (first phase)

**References:**

- [Design direction](./design.md) — visual tone, layout principles, shell spec
- [Prototype map](./speech-reflection-prototype-map.md) — screen list, project structure, UX principles
- [Korean screen content](./sermon_reflection_korean.md) — copy and content structure for each screen

---

## Goals

1. Establish the global layout shell (top bar, centered body, footer)
2. Create route structure under `src/app/`
3. Build placeholder components for every screen in the user flow
4. Apply design tokens and visual tone from `design.md`
5. Ensure every screen is visually reviewable in isolation

---

## Deliverables

### 1.1 — Global Shell (`src/components/layout/shell.tsx`)

The current `Shell` component is a minimal flex wrapper. Expand it to match the shell specification in `design.md`:

| Section | Implementation |
|---------|---------------|
| **Top bar** | Flex row. Left: product wordmark "설교의 메아리" (text, not image). Center-right: small "Prototype" badge using a muted pill. Optional "How it works" link on far right. |
| **Main body** | Single centered column. `max-w-2xl` (tuned for reading comfort). Generous vertical padding (`py-12` to `py-16`). |
| **Footer** | Minimal centered text: "Private prototype · No scores · No rewriting". Muted color, small font. Sticky to bottom or pushed by content. |

**Acceptance criteria:**

- Shell renders correctly at mobile, tablet, and desktop widths
- Wordmark, badge, and footer text are visible
- Content area never exceeds comfortable reading width

---

### 1.2 — Route Structure

Create the following routes under `src/app/`:

```
src/app/
  page.tsx                    ← Landing (Screen 1)
  prototype/
    page.tsx                  ← Flow entry (redirect or step manager)
    what-this-is/
      page.tsx                ← Screen 2: "What this is"
    intention/
      page.tsx                ← Screen 3: Intention prompt
    sermon-input/
      page.tsx                ← Screen 4: Sermon input
    processing/
      page.tsx                ← Screen 5: Processing state
    reflection/
      page.tsx                ← Screen 6: Reflection result
    calibration/
      page.tsx                ← Screen 7: Calibration
    next-step/
      page.tsx                ← Screen 8: Next step choice
    suggestion/
      page.tsx                ← Screen 9A: Gentle suggestion
    reflection-question/
      page.tsx                ← Screen 9B: Reflection question
    closing/
      page.tsx                ← Screen 10: Closing
```

> **Alternative:** If the team prefers a single-page stepped flow rather than separate routes, create a single `/prototype/page.tsx` with a step state machine and all screen components imported. Both approaches are compatible with Phase 2 wiring. Document the chosen approach in this file before starting.

**Acceptance criteria:**

- Every route renders without errors
- Navigation between screens is possible via direct URL

---

### 1.3 — Screen Components

Create one component per screen under `src/components/screens/`. Each component receives no props in Phase 1 — they render static/hardcoded content based on the Korean copy in `sermon_reflection_korean.md`.

| Component file | Screen | Key elements |
|---------------|--------|-------------|
| `landing.tsx` | Screen 1 — Landing | Eyebrow, headline, subheadline, trust statements (list), primary CTA button, secondary CTA link |
| `what-this-is.tsx` | Screen 2 — What this is | Title, body paragraphs, summary bullets, CTA button, back link |
| `intention-prompt.tsx` | Screen 3 — Intention prompt | Title, prompt text, helper text, textarea with placeholder |
| `sermon-input.tsx` | Screen 4 — Sermon input | Title, subtitle, large textarea, "Try sample" option |
| `processing.tsx` | Screen 5 — Processing | Title, animated loading indicator (subtle, not a spinner — consider a pulsing dot or text fade) |
| `reflection-result.tsx` | Screen 6 — Reflection result | Title, reflection card sections (echo, stayed, needs-help, alive) |
| `calibration.tsx` | Screen 7 — Calibration | Prompt, three selectable options (close / somewhat / not-close), optional comment textarea |
| `next-step.tsx` | Screen 8 — Next step | Title, two option cards (gentle suggestion vs. reflection question) |
| `gentle-suggestion.tsx` | Screen 9A — Suggestion | Title, suggestion text block |
| `reflection-question.tsx` | Screen 9B — Question | Title, question text block |
| `closing.tsx` | Screen 10 — Closing | Title, confirmation message |

**Acceptance criteria:**

- Each component renders the correct Korean copy
- Components use Tailwind classes consistent with `design.md`
- Every interactive element has accessibility attributes (`aria-label`, `tabIndex`, keyboard handlers)
- No data fetching or state management — purely presentational

---

### 1.4 — Design Tokens & Visual Foundation

Extend `src/app/globals.css` and/or `src/styles/app.css` as needed:

| Token area | Details |
|-----------|---------|
| **Typography** | Use Geist font (already configured in layout). Define heading sizes for screen titles, body text, helper text, and eyebrow text. |
| **Colors** | Muted, warm palette. Primary action color should be subtle (not bold blue). Background: near-white or very light warm gray. Card backgrounds: white with soft border. |
| **Spacing** | Consistent vertical rhythm. Screen sections separated by `space-y-8` or `space-y-10`. Card padding: `p-6` to `p-8`. |
| **Cards** | Soft border (`border border-border`), rounded corners (`rounded-xl`), gentle shadow (`shadow-sm`) or none. |
| **Transitions** | Subtle fade-in for screen transitions (`transition-opacity duration-300`). No jarring animations. |

**Acceptance criteria:**

- Visual output matches the "quiet, private, reflective" tone
- No dashboard, analytics, or coaching aesthetics
- Cards and spacing feel generous, not cramped

---

### 1.5 — Barrel Exports

Create or update barrel `index.ts` files:

- `src/components/screens/index.ts` — re-export all screen components
- Update `src/components/layout/index.ts` if needed

---

## Files to Create

| Path | Purpose |
|------|---------|
| `src/components/screens/landing.tsx` | Screen 1 component |
| `src/components/screens/what-this-is.tsx` | Screen 2 component |
| `src/components/screens/intention-prompt.tsx` | Screen 3 component |
| `src/components/screens/sermon-input.tsx` | Screen 4 component |
| `src/components/screens/processing.tsx` | Screen 5 component |
| `src/components/screens/reflection-result.tsx` | Screen 6 component |
| `src/components/screens/calibration.tsx` | Screen 7 component |
| `src/components/screens/next-step.tsx` | Screen 8 component |
| `src/components/screens/gentle-suggestion.tsx` | Screen 9A component |
| `src/components/screens/reflection-question.tsx` | Screen 9B component |
| `src/components/screens/closing.tsx` | Screen 10 component |
| `src/components/screens/index.ts` | Barrel export |

## Files to Modify

| Path | Change |
|------|--------|
| `src/components/layout/shell.tsx` | Expand to full shell (top bar, body, footer) |
| `src/app/page.tsx` | Replace boilerplate with `Landing` screen |
| `src/app/prototype/page.tsx` | Replace demo page with flow entry point |
| `src/app/globals.css` | Add/adjust design tokens if needed |
| `src/styles/app.css` | Add custom styles if Tailwind utilities are insufficient |

---

## Validation Checklist

- [ ] All 10+ screens render at `/` and `/prototype/*`
- [ ] Shell shows wordmark, prototype badge, and footer on every page
- [ ] Visual tone feels quiet and reflective — not techy or dashboard-like
- [ ] Responsive at 375px, 768px, and 1280px widths
- [ ] All interactive elements have `aria-label` and keyboard support
- [ ] No TypeScript errors (`pnpm build` succeeds)
- [ ] No ESLint warnings (`pnpm lint` passes)

---

## Out of Scope (deferred to later phases)

- Screen-to-screen navigation logic (Phase 2)
- Form state and data flow (Phase 2)
- Mock AI generation (Phase 3)
- Final copy tuning (Phase 4)
- A/B variant switching (Phase 5)
