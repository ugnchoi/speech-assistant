"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  canAccessStep,
  canGoNext,
  clampStepToSession,
  getNextStepId,
  getPreviousStepId,
  isStepId,
} from "@/lib/flow";
import { createNewReflectionSession } from "@/lib/session-factory";
import {
  clearAllSessions,
  deleteSession,
  isBrowser,
  isLocalStorageAvailable,
  loadLatestSession,
  loadSession,
  saveSession,
} from "@/lib/storage";
import type { ReflectionSession } from "@/types/reflection";
import type { StepId } from "@/types/flow-steps";

const PIN_KEY = "speech-assistant:prototype-active-session";

const readPinnedSessionId = (): string | null => {
  if (!isBrowser()) {
    return null;
  }
  try {
    return window.sessionStorage.getItem(PIN_KEY);
  } catch {
    return null;
  }
};

const pinSessionId = (id: string): void => {
  if (!isBrowser()) {
    return;
  }
  try {
    window.sessionStorage.setItem(PIN_KEY, id);
  } catch {
    /* ignore */
  }
};

type FlowContextValue = {
  currentStep: StepId;
  goNext: () => void;
  goBack: () => void;
  goTo: (step: StepId) => void;
  /** Merge partial into session, then navigate if allowed (sync ref for same-tick flows). */
  goToWithSession: (step: StepId, partial: Partial<ReflectionSession>) => void;
  session: ReflectionSession;
  updateSession: (partial: Partial<ReflectionSession>) => void;
};

const FlowContext = createContext<FlowContextValue | null>(null);

const flushDebounce = (ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
  if (ref.current != null) {
    clearTimeout(ref.current);
    ref.current = null;
  }
};

type FlowProviderInnerProps = {
  children: ReactNode;
};

