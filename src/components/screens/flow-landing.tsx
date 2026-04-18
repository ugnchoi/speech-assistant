"use client";

import { FlowCta } from "@/components/navigation/flow-cta";
import { LandingContent } from "@/components/onboarding";
import { useFlow } from "@/components/providers/flow-provider";

export const FlowLanding = () => {
  const { goTo } = useFlow();

  const handleStart = () => {
    goTo("what-this-is");
  };

  const handleSample = () => {
    goTo("sermon-input");
  };

  return (
    <LandingContent
      primaryAction={
        <FlowCta label="성찰 시작하기" onClick={handleStart} aria-label="성찰 시작하기" />
      }
      secondaryAction={
        <button
          type="button"
          onClick={handleSample}
          className="text-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:text-left"
          aria-label="예시 설교 입력 화면으로 이동"
        >
          예시 보기
        </button>
      }
    />
  );
};
