"use client";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";

const FALLBACK_QUESTION =
  "이번 설교를 준비하시며 가장 오래 마음에 두셨던 질문은 무엇이었나요?";

export const ReflectionQuestion = () => {
  const { session, goNext, goBack } = useFlow();
  const raw = session.reflection?.nextReflectionQuestion?.trim();
  const text = raw && raw.length > 0 ? raw : FALLBACK_QUESTION;

  return (
    <div className="screen-fade-in space-y-8">
      <h1 className="text-screen-title text-balance text-foreground">다음 설교를 위한 질문</h1>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-body text-lg leading-relaxed text-foreground">{text}</p>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="알겠습니다" onClick={goNext} aria-label="알겠습니다" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
