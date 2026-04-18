"use client";

import { useEffect, useRef } from "react";

import { useFlow } from "@/components/providers/flow-provider";
import { getSermonFixtureById, matchFixtureBySermonText } from "@/lib/fixtures";
import { generateReflection } from "@/lib/mock-engine";

const randomProcessingDelayMs = (): number => {
  return 1500 + Math.floor(Math.random() * 1501);
};

export const Processing = () => {
  const { goToWithSession, session } = useFlow();
  const firedRef = useRef(false);
  const sessionRef = useRef(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (firedRef.current) {
      return;
    }
    firedRef.current = true;
    const delayMs = randomProcessingDelayMs();
    const id = window.setTimeout(() => {
      const s = sessionRef.current;
      let reflection;
      try {
        reflection = generateReflection({
          intention: s.intention,
          sermonText: s.sermonText,
        });

        if (s.usedSample && s.sampleFixtureId) {
          const fixture = getSermonFixtureById(s.sampleFixtureId);
          if (fixture && fixture.sermonText.trim() === s.sermonText.trim()) {
            reflection = fixture.reflection;
          }
        } else {
          const matched = matchFixtureBySermonText(s.sermonText);
          if (matched) {
            reflection = matched.reflection;
          }
        }
      } catch {
        goToWithSession("reflection", {
          reflection: null,
          reflectionGenerationFailed: true,
        });
        return;
      }

      goToWithSession("reflection", {
        reflection,
        reflectionGenerationFailed: false,
      });
    }, delayMs);
    return () => window.clearTimeout(id);
  }, [goToWithSession]);

  return (
    <div className="screen-fade-in space-y-12">
      <h1 className="text-screen-title text-balance text-center text-foreground">
        한 청중의 인상을 차분히 모으고 있습니다
      </h1>
      <div
        className="flex flex-col items-center gap-4"
        role="status"
        aria-live="polite"
        aria-label="준비 중"
      >
        <span className="processing-breath" aria-hidden />
        <p className="text-helper text-center text-muted-foreground">
          잠시만 기다려 주세요. 서두르지 않아도 괜찮습니다.
        </p>
      </div>
    </div>
  );
};
