"use client";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { TrustNote } from "@/components/ui/trust-note";

const FALLBACK_SUGGESTION =
  "지금 떠오르는 대로, 핵심 메시지를 한 문장으로만 적어 보신 뒤 잠시 내려놓아 보셔도 괜찮을 수 있습니다.";

export const GentleSuggestion = () => {
  const { session, goNext, goBack } = useFlow();
  const raw = session.reflection?.gentleSuggestion?.trim();
  const text = raw && raw.length > 0 ? raw : FALLBACK_SUGGESTION;

  return (
    <div className="screen-fade-in space-y-8">
      <h1 className="text-screen-title text-balance text-foreground">한 가지 생각해 볼 제안</h1>
      <TrustNote icon="none" className="text-[0.8125rem]">
        아래는 선택 사항입니다. 마음에 드실 때만 가볍게 열어 보셔도 됩니다.
      </TrustNote>
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
