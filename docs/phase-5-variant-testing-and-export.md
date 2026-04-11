# Phase 5 — Variant Testing + Export

**Focus:** Add the ability to test different headline/CTA variants, collect lightweight usage signals, and export session data for analysis.

**Depends on:** Phase 4 (Tone + Trust Copy)

**References:**

- [Prototype map](./speech-reflection-prototype-map.md) — experimentation (§12), success criteria (§13), variants approach
- [Design direction](./design.md) — maintain quiet, non-dashboard aesthetic even with testing features
- Existing `src/lib/variants.ts` — current variant infrastructure (`"default" | "experiment"`)

---

## Goals

1. Build a variant system for testing different copy and layout choices
2. Define initial headline and CTA variants for A/B testing
3. Add lightweight event tracking for user behavior signals
4. Implement session data export (JSON download)
5. Create a minimal internal-only dashboard for reviewing collected data

---

## Deliverables

### 5.1 — Variant System (`src/lib/variants.ts`)

Expand the existing variant infrastructure:

**Variant definition:**

```ts
type VariantConfig = {
  id: string;
  label: string;
  landing: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  reflectionTitle: string;
  processingMessage: string;
};
```

**Initial variants to test (from prototype map §12):**

| Variant ID | Landing headline | Reflection title | Rationale |
|-----------|-----------------|-----------------|-----------|
| `default` | 설교에 대한 간단한 청중의 반응을 들어보세요 | 간단한 청중 성찰 | Baseline copy from Korean screens |
| `echo` | 내일까지 남을 수 있는 메아리 | 설교의 메아리 | Poetic, emphasizes residual impact |
| `post-sermon` | 설교 후 짧은 성찰 | 설교 후 성찰 | Direct, functional framing |

**Variant assignment:**

- On first visit, assign a variant randomly and store in `localStorage` under `speech-assistant:variant`
- Variant persists across sessions for the same user
- Allow override via URL param `?variant=echo` for testing
- Expose current variant via `useVariant()` hook

**Implementation:**

Create `src/components/providers/variant-provider.tsx`:

| Export | Purpose |
|--------|---------|
| `VariantProvider` | Context provider. Reads/assigns variant on mount. |
| `useVariant()` | Hook returning `{ variant: VariantConfig, variantId: string }`. |

---

### 5.2 — Variant-Aware Screen Components

Update screen components to consume variant copy:

| Screen | Fields from variant |
|--------|-------------------|
| Landing (`landing.tsx`) | `eyebrow`, `headline`, `subheadline`, `primaryCta`, `secondaryCta` |
| Processing (`processing.tsx`) | `processingMessage` |
| Reflection result (`reflection-result.tsx`) | `reflectionTitle` |

**Implementation pattern:**

```tsx
const Landing = () => {
  const { variant } = useVariant();
  return (
    <>
      <span>{variant.landing.eyebrow}</span>
      <h1>{variant.landing.headline}</h1>
      {/* ... */}
    </>
  );
};
```

Components should fall back to default variant copy if the variant config is missing a field.

---

### 5.3 — Event Tracking (`src/lib/tracking.ts`)

Create a lightweight, localStorage-based event tracker. No external analytics — all data stays in the browser.

**Event types:**

```ts
type TrackingEvent = {
  timestamp: string;
  sessionId: string;
  variantId: string;
  event: EventType;
  metadata?: Record<string, string>;
};

type EventType =
  | "flow_started"
  | "step_reached"
  | "intention_entered"
  | "sermon_pasted"
  | "sample_selected"
  | "reflection_viewed"
  | "calibration_submitted"
  | "next_step_chosen"
  | "flow_completed"
  | "flow_abandoned";
```

**Tracking functions:**

| Function | Purpose |
|----------|---------|
| `trackEvent(event)` | Append event to localStorage array |
| `getEvents()` | Retrieve all tracked events |
| `getEventsBySession(sessionId)` | Filter events for a session |
| `clearEvents()` | Reset tracking data |

**Integration points:**

| Location | Event |
|----------|-------|
| FlowProvider: on mount | `flow_started` |
| FlowProvider: on step change | `step_reached` with `{ step }` metadata |
| Intention screen: on submit | `intention_entered` |
| Sermon input: on paste | `sermon_pasted` with `{ wordCount }` |
| Sermon input: on sample select | `sample_selected` with `{ fixtureId }` |
| Reflection screen: on mount | `reflection_viewed` |
| Calibration: on submit | `calibration_submitted` with `{ closeness }` |
| Next step: on choice | `next_step_chosen` with `{ choice }` |
| Closing: on mount | `flow_completed` |
| `beforeunload` if mid-flow | `flow_abandoned` with `{ lastStep }` |

