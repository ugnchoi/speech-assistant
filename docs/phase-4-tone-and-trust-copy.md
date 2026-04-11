# Phase 4 — Tone + Trust Copy

**Focus:** Refine all user-facing text to establish the correct emotional register — reflective, non-threatening, and inviting. Ensure every word reinforces the "private listener" framing and avoids any evaluative or coaching language.

**Depends on:** Phase 3 (Mock Engine)

**References:**

- [Prototype map](./speech-reflection-prototype-map.md) — tone guidelines (§11), UX design principles (§10), success criteria (§13)
- [Design direction](./design.md) — overall UI direction ("quiet, private, reflective, non-performative")
- [Korean screen content](./sermon_reflection_korean.md) — base copy for all screens

---

## Goals

1. Audit and refine all static screen copy for tone consistency
2. Polish mock engine output templates to match the reflective voice
3. Add trust-building micro-copy throughout the flow
4. Create a tone guide reference for future content
5. Ensure the product feels safe, not judgmental

---

## Deliverables

### 4.1 — Tone Audit of All Screen Copy

Review every screen's text against the tone guidelines from the prototype map.

**Vocabulary rules:**

| Use | Avoid |
|-----|-------|
| 성찰 (reflection) | 평가 (evaluation) |
| 청중 (listener) | 심사관 (judge) |
| 마음에 담아가다 (carry away) | 최적화 (optimize) |
| 가장 생생하게 느껴졌다 (felt most alive) | 성과 (performance) |
| ~일 수 있습니다 (may / might) | ~입니다 (is / definitively) |
| 제안 (suggestion) | 지시 (instruction) |
| 질문 (question) | 교정 (correction) |

**Screen-by-screen audit checklist:**

| Screen | Audit focus |
|--------|------------|
| **Landing** | Headline and subheadline set the right mental model. Trust statements are prominent. No "AI" or "analysis" language. |
| **What this is** | Clearly communicates what the tool does NOT do. Feels like a disclaimer, not a warning. |
| **Intention prompt** | Question feels inviting, not interrogative. Helper text reduces anxiety. |
| **Sermon input** | No pressure language. Subtitle reinforces "experience, not delivery." |
| **Processing** | Message feels like waiting for a thoughtful response, not computation. |
| **Reflection result** | Each section heading uses reflective framing. No definitive statements. |
| **Calibration** | Question feels like a genuine check-in, not a rating. Options use soft language. |
| **Next step** | Both options feel optional and gentle. No "improve" or "fix" language. |
| **Suggestion** | Framed as "one thought," not advice. |
| **Reflection question** | Framed as curiosity, not homework. |
| **Closing** | Warm, affirming. Emphasizes privacy. |

---

### 4.2 — Trust Micro-Copy

Add small trust-reinforcing messages throughout the flow. These are not primary content — they're subtle reassurances.

| Location | Micro-copy example (Korean) | Purpose |
|----------|----------------------------|---------|
| Below intention textarea | 이 내용은 이 기기에만 저장됩니다 | Privacy reassurance |
| Below sermon textarea | 설교 내용은 서버로 전송되지 않습니다 | Data safety |
| Above reflection result | 이것은 한 청중의 인상이며, 정답이 아닙니다 | Set expectations |
| Below calibration | 이 응답은 도구를 개선하는 데 도움이 됩니다 | Purpose of feedback |
| Closing screen | 이 성찰은 이 브라우저에만 저장되며, 외부로 전송되지 않습니다 | Final privacy statement |
| Footer (all pages) | 개인 프로토타입 · 점수 없음 · 수정 없음 | Persistent trust anchor |

**Implementation:**

- Create a `TrustNote` component: small muted text with an optional icon (lock or shield from Lucide)
- Place contextually near inputs and outputs
- Style: `text-xs text-muted-foreground` with subtle icon

---

### 4.3 — Mock Engine Template Polish

Refine all template strings in `src/lib/mock-engine.ts`:

**For each reflection field, ensure:**

| Field | Tone check |
|-------|-----------|
| `echo` | Uses tentative language ("~일 수 있습니다", "~처럼 느껴질 수 있습니다"). Never states facts about what the audience WILL think. |
| `stayed` | Points to specific elements, not generalities. Uses "어떤 청중에게는…" (for some listeners…) framing. |
| `needsHelp` | Frames difficulty as natural, not as failure. "이 부분에서 흐름이 느려질 수 있습니다" (the flow may slow here), not "this is unclear." |
| `alive` | Celebrates what worked. Uses vivid language. This is the most positive section. |
| `gentleSuggestion` | Explicitly optional: "하나의 가능한 방향입니다" (one possible direction). Not prescriptive. |
| `nextReflectionQuestion` | Open-ended. Starts with "만약…" (what if) or "어떻게…" (how might). |

