"use client";

import { FlowBack } from "@/components/navigation/flow-back";
import { useFlow } from "@/components/providers/flow-provider";

import { cn } from "@/lib/utils";

const cards = [
  {
    choice: "suggestion" as const,
    title: "한 가지 생각해 볼 제안",
    description: "꼭 따르실 필요는 없습니다. 편하실 때만 곁에 두어 보세요.",
    ariaLabel: "한 가지 제안 화면으로 이동",
  },
  {
    choice: "reflection-question" as const,
    title: "스스로에게 물을 만한 질문",
    description: "정답이 없는 질문입니다. 잠시 머물다 가셔도 괜찮습니다.",
    ariaLabel: "성찰 질문 화면으로 이동",
  },
] as const;

export const NextStep = () => {
  const { session, goToWithSession, goBack } = useFlow();

  const handlePick = (choice: (typeof cards)[number]["choice"]) => {
    const step = choice === "suggestion" ? "suggestion" : "reflection-question";
    goToWithSession(step, { chosenNextStep: choice });
  };

  return (
    <div className="screen-fade-in space-y-10">
      <h1 className="text-screen-title text-balance text-foreground">
        원하시는 것만 골라 보세요
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const isSelected = session.chosenNextStep === card.choice;
          return (
            <button
              key={card.choice}
              type="button"
              onClick={() => handlePick(card.choice)}
              className={cn(
                "group flex flex-col rounded-xl border bg-card p-6 text-left shadow-sm outline-none transition-[border-color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 hover:border-border/80 hover:bg-muted/20 sm:p-8",
                isSelected ? "border-primary/40 bg-muted/30" : "border-border",
              )}
              aria-label={card.ariaLabel}
              aria-pressed={isSelected}
            >
              <span className="text-lg font-medium text-foreground group-hover:text-foreground">
                {card.title}
              </span>
              <span className="mt-2 text-body text-muted-foreground">{card.description}</span>
            </button>
          );
        })}
      </div>
      <FlowBack onClick={goBack} />
    </div>
  );
};
