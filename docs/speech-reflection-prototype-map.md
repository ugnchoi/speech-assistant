# Speech Reflection Prototype (Frontend-Only) – Implementation Plan

**Purpose:** Living map of the prototype. No implementation detail beyond structure and intent.

---

## 1. Objective

Build a lightweight, frontend-only web prototype to validate:

- Acceptance of AI as a listener reflection (not evaluator)
- Emotional response (curiosity vs defensiveness)
- Clarity of mental model
- Willingness to continue after first reflection

This prototype prioritizes:

- Framing
- Tone
- UX flow

**NOT:**

- Model quality
- Backend infrastructure
- Accuracy of analysis

---

## 2. Core Mental Model

**You preach. It listens. It reflects. You decide.**

**AI role:**

- Private listener
- Reflection surface
- Non-authoritative

**Avoid framing as:**

- Coach
- Evaluator
- Church member
- Theological authority

---

## 3. Scope (v0)

### Included

- Text input (paste sermon)
- Sample sermon option
- Mock reflection generation
- Local storage (browser only)
- Full UX flow

### Excluded

- Authentication
- Backend / database
- Real AI calls
- Audio upload / transcription
- Analytics infra

---

## 4. Core User Flow

1. Landing
2. “What this is” explainer
3. Intention input
4. Sermon input (paste or sample)
5. Processing state
6. Reflection result
7. Calibration
8. Optional next step
9. Close / save state

---

## 5. Tech Stack (Prototype)

- Next.js (App Router)
- TypeScript
- basecn (UI components)
- Tailwind CSS
- React Hook Form (optional)
- LocalStorage (state persistence)

No backend required.

---

## 6. Project Structure

> **Note:** In this repo, these paths live under `src/` (e.g. `src/app/`, `src/components/`).

```
app/
  page.tsx
  prototype/
    page.tsx
components/
  layout/
  onboarding/
  reflection/
  forms/
lib/
  mock-engine.ts
  fixtures.ts
  storage.ts
  variants.ts
types/
  reflection.ts
```

---

## 7. Reflection Data Contract

```ts
type ReflectionResult = {
  intendedTakeaway: string
  echo: string
  stayed: string
  needsHelp: string
  alive: string
  gentleSuggestion?: string
  nextReflectionQuestion?: string
}

type Calibration = {
  closeness: "close" | "somewhat" | "not-close"
  comment?: string
}
```

---

## 8. Mock AI Strategy

### A. Curated Fixtures

Predefined sermon + reflection pairs:

- High-quality
- Controlled tone
- Used for demo/sample path

### B. Heuristic Generator

Client-side logic based on:

- Text length
- Paragraph structure
- Presence of transitions
- Stated intention

**Goal:** produce plausible, not accurate output.

---

## 9. Screen Specifications
- Screen descriptions are stored in sermon_reflection_korean.md

## 10. UX Design Principles

- Calm, quiet interface
- No dashboards or metrics
- One action per screen
- Narrow reading width
- Soft card layout

---

## 11. Tone Guidelines

**Use**

- reflection
- listener
- carry away
- felt most alive
- may / might / likely

**Avoid**

- evaluate
- score
- optimize
- performance
- critique

---

## 12. Experimentation

Test headline variants:

- Brief Listener Reflection
- What may still echo tomorrow
- Post-sermon reflection

---

## 13. Success Criteria

Prototype is successful if users say:

- “This feels like reflection, not critique”
- “I’d try this on a real sermon”
- “This doesn’t feel threatening”
- “I’m curious to go deeper”

---

## 14. Phased Build Plan

| Phase | Focus | Implementation Plan |
|-------|--------|---------------------|
| **Phase 1** | Layout + screens | [phase-1-layout-and-screens.md](./phase-1-layout-and-screens.md) |
| **Phase 2** | Full flow wiring | [phase-2-full-flow-wiring.md](./phase-2-full-flow-wiring.md) |
| **Phase 3** | Mock engine | [phase-3-mock-engine.md](./phase-3-mock-engine.md) |
| **Phase 4** | Tone + trust copy | [phase-4-tone-and-trust-copy.md](./phase-4-tone-and-trust-copy.md) |
| **Phase 5** | Variant testing + export | [phase-5-variant-testing-and-export.md](./phase-5-variant-testing-and-export.md) |

---

## 15. Key Principle

**Build a believable mirror, not a fake expert system.**

The goal is not correctness.  
The goal is acceptance and curiosity.

---

## README (Prototype Stage)

### Overview

This is a frontend-only prototype for a sermon reflection tool designed for pastors.

The product provides a brief listener reflection on a sermon, focusing on what may have stayed with a listener, where clarity may be needed, and what felt most alive.

This stage is focused on validating:

- framing (reflection vs evaluation)
- user acceptance of AI involvement
- emotional response (curiosity vs defensiveness)
- willingness to engage further

No backend or real AI is used at this stage.

---

### Core Idea

**You preach. It listens. It reflects. You decide.**

The system acts as a private listener mirror, not a coach or evaluator.

---

### Features (Prototype)

- Paste sermon text
- Try sample sermons
- Enter intended takeaway
- View lightweight reflection
- Provide calibration (how close it felt)
- Optional next step (suggestion or reflection question)
- Local browser persistence

---

### Tech Stack

- Next.js (App Router)
- TypeScript
- basecn (UI components)
- Tailwind CSS
- LocalStorage (state)

---

### How It Works

1. User enters intended takeaway
2. User pastes sermon or selects sample
3. System generates mock reflection (fixture or heuristic)
4. User reviews reflection
5. User calibrates response
6. Optional deeper step (suggestion or reflection prompt)

---

### Mock AI Approach

This prototype does not use real AI.

Instead:

- Sample sermons use curated reflection outputs
- Custom input uses simple heuristic generation

The goal is to simulate the shape and tone of the final experience.

---

### Design Principles

- Reflection, not evaluation
- Non-judgmental tone
- Preserve authorship
- Minimal and calm UI
- One action at a time

---

### Success Criteria

The prototype is successful if users:

- feel safe using the tool
- understand the reflection model
- are not put off by AI
- express curiosity to continue

---

### Limitations

- No real AI analysis
- No audio support
- No user accounts
- Data stored locally only

---

### Next Steps

- Integrate real LLM backend
- Add audio transcription
- Introduce user accounts + persistence
- Improve reflection quality

---

### Running the Project

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

---

### Note

This is a validation prototype, not a production system.

Focus is on user perception and interaction, not correctness of output.
