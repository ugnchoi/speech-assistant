"use client";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { TrustNote } from "@/components/ui/trust-note";

const FALLBACK_QUESTION =
  "이번 설교를 준비하시며 가장 오래 마음에 두셨던 질문은 무엇이었을까요?";

export const ReflectionQuestion = () => {
  const { session, goNext, goBack } = useFlow();
  const raw = session.reflection?.nextReflectionQuestion?.trim();
  const text = raw && raw.length > 0 ? raw : FALLBACK_QUESTION;

  return (
    <div className="screen-fade-in space-y-8">
      <h1 className="text-screen-title text-balance text-foreground">스스로에게 물을 만한 질문</h1>
      <TrustNote icon="none" className="text-[0.8125rem]">
        과제가 아니라, 잠시 곁에 두어 볼 만한 호기심입니다.
      </TrustNote>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-reflective text-lg text-foreground">{text}</p>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="알겠습니다" onClick={goNext} aria-label="알겠습니다" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
