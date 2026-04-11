"use client";

import { Button } from "@/components/ui/button";

export const SermonInput = () => {
  const handleTrySample = () => {
    /* Phase 2: load sample sermon into the field */
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
        <textarea
          id="sermon-text"
          name="sermon"
          rows={14}
          className="min-h-[280px] w-full resize-y rounded-xl border border-border bg-card p-6 text-body text-foreground shadow-sm outline-none transition-[box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          placeholder="설교 원고나 전사본을 여기에 붙여넣어 주세요."
          aria-label="설교 원고 또는 전사본 입력"
        />
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
    </div>
  );
};
