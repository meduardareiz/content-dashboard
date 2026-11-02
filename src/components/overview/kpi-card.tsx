import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { KpiDelta } from "@/lib/types";
import { cn, formatCompact, formatNumber, formatPercent } from "@/lib/utils";

function formatValue(kpi: KpiDelta) {
  if (kpi.format === "compact") return formatCompact(kpi.value);
  if (kpi.format === "percent") return formatPercent(kpi.value, 2);
  return formatNumber(kpi.value);
}

export function KpiCard({ kpi }: { kpi: KpiDelta }) {
  const change = kpi.previous === 0 ? 0 : (kpi.value - kpi.previous) / kpi.previous;
  const up = change >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="min-w-0 gap-3 py-5">
      <div className="px-5 text-sm text-muted-foreground">{kpi.label}</div>
      <div className="px-5 text-2xl font-semibold sm:text-3xl tracking-tight tabular-nums">
        {formatValue(kpi)}
      </div>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 px-5 text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 font-medium tabular-nums",
            up ? "text-success" : "text-destructive"
          )}
        >
          <Icon className="size-3.5" aria-hidden />
          {up ? "+" : ""}
          {formatPercent(change)}
        </span>
        <span className="text-muted-foreground">vs. sem. anterior</span>
      </div>
    </Card>
  );
}
