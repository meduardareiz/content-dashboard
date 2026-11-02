import { PlatformBadge } from "@/components/platform-badge";
import type { SavedHook } from "@/lib/types";
import { formatCompact } from "@/lib/utils";

/** Destaca as [variáveis] do template em terracota. */
function Template({ value }: { value: string }) {
  const parts = value.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") ? (
          <span key={i} className="rounded bg-primary/10 px-1 text-primary">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function RecentHooks({ hooks }: { hooks: SavedHook[] }) {
  return (
    <ul className="space-y-3">
      {hooks.map((hook) => (
        <li key={hook.id} className="space-y-2 rounded-lg border bg-background/40 p-3">
          <p className="text-sm leading-relaxed">
            <Template value={hook.template} />
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <PlatformBadge platform={hook.platform} />
            <span>{hook.creator}</span>
            <span className="tabular-nums">· {formatCompact(hook.views)} views</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