const FlowProviderInner = ({ children }: FlowProviderInnerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<ReflectionSession | null>(null);
  const [currentStep, setCurrentStep] = useState<StepId>("landing");
  const persistAvailable =
    typeof window === "undefined" ? true : isLocalStorageAvailable();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionRef = useRef<ReflectionSession | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;

    const pinnedId = readPinnedSessionId();
    let initial: ReflectionSession;
    if (pinnedId) {
      const loaded = loadSession(pinnedId);
      if (loaded) {
        initial = loaded;
      } else {
        initial = createNewReflectionSession();
        pinSessionId(initial.id);
        saveSession(initial);
      }
    } else {
      const latest = loadLatestSession();
      if (latest) {
        initial = latest;
        pinSessionId(initial.id);
      } else {
        initial = createNewReflectionSession();
        pinSessionId(initial.id);
        saveSession(initial);
      }
    }
    sessionRef.current = initial;

    const urlStep = searchParams.get("step");
    const stepFromUrl =
      urlStep && isStepId(urlStep) && canAccessStep(urlStep, initial) ? urlStep : null;
    const resolved = stepFromUrl ?? clampStepToSession(initial.lastStep, initial);
    startTransition(() => {
      setSession(initial);
      setCurrentStep(resolved);
    });
    if (stepFromUrl !== resolved || !urlStep) {
      router.replace(`/prototype?step=${resolved}`, { scroll: false });
    }
  }, [router, searchParams]);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const persistImmediate = useCallback((s: ReflectionSession) => {
    flushDebounce(debounceRef);
    saveSession(s);
  }, []);

  const schedulePersist = useCallback((s: ReflectionSession) => {
    flushDebounce(debounceRef);
    debounceRef.current = setTimeout(() => {
      saveSession(s);
      debounceRef.current = null;
    }, 500);
  }, []);

  const updateSession = useCallback(
    (partial: Partial<ReflectionSession>) => {
      setSession((prev) => {
        if (!prev) {
          return prev;
        }
        const next: ReflectionSession = {
          ...prev,
          ...partial,
          updatedAt: new Date().toISOString(),
        };
        sessionRef.current = next;
        schedulePersist(next);
        return next;
      });
    },
    [schedulePersist],
  );

  const applyStep = useCallback(
    (step: StepId, baseSession: ReflectionSession) => {
      const nextSession: ReflectionSession =
        step === "closing"
          ? {
              ...baseSession,
              completedAt: baseSession.completedAt ?? new Date().toISOString(),
            }
          : baseSession;
      setCurrentStep(step);
      sessionRef.current = nextSession;
      setSession(nextSession);
      persistImmediate(nextSession);
      router.replace(`/prototype?step=${step}`, { scroll: false });
      if (isBrowser()) {
        window.scrollTo(0, 0);
      }
    },
    [persistImmediate, router],
  );

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    const handleBeforeUnload = () => {
      const s = sessionRef.current;
      if (s) {
        flushDebounce(debounceRef);
        saveSession(s);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const s = sessionRef.current;
    if (!s) {
      return;
    }
    const urlStep = searchParams.get("step");
    if (!urlStep || !isStepId(urlStep) || !canAccessStep(urlStep, s)) {
      return;
    }
    if (urlStep === currentStep) {
      return;
    }
    const synced: ReflectionSession = {
      ...s,
      lastStep: urlStep,
      updatedAt: new Date().toISOString(),
    };
    sessionRef.current = synced;
    startTransition(() => {
      setCurrentStep(urlStep);
      setSession(synced);
    });
    schedulePersist(synced);
  }, [searchParams, currentStep, schedulePersist]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      const s = sessionRef.current;
      if (!s) {
        return;
      }
      const prev = getPreviousStepId(currentStep, s);
      if (prev == null) {
        return;
      }
      event.preventDefault();
      const nextSession: ReflectionSession = {
        ...s,
        lastStep: prev,
        updatedAt: new Date().toISOString(),
      };
      applyStep(prev, nextSession);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [applyStep, currentStep]);

  const goNext = useCallback(() => {
    const s = sessionRef.current;
    if (!s) {
      return;
    }
    if (!canGoNext(currentStep, s)) {
      return;
    }
    const next = getNextStepId(currentStep, s);
    if (next == null) {
      return;
    }

    if (currentStep === "closing" && next === "landing") {
      const oldId = s.id;
      const fresh = createNewReflectionSession();
      pinSessionId(fresh.id);
      deleteSession(oldId);
      sessionRef.current = fresh;
      setSession(fresh);
      persistImmediate(fresh);
      setCurrentStep("landing");
      router.replace("/prototype?step=landing", { scroll: false });
      if (isBrowser()) {
        window.scrollTo(0, 0);
      }
      return;
    }

    const nextSession: ReflectionSession = {
      ...s,
      lastStep: next,
      updatedAt: new Date().toISOString(),
    };
    applyStep(next, nextSession);
  }, [applyStep, currentStep, persistImmediate, router]);

  const goBack = useCallback(() => {
    const s = sessionRef.current;
    if (!s) {
      return;
    }
    const prev = getPreviousStepId(currentStep, s);
    if (prev == null) {
      return;
    }
    const nextSession: ReflectionSession = {
      ...s,
      lastStep: prev,
      updatedAt: new Date().toISOString(),
    };
    applyStep(prev, nextSession);
  }, [applyStep, currentStep]);

  const goTo = useCallback(
    (step: StepId) => {
      const s = sessionRef.current;
      if (!s) {
        return;
      }
      const target = canAccessStep(step, s) ? step : clampStepToSession(step, s);
      const nextSession: ReflectionSession = {
        ...s,
        lastStep: target,
        updatedAt: new Date().toISOString(),
      };
      applyStep(target, nextSession);
    },
    [applyStep],
  );

  const goToWithSession = useCallback(
    (step: StepId, partial: Partial<ReflectionSession>) => {
      const s = sessionRef.current;
      if (!s) {
        return;
      }
      const merged: ReflectionSession = {
        ...s,
        ...partial,
        lastStep: step,
        updatedAt: new Date().toISOString(),
      };
      const target = canAccessStep(step, merged) ? step : clampStepToSession(step, merged);
      const withStep: ReflectionSession = {
        ...merged,
        lastStep: target,
      };
      sessionRef.current = withStep;
      setSession(withStep);
      schedulePersist(withStep);
      applyStep(target, withStep);
    },
    [applyStep, schedulePersist],
  );

  if (!session) {
    return (
      <div className="screen-fade-in py-16 text-center text-sm text-muted-foreground" role="status">
        불러오는 중…
      </div>
    );
  }

  const value: FlowContextValue = {
    currentStep,
    goNext,
    goBack,
    goTo,
    goToWithSession,
    session,
    updateSession,
  };

  return (
    <FlowContext.Provider value={value}>
      {!persistAvailable ? (
        <p
          className="mb-4 rounded-lg border border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground"
          role="status"
          suppressHydrationWarning
        >
          이 브라우저에서는 저장 기능이 제한됩니다.
        </p>
      ) : null}
      {children}
    </FlowContext.Provider>
  );
};

type FlowProviderProps = {
  children: ReactNode;
};

export const FlowProvider = ({ children }: FlowProviderProps) => {
  return <FlowProviderInner>{children}</FlowProviderInner>;
};

export const useFlow = (): FlowContextValue => {
  const ctx = useContext(FlowContext);
  if (!ctx) {
    throw new Error("useFlow must be used within FlowProvider");
  }
  return ctx;
};

export { clearAllSessions };
