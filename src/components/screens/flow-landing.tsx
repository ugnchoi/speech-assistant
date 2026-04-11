"use client";

import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";

const trustStatements = [
  "점수는 제공하지 않습니다",
  "신학적 판단이 아닙니다",
  "요청하지 않는 한 내용을 수정하지 않습니다",
];

export const FlowLanding = () => {
  const { goTo } = useFlow();

  const handleStart = () => {
    goTo("what-this-is");
  };

  const handleSample = () => {
    goTo("sermon-input");
  };

  return (
    <div className="screen-fade-in space-y-10">
      <div className="space-y-6">
        <p className="text-eyebrow text-muted-foreground">설교의 메아리</p>
        <h1 className="text-screen-title text-balance text-foreground">
          설교에 대한 간단한 청중의 반응을 들어보세요
        </h1>
        <p className="text-body-lg text-pretty text-muted-foreground leading-relaxed">
          설교 원고나 전사본을 공유하면, 청중에게 무엇이 남을 수 있는지, 어디에서 흐름이
          어려워질 수 있는지, 무엇이 가장 생생하게 느껴졌는지에 대한 짧은 성찰을 받아볼 수
          있습니다.
        </p>
      </div>

      <ul className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {trustStatements.map((line) => (
          <li
            key={line}
            className="flex gap-3 text-body text-muted-foreground before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-muted-foreground/40 before:content-['']"
          >
            {line}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <FlowCta label="성찰 시작하기" onClick={handleStart} aria-label="성찰 시작하기" />
        <button
          type="button"
          onClick={handleSample}
          className="text-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:text-left"
          aria-label="예시 설교 입력 화면으로 이동"
        >
          예시 보기
        </button>
      </div>
    </div>
  );
};
