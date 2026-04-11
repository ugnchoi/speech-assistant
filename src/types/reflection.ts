import type { StepId } from "@/types/flow-steps";

export type ReflectionEntry = {
  id: string;
  createdAt: string;
  body: string;
};

export type ReflectionResult = {
  intendedTakeaway: string;
  echo: string;
  stayed: string;
  needsHelp: string;
  alive: string;
  gentleSuggestion?: string;
  nextReflectionQuestion?: string;
};

/** Curated sermon + reflection pair for the "Try sample" flow (Phase 3). */
export type SermonFixture = {
  id: string;
  title: string;
  sermonText: string;
  suggestedIntention: string;
  reflection: ReflectionResult;
};

export type Calibration = {
  closeness: "close" | "somewhat" | "not-close";
  comment?: string;
};

export type ReflectionSession = {
  id: string;
  createdAt: string;
  /** ISO timestamp; bumped on each persist for ordering in listSessions / loadLatestSession */
  updatedAt: string;
  /** Last visited step; used when URL has no step query on reload */
  lastStep: StepId;
  intention: string;
  sermonText: string;
  usedSample: boolean;
  /** When set, processing uses the fixture's curated reflection instead of the heuristic engine. */
  sampleFixtureId: string | null;
  reflection: ReflectionResult | null;
  /** Set when heuristic reflection throws; cleared when processing screen mounts. */
  reflectionGenerationFailed?: boolean;
  calibration: Calibration | null;
  chosenNextStep: "suggestion" | "reflection-question" | null;
  completedAt: string | null;
};
