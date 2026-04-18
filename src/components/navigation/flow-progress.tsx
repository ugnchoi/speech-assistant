"use client";

import type { StepId } from "@/types/flow-steps";

import { cn } from "@/lib/utils";

const FLOW_STEPS_FOR_BAR: StepId[] = [
  "what-this-is",
  "intention",
  "sermon-input",
  "processing",
  "reflection",
  "calibration",
  "next-step",
];

type FlowProgressProps = {
  currentStep: StepId;
  className?: string;
};

export const FlowProgress = ({ currentStep, className }: FlowProgressProps) => {
  const idx = FLOW_STEPS_FOR_BAR.indexOf(currentStep);
  const inBar = idx >= 0;
  const total = FLOW_STEPS_FOR_BAR.length;
  const position = inBar ? idx + 1 : 0;

  if (!inBar) {
    return null;
  }

  return (
    <nav
      aria-label="흐름"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={position}
      className={cn("flex justify-center gap-1.5", className)}
    >
      {FLOW_STEPS_FOR_BAR.map((step, i) => (
        <span
          key={step}
          aria-current={i === idx ? "step" : undefined}
          className={cn(
            "h-px w-5 rounded-full transition-colors duration-300",
            i < idx && "bg-foreground/30",
            i === idx && "bg-foreground/55",
            i > idx && "bg-foreground/10",
          )}
        />
      ))}
    </nav>
  );
};
