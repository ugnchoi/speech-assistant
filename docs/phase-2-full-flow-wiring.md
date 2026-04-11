# Phase 2 — Full Flow Wiring

**Focus:** Connect all screens into a working, navigable flow with state management, form handling, and local persistence.

**Depends on:** Phase 1 (Layout + Screens)

**References:**

- [Prototype map](./speech-reflection-prototype-map.md) — core user flow (§4), data contract (§7), project structure (§6)
- [Design direction](./design.md) — one primary action per screen, no dense navigation
- [Korean screen content](./sermon_reflection_korean.md) — CTA labels and navigation copy

---

## Goals

1. Wire all screens into a linear step-based flow
2. Implement form state management for user inputs
3. Persist session data to `localStorage`
4. Enable forward/back navigation with proper state guards
5. Define the `ReflectionSession` type to carry data through the flow

---

## Deliverables

### 2.1 — Flow State Machine

Create `src/lib/flow.ts` to manage the prototype flow:

```ts
const STEPS = [
  "landing",
  "what-this-is",
  "intention",
  "sermon-input",
  "processing",
  "reflection",
  "calibration",
  "next-step",
  "suggestion",       // optional branch A
  "reflection-question", // optional branch B
  "closing",
] as const;

type StepId = (typeof STEPS)[number];
```

**State machine rules:**

| From | To | Condition |
|------|----|-----------|
| `landing` | `what-this-is` | CTA click |
| `what-this-is` | `intention` | "Continue" click |
| `what-this-is` | `landing` | "Back" click |
| `intention` | `sermon-input` | Intention text is non-empty |
| `sermon-input` | `processing` | Sermon text is non-empty OR sample selected |
| `processing` | `reflection` | Automatic after mock generation delay |
| `reflection` | `calibration` | User has read reflection |
| `calibration` | `next-step` | Calibration choice is made |
| `next-step` | `suggestion` | User picks "gentle suggestion" |
| `next-step` | `reflection-question` | User picks "reflection question" |
| `suggestion` | `closing` | User acknowledges |
| `reflection-question` | `closing` | User acknowledges |
| `closing` | `landing` | "Start over" |

**Implementation approach:**

- Use a React context provider (`FlowProvider`) wrapping `/prototype`
- Expose `currentStep`, `goNext()`, `goBack()`, `goTo(step)` via `useFlow()` hook
- Store current step in URL search param or React state (URL preferred for shareability)

---

### 2.2 — Session Data Type

Create or extend `src/types/reflection.ts`:

```ts
type ReflectionSession = {
  id: string;
  createdAt: string;
  intention: string;
  sermonText: string;
  usedSample: boolean;
  reflection: ReflectionResult | null;
  calibration: Calibration | null;
  chosenNextStep: "suggestion" | "reflection-question" | null;
  completedAt: string | null;
};

type ReflectionResult = {
  intendedTakeaway: string;
  echo: string;
  stayed: string;
  needsHelp: string;
  alive: string;
  gentleSuggestion?: string;
  nextReflectionQuestion?: string;
};

type Calibration = {
  closeness: "close" | "somewhat" | "not-close";
  comment?: string;
};
```

Keep the existing `ReflectionEntry` type for backward compatibility. `ReflectionSession` is the new primary session type.

---

### 2.3 — Flow Context Provider

Create `src/components/providers/flow-provider.tsx`:

| Export | Purpose |
|--------|---------|
| `FlowProvider` | Context provider wrapping the prototype route. Holds `currentStep` and `session` state. |
| `useFlow()` | Hook returning `{ currentStep, goNext, goBack, goTo, session, updateSession }`. |

**Provider responsibilities:**

- Initialize session with a unique `id` and `createdAt` timestamp
- Validate step transitions (prevent skipping ahead without required data)
- Expose `updateSession(partial)` to merge new data into session state
- On step change, scroll to top of page

---

### 2.4 — Form State for Input Screens

#### Screen 3 — Intention Prompt

- Controlled textarea bound to `session.intention`
- "Continue" button disabled until input is non-empty (min 10 characters)
- Helper text shown below input
- Placeholder from Korean copy
- `updateSession({ intention: value })` on change

#### Screen 4 — Sermon Input

- Large controlled textarea bound to `session.sermonText`
- "Try sample" button that fills textarea with a fixture sermon and sets `session.usedSample = true`
- "Continue" button disabled until textarea has content (min 50 characters)
- Character count or word count indicator (subtle, bottom-right)
- `updateSession({ sermonText: value })` on change

#### Screen 7 — Calibration

- Three selectable options rendered as soft card buttons
- Only one selectable at a time (radio-like behavior)
- Optional comment textarea appears after selection
- `updateSession({ calibration: { closeness, comment } })` on change

