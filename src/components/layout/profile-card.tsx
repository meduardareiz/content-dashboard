import { profileInitials, profileLabel, siteConfig } from "@/config/site";

export function ProfileCard() {
  const subtitle = siteConfig.handle
    ? siteConfig.displayName
    : "Dashboard de conteúdo";

  return (
    <div className="flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
      >
        {profileInitials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">
          {profileLabel}
        </p>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
