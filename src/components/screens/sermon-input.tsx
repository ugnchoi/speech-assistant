"use client";

import type { ChangeEventHandler } from "react";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { SAMPLE_SERMON_TEXT } from "@/lib/fixtures";
import { sermonMeetsMinimum } from "@/lib/flow";

import { Button } from "@/components/ui/button";

const MIN = 50;

const countWords = (text: string): number => {
  const t = text.trim();
  if (!t) {
    return 0;
  }
  return t.split(/\s+/).length;
};

export const SermonInput = () => {
  const { session, updateSession, goNext, goBack } = useFlow();
  const value = session.sermonText;
  const valid = sermonMeetsMinimum(value);
  const remaining = Math.max(0, MIN - value.trim().length);
  const words = countWords(value);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    updateSession({ sermonText: event.target.value });
  };

  const handleTrySample = () => {
    updateSession({ sermonText: SAMPLE_SERMON_TEXT, usedSample: true });
  };

  return (
    <div className="screen-fade-in space-y-10">
      <div className="space-y-4">
        <h1 className="text-screen-title text-balance text-foreground">설교 공유하기</h1>
        <p className="text-body text-pretty leading-relaxed text-muted-foreground">
          이번 성찰에서는 전달 방식보다 청중의 경험에 초점을 맞춥니다.
        </p>
      </div>

      <div className="space-y-4">
        <label htmlFor="sermon-text" className="sr-only">
          설교 원고 또는 전사본
        </label>
        <div className="relative">
          <textarea
            id="sermon-text"
            name="sermon"
            rows={14}
            value={value}
            onChange={handleChange}
            className="min-h-[280px] w-full resize-y rounded-xl border border-border bg-card p-6 pb-10 text-body text-foreground shadow-sm outline-none transition-[box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            placeholder="설교 원고나 전사본을 여기에 붙여넣어 주세요."
            aria-label="설교 원고 또는 전사본 입력"
          />
          <p className="pointer-events-none absolute bottom-4 right-6 text-[0.7rem] text-muted-foreground/80">
            {value.trim().length}자 · {words}어절
            {!valid && value.trim().length > 0 ? ` · ${remaining}자 더 필요` : ""}
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleTrySample}
            aria-label="샘플 설교로 시도하기"
          >
            샘플로 시도
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="계속하기" onClick={goNext} disabled={!valid} aria-label="계속하기" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