---

### 2.5 — localStorage Persistence

Extend `src/lib/storage.ts`:

| Function | Signature | Purpose |
|----------|-----------|---------|
| `saveSession` | `(session: ReflectionSession) => void` | Serialize and store under `speech-assistant:session:{id}` |
| `loadSession` | `(id: string) => ReflectionSession \| null` | Retrieve and parse a session |
| `loadLatestSession` | `() => ReflectionSession \| null` | Return the most recently modified session |
| `listSessions` | `() => ReflectionSession[]` | Return all stored sessions, sorted by date |
| `deleteSession` | `(id: string) => void` | Remove a session |
| `clearAllSessions` | `() => void` | Wipe all sessions |

**Storage key format:** `speech-assistant:session:{uuid}`

**Persistence triggers:**

- Auto-save on every `updateSession()` call (debounced, 500ms)
- Save on step transition
- Save on `beforeunload` event

---

### 2.6 — Prototype Page Orchestrator

Refactor `src/app/prototype/page.tsx` into a step renderer:

```tsx
const PrototypePage = () => {
  const { currentStep } = useFlow();

  const screens: Record<StepId, React.ComponentType> = {
    landing: Landing,
    "what-this-is": WhatThisIs,
    intention: IntentionPrompt,
    "sermon-input": SermonInput,
    processing: Processing,
    reflection: ReflectionResult,
    calibration: Calibration,
    "next-step": NextStep,
    suggestion: GentleSuggestion,
    "reflection-question": ReflectionQuestion,
    closing: Closing,
  };

  const Screen = screens[currentStep];
  return <Screen />;
};
```

Wrap with `FlowProvider` in the prototype layout or directly in the page.

---

### 2.7 — Navigation Components

Create `src/components/navigation/`:

| Component | Purpose |
|-----------|---------|
| `FlowCta` | Primary "Continue" / "Start" button. Accepts `disabled`, `onClick`, `label`. Full-width on mobile, auto on desktop. |
| `FlowBack` | Subtle back link. Positioned top-left or below CTA. |
| `FlowProgress` | Optional: very subtle step indicator (e.g., thin progress bar or "Step 3 of 9"). Keep minimal per design principles. |

---

## Files to Create

| Path | Purpose |
|------|---------|
| `src/lib/flow.ts` | Step definitions, types, transition logic |
| `src/components/providers/flow-provider.tsx` | FlowProvider context + useFlow hook |
| `src/components/navigation/flow-cta.tsx` | Primary CTA button for flow |
| `src/components/navigation/flow-back.tsx` | Back navigation link |
| `src/components/navigation/flow-progress.tsx` | Optional progress indicator |
| `src/components/navigation/index.ts` | Barrel export |
| `src/components/providers/index.ts` | Barrel export |

## Files to Modify

| Path | Change |
|------|--------|
| `src/types/reflection.ts` | Add `ReflectionSession`, `ReflectionResult`, `Calibration` types |
| `src/lib/storage.ts` | Add session CRUD functions |
| `src/app/prototype/page.tsx` | Refactor to step-based orchestrator with FlowProvider |
| `src/components/screens/intention-prompt.tsx` | Add controlled form state via `useFlow()` |
| `src/components/screens/sermon-input.tsx` | Add controlled form state + sample button |
| `src/components/screens/calibration.tsx` | Add selection state |
| `src/components/screens/next-step.tsx` | Add branching navigation |
| `src/components/screens/processing.tsx` | Add auto-advance timer |
| `src/components/screens/closing.tsx` | Add "Start over" action |
| All screen components | Import and use `FlowCta`, `FlowBack`, and `useFlow()` for navigation |

---

## Validation Checklist

- [ ] User can navigate the full flow: Landing → What this is → Intention → Sermon input → Processing → Reflection → Calibration → Next step → Suggestion/Question → Closing
- [ ] Back navigation works where specified
- [ ] Cannot advance past intention or sermon input without entering text
- [ ] Processing screen auto-advances after a delay (2–3 seconds)
- [ ] Next step screen branches correctly based on user choice
- [ ] Session data persists in localStorage across page reloads
- [ ] Reloading mid-flow restores the correct step and data
- [ ] "Start over" from closing resets session and returns to landing
- [ ] Scroll position resets on step change
- [ ] All keyboard navigation works (Tab, Enter, Escape)
- [ ] No TypeScript errors, no ESLint warnings

---

## Out of Scope (deferred to later phases)

- Generating reflection content from sermon text (Phase 3)
- Tone-tuned copy and trust language (Phase 4)
- Headline/CTA variant switching (Phase 5)
