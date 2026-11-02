import { siteConfig } from "@/config/site";

export function ProfileCard() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
      >
        {siteConfig.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">
          {siteConfig.handle}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {siteConfig.displayName}
        </p>
      </div>
    </div>
  );
}
