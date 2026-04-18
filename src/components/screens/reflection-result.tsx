"use client";

import { Bookmark, Compass, Ellipsis, Sun, Waves } from "lucide-react";

import { FlowBack } from "@/components/navigation/flow-back";
import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { TrustNote } from "@/components/ui/trust-note";
import { EDGE_MESSAGES } from "@/lib/edge-messages";

export const ReflectionResult = () => {
  const { session, goNext, goTo, goBack } = useFlow();
  const r = session.reflection;
  const failed = Boolean(session.reflectionGenerationFailed);

  if (failed) {
    return (
      <div className="screen-fade-in space-y-8 text-center">
        <h1 className="text-screen-title text-balance text-foreground">간단한 청중 성찰</h1>
        <p className="text-body text-muted-foreground" role="alert">
          {EDGE_MESSAGES.reflectionGenerationFailed}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <FlowCta label="다시 시도" onClick={() => goTo("processing")} aria-label="성찰 다시 준비하기" />
          <FlowBack onClick={goBack} />
        </div>
      </div>
    );
  }

  if (!r) {
    return (
      <div className="screen-fade-in py-12 text-center text-sm text-muted-foreground" role="status">
        성찰을 불러오는 중입니다…
      </div>
    );
  }

  return (
    <div className="screen-fade-in space-y-12">
      <h1 className="text-screen-title text-balance text-foreground">간단한 청중 성찰</h1>

      <TrustNote icon="shield" className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3">
        이것은 한 청중의 인상이며, 정답이 아닙니다.
      </TrustNote>

      <section
        className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-6 sm:p-8"
        aria-labelledby="reflection-context-title"
      >
        <div className="flex items-center gap-2">
          <Compass
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground/60"
            strokeWidth={1.5}
          />
          <h2
            id="reflection-context-title"
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            오늘 마음에 두신 방향
          </h2>
        </div>
        <p className="mt-2 text-body leading-relaxed text-foreground/90">{r.intendedTakeaway}</p>
      </section>

      <section className="space-y-4" aria-labelledby="reflection-echo-title">
        <span aria-hidden className="block h-px w-10 bg-foreground/25" />
        <div className="flex items-center gap-2">
          <Waves
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground/60"
            strokeWidth={1.5}
          />
          <h2
            id="reflection-echo-title"
            className="text-eyebrow text-muted-foreground"
          >
            청중에게 먼저 울려 올 수 있는 인상
          </h2>
        </div>
        <p className="text-reflective text-balance text-xl text-foreground sm:text-2xl">
          {r.echo}
        </p>
      </section>

      <section className="space-y-2" aria-labelledby="reflection-stayed-title">
        <div className="flex items-center gap-2">
          <Bookmark
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground/60"
            strokeWidth={1.5}
          />
          <h2
            id="reflection-stayed-title"
            className="text-eyebrow text-muted-foreground"
          >
            마음에 오래 머물 수 있는 부분
          </h2>
        </div>
        <p className="text-body leading-relaxed text-muted-foreground">{r.stayed}</p>
      </section>

      <section className="space-y-2" aria-labelledby="reflection-needs-title">
        <div className="flex items-center gap-2">
          <Ellipsis
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground/60"
            strokeWidth={1.5}
          />
          <h2
            id="reflection-needs-title"
            className="text-eyebrow text-muted-foreground"
          >
            흐름이 잠시 느려질 수 있는 곳
          </h2>
        </div>
        <p className="text-body leading-relaxed text-muted-foreground/95">{r.needsHelp}</p>
      </section>

      <section
        className="rounded-2xl border border-border bg-primary/5 p-6 shadow-sm sm:p-8"
        aria-labelledby="reflection-alive-title"
      >
        <div className="flex items-center gap-2">
          <Sun
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground/60"
            strokeWidth={1.5}
          />
          <h2
            id="reflection-alive-title"
            className="text-lg font-medium tracking-tight text-foreground"
          >
            가장 생생하게 느껴졌을 수 있는 순간
          </h2>
        </div>
        <p className="text-reflective mt-3 text-body text-foreground">{r.alive}</p>
      </section>

      <FlowCta label="계속하기" onClick={goNext} aria-label="계속하기" />
    </div>
  );
};
