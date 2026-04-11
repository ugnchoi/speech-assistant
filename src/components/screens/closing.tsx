"use client";

import { FlowCta } from "@/components/navigation/flow-cta";
import { useFlow } from "@/components/providers/flow-provider";
import { TrustNote } from "@/components/ui/trust-note";

export const Closing = () => {
  const { goNext } = useFlow();

  return (
    <div className="screen-fade-in space-y-8 text-center">
      <h1 className="text-screen-title text-balance text-foreground">
        이 성찰은 이 브라우저에 저장되었습니다
      </h1>
      <p className="text-body text-muted-foreground">
        같은 기기에서 다시 열면 이어서 볼 수 있습니다.
      </p>
      <TrustNote icon="shield" className="mx-auto max-w-md justify-center text-center">
        이 성찰은 이 브라우저에만 저장되며, 외부로 전송되지 않습니다.
      </TrustNote>
      <div className="flex justify-center pt-2">
        <FlowCta label="처음부터 다시" onClick={goNext} aria-label="처음부터 다시 시작" />
      </div>
    </div>
  );
};
