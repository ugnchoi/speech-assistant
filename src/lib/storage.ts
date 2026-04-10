const PREFIX = "speech-assistant:";

export const storageKey = (name: string): string => `${PREFIX}${name}`;

export const isBrowser = (): boolean => typeof window !== "undefined";
