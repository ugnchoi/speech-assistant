# Tone and voice guide (Korean)

Living reference for anyone writing or editing user-facing copy in this prototype. Align with [design direction](./design.md) and [Phase 4](./phase-4-tone-and-trust-copy.md).

---

## Core voice

The product should read as a **quiet, private listener** — reflective, non-threatening, and inviting. It is **not** coaching, grading, analytics, or definitive feedback about the sermon.

- Prefer **성찰** (reflection) over **평가** (evaluation).
- Frame output as **one audience member’s possible impression**, not truth.
- Use **tentative** endings: `~일 수 있습니다`, `~느껴질 수 있습니다`, `~할 수도 있습니다`.
- Avoid language that sounds like **scoring, optimization, performance review, or correction**.

---

## Word list (use / avoid)

| Prefer | Avoid |
|--------|--------|
| 성찰, 인상, 울림 | 평가, 분석, 채점, 진단 |
| 청중, 듣는 이 | 심사관, 채점자 |
| 마음에 담아가다, 머무르다 | 최적화, 성과, 효율 |
| 가장 생생하게 느껴졌을 수 있는 | 반드시 효과적인, 최선의 |
| ~일 수 있습니다, ~인 것 같습니다 | ~입니다 (단정) |
| 제안, 생각해 볼 만한 | 지시, 반드시, 해야 합니다 |
| 질문, 호기심 | 교정, 과제, 숙제 |
| 정답이 아님 | 옳고 그름 |

---

## Reflection fields (mock engine + curated fixtures)

### `intendedTakeaway`

- Anchor the user’s stated intention with soft framing (`~남겨 둘 수 있습니다`, `~비춰질 수 있습니다`).
- **Bad:** `당신의 의도는 X입니다.`
- **Good:** `전하고 싶으셨던 바가 X 쪽에 머물렀을 수 있어, 그 지점을 성찰이 먼저 바라보게 두었습니다.`

### `echo`

- Never claim what the audience **will** think. Use `어떤 청중에게는`, `누군가는`, `가능성`.
- **Bad:** `청중은 반드시 이 메시지를 기억합니다.`
- **Good:** `어떤 청중에게는 {…}에 닿는 이야기가 가장 먼저 떠오를 수 있습니다.`

### `stayed`

- Point to **specific** images or phrases; vary by excerpt.
- **Good:** `{snippet}에 머문 이미지가 … 남을 수 있습니다.`

### `needsHelp`

- Frame difficulty as **natural pacing**, not failure or “unclear writing.”
- **Bad:** `이 부분은 불분명합니다.`
- **Good:** `이 구간에서는 흐름이 잠시 느려질 수 있습니다.` / `호흡이 길어질 수도 있습니다.`

### `alive`

- Most **warm** section; still tentative (`생생하게 다가올 수 있습니다`).
- **Good:** `맺음 가까이의 {…}에서, 가장 생생하게 다가온 순간이 있을 수 있습니다.`

### `gentleSuggestion`

- Always **optional**: `원하신다면`, `하나의 가능한 방향`, `꼭 하실 필요는 없습니다`.
- **Bad:** `다음에는 반드시 X하세요.`
- **Good:** `원하신다면 … 도움이 될 수 있습니다. 선택은 자유이십니다.`

### `nextReflectionQuestion`

- Open-ended; often start with **만약**, **어떻게 하면**.
- **Bad:** `다음 설교에서 반드시 다루어야 할 질문:`
- **Good:** `만약 이번 설교를 다시 떠올려 보신다면, … 무엇이었을까요?`

---

## Honorific level (존댓말)

- Use consistent **polite formal** Korean (`~습니다`, `~하세요`, `~해 주세요`, `~셨나요`).
- Prefer **바라셨나요**, **적어 주세요**, **느껴지셨나요** over plain 반말.

---

## Micro-copy patterns

- **Privacy near inputs:** `이 내용은 이 기기에만 저장됩니다` / `설교 내용은 서버로 전송되지 않습니다`.
- **Expectations above output:** `이것은 한 청중의 인상이며, 정답이 아닙니다`.
- **Calibration purpose:** `이 응답은 도구를 개선하는 데 도움이 됩니다`.
- **Closing:** `이 성찰은 이 브라우저에만 저장되며, 외부로 전송되지 않습니다`.
- **Footer (shell):** `개인 프로토타입 · 점수 없음 · 수정 없음`

---

## Edge states

| State | Message |
|-------|---------|
| Generation failed | 성찰을 준비하는 중 문제가 발생했습니다. 다시 시도해 주세요. |
| Sermon short (hint) | 더 많은 내용을 입력하시면 더 풍부한 성찰을 받으실 수 있습니다. |
| No stored sessions | 아직 저장된 성찰이 없습니다. |
| Storage unavailable | 이 브라우저에서는 저장 기능이 제한됩니다. |

---

## Related docs

- [Speech reflection prototype map](./speech-reflection-prototype-map.md) — flow and tone (§11)
- [Korean screen content](./sermon_reflection_korean.md) — baseline strings
