import Link from "next/link";

import { cn } from "@/lib/utils";

const cards = [
  {
    href: "/prototype/suggestion",
    title: "명확성을 위한 한 가지 제안",
    description: "부드러운 한 줄 제안으로 다음 준비에 참고해 보세요.",
    ariaLabel: "명확성을 위한 제안 화면으로 이동",
  },
  {
    href: "/prototype/reflection-question",
    title: "다음 설교를 위한 질문",
    description: "스스로에게 물을 만한 질문을 받아보세요.",
    ariaLabel: "다음 설교를 위한 질문 화면으로 이동",
  },
] as const;

export const NextStep = () => {
  return (
    <div className="screen-fade-in space-y-10">
      <h1 className="text-screen-title text-balance text-foreground">다음 단계를 선택해 주세요</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={cn(
              "group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm outline-none transition-[border-color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 hover:border-border/80 hover:bg-muted/20 sm:p-8",
            )}
            aria-label={card.ariaLabel}
          >
            <span className="text-lg font-medium text-foreground group-hover:text-foreground">
              {card.title}
            </span>
            <span className="mt-2 text-body text-muted-foreground">{card.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
