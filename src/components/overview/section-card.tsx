import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Card padrão da Overview: título, descrição e link "Ver tudo" pra página dona do dado. */
export function SectionCard({
  title,
  description,
  href,
  className,
  children,
}: {
  title: string;
  description?: string;
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {href && (
          <CardAction>
            <Link
              href={href}
              className="inline-flex items-center gap-0.5 rounded-sm text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Ver tudo
              <ChevronRight className="size-3.5" aria-hidden />
            </Link>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
    </Card>
  );
}
