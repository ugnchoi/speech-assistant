import Link from "next/link";

import { LandingContent } from "@/components/onboarding";
import { Button } from "@/components/ui/button";

export const Landing = () => {
  return (
    <LandingContent
      primaryAction={
        <Button
          nativeButton={false}
          render={<Link href="/prototype?step=what-this-is" />}
          size="lg"
          className="w-full sm:w-auto"
          aria-label="성찰 시작하기"
        >
          성찰 시작하기
        </Button>
      }
      secondaryAction={
        <Link
          href="/prototype?step=sermon-input&sample=1"
          className="text-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:text-left"
          aria-label="예시 설교 선택 화면으로 이동"
        >
          예시 보기
        </Link>
      }
    />
  );
};