**Template variety:**

- Each field should have at least 3–4 template variants
- Templates should be long enough to feel thoughtful (2–3 sentences minimum)
- Randomize selection to avoid repetitive output across sessions

---

### 4.4 — Calibration Response Labels

Refine the three calibration options:

| Value | Current label | Refined label | Tone |
|-------|--------------|---------------|------|
| `close` | 가깝다 | 의도했던 것과 가까워요 | Warm confirmation |
| `somewhat` | 어느 정도 | 부분적으로 닿았어요 | Neutral, non-judgmental |
| `not-close` | 멀다 | 의도했던 것과 달라요 | Respectful distance, not failure |

Add an optional sub-text below each option that provides a gentle elaboration:

- `close`: "성찰이 의도한 메시지를 잘 반영한 것 같습니다"
- `somewhat`: "일부는 닿았지만, 다른 부분도 있었습니다"
- `not-close`: "이 성찰이 다른 방향을 보여주고 있네요"

---

### 4.5 — Empty / Edge State Copy

Define user-facing messages for edge cases:

| State | Message |
|-------|---------|
| Reflection fails to generate | 성찰을 준비하는 중 문제가 발생했습니다. 다시 시도해 주세요. |
| Sermon text too short (< 50 chars) | 더 많은 내용을 입력하시면 더 풍부한 성찰을 받으실 수 있습니다. |
| No stored sessions | 아직 저장된 성찰이 없습니다. |
| LocalStorage unavailable | 이 브라우저에서는 저장 기능이 제한됩니다. |

---

### 4.6 — Tone Guide Reference Document

Create `docs/tone-guide.md` as a living reference for all content contributors:

**Contents:**

- Core voice description
- Word list (use / avoid) — expanded version of §11 from prototype map
- Example good and bad phrasings for each reflection field
- Guidelines for Korean honorific level (존댓말 — polite formal)
- Micro-copy patterns

---

## Files to Create

| Path | Purpose |
|------|---------|
| `src/components/ui/trust-note.tsx` | Trust micro-copy component |
| `docs/tone-guide.md` | Tone and voice reference document |

## Files to Modify

| Path | Change |
|------|--------|
| `src/components/screens/landing.tsx` | Refine headline, subheadline, trust statements |
| `src/components/screens/what-this-is.tsx` | Refine explainer body copy |
| `src/components/screens/intention-prompt.tsx` | Add trust note, refine prompt and helper text |
| `src/components/screens/sermon-input.tsx` | Add trust note, refine subtitle |
| `src/components/screens/processing.tsx` | Refine processing message |
| `src/components/screens/reflection-result.tsx` | Add context note above results, refine section headings |
| `src/components/screens/calibration.tsx` | Refine option labels and add sub-text |
| `src/components/screens/next-step.tsx` | Refine option copy |
| `src/components/screens/gentle-suggestion.tsx` | Add "optional" framing |
| `src/components/screens/reflection-question.tsx` | Add curiosity framing |
| `src/components/screens/closing.tsx` | Add final privacy statement |
| `src/components/layout/shell.tsx` | Update footer copy |
| `src/lib/mock-engine.ts` | Polish all template strings, add variants |

---

## Validation Checklist

- [ ] No screen uses evaluative language (평가, 점수, 최적화, 성과, 교정)
- [ ] Every screen uses tentative language where appropriate (~일 수 있습니다, ~처럼 느껴질 수 있습니다)
- [ ] Trust micro-copy appears near every input and output
- [ ] Footer trust message is visible on all pages
- [ ] Calibration options feel safe to select (including "not-close")
- [ ] Mock engine output reads as thoughtful reflection, not automated analysis
- [ ] Edge state messages are gentle and helpful
- [ ] All Korean text uses consistent honorific level (존댓말)
- [ ] `docs/tone-guide.md` exists and is comprehensive
- [ ] Product feels like "a thoughtful writing space" — not "AI coaching software"
- [ ] No TypeScript errors, no ESLint warnings

---

## Out of Scope (deferred to later phases)

- Headline and CTA variant testing (Phase 5)
- Data export and sharing (Phase 5)
