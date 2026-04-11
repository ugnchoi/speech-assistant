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
  reflection: ReflectionResult | null;
  calibration: Calibration | null;
  chosenNextStep: "suggestion" | "reflection-question" | null;
  completedAt: string | null;
};
