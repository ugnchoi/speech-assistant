import type { ReflectionResult } from "@/types/reflection";

export type MockEngineInput = {
  intention: string;
  sermonText: string;
};

const TRANSITION_RE =
  /그러나|하지만|그래서|결국|그런데|또한|그러므로|따라서|그러면|한편/;

const simpleHash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = Math.imul(31, h) + s.charCodeAt(i);
  }
  return Math.abs(h) >>> 0;
};

const pickIndex = (seed: number, salt: string, mod: number): number =>
  mod <= 0 ? 0 : simpleHash(`${seed}:${salt}`) % mod;

const normalizeParagraphs = (text: string): string[] => {
  const raw = text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
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

  const seed = simpleHash(`${intention}\n${sermonText}`);

  const takeawayTemplates = [
    "{intention} — 이렇게 전하고 싶으셨던 마음이 성찰의 출발점으로 남겨 둘 수 있습니다.",
    "{intention}라는 뜻을 마음에 두고 설교를 준비하셨을 수 있어, 그 마음을 이 자리에 조용히 비춰 보았습니다.",
    "전하고 싶으셨던 바가 {intention} 쪽에 머물렀을 수 있어, 그 지점을 성찰이 먼저 바라보게 두었습니다.",
    "{intention} — 이 한 줄이 오늘의 성찰이 함께 걷는 길잡이가 될 수 있습니다.",
  ];

  const echoTemplates = [
    "이 설교에서 어떤 청중에게는 {firstSentence}에 닿는 이야기가 가장 먼저 떠오를 수 있습니다. 한 사람의 마음에는 그 문장이 조용히 남을 수도 있고, 다른 이에게는 다른 구절이 더 크게 울릴 수도 있습니다.",
    "전체적인 흐름 속에서 청중은 {intention}이라는 메시지를 떠올릴 수도 있습니다. 말씀의 길이와 호흡에 따라 그 인상은 사람마다 달라질 수 있습니다.",
    "말씀의 흐름 속에서 {snippet}와 비슷한 부분이 먼저 울려 올 수 있습니다. 어떤 이에게는 그 문장이 핵심으로, 또 다른 이에게는 배경으로 느껴질 수 있습니다.",
    "설교가 이어지는 동안 청중 가운데 누군가는 {firstSentence}를 중심으로 이야기를 따라갈 수 있습니다. 그것이 ‘정답’이라기보다, 한 청중의 시선이 머문 지점일 수 있습니다.",
  ];

  const stayedTemplates = [
    "{snippet}에 머문 이미지나 표현이, 설교가 끝난 뒤에도 조용히 남을 수 있습니다. 어떤 청중에게는 그 장면이 하루 종일 곁에 머물 수도 있습니다.",
    "앞부분에서 제시된 {firstSentence}의 톤이 마음에 길게 머물 수 있습니다. 일부 청중은 그 부분을 붙잡고 집으로 돌아갈 수도 있습니다.",
    "어떤 청중에게는 설교 중간의 {mid} 구절이 특히 선명하게 남을 수 있습니다. 같은 말씀을 들어도 사람마다 붙잡는 문장은 달라질 수 있습니다.",
    "{mid} 근처의 묘사가, 듣는 이의 기억 속에서 잔잔히 되살아날 수 있습니다. 그 여운은 짧을 수도 있고, 며칠 동안 이어질 수도 있습니다.",
  ];

  const needsHelpWithQuestion = [
    "질문이 이어지는 구간에서는, 일부 청중은 잠시 멈춰 서며 스스로에게 답을 찾게 될 수 있습니다. 그 과정에서 호흡이 길어질 수도 있고, 자연스러운 정적처럼 느껴질 수도 있습니다.",
    "청중에게 던지신 질문들이 풍부할수록, 듣는 이에 따라 한 번 더 곱씹게 되는 구간이 생길 수 있습니다. 그것은 흐름이 느려진다기보다, 마음이 머무는 자리가 될 수 있습니다.",
    "여러 질문이 겹치는 부분에서는, 어떤 청중에게는 한 질문에 오래 머물다 나머지로 넘어가기까지 시간이 필요할 수 있습니다. 그 속도는 사람마다 달라질 수 있습니다.",
  ];

  const needsHelpNoQuestion = [
    "전환이 많은 설교에서는, 일부 청중이 어디서 다음 이야기로 넘어가는지 잠시 헤아리게 될 수 있습니다. 정보와 이야기가 빠르게 이어질 때, 그 지점에서 호흡을 고르는 시간이 필요할 수도 있습니다.",
    "정보와 이야기가 빠르게 이어질 때, 듣는 이에 따라 한 번 더 익혀야 할 부분으로 느껴질 수 있습니다. 그것을 ‘부족함’이라기보다, 자연스러운 받아들임의 속도로 볼 수도 있습니다.",
    "말씀의 밀도가 높은 구간에서는, 어떤 청중에게는 중간쯤에서 줄기를 다시 확인하고 싶어질 수 있습니다. 그때 잠깐의 정리가 이어지는 느낌일 수도 있습니다.",
    "이야기의 갈래가 여럿일 때, 일부 청중은 한 갈래에 머물다 나머지로 따라잡는 식으로 듣게 될 수 있습니다. 그 경로는 사람마다 달라질 수 있습니다.",
  ];

  const needsHelpTransition = [
    "‘{transitionCue}’ 이후의 전개에서, 청중이 잠시 방향을 확인하고 싶어할 수도 있습니다. 연결어 너머의 이야기가 어디로 이어지는지, 한 박자 쉬고 따라갈 수 있는 여지가 생길 수 있습니다.",
    "전환 직후에는 어떤 청중에게는 새로운 주제의 문이 열리는 순간으로 느껴질 수 있고, 다른 이에게는 잠깐 멈춰 서서 앞부분을 정리하는 순간으로 느껴질 수 있습니다.",
    "{transitionCue}를 지나며 이야기의 무게가 옮겨질 때, 듣는 이에 따라 한 번 더 귀를 기울이게 되는 지점이 생길 수 있습니다. 그 지점에서 흐름이 잠시 느리게 느껴질 수도 있습니다.",
  ];

  const aliveTemplates = [
    "맺음 가까이의 {last}에서, 가장 생생하게 다가온 순간이 있을 수 있습니다. 어떤 청중에게는 그 문장이 하루의 끝에서 다시 떠오를 수도 있습니다.",
    "{firstSentence}를 말씀하신 부분이 특히 선명하게 남을 수 있습니다. 그때의 어조나 속도가 기억과 함께 남을 수도 있습니다.",
    "전체 길이가 길수록, 청중은 자신에게 와닿은 한 구절을 골라 가져갈 수 있습니다. 그 한 조각이 오늘의 설교 전체를 대표하는 빛처럼 느껴질 수도 있습니다.",
    "설교 속에서 한 순간이 유독 밝게 남을 수 있습니다. {last} 부근이 그런 자리였을 수도 있고, 다른 구절이었을 수도 있습니다.",
  ];

  const gentleTemplates = [
    "원하신다면, 핵심 문장을 한 번 더 천천히 읽어 주시면, 같은 내용을 따라가는 데 도움이 될 수 있습니다. 이는 하나의 가능한 방향일 뿐, 꼭 하셔야 하는 일은 아닙니다.",
    "원하신다면, 예시와 적용 사이에 짧은 숨 고르기를 두시면, 흐름이 한층 부드럽게 느껴질 수 있습니다. 시도해 보실지 여부는 전적으로 편하신 대로이셔도 됩니다.",
    "원하신다면, ‘오늘 한 가지만 기억해 주셔도’처럼 범위를 좁혀 말씀해 보시는 것도 한 방법일 수 있습니다. 부담을 덜 느끼는 청중에게 조용히 닿을 수도 있습니다.",
    "원하신다면, 맺음에 한 문장만 덧붙여 ‘오늘의 한 가지’를 정리해 주시는 것도 생각해 보실 수 있습니다. 선택은 자유이시며, 지금의 말씀만으로도 충분할 수 있습니다.",
  ];

  const questionTemplates = [
    "만약 이번 설교를 다시 떠올려 보신다면, 청중이 가장 오래 품고 갈 질문은 무엇이었을까요?",
    "다음에 같은 주제로 나누신다면, 어떻게 하면 가장 먼저 안심시키고 싶은 한 가지를 전할 수 있을까요?",
    "설교를 준비하시며 스스로에게 가장 자주 되물으셨던 질문은 무엇이었나요? 그 질문이 오늘의 말씀 속에 어떻게 스며 있었는지도 떠올려 보실 수 있습니다.",
    "어떻게 하면 오늘의 한 가지가, 예배가 끝난 뒤에도 천천히 따라오게 할 수 있을까요? 한 문장만 떠올려 보셔도 괜찮습니다.",
  ];

  const vars = {
    intention,
    firstSentence,
    snippet: firstSentence,
    mid: midBit,
    last: lastBit,
    transitionCue: hasTransition ? "그러나/그래서 등의 연결" : "이야기의 전환",
  };

  const iTakeaway = pickIndex(seed, "takeaway", takeawayTemplates.length);
  const iEcho = pickIndex(seed, "echo", echoTemplates.length);
  const iStayed = pickIndex(seed, "stayed", stayedTemplates.length);
  const iAlive = pickIndex(seed, "alive", aliveTemplates.length);
  const iGentle = pickIndex(seed, "gentle", gentleTemplates.length);
  const iQ = pickIndex(seed, "question", questionTemplates.length);

  let needsHelpBody: string;
  if (hasTransition) {
    const ti = pickIndex(seed, "needsTransition", needsHelpTransition.length);
    needsHelpBody = fill(needsHelpTransition[ti], vars);
  } else if (hasQuestion) {
    const ni = pickIndex(seed, "needsQuestion", needsHelpWithQuestion.length);
    needsHelpBody = needsHelpWithQuestion[ni];
  } else {
    const ni = pickIndex(seed, "needsNoQuestion", needsHelpNoQuestion.length);
    needsHelpBody = needsHelpNoQuestion[ni];
  }

  const lengthNote =
    wordCount > 450
      ? " 말씀의 분량이 넉넉할수록, 청중은 자신에게 와닿은 한두 문장을 중심으로 기억할 수도 있습니다."
      : "";

  return {
    intendedTakeaway: fill(takeawayTemplates[iTakeaway], vars),
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
  version: 4,
  generateReflection,
});
