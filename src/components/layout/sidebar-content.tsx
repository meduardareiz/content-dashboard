import { siteConfig } from "@/config/site";
import { ProfileCard } from "@/components/layout/profile-card";
import { SidebarNav } from "@/components/layout/sidebar-nav";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <ProfileCard />
      <div className="flex-1 overflow-y-auto">
        <SidebarNav onNavigate={onNavigate} />
      </div>
      <div className="rounded-md border border-dashed border-sidebar-border px-3 py-2 text-xs text-muted-foreground">
        <span className="font-medium text-sidebar-foreground">{siteConfig.name}</span>
        {" · "}dados mockados
      </div>
    </div>
  );
}
