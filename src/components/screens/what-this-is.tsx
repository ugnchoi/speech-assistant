import Link from "next/link";

import { Button } from "@/components/ui/button";

const bodyParagraphs = [
  "이 도구는 설교와 사용자가 의도한 메시지를 바탕으로 생성된 간단한 청중 반응입니다.",
  "이는 기도, 분별, 혹은 신뢰하는 사람들을 대신하지 않습니다.",
  "설교를 평가하거나 신학을 판단하지 않습니다.",
];

const summaryBullets = [
  "한 청중이 느낄 수 있는 인상",
  "개인적인 성찰 도구",
  "동의하지 않아도 괜찮은 결과",
];

export const WhatThisIs = () => {
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
        <Button
          nativeButton={false}
          render={<Link href="/prototype/intention" />}
          size="lg"
          className="w-full sm:w-auto"
          aria-label="계속하기"
        >
          계속하기
        </Button>
        <Link
          href="/"
          className="text-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:text-left"
          aria-label="이전 화면으로 돌아가기"
        >
          뒤로
        </Link>
      </div>
    </div>
  );
};
