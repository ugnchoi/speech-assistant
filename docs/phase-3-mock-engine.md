# Phase 3 — Mock Engine

**Focus:** Build the client-side mock AI engine that generates plausible reflection output from sermon text — using curated fixtures and a heuristic generator.

**Depends on:** Phase 2 (Full Flow Wiring)

**References:**

- [Prototype map](./speech-reflection-prototype-map.md) — mock AI strategy (§8), reflection data contract (§7), fixtures approach
- [Korean screen content](./sermon_reflection_korean.md) — reflection result structure (Screen 6)
- [Design direction](./design.md) — tone (reflective, not evaluative)

---

## Goals

1. Replace the stub `createMockEngine()` with a working reflection generator
2. Create curated sermon + reflection fixture pairs for the "Try sample" path
3. Build a heuristic generator for custom sermon input
4. Integrate the engine into the flow so Processing → Reflection works end-to-end
5. Ensure generated output matches the `ReflectionResult` data contract

---

## Deliverables

### 3.1 — Curated Fixtures (`src/lib/fixtures.ts`)

Replace the empty `reflectionFixtures` array with 2–3 complete sermon + reflection pairs.

Each fixture is a full `SermonFixture` type:

```ts
type SermonFixture = {
  id: string;
  title: string;
  sermonText: string;
  suggestedIntention: string;
  reflection: ReflectionResult;
};
```

#### Fixture requirements

| # | Sermon topic | Approximate length | Tone |
|---|-------------|-------------------|------|
| 1 | God's faithfulness in the ordinary | ~400–600 words | Warm, narrative, pastoral |
| 2 | Forgiveness and letting go | ~300–500 words | Direct, emotional, personal |
| 3 | Community and carrying each other's burdens | ~500–700 words | Instructional, gentle, communal |

**Each reflection must include all fields:**

| Field | Description | Tone guidance |
|-------|-------------|---------------|
| `intendedTakeaway` | Mirrors the stated intention | Should echo, not judge |
| `echo` | What a listener might carry away | Use "might," "may," "could" |
| `stayed` | What lingered or stuck | Specific to the sermon's imagery or story |
| `needsHelp` | Where a listener might have gotten lost | Gentle framing: "some listeners may find…" |
| `alive` | What felt most vivid | Point to a moment, phrase, or image |
| `gentleSuggestion` | One small clarity suggestion | Framed as optional, not prescriptive |
| `nextReflectionQuestion` | A question for the preacher to sit with | Open-ended, not leading |

**Language:** All fixture content should be in Korean, matching the screen copy in `sermon_reflection_korean.md`. Provide English comments above each fixture for developer reference.

---

### 3.2 — Heuristic Generator (`src/lib/mock-engine.ts`)

Replace the stub `createMockEngine()` with a real heuristic-based generator.

**Input:** `{ intention: string; sermonText: string }`

**Output:** `ReflectionResult`

#### Heuristic strategy

The generator does **not** need to be accurate. It needs to produce output that is:

- Plausible in shape and length
- Tonally appropriate (reflective, not evaluative)
- Responsive to input characteristics (not fully random)

**Signal extraction from sermon text:**

| Signal | Method | Used for |
|--------|--------|----------|
| Total word count | Split + count | Adjusting response length |
| Paragraph count | Split on `\n\n` | Detecting structure |
| First paragraph | `paragraphs[0]` | Seeding `echo` and `stayed` |
| Last paragraph | `paragraphs[paragraphs.length - 1]` | Seeding `alive` |
| Has question marks | `text.includes("?")` | `needsHelp` content variation |
| Has transition words | Regex for 그러나, 하지만, 그래서, 결국 etc. | Detecting structure in `needsHelp` |
| Stated intention | Passed directly | `intendedTakeaway` mirror |

**Template strategy:**

Create a set of template strings for each reflection field. Select templates based on extracted signals and fill in with excerpted phrases from the sermon text.

```ts
const echoTemplates = [
  "이 설교에서 청중이 가장 기억할 수 있는 것은 {firstSentence}에 대한 이야기일 수 있습니다.",
  "전체적으로, 청중은 {intention}이라는 메시지를 떠올릴 가능성이 있습니다.",
  // ...
];
```

