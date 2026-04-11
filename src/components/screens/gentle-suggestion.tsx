"use client";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";

export const GentleSuggestion = () => {
  const { session, goNext, goBack } = useFlow();
  const text =
    session.reflection?.gentleSuggestion ??
    "핵심 메시지를 한 문장으로 적어 보신 뒤, 설교 중 그 문장을 듣는 이가 가장 잘 받아들일 수 있는 순간이 어디일지 떠올려 보시면 도움이 될 수 있습니다. (예시 텍스트)";

  return (
    <div className="screen-fade-in space-y-8">
      <h1 className="text-screen-title text-balance text-foreground">명확성을 위한 한 가지 제안</h1>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-body leading-relaxed text-muted-foreground">{text}</p>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="알겠습니다" onClick={goNext} aria-label="알겠습니다" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
