"use client";

import { useSearchParams } from "next/navigation";
import { useState, type ChangeEventHandler, type KeyboardEventHandler } from "react";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { getSermonFixtureById, sermonFixtures } from "@/lib/fixtures";
import { sermonMeetsMinimum } from "@/lib/flow";

import { Button } from "@/components/ui/button";
import { TrustNote } from "@/components/ui/trust-note";
import { EDGE_MESSAGES } from "@/lib/edge-messages";

const MIN = 50;

const countWords = (text: string): number => {
  const t = text.trim();
  if (!t) {
    return 0;
  }
  return t.split(/\s+/).length;
};

export const SermonInput = () => {
  const searchParams = useSearchParams();
  const { session, updateSession, goNext, goBack } = useFlow();
  const value = session.sermonText;
  const valid = sermonMeetsMinimum(value);
  const remaining = Math.max(0, MIN - value.trim().length);
  const words = countWords(value);
  const fromUrlSample = searchParams.get("sample") === "1";
  const [urlSampleSuppressed, setUrlSampleSuppressed] = useState(false);
  const [manualSampleOpen, setManualSampleOpen] = useState(false);
  const showSamplePicker =
    manualSampleOpen || (fromUrlSample && !urlSampleSuppressed);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const v = event.target.value;
    const next: Parameters<typeof updateSession>[0] = { sermonText: v };
    const fid = session.sampleFixtureId;
    if (fid) {
      const f = getSermonFixtureById(fid);
      if (!f || f.sermonText.trim() !== v.trim()) {
        next.sampleFixtureId = null;
        next.usedSample = false;
      }
    }
    updateSession(next);
  };

  const handleOpenSamplePicker = () => {
    setManualSampleOpen(true);
  };

  const handleCloseSamplePicker = () => {
    setManualSampleOpen(false);
    if (fromUrlSample) {
      setUrlSampleSuppressed(true);
    }
  };

  const handleSelectFixture = (id: string) => {
    const fixture = getSermonFixtureById(id);
    if (!fixture) {
      return;
    }
    updateSession({
      sermonText: fixture.sermonText,
      usedSample: true,
      sampleFixtureId: fixture.id,
    });
    setManualSampleOpen(false);
    if (fromUrlSample) {
      setUrlSampleSuppressed(true);
    }
  };

  const handleFixtureCardKeyDown =
    (id: string): KeyboardEventHandler<HTMLButtonElement> =>
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      handleSelectFixture(id);
    };

  return (
    <div className="screen-fade-in space-y-10">
      <div className="space-y-4">
        <h1 className="text-screen-title text-balance text-foreground">설교 공유하기</h1>
        <p className="text-body text-pretty leading-relaxed text-muted-foreground">
          이번 성찰에서는 말하는 방식보다, 청중이 어떻게 받아들였을지에 가까이 머뭅니다. 완성된
          글이 아니어도 괜찮습니다.
        </p>
      </div>

      {showSamplePicker ? (
        <div
          className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
          role="region"
          aria-label="예시 설교 선택"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-foreground">예시 설교를 고르세요</p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCloseSamplePicker}
              aria-label="예시 선택 패널 닫기"
            >
              닫기
            </Button>
          </div>
          <ul className="list-none space-y-3 p-0">
            {sermonFixtures.map((fixture) => (
              <li key={fixture.id}>
                <button
                  type="button"
                  onClick={() => handleSelectFixture(fixture.id)}
                  onKeyDown={handleFixtureCardKeyDown(fixture.id)}
                  className="w-full rounded-lg border border-border bg-background p-4 text-left transition-colors hover:border-muted-foreground/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  aria-label={`${fixture.title} 예시 설교 불러오기`}
                >
                  <p className="font-medium text-foreground">{fixture.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">탭하여 본문을 채웁니다</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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
        <TrustNote icon="shield">설교 내용은 서버로 전송되지 않습니다.</TrustNote>
        {!valid && value.trim().length > 0 && value.trim().length < MIN ? (
          <p className="text-xs text-muted-foreground">{EDGE_MESSAGES.sermonTooShortHint}</p>
        ) : null}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleOpenSamplePicker}
            aria-label="예시 설교 보기 및 선택"
          >
            예시 보기
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
