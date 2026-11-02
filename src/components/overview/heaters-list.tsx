import { Flame } from "lucide-react";

import type { Reel } from "@/lib/types";
import { formatCompact, formatDay, formatNumber } from "@/lib/utils";

export function HeatersList({ reels, median }: { reels: Reel[]; median: number }) {
  if (reels.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum heater nesta semana.</p>;
  }

  return (
    <ol className="space-y-3">
      {reels.map((reel, i) => (
        <li key={reel.id} className="flex gap-3 rounded-lg border bg-background/40 p-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary tabular-nums">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-sm leading-snug font-medium">{reel.hook}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground tabular-nums">
              <span className="inline-flex items-center gap-1 font-medium text-primary">
                <Flame className="size-3.5" aria-hidden />
                {(reel.views / median).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}× a mediana
              </span>
              <span>{formatCompact(reel.views)} views</span>
              <span>{formatNumber(reel.saves)} saves</span>
              <span>+{formatNumber(reel.follows)} follows</span>
              <span>{formatDay(reel.postedAt)}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
