import { isStepId } from "@/lib/flow";
import type { ReflectionSession } from "@/types/reflection";

const PREFIX = "speech-assistant:";
const SESSION_KEY_PREFIX = `${PREFIX}session:`;

export const storageKey = (name: string): string => `${PREFIX}${name}`;

export const isBrowser = (): boolean => typeof window !== "undefined";

const sessionStorageKey = (id: string): string => `${SESSION_KEY_PREFIX}${id}`;

const normalizeSession = (raw: unknown): ReflectionSession | null => {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const s = raw as Partial<ReflectionSession>;
  if (typeof s.id !== "string" || typeof s.createdAt !== "string") {
    return null;
  }
  const updatedAt =
    typeof s.updatedAt === "string" ? s.updatedAt : s.createdAt;
  const lastStep =
    typeof s.lastStep === "string" && isStepId(s.lastStep) ? s.lastStep : "landing";
  return {
    id: s.id,
    createdAt: s.createdAt,
    updatedAt,
    lastStep,
    intention: typeof s.intention === "string" ? s.intention : "",
    sermonText: typeof s.sermonText === "string" ? s.sermonText : "",
    usedSample: Boolean(s.usedSample),
    sampleFixtureId:
      typeof s.sampleFixtureId === "string" && s.sampleFixtureId.length > 0
        ? s.sampleFixtureId
        : null,
    reflection: s.reflection ?? null,
    calibration: s.calibration ?? null,
    chosenNextStep: s.chosenNextStep ?? null,
    completedAt: s.completedAt ?? null,
  };
};

export const saveSession = (session: ReflectionSession): void => {
  if (!isBrowser()) {
    return;
  }
  try {
    const payload = {
      ...session,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(sessionStorageKey(payload.id), JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
};

export const loadSession = (id: string): ReflectionSession | null => {
  if (!isBrowser()) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(sessionStorageKey(id));
    if (!raw) {
      return null;
    }
    return normalizeSession(JSON.parse(raw));
  } catch {
    return null;
  }
};

export const listSessions = (): ReflectionSession[] => {
  if (!isBrowser()) {
    return [];
  }
  const out: ReflectionSession[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (!key?.startsWith(SESSION_KEY_PREFIX)) {
        continue;
      }
      const raw = window.localStorage.getItem(key);
      if (!raw) {
        continue;
      }
      try {
        const parsed = normalizeSession(JSON.parse(raw));
        if (parsed) {
          out.push(parsed);
        }
      } catch {
        /* skip corrupt */
      }
    }
  } catch {
    return out;
  }
  return out.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
};

export const loadLatestSession = (): ReflectionSession | null => {
  const sessions = listSessions();
  return sessions[0] ?? null;
};

export const deleteSession = (id: string): void => {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.removeItem(sessionStorageKey(id));
  } catch {
    /* ignore */
  }
};

export const clearAllSessions = (): void => {
  if (!isBrowser()) {
    return;
  }
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key?.startsWith(SESSION_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    /* ignore */
  }
};
