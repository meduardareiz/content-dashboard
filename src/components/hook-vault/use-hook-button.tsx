import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** "Usar este": abre /script com um rascunho novo baseado no hook. */
export function UseHookButton({ hookId, className }: { hookId: string; className?: string }) {
  return (
    <Button asChild size="sm" variant="outline" className={cn("hover:border-primary/50 hover:text-primary", className)}>
      <Link href={`/script?hook=${hookId}`} prefetch={false}>
        Usar este
        <ArrowRight aria-hidden />
      </Link>
    </Button>
  );
}
