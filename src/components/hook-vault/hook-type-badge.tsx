import { Badge } from "@/components/ui/badge";
import { hookTypes } from "@/lib/hooks";
import type { HookType } from "@/lib/types";

export function HookTypeBadge({ type }: { type: HookType }) {
  const { label, icon: Icon } = hookTypes[type];
  return (
    <Badge variant="outline" className="gap-1 font-medium">
      <Icon className="text-primary" aria-hidden />
      {label}
    </Badge>
  );
}
