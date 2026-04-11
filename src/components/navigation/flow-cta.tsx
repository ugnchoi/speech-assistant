"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type FlowCtaProps = Omit<ComponentProps<typeof Button>, "children"> & {
  label: string;
};

export const FlowCta = ({ label, className, disabled, ...props }: FlowCtaProps) => {
  return (
    <Button
      type="button"
      size="lg"
      disabled={disabled}
      className={cn("w-full sm:w-auto", className)}
      {...props}
    >
      {label}
    </Button>
  );
};
