"use client";

import type { ComponentType } from "react";

import { FlowProgress } from "@/components/navigation/flow-progress";
import { useFlow } from "@/components/providers/flow-provider";
import {
  Calibration,
  Closing,
  FlowLanding,
  GentleSuggestion,
  IntentionPrompt,
  NextStep,
  Processing,
  ReflectionQuestion,
  ReflectionResult,
  SermonInput,
  WhatThisIs,
} from "@/components/screens";
import type { StepId } from "@/types/flow-steps";

const screens: Record<StepId, ComponentType> = {
  landing: FlowLanding,
  "what-this-is": WhatThisIs,
  intention: IntentionPrompt,
  "sermon-input": SermonInput,
  processing: Processing,
  reflection: ReflectionResult,
  calibration: Calibration,
  "next-step": NextStep,
  suggestion: GentleSuggestion,
  "reflection-question": ReflectionQuestion,
  closing: Closing,
};

export default function PrototypePage() {
  const { currentStep } = useFlow();
  const Screen = screens[currentStep];

  return (
    <div className="space-y-8">
      <FlowProgress currentStep={currentStep} />
      <Screen />
    </div>
  );
}
