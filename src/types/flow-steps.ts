export const STEPS = [
  "landing",
  "what-this-is",
  "intention",
  "sermon-input",
  "processing",
  "reflection",
  "calibration",
  "next-step",
  "suggestion",
  "reflection-question",
  "closing",
] as const;

export type StepId = (typeof STEPS)[number];
