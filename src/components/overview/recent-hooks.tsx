import { HookTemplate } from "@/components/hook-vault/hook-template";
import { HookTypeBadge } from "@/components/hook-vault/hook-type-badge";
import type { SavedHook } from "@/lib/types";
import { formatCompact } from "@/lib/utils";

export function RecentHooks({ hooks }: { hooks: SavedHook[] }) {
  return (
    <ul className="space-y-3">
      {hooks.map((hook) => (
        <li key={hook.id} className="space-y-2 rounded-lg border bg-background/40 p-3">
          <HookTemplate value={hook.template} className="block text-sm leading-relaxed" />
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <HookTypeBadge type={hook.type} />
            <span>{hook.creator}</span>
            <span className="tabular-nums">· {formatCompact(hook.views)} views</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
