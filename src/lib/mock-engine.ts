import type { ReflectionResult } from "@/types/reflection";

export type MockEngineInput = {
  intention: string;
  sermonText: string;
};

const TRANSITION_RE =
  /그러나|하지만|그래서|결국|그런데|또한|그러므로|따라서|그러면|한편/;

const pickByLength = (length: number, mod: number): number =>
  length <= 0 ? 0 : length % mod;

const normalizeParagraphs = (text: string): string[] => {
  const raw = text.trim().split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (raw.length > 0) {
    return raw;
  }
  const single = text.trim();
  return single ? [single] : [];
};

const firstMeaningfulSentence = (paragraph: string): string => {
  const t = paragraph.replace(/\s+/g, " ").trim();
  if (!t) {
    return "이 설교의 첫 부분";
  }
  const match = t.match(/^.+?(?:[.!?。…]|$)/u);
  const s = (match?.[0] ?? t).trim();
  const cap = 120;
  if (s.length > cap) {
    return `${s.slice(0, cap).trim()}…`;
  }
  return s || t.slice(0, Math.min(80, t.length));
};

const excerptFromEnd = (paragraph: string, maxLen: number): string => {
  const t = paragraph.replace(/\s+/g, " ").trim();
  if (!t) {
    return "맺음의 부분";
  }
  if (t.length <= maxLen) {
    return t;
  }
  return `…${t.slice(-maxLen).trim()}`;
};

const excerptFromMiddle = (text: string, maxLen: number): string => {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) {
    return "설교의 한 구절";
  }
  const start = Math.max(0, Math.floor(t.length / 2) - Math.floor(maxLen / 2));
  const slice = t.slice(start, start + maxLen).trim();
  return slice.length < 20 ? t.slice(0, Math.min(maxLen, t.length)) : slice;
};

