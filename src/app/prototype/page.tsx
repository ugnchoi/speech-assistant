import Link from "next/link";

import { OnboardingRoot } from "@/components/onboarding";
import { TextField } from "@/components/forms";
import { ReflectionList } from "@/components/reflection";
import { reflectionFixtures } from "@/lib/fixtures";
import { createMockEngine } from "@/lib/mock-engine";
import { storageKey } from "@/lib/storage";
import { VARIANTS, type VariantId } from "@/lib/variants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const activeVariant: VariantId = VARIANTS[0];

export default function PrototypePage() {
  const { version: engineVersion } = createMockEngine();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Mock engine v{engineVersion} · storage prefix sample:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              {storageKey("demo")}
            </code>
            · variant:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              {activeVariant}
            </code>
          </p>
          <Link href="/" className={cn(buttonVariants())}>
            Home
          </Link>
        </div>
        <OnboardingRoot />
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Forms</h2>
          <TextField type="text" placeholder="Sample field" aria-label="Sample" />
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Reflection</h2>
          <ReflectionList entries={reflectionFixtures} />
          <p className="text-sm text-muted-foreground">
            No fixtures yet — add entries in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              lib/fixtures.ts
            </code>
            .
          </p>
        </section>
    </main>
  );
}
