"use client";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";

const bodyParagraphs = [
  "이곳에서는 설교 원문과 전하고 싶으셨던 마음을 바탕으로, 한 청중이 느낄 수 있는 인상을 짧게 풀어 드립니다.",
  "기도와 분별, 혹은 신뢰하는 이들과 나누는 대화를 대신하지는 않습니다.",
  "설교를 재거나 신학을 대신 판단하지도 않습니다.",
];

const summaryBullets = [
  "한 청중이 느낄 수 있는 인상",
  "개인적으로 쓰는 성찰 공간",
  "마음에 맞지 않아도 괜찮은 글",
];

export const WhatThisIs = () => {
  const { goNext, goBack } = useFlow();

  return (
    <div className="screen-fade-in space-y-10">
      <div className="space-y-8">
        <h1 className="text-screen-title text-balance text-foreground">
          이 성찰이 하는 일과 하지 않는 일
        </h1>
        <div className="space-y-4 text-body text-pretty leading-relaxed text-muted-foreground">
          {bodyParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {summaryBullets.map((line) => (
            <li
              key={line}
              className="flex gap-3 text-body text-foreground/90 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary/35 before:content-['']"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FlowCta label="계속하기" onClick={goNext} aria-label="계속하기" />
        <FlowBack onClick={goBack} />
      </div>
    </div>
  );
};
