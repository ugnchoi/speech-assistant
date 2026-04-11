"use client";

import { useEffect, useRef } from "react";

import { useFlow } from "@/components/providers/flow-provider";
import { buildMockReflectionResult } from "@/lib/reflection-mock";

const DELAY_MS = 2500;

export const Processing = () => {
  const { goToWithSession } = useFlow();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) {
      return;
    }
    firedRef.current = true;
    const id = window.setTimeout(() => {
      const reflection = buildMockReflectionResult();
      goToWithSession("reflection", { reflection });
    }, DELAY_MS);
    return () => window.clearTimeout(id);
  }, [goToWithSession]);

  return (
    <div className="screen-fade-in space-y-12">
      <h1 className="text-screen-title text-balance text-center text-foreground">
        청중의 반응을 준비하고 있습니다
      </h1>
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite" aria-label="처리 중">
        <span className="processing-dot" aria-hidden />
        <p className="text-helper text-center text-muted-foreground">잠시만 기다려 주세요</p>
      </div>
    </div>
  );
};
