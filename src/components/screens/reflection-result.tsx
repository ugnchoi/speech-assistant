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

  const sections = [
    { id: "intended", title: "담고 싶었던 마음", body: r.intendedTakeaway },
    { id: "echo", title: "울림으로 남은 것", body: r.echo },
    { id: "stayed", title: "마음에 머문 것", body: r.stayed },
    { id: "needs-help", title: "흐름이 더 필요해 보이는 곳", body: r.needsHelp },
    { id: "alive", title: "살아 있는 순간", body: r.alive },
  ];

  return (
    <div className="screen-fade-in space-y-10">
      <h1 className="text-screen-title text-balance text-foreground">간단한 청중 성찰</h1>
      <div className="space-y-6">
        {sections.map((section) => (
          <section
            key={section.id}
            className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
            aria-labelledby={`reflection-${section.id}-title`}
          >
            <h2
              id={`reflection-${section.id}-title`}
              className="text-lg font-medium tracking-tight text-foreground"
            >
              {section.title}
            </h2>
            <p className="mt-3 text-body leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
      <FlowCta label="계속하기" onClick={goNext} aria-label="계속하기" />
    </div>
  );
};
