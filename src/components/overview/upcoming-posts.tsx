import { PlatformBadge } from "@/components/platform-badge";
import { Badge } from "@/components/ui/badge";
import type { ScheduledPost } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export function UpcomingPosts({ posts }: { posts: ScheduledPost[] }) {
  return (
    <ul className="divide-y">
      {posts.map((post) => (
        <li key={post.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
          <div className="w-12 shrink-0 text-center">
            <p className="text-[11px] text-muted-foreground uppercase">
              {formatDateTime(post.scheduledFor, { weekday: "short" })}
            </p>
            <p className="text-lg leading-tight font-semibold tabular-nums">
              {formatDateTime(post.scheduledFor, { day: "2-digit" })}
            </p>
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="truncate text-sm font-medium">{post.title}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-muted-foreground tabular-nums">
                {formatDateTime(post.scheduledFor, { hour: "2-digit", minute: "2-digit" })}
              </span>
              {post.platforms.map((p) => (
                <PlatformBadge key={p} platform={p} />
              ))}
              {post.status === "rascunho" && (
                <Badge variant="secondary" className="text-[10px]">Rascunho</Badge>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