---

### 5.4 — Data Export

Create `src/lib/export.ts`:

**Export functions:**

| Function | Signature | Output |
|----------|-----------|--------|
| `exportSessions` | `() => string` | JSON string of all sessions |
| `exportEvents` | `() => string` | JSON string of all tracking events |
| `exportAll` | `() => string` | Combined JSON with sessions + events |
| `downloadExport` | `(filename?: string) => void` | Triggers browser download of `exportAll()` as `.json` file |

**JSON structure:**

```json
{
  "exportedAt": "2026-04-11T12:00:00.000Z",
  "variantId": "default",
  "sessions": [ /* ReflectionSession[] */ ],
  "events": [ /* TrackingEvent[] */ ]
}
```

---

### 5.5 — Export UI

Add an export button to the Closing screen and optionally to an internal settings area:

**Closing screen addition:**

- After the closing message, show a subtle "데이터 내보내기" (Export data) link
- On click, trigger `downloadExport()`
- Style: muted, secondary — not a primary action

**Internal review page (`src/app/internal/page.tsx`):**

Create a simple, developer-facing page at `/internal` that shows:

| Section | Content |
|---------|---------|
| Current variant | Display active variant ID and label |
| Session count | Number of stored sessions |
| Event log | Scrollable list of tracked events (timestamp, event type, metadata) |
| Export button | Download all data as JSON |
| Reset button | Clear all sessions and events (with confirmation) |
| Variant override | Dropdown to switch variant (applies on next flow start) |

**Design note:** This page does NOT need to follow the quiet/reflective aesthetic. It's an internal tool. Keep it functional with basic Tailwind styling.

---

### 5.6 — Variant Switcher for Testing

Add a hidden developer control:

- Triple-click on the "Prototype" badge in the top bar to reveal a variant switcher dropdown
- Dropdown shows all available variants with their headlines
- Selecting a variant stores it and reloads the page
- Badge shows current variant ID in small text when switcher is active

---

## Files to Create

| Path | Purpose |
|------|---------|
| `src/lib/tracking.ts` | Event tracking functions |
| `src/lib/export.ts` | Data export functions |
| `src/components/providers/variant-provider.tsx` | Variant context provider |
| `src/components/providers/index.ts` | Update barrel export |
| `src/app/internal/page.tsx` | Internal review/debug page |

## Files to Modify

| Path | Change |
|------|--------|
| `src/lib/variants.ts` | Expand with `VariantConfig` type and variant definitions |
| `src/components/screens/landing.tsx` | Consume variant copy via `useVariant()` |
| `src/components/screens/processing.tsx` | Consume variant processing message |
| `src/components/screens/reflection-result.tsx` | Consume variant reflection title |
| `src/components/screens/closing.tsx` | Add export button |
| `src/components/providers/flow-provider.tsx` | Add tracking event calls |
| `src/components/layout/shell.tsx` | Add hidden variant switcher to prototype badge |
| `src/app/prototype/page.tsx` | Wrap with `VariantProvider` |

---

## Validation Checklist

- [ ] Three variants are defined with distinct headline and CTA copy
- [ ] Variant is randomly assigned on first visit and persists
- [ ] `?variant=echo` URL param overrides the assigned variant
- [ ] Landing screen, processing screen, and reflection title change based on variant
- [ ] Events are tracked for all specified interaction points
- [ ] Events include correct `sessionId` and `variantId`
- [ ] Export downloads a valid JSON file with sessions and events
- [ ] `/internal` page shows variant, sessions, events, and controls
- [ ] Triple-click on prototype badge reveals variant switcher
- [ ] Variant switch takes effect on next flow start
- [ ] Reset clears all localStorage data (sessions + events + variant)
- [ ] No tracking data is sent to any external server
- [ ] Internal page is functional but does not affect the user-facing aesthetic
- [ ] No TypeScript errors, no ESLint warnings

---

## Out of Scope (post-prototype)

- Server-side analytics
- Real A/B testing infrastructure (e.g., Statsig, LaunchDarkly)
- Multi-device session sync
- Real LLM integration
- Audio upload and transcription
- User accounts and authentication
