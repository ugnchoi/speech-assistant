"use client";

import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";

const trustStatements = [
  "숫자나 등급으로 재지 않습니다",
  "신학적 판단을 대신하지 않습니다",
  "부탁하지 않으시면 원고를 고치지 않습니다",
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
          설교를 들은 한 청중의 인상을, 조용히 들어 보세요
        </h1>
        <p className="text-body-lg text-pretty text-muted-foreground leading-relaxed">
          원고나 전사본을 붙여 주시면, 청중에게 무엇이 남을 수 있을지, 어디에서 호흡이 잠시
          길어질 수 있을지, 무엇이 가장 생생하게 다가왔을지를 담은 짧은 성찰을 함께 열어
          드립니다. 한 사람의 시선일 뿐이며, 정답이 아닙니다.
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
