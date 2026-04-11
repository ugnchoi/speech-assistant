const sections = [
  {
    id: "echo",
    title: "울림으로 남은 것",
    body: "청중 한 사람이 설교 후 가장 먼저 떠올릴 만한 장면이나 문장에 대한 짧은 인상입니다. (예시 텍스트)",
  },
  {
    id: "stayed",
    title: "마음에 머문 것",
    body: "일상 속에서 다시 생각나거나 붙잡고 싶어질 수 있는 메시지로 느껴지는 부분입니다. (예시 텍스트)",
  },
  {
    id: "needs-help",
    title: "흐름이 더 필요해 보이는 곳",
    body: "듣는 이가 따라가기 어렵게 느낄 수 있는 전환이나 밀도에 대한 부드러운 관찰입니다. (예시 텍스트)",
  },
  {
    id: "alive",
    title: "살아 있는 순간",
    body: "진심이나 열정이 가장 잘 전해진다고 느껴지는 부분입니다. (예시 텍스트)",
  },
];

export const ReflectionResult = () => {
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
    </div>
  );
};
