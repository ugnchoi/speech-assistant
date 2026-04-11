/** User-facing copy for edge cases (Phase 4 tone + trust). */

export const EDGE_MESSAGES = {
  reflectionGenerationFailed:
    "성찰을 준비하는 중 문제가 발생했습니다. 다시 시도해 주세요.",
  sermonTooShortHint:
    "더 많은 내용을 입력하시면 더 풍부한 성찰을 받으실 수 있습니다.",
  noStoredSessions: "아직 저장된 성찰이 없습니다.",
  localStorageUnavailable: "이 브라우저에서는 저장 기능이 제한됩니다.",
} as const;
