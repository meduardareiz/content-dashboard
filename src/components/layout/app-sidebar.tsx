import { SidebarContent } from "@/components/layout/sidebar-content";

/** Sidebar fixa, visível a partir de lg. No mobile, ver MobileHeader. */
export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
      <SidebarContent />
    </aside>
  );
}
