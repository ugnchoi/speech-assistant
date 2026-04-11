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
  const ratio = inBar ? position / total : 0;

  if (!inBar) {
    return null;
  }

  return (
    <div
      className={cn("w-full", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={position}
      aria-label={`단계 ${position} / ${total}`}
    >
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-border/80">
        <div
          className="h-full rounded-full bg-muted-foreground/25 transition-[width] duration-300 ease-out"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <p className="mt-1.5 text-center text-[0.65rem] text-muted-foreground/80">
        {position} / {total}
      </p>
    </div>
  );
};