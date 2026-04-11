"use client";

import type { ChangeEventHandler, KeyboardEvent } from "react";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { TrustNote } from "@/components/ui/trust-note";
import type { Calibration as CalibrationData } from "@/types/reflection";

const options: {
  id: CalibrationData["closeness"];
  label: string;
  sub: string;
}[] = [
  {
    id: "close",
    label: "의도했던 것과 가까워요",
    sub: "성찰이 의도한 메시지를 잘 반영한 것 같습니다",
  },
  {
    id: "somewhat",
    label: "부분적으로 닿았어요",
    sub: "일부는 닿았지만, 다른 부분도 있었습니다",
  },
  {
    id: "not-close",
    label: "의도했던 것과 달라요",
    sub: "이 성찰이 다른 방향을 보여주고 있네요",
  },
];

export const Calibration = () => {
  const { session, updateSession, goNext, goBack } = useFlow();
  const selected = session.calibration?.closeness ?? null;
  const comment = session.calibration?.comment ?? "";

  const handleSelect = (closeness: CalibrationData["closeness"]) => {
    updateSession({
      calibration: {
        closeness,
        comment: session.calibration?.comment,
      },
    });
  };

  const handleCommentChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const closeness = session.calibration?.closeness;
    if (!closeness) {
      return;
    }
    updateSession({
      calibration: {
        closeness,
        comment: event.target.value,
      },
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: CalibrationData["closeness"]) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    handleSelect(id);
  };

  const canContinue = selected != null;

  return (
    <div className="screen-fade-in space-y-10">
      <p className="text-body-lg text-pretty text-foreground">
        이 성찰이 전하고 싶으셨던 마음과 얼마나 가깝게 느껴지셨나요? 편하신 대로 골라 주세요.
      </p>

      <div
        className="space-y-3"
        role="radiogroup"
        aria-label="성찰이 의도와 얼마나 가까웠는지 선택"
      >
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <div
              key={opt.id}
              role="radio"
              tabIndex={0}
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.id)}
              onKeyDown={(e) => handleKeyDown(e, opt.id)}
              className={`cursor-pointer rounded-xl border p-4 text-body outline-none transition-[border-color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 sm:p-5 ${
                isSelected
                  ? "border-primary/40 bg-muted/40 text-foreground"
                  : "border-border bg-card text-foreground shadow-sm hover:bg-muted/25"
              }`}
            >
              <span className="font-medium">{opt.label}</span>
              <p className="mt-1 text-sm text-muted-foreground">{opt.sub}</p>
            </div>
          );
        })}
      </div>

      {selected != null ? (
        <div className="space-y-2">
          <label htmlFor="calibration-note" className="text-helper text-muted-foreground">
            더 하고 싶은 말이 있으시면 적어 주세요. (선택)
          </label>
          <textarea
            id="calibration-note"
            name="calibrationNote"
            rows={3}
            value={comment}
            onChange={handleCommentChange}
            className="w-full resize-y rounded-xl border border-border bg-card p-4 text-body text-foreground shadow-sm outline-none transition-[box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            placeholder="느낀 점을 짧게 남겨 주세요."
            aria-label="느낀 점 추가로 남기기"
          />
        </div>
      ) : null}

      <TrustNote>이 응답은 도구를 개선하는 데 도움이 됩니다.</TrustNote>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="계속하기" onClick={goNext} disabled={!canContinue} aria-label="계속하기" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
