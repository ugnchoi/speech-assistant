import type { ReflectionResult } from "@/types/reflection";

/** Phase 2 placeholder; Phase 3 will replace with real mock engine output. */
export const buildMockReflectionResult = (): ReflectionResult => ({
  intendedTakeaway: "일상의 신실함 속에서 하나님을 만나는 이야기가 마음에 남도록 전하고 싶었습니다.",
  echo:
    "청중 한 사람이 설교 후 가장 먼저 떠올릴 만한 장면이나 문장에 대한 짧은 인상입니다. (예시 텍스트)",
  stayed:
    "일상 속에서 다시 생각나거나 붙잡고 싶어질 수 있는 메시지로 느껴지는 부분입니다. (예시 텍스트)",
  needsHelp:
    "듣는 이가 따라가기 어렵게 느낄 수 있는 전환이나 밀도에 대한 부드러운 관찰입니다. (예시 텍스트)",
  alive: "진심이나 열정이 가장 잘 전해진다고 느껴지는 부분입니다. (예시 텍스트)",
  gentleSuggestion:
    "핵심 메시지를 한 문장으로 적어 보신 뒤, 설교 중 그 문장을 듣는 이가 가장 잘 받아들일 수 있는 순간이 어디일지 떠올려 보시면 도움이 될 수 있습니다.",
  nextReflectionQuestion: "이번 설교에서 청중이 가장 쉽게 잊어버릴 수 있는 부분은 어디였을까요?",
});
