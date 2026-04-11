"use client";

import type { ChangeEventHandler } from "react";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { intentionMeetsMinimum } from "@/lib/flow";

const MIN = 10;

export const IntentionPrompt = () => {
  const { session, updateSession, goNext, goBack } = useFlow();
  const value = session.intention;
  const valid = intentionMeetsMinimum(value);
  const remaining = Math.max(0, MIN - value.trim().length);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    updateSession({ intention: event.target.value });
  };

  return (
    <div className="screen-fade-in space-y-10">
      <div className="space-y-6">
        <h1 className="text-screen-title text-balance text-foreground">듣기 전에</h1>
        <p className="text-body-lg text-foreground">사람들이 무엇을 가장 마음에 담아가길 바라셨나요?</p>
        <p className="text-helper text-muted-foreground">
          한 문장이면 충분합니다. 최소 {MIN}자 이상 적어 주세요.
          {!valid && value.trim().length > 0 ? ` (${remaining}자 더 필요)` : ""}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="intention-text" className="sr-only">
          의도 입력
        </label>
        <textarea
          id="intention-text"
          name="intention"
          rows={5}
          value={value}
          onChange={handleChange}
          placeholder="하나님은 극적인 순간뿐 아니라 일상의 신실함 속에서도 사람을 만나신다는 점을 전하고 싶었습니다."
          className="w-full resize-y rounded-xl border border-border bg-card p-4 text-body text-foreground shadow-sm outline-none transition-[box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          aria-label="설교에 담고 싶었던 마음을 한 문장으로 입력"
        />
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="계속하기" onClick={goNext} disabled={!valid} aria-label="계속하기" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
