"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav, overviewNav, type NavItem } from "@/config/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent text-sidebar-accent-foreground"
      )}
    >
      {active && (
        <span
          aria-hidden
          className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-sidebar-primary"
        />
      )}
      <Icon
        className={cn(
          "size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-sidebar-accent-foreground",
          active && "text-sidebar-primary group-hover:text-sidebar-primary"
        )}
      />
      {item.title}
    </Link>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Navegação principal" className="flex flex-col gap-1">
      <NavLink item={overviewNav} onNavigate={onNavigate} />
      <p className="mt-5 mb-1 px-3 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        Conteúdo
      </p>
      {mainNav.map((item) => (
        <NavLink key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}
