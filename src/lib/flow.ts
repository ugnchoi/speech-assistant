import type { ReflectionSession } from "@/types/reflection";
import { STEPS, type StepId } from "@/types/flow-steps";

export { STEPS, type StepId } from "@/types/flow-steps";

export const isStepId = (value: string): value is StepId =>
  (STEPS as readonly string[]).includes(value);

const MIN_INTENTION_LENGTH = 10;
const MIN_SERMON_LENGTH = 50;

export const intentionMeetsMinimum = (intention: string): boolean =>
  intention.trim().length >= MIN_INTENTION_LENGTH;

export const sermonMeetsMinimum = (sermonText: string): boolean =>
  sermonText.trim().length >= MIN_SERMON_LENGTH;

/** Furthest step the user may be on given persisted session data (linear + branches). */
export const getMaxAccessibleStep = (session: ReflectionSession): StepId => {
  if (session.completedAt) {
    return "closing";
  }

  if (session.chosenNextStep === "suggestion") {
    return "suggestion";
  }
  if (session.chosenNextStep === "reflection-question") {
    return "reflection-question";
  }

  if (session.calibration?.closeness) {
    return "next-step";
  }

  if (session.reflection) {
    return "calibration";
  }

  if (
    session.reflectionGenerationFailed &&
    intentionMeetsMinimum(session.intention) &&
    sermonMeetsMinimum(session.sermonText)
  ) {
    return "reflection";
  }

  if (sermonMeetsMinimum(session.sermonText)) {
    return "processing";
  }

  if (intentionMeetsMinimum(session.intention)) {
    return "sermon-input";
  }

  return "intention";
};

export const canAccessStep = (step: StepId, session: ReflectionSession): boolean => {
  const order: StepId[] = [
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
  ];

  const max = getMaxAccessibleStep(session);
  const maxIdx = order.indexOf(max);
  const stepIdx = order.indexOf(step);

  if (step === "landing" || step === "what-this-is") {
    return true;
  }

  if (step === "suggestion" || step === "reflection-question") {
    if (session.chosenNextStep === "suggestion") {
      return step === "suggestion";
    }
    if (session.chosenNextStep === "reflection-question") {
      return step === "reflection-question";
    }
    return false;
  }

  if (step === "next-step") {
    return session.calibration?.closeness != null;
  }

  if (step === "closing") {
    return session.completedAt != null;
  }

  return stepIdx <= maxIdx;
};

export const clampStepToSession = (step: StepId, session: ReflectionSession): StepId => {
  if (canAccessStep(step, session)) {
    return step;
  }
  return getMaxAccessibleStep(session);
};

export const canGoNext = (step: StepId, session: ReflectionSession): boolean => {
  switch (step) {
    case "landing":
      return true;
    case "what-this-is":
      return true;
    case "intention":
      return intentionMeetsMinimum(session.intention);
    case "sermon-input":
      return sermonMeetsMinimum(session.sermonText);
    case "processing":
      return true;
    case "reflection":
      return session.reflection != null || Boolean(session.reflectionGenerationFailed);
    case "calibration":
      return session.calibration?.closeness != null;
    case "next-step":
      return session.chosenNextStep != null;
    case "suggestion":
    case "reflection-question":
      return true;
    case "closing":
      return true;
    default:
      return false;
  }
};

export const getNextStepId = (step: StepId, session: ReflectionSession): StepId | null => {
  if (!canGoNext(step, session)) {
    return null;
  }

  switch (step) {
    case "landing":
      return "what-this-is";
    case "what-this-is":
      return "intention";
    case "intention":
      return "sermon-input";
    case "sermon-input":
      return "processing";
    case "processing":
      return "reflection";
    case "reflection":
      return "calibration";
    case "calibration":
      return "next-step";
    case "next-step":
      if (session.chosenNextStep === "suggestion") {
        return "suggestion";
      }
      if (session.chosenNextStep === "reflection-question") {
        return "reflection-question";
      }
      return null;
    case "suggestion":
    case "reflection-question":
      return "closing";
    case "closing":
      return "landing";
    default:
      return null;
  }
};

const backMap: Partial<Record<StepId, StepId>> = {
  "what-this-is": "landing",
  intention: "what-this-is",
  "sermon-input": "intention",
  processing: "sermon-input",
  reflection: "processing",
  calibration: "reflection",
  "next-step": "calibration",
  suggestion: "next-step",
  "reflection-question": "next-step",
};

export const getPreviousStepId = (
  step: StepId,
  session: ReflectionSession,
): StepId | null => {
  if (step === "closing") {
    if (session.chosenNextStep === "suggestion") {
      return "suggestion";
    }
    if (session.chosenNextStep === "reflection-question") {
      return "reflection-question";
    }
    return "next-step";
  }
  return backMap[step] ?? null;
};