**Generator function signature:**

```ts
type MockEngineInput = {
  intention: string;
  sermonText: string;
};

const generateReflection = (input: MockEngineInput): ReflectionResult => {
  // extract signals
  // select templates
  // fill templates
  // return structured result
};
```

**Additional features:**

- Add a simulated delay (1.5–3 seconds, randomized) to make the processing screen feel realistic
- The delay should be handled in the flow, not in the generator itself

---

### 3.3 — Sample Sermon Selector

Create `src/components/screens/sermon-input.tsx` enhancement:

- When user clicks "예시 보기" (Try sample), show a selector with the fixture sermons
- Display fixture titles in a small card list
- On selection, populate the textarea with the fixture's `sermonText` and set `session.usedSample = true`
- Store the selected fixture ID in the session so the reflection step can use the curated reflection instead of the heuristic generator

---

### 3.4 — Engine Integration

Wire the mock engine into the flow between Processing (Screen 5) and Reflection (Screen 6):

**In the Processing screen:**

1. Read `session.intention` and `session.sermonText` from flow context
2. If `session.usedSample` is `true`, look up the matching fixture and use its pre-built `reflection`
3. If custom input, call `generateReflection({ intention, sermonText })`
4. Apply simulated delay (use `setTimeout` or `requestAnimationFrame`)
5. Store result via `updateSession({ reflection: result })`
6. Auto-advance to reflection step

**In the Reflection screen:**

1. Read `session.reflection` from flow context
2. Render each field in its own section/card:

| Section | Field | Visual treatment |
|---------|-------|-----------------|
| Echo | `echo` | Prominent quote-like block |
| What stayed | `stayed` | Body paragraph |
| Where clarity might help | `needsHelp` | Softer/muted card |
| What felt alive | `alive` | Highlighted or accented block |

3. Show `intendedTakeaway` as context at the top (what the preacher said they intended)

---

### 3.5 — Gentle Suggestion & Reflection Question

Wire optional content into Screens 9A and 9B:

- **Screen 9A (Suggestion):** Display `session.reflection.gentleSuggestion`
- **Screen 9B (Reflection Question):** Display `session.reflection.nextReflectionQuestion`
- If the chosen field is `undefined` or empty, show a generic fallback message

---

## Files to Create

| Path | Purpose |
|------|---------|
| (none — all work modifies existing files) | |

## Files to Modify

| Path | Change |
|------|--------|
| `src/lib/fixtures.ts` | Replace empty array with 2–3 full `SermonFixture` objects |
| `src/lib/mock-engine.ts` | Replace stub with heuristic generator + types |
| `src/types/reflection.ts` | Add `SermonFixture` type, verify `ReflectionResult` fields |
| `src/components/screens/sermon-input.tsx` | Add sample sermon selector UI |
| `src/components/screens/processing.tsx` | Add engine call + simulated delay |
| `src/components/screens/reflection-result.tsx` | Render dynamic reflection data from session |
| `src/components/screens/gentle-suggestion.tsx` | Render `gentleSuggestion` from session |
| `src/components/screens/reflection-question.tsx` | Render `nextReflectionQuestion` from session |

---

## Validation Checklist

- [ ] "Try sample" flow: selecting a sample sermon produces a curated reflection on Screen 6
- [ ] Custom input flow: pasting any text produces a plausible reflection on Screen 6
- [ ] Processing screen shows for 1.5–3 seconds before advancing
- [ ] Reflection screen renders all fields (echo, stayed, needsHelp, alive)
- [ ] Intended takeaway is shown as context on the reflection screen
- [ ] Screen 9A shows the gentle suggestion from the reflection
- [ ] Screen 9B shows the reflection question from the reflection
- [ ] Fixtures contain well-written Korean content
- [ ] Heuristic output is tonally appropriate — no evaluative or scoring language
- [ ] All types match the data contract in the prototype map
- [ ] No TypeScript errors, no ESLint warnings

---

## Out of Scope (deferred to later phases)

- Tone-polishing of all generated output (Phase 4)
- A/B variant testing of reflection templates (Phase 5)
- Real LLM integration (post-prototype)
