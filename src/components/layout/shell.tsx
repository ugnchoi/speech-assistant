import Link from "next/link";
import type { ReactNode } from "react";

type ShellProps = {
  children: ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-base font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
            aria-label="홈으로 이동"
          >
            설교의 메아리
          </Link>
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
            <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              Prototype
            </span>
            <Link
              href="/prototype?step=what-this-is"
              className="hidden text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:inline"
              aria-label="이 도구가 하는 일 설명 보기"
            >
              How it works
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
          {children}
        </div>
      </main>

      <footer className="mt-auto border-t border-border/40 bg-background">
        <p className="mx-auto max-w-2xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
          개인 프로토타입 · 점수 없음 · 수정 없음
        </p>
      </footer>
    </div>
  );
};
