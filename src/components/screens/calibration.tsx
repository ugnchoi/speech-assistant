"use client";

import type { ChangeEventHandler, KeyboardEvent } from "react";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import type { Calibration as CalibrationData } from "@/types/reflection";

const options: { id: CalibrationData["closeness"]; label: string }[] = [
  { id: "close", label: "가깝게 느껴집니다" },
  { id: "somewhat", label: "어느 정도 가깝습니다" },
  { id: "not-close", label: "가깝지 않게 느껴집니다" },
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
        이 결과가 의도하신 것과 얼마나 가깝게 느껴지셨나요?
      </p>

      <div
        className="space-y-3"
        role="radiogroup"
        aria-label="결과가 의도와 얼마나 가까운지 선택"
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
              {opt.label}
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
            aria-label="보정에 대한 추가 의견"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="계속하기" onClick={goNext} disabled={!canContinue} aria-label="계속하기" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