const fill = (template: string, vars: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");

/**
 * Heuristic, non-LLM reflection for custom sermon paste.
 * Tone: reflective possibilities ("may", "could") — not evaluative scoring.
 */
export const generateReflection = (input: MockEngineInput): ReflectionResult => {
  const intention = input.intention.trim() || "전하고자 하신 마음";
  const sermonText = input.sermonText.trim();
  const paragraphs = normalizeParagraphs(sermonText);
  const firstPara = paragraphs[0] ?? "";
  const lastPara = paragraphs[paragraphs.length - 1] ?? firstPara;
  const words = sermonText ? sermonText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const hasQuestion = sermonText.includes("?");
  const hasTransition = TRANSITION_RE.test(sermonText);

  const firstSentence = firstMeaningfulSentence(firstPara);
  const lastBit = excerptFromEnd(lastPara, 100);
  const midBit = excerptFromMiddle(sermonText, 90);

  const echoTemplates = [
    "이 설교에서 청중이 가장 기억할 수 있는 것은 {firstSentence}에 닿는 이야기일 수 있습니다.",
    "전체적으로, 청중은 {intention}이라는 메시지를 떠올릴 가능성이 있습니다.",
    "말씀의 흐름 속에서 {snippet}와 같은 부분이 먼저 울려 올 수 있습니다.",
  ];
  const stayedTemplates = [
    "{snippet}에 머문 이미지나 표현이, 설교가 끝난 뒤에도 조용히 남을 수 있습니다.",
    "앞부분에서 제시된 {firstSentence}의 톤이 마음에 길게 머물 수 있습니다.",
    "청중 가운데 누군가는 설교 중간의 {mid} 구절을 붙잡고 돌아갈 수도 있습니다.",
  ];
  const needsHelpWithQuestion = [
    "질문이 이어지는 구간에서는, 일부 청중은 잠시 멈춰 서며 스스로에게 답을 찾게 될 수 있습니다.",
    "청중에게 던지신 질문들이 풍부할수록, 듣는 이에 따라 호흡이 길어질 수도 있습니다.",
  ];
  const needsHelpNoQuestion = [
    "전환이 많은 설교에서는, 일부 청중이 어디서 다음 이야기로 넘어가는지 잠시 헤아리게 될 수 있습니다.",
    "정보와 이야기가 빠르게 이어질 때, 듣는 이에 따라 한 번 더 익혀야 할 부분으로 느껴질 수 있습니다.",
  ];
  const needsHelpTransition = [
    "‘{transitionCue}’ 이후의 전개에서, 청중이 잠시 방향을 확인하고 싶어할 수도 있습니다.",
  ];

  const aliveTemplates = [
    "맺음 가까이의 {last}에서, 가장 생생하게 다가온 순간이 있을 수 있습니다.",
    "{firstSentence}를 말씀하신 부분이 특히 선명하게 남을 수 있습니다.",
    "전체 길이가 길수록, 청중은 자신에게 와닿은 한 구절을 골라 가져갈 수 있습니다.",
  ];

  const gentleTemplates = [
    "원하신다면, 핵심 문장을 한 번 더 천천히 읽어 주시면, 같은 내용을 따라가는 데 도움이 될 수 있습니다.",
    "원하신다면, 예시와 적용 사이에 짧은 숨 고르기를 두시면, 흐름이 한층 부드럽게 느껴질 수 있습니다.",
    "원하신다면, ‘오늘 한 가지만 기억해 주셔도’처럼 범위를 좁혀 말씀해 보시는 것도 한 방법일 수 있습니다.",
  ];

  const questionTemplates = [
    "이번 설교에서 청중이 가장 오래 품고 갈 질문은 무엇이었을까요?",
    "다음에 같은 주제로 나누신다면, 가장 먼저 안심시키고 싶은 한 가지는 무엇일까요?",
    "설교를 준비하시며 스스로에게 가장 자주 되물으셨던 질문은 무엇이었나요?",
  ];

  const iEcho = pickByLength(wordCount, echoTemplates.length);
  const iStayed = pickByLength(wordCount + paragraphs.length, stayedTemplates.length);
  const iAlive = pickByLength(wordCount + lastPara.length, aliveTemplates.length);
  const iGentle = pickByLength(wordCount + intention.length, gentleTemplates.length);
  const iQ = pickByLength(paragraphs.length + wordCount, questionTemplates.length);

  const vars = {
    intention,
    firstSentence,
    snippet: firstSentence,
    mid: midBit,
    last: lastBit,
    transitionCue: hasTransition ? "그러나/그래서 등의 연결" : "이야기의 전환",
  };

  let needsHelpBody: string;
  if (hasTransition) {
    needsHelpBody = fill(needsHelpTransition[0], vars);
  } else if (hasQuestion) {
    needsHelpBody = needsHelpWithQuestion[pickByLength(wordCount, needsHelpWithQuestion.length)];
  } else {
    needsHelpBody = needsHelpNoQuestion[pickByLength(wordCount, needsHelpNoQuestion.length)];
  }

  const lengthNote =
    wordCount > 450
      ? " 말씀의 분량이 넉넉할수록, 청중은 자신에게 와닿은 한두 문장을 중심으로 기억할 수도 있습니다."
      : "";

  return {
    intendedTakeaway: `${intention} — 이렇게 전하고 싶으셨던 마음이 성찰의 출발점으로 남겨 두었습니다.`,
    echo: fill(echoTemplates[iEcho], vars),
    stayed: fill(stayedTemplates[iStayed], vars) + lengthNote,
    needsHelp: needsHelpBody,
    alive: fill(aliveTemplates[iAlive], vars),
    gentleSuggestion: gentleTemplates[iGentle],
    nextReflectionQuestion: questionTemplates[iQ],
  };
};

export type MockEngine = {
  readonly version: number;
  generateReflection: (input: MockEngineInput) => ReflectionResult;
};

export const createMockEngine = (): MockEngine => ({
  version: 3,
  generateReflection,
});
