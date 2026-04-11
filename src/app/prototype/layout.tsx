import type { ReactNode } from "react";
import { Suspense } from "react";

import { FlowProvider } from "@/components/providers/flow-provider";

type PrototypeLayoutProps = {
  children: ReactNode;
};

const FlowFallback = () => (
  <div className="screen-fade-in py-16 text-center text-sm text-muted-foreground" role="status">
    불러오는 중…
  </div>
);

export default function PrototypeLayout({ children }: PrototypeLayoutProps) {
  return (
    <Suspense fallback={<FlowFallback />}>
      <FlowProvider>{children}</FlowProvider>
    </Suspense>
  );
}
