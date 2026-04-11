"use client";

import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";

export const ReflectionResult = () => {
  const { session, goNext } = useFlow();
  const r = session.reflection;

  if (!r) {
    return (
      <div className="screen-fade-in py-12 text-center text-sm text-muted-foreground" role="status">
        성찰을 불러오는 중입니다…
      </div>
    );
  }

  return (
    <div className="screen-fade-in space-y-10">
      <h1 className="text-screen-title text-balance text-foreground">간단한 청중 성찰</h1>

      <section
        className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-6 sm:p-8"
        aria-labelledby="reflection-context-title"
      >
        <h2 id="reflection-context-title" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          전하고 싶었던 마음
        </h2>
        <p className="mt-2 text-body leading-relaxed text-foreground/90">{r.intendedTakeaway}</p>
      </section>

      <section
        className="rounded-xl border-l-4 border-l-foreground/25 bg-card py-6 pl-6 pr-6 shadow-sm sm:py-8 sm:pl-8 sm:pr-8"
        aria-labelledby="reflection-echo-title"
      >
        <h2 id="reflection-echo-title" className="text-lg font-medium tracking-tight text-foreground">
          울림으로 남은 것
        </h2>
        <blockquote className="mt-4 border-none pl-0 text-body text-lg italic leading-relaxed text-foreground/90">
          {r.echo}
        </blockquote>
      </section>

      <section
        className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
        aria-labelledby="reflection-stayed-title"
      >
        <h2 id="reflection-stayed-title" className="text-lg font-medium tracking-tight text-foreground">
          마음에 머문 것
        </h2>
        <p className="mt-3 text-body leading-relaxed text-muted-foreground">{r.stayed}</p>
      </section>

      <section
        className="rounded-xl border border-border/60 bg-muted/15 p-6 sm:p-8"
        aria-labelledby="reflection-needs-title"
      >
        <h2 id="reflection-needs-title" className="text-lg font-medium tracking-tight text-muted-foreground">
          흐름이 더 필요해 보이는 곳
        </h2>
        <p className="mt-3 text-body leading-relaxed text-muted-foreground/95">{r.needsHelp}</p>
      </section>

      <section
        className="rounded-xl border border-border bg-primary/5 p-6 shadow-sm sm:p-8"
        aria-labelledby="reflection-alive-title"
      >
        <h2 id="reflection-alive-title" className="text-lg font-medium tracking-tight text-foreground">
          살아 있는 순간
        </h2>
        <p className="mt-3 text-body font-medium leading-relaxed text-foreground">{r.alive}</p>
      </section>

      <FlowCta label="계속하기" onClick={goNext} aria-label="계속하기" />
    </div>
  );
};
