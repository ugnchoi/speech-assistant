"use client";

import type { KeyboardEventHandler } from "react";

import { cn } from "@/lib/utils";

type FlowBackProps = {
  label?: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export const FlowBack = ({
  label = "뒤로",
  className,
  disabled,
  onClick,
}: FlowBackProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "text-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline disabled:pointer-events-none disabled:opacity-50 sm:text-left",
        className,
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={label}
    >
      {label}
    </button>
  );
};
