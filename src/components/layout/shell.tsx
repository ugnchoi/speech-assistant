import type { ReactNode } from "react";

type ShellProps = {
  children: ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  return <div className="flex min-h-full flex-col">{children}</div>;
};
