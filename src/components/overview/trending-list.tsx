import type { TrendingItem } from "@/lib/types";
import { cn, formatDateTime } from "@/lib/utils";

/** Score >= 70 é tratado como "alto potencial de hook" (ver CLAUDE.md). */
export const HIGH_HOOK_SCORE = 70;

export function TrendingList({ items }: { items: TrendingItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const high = item.hookScore >= HIGH_HOOK_SCORE;
        return (
          <li key={item.id} className="space-y-1.5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm leading-snug font-medium">{item.title}</p>
              <span
                className={cn(
                  "shrink-0 text-sm font-semibold tabular-nums",
                  high ? "text-primary" : "text-muted-foreground"
                )}
                aria-label={`Potencial de hook ${item.hookScore} de 100`}
              >
                {item.hookScore}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
              <div
                className={cn("h-full rounded-full", high ? "bg-primary" : "bg-muted-foreground/50")}
                style={{ width: `${item.hookScore}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {item.source} · {formatDateTime(item.publishedAt, { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
