# Design direction

**Living document.** Extend or revise this file whenever UI, layout, or product framing changes so agents and humans share one source of truth.

---

## Overall UI direction

The product should feel:

- quiet
- private
- reflective
- non-performative
- gently modern, not techy

### Visually, avoid

Anything that reads as:

- dashboards
- analytics
- coaching software
- sermon grading
- AI productivity tools

### Instead, lean toward

- a thoughtful writing space
- a guided reflection companion
- a private notes tool

---

## Global layout principles

- Narrow reading width for text-heavy screens
- Generous whitespace
- Soft card boundaries
- Minimal color usage
- One primary action per screen
- No dense navigation

---

## Suggested shell

### Top bar

- Product wordmark on the left
- Small “Prototype” badge
- Optional subtle “How it works” link on the right

### Main body

- Single centered column
- Max width tuned for sermon / reflection reading comfort
- Plenty of vertical spacing

### Footer

- Very minimal
- Example line: “개인 프로토타입 · 점수 없음 · 수정 없음” (Korean shell footer in app)

---

## Implementation notes (prototype)

- **Shell:** Top bar wordmark, muted “Prototype” pill, optional “How it works” link; centered `max-w-2xl` column; minimal footer line.
- **Color:** Light warm-gray background (`globals.css` OKLCH tokens), soft borders, primary action is subdued warm gray-brown rather than bright blue.
- **Reflection (Screen 6):** Intended takeaway sits in a dashed, muted context band. Echo is promoted to a borderless hero with a hairline above the eyebrow title and serif prose at `text-xl/2xl`. “Stayed” and “needs help” are demoted to borderless eyebrow + muted prose (no cards). “Alive” is the sole held card (`rounded-2xl bg-primary/5`) with the body set in serif — the one moment the page visually holds.
- **Typography:** Geist sans for UI chrome (buttons, trust notes, inputs, wordmark, footer). Noto Serif KR (via `--font-noto-serif-kr` → `--font-serif`) for `h1.text-screen-title` and reflected voice — echo, alive, reflection question, gentle suggestion — applied via the `.text-reflective` utility.
- **Motion:** `.screen-fade-in` is a 420ms fade with a 4px upward drift. Processing screen uses `.processing-breath` — a single 1px hairline scaling horizontally over 3.2s — in place of a pulsing dot. All animations are suppressed under `prefers-reduced-motion: reduce`.
- **Flow indicator:** Segmented hairlines under the top bar (one `h-px w-5` mark per step, three-state foreground opacity for past / current / future). No numeric caption.
- **Dark mode:** Warm candlelight palette that mirrors the light tokens (`oklch(0.20 0.012 60)` background, `oklch(0.92 0.012 85)` foreground) rather than the default cold-neutral shadcn defaults, so `prefers-color-scheme: dark` stays on-brand.

## Related docs

- [Speech reflection prototype map](./speech-reflection-prototype-map.md) — flow, scope, tone, and phased plan
