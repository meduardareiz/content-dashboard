"use client";

import { useState } from "react";

import type { DailyMetric } from "@/lib/types";
import { cn, formatCompact, formatDay, formatNumber } from "@/lib/utils";

/**
 * Barras de views por dia. Série única (terracota); a semana anterior
 * aparece mais apagada só pra separar os dois períodos no tempo.
 * Hover/foco em cada barra mostra o tooltip com views, saves e follows.
 */
export function ViewsChart({ data }: { data: DailyMetric[] }) {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.views));
  const step = max > 40000 ? 20000 : 10000;
  const top = Math.ceil(max / step) * step;
  const ticks = Array.from({ length: top / step + 1 }, (_, i) => i * step).reverse();
  const splitAt = data.length - 7;
  const hovered = active !== null ? data[active] : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-1/40" />
          Semana anterior
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-1" />
          Semana atual
        </span>
      </div>

      <div className="relative flex h-56 gap-3 xl:h-72">
        {/* Eixo Y: cada rótulo centrado na sua linha de grid */}
        <div className="relative w-9 pb-6 text-[11px] text-muted-foreground tabular-nums">
          <div className="relative h-full">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute right-0 -translate-y-1/2"
                style={{ top: `${(1 - t / top) * 100}%` }}
              >
                {t === 0 ? "0" : formatCompact(t)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          {/* Grid recessivo */}
          <div aria-hidden className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
            {ticks.map((t) => (
              <div key={t} className="h-px bg-chart-grid" />
            ))}
          </div>

          <div
            className="absolute inset-x-0 top-0 bottom-6 flex items-end gap-[2px]"
            onMouseLeave={() => setActive(null)}
          >
            {data.map((d, i) => (
              <button
                key={d.date}
                type="button"
                className="group relative flex h-full flex-1 items-end justify-center outline-none"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${formatDay(d.date, { day: "2-digit", month: "long" })}: ${formatNumber(d.views)} views`}
              >
                <span
                  className={cn(
                    "w-full max-w-7 rounded-t-[4px] transition-opacity",
                    i < splitAt ? "bg-chart-1/40" : "bg-chart-1",
                    active !== null && active !== i && "opacity-50",
                    "group-focus-visible:ring-2 group-focus-visible:ring-ring"
                  )}
                  style={{ height: `${(d.views / top) * 100}%` }}
                />
              </button>
            ))}
          </div>

          {/* Eixo X */}
          <div className="absolute inset-x-0 bottom-0 flex h-5 gap-[2px] text-[11px] text-muted-foreground">
            {data.map((d, i) => (
              <span key={d.date} className="flex-1 text-center tabular-nums">
                {i % 2 === data.length % 2 ? formatDay(d.date, { day: "2-digit" }) : ""}
              </span>
            ))}
          </div>

          {hovered && active !== null && (
            <div
              role="status"
              className={cn(
                "pointer-events-none absolute top-0 z-10 w-40 rounded-md border bg-popover px-3 py-2 text-xs shadow-lg",
                // Fica ao lado da barra (nunca por cima): à direita na 1ª metade, à esquerda na 2ª
                active >= data.length / 2 && "-translate-x-full"
              )}
              style={{
                left:
                  active >= data.length / 2
                    ? `calc(${(active / data.length) * 100}% - 6px)`
                    : `calc(${((active + 1) / data.length) * 100}% + 6px)`,
              }}
            >
              <p className="mb-1.5 font-medium text-popover-foreground">
                {formatDay(hovered.date, { weekday: "short", day: "2-digit", month: "short" })}
              </p>
              <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 tabular-nums">
                <dt className="text-muted-foreground">Views</dt>
                <dd className="text-right font-medium">{formatNumber(hovered.views)}</dd>
                <dt className="text-muted-foreground">Saves</dt>
                <dd className="text-right">{formatNumber(hovered.saves)}</dd>
                <dt className="text-muted-foreground">Follows</dt>
                <dd className="text-right">{formatNumber(hovered.follows)}</dd>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
