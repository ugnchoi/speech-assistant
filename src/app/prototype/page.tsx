import Link from "next/link";

const flowLinks = [
  { href: "/prototype/what-this-is", label: "2 · 이 성찰이 하는 일" },
  { href: "/prototype/intention", label: "3 · 듣기 전에 (의도)" },
  { href: "/prototype/sermon-input", label: "4 · 설교 공유" },
  { href: "/prototype/processing", label: "5 · 준비 중" },
  { href: "/prototype/reflection", label: "6 · 성찰 결과" },
  { href: "/prototype/calibration", label: "7 · 보정" },
  { href: "/prototype/next-step", label: "8 · 다음 단계" },
  { href: "/prototype/suggestion", label: "9A · 제안" },
  { href: "/prototype/reflection-question", label: "9B · 질문" },
  { href: "/prototype/closing", label: "10 · 마무리" },
] as const;

export default function PrototypePage() {
  return (
    <div className="screen-fade-in space-y-10">
      <div className="space-y-4">
        <h1 className="text-screen-title text-foreground">프로토타입 흐름</h1>
        <p className="text-body text-muted-foreground">
          Phase 1에서는 각 화면을 URL로 바로 열어 볼 수 있습니다. 아래에서 단계를 선택하거나{" "}
          <Link
            href="/prototype/what-this-is"
            className="font-medium text-foreground underline-offset-4 hover:underline"
            aria-label="흐름의 첫 화면으로 이동"
          >
            처음부터 시작
          </Link>
          하세요.
        </p>
      </div>

      <nav className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8" aria-label="프로토타입 화면 목록">
        <ul className="space-y-2">
          {flowLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2 text-body text-foreground outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50"
                aria-label={`${item.label} 화면으로 이동`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
