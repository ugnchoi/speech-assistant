import type { ReflectionSession } from "@/types/reflection";

const newId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

export const createNewReflectionSession = (): ReflectionSession => {
  const now = new Date().toISOString();
  return {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    lastStep: "landing",
    intention: "",
    sermonText: "",
    usedSample: false,
    sampleFixtureId: null,
    reflection: null,
    calibration: null,
    chosenNextStep: null,
    completedAt: null,
  };
};
