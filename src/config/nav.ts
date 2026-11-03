import {
  CalendarDays,
  ChartColumn,
  Flame,
  FilePen,
  FishingHook,
  LayoutDashboard,
  Send,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const overviewNav: NavItem = {
  title: "Overview",
  href: "/",
  icon: LayoutDashboard,
  description: "Resumo da semana",
};

/** As 6 páginas do produto, na ordem da sidebar. */
export const mainNav: NavItem[] = [
  {
    title: "Hook Vault",
    href: "/hook-vault",
    icon: FishingHook,
    description: "Hooks virais salvos, transcritos e templatizados",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartColumn,
    description: "Views, saves, follows e os heaters da semana",
  },
  {
    title: "Concorrentes",
    href: "/concorrentes",
    icon: Users,
    description: "Top reels dos criadores monitorados, raspados toda semana",
  },
  {
    title: "Agendador",
    href: "/agendador",
    icon: Send,
    description: "Agendamento multiplataforma com legenda auto-gerada",
  },
  {
    title: "Calendário",
    href: "/calendario",
    icon: CalendarDays,
    description: "Auto-preenchido pelo /script com hooks e ângulos",
  },
  {
    title: "Em Alta",
    href: "/em-alta",
    icon: Flame,
    description: "Notícias de IA de 12 fontes, com score de potencial de hook",
  },
];

/** Ferramentas fora das 6 páginas principais. */
export const toolsNav: NavItem[] = [
  {
    title: "Script",
    href: "/script",
    icon: FilePen,
    description: "Rascunhos de roteiro a partir dos hooks",
  },
];
