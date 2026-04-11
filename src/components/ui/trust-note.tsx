import type { ReactNode } from "react";

import { Lock, Shield } from "lucide-react";

type TrustNoteIcon = "lock" | "shield" | "none";

type TrustNoteProps = {
  children: ReactNode;
  icon?: TrustNoteIcon;
  className?: string;
};

export const TrustNote = ({ children, icon = "lock", className = "" }: TrustNoteProps) => {
  const Icon = icon === "shield" ? Shield : icon === "lock" ? Lock : null;

  return (
    <p
      className={`flex items-start gap-2 text-xs text-muted-foreground ${className}`.trim()}
      role="note"
    >
      {Icon ? (
        <Icon
          className="mt-0.5 size-3.5 shrink-0 opacity-70"
          aria-hidden
          strokeWidth={1.75}
        />
      ) : null}
      <span className="min-w-0 leading-relaxed">{children}</span>
    </p>
  );
};
