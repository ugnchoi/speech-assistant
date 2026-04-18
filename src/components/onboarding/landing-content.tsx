import type { ReactNode } from "react";

import { BookOpen, Compass, Waves } from "lucide-react";

import { sermonFixtures } from "@/lib/fixtures";

const trustStatements = [
  "숫자나 등급으로 재지 않습니다",
  "신학적 판단을 대신하지 않습니다",
  "부탁하지 않으시면 원고를 고치지 않습니다",
];

const flowSteps = [
  {
    Icon: BookOpen,
    title: "놓아 보세요",
    caption: "원고나 전사본을 그대로 두시면 됩니다.",
  },
  {
    Icon: Waves,
    title: "한 인상이 돌아옵니다",
    caption: "한 청중의 시선으로 조용히 비춰 드립니다.",
  },
  {
    Icon: Compass,
    title: "직접 고르세요",
    caption: "이어갈지 잠시 둘지, 결정은 전적으로 당신의 것입니다.",
  },
] as const;

type LandingContentProps = {
  primaryAction: ReactNode;
  secondaryAction: ReactNode;
};

export const LandingContent = ({ primaryAction, secondaryAction }: LandingContentProps) => {
  const previewReflection = sermonFixtures[0]?.reflection;

  return (
    <div className="screen-fade-in space-y-12">
      <div className="space-y-6">
        <svg
          aria-hidden
          viewBox="0 0 40 20"
          className="h-4 w-10 text-muted-foreground/55"
        >
          <path
            d="M2 14 A 12 12 0 0 1 38 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            d="M10 14 A 6 6 0 0 1 30 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-eyebrow text-muted-foreground">설교의 메아리</p>
        <h1 className="text-screen-title text-balance text-foreground">
          설교를 들은 한 청중의 인상을, 조용히 들어 보세요
        </h1>
        <p className="text-body-lg text-pretty leading-relaxed text-muted-foreground">
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

      <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {flowSteps.map(({ Icon, title, caption }) => (
          <li key={title} className="space-y-2">
            <Icon
              aria-hidden
              className="size-5 text-muted-foreground"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{caption}</p>
          </li>
        ))}
      </ol>

      {previewReflection ? (
        <div aria-hidden className="space-y-4">
          <p className="text-eyebrow text-muted-foreground/70">
            이런 성찰이 돌아옵니다 · 미리 보기
          </p>
          <div className="space-y-6 rounded-2xl border border-dashed border-border/70 bg-muted/15 p-6 opacity-80 sm:p-8">
            <div className="space-y-3">
              <span className="block h-px w-8 bg-foreground/20" />
              <p className="text-eyebrow text-muted-foreground">
                청중에게 먼저 울려 올 수 있는 인상
              </p>
              <p className="text-reflective text-base text-foreground/85 sm:text-lg">
                {previewReflection.echo}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-primary/5 p-4 sm:p-5">
              <p className="text-eyebrow text-muted-foreground">가장 생생한 순간</p>
              <p className="text-reflective mt-2 text-sm text-foreground/90">
                {previewReflection.alive}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {primaryAction}
        {secondaryAction}
      </div>
    </div>
  );
};
