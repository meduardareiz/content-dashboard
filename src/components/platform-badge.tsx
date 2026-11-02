import { Badge } from "@/components/ui/badge";
import type { Platform } from "@/lib/types";

/** lucide-react não tem mais ícones de marca, então plataforma vira sigla em badge. */
const labels: Record<Platform, string> = {
  instagram: "IG",
  tiktok: "TikTok",
  youtube: "YT",
  linkedin: "LinkedIn",
  x: "X",
};

export function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <Badge variant="outline" className="px-1.5 text-[10px] font-medium text-muted-foreground">
      {labels[platform]}
    </Badge>
  );
}
