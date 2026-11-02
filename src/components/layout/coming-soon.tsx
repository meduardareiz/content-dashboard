import { mainNav } from "@/config/nav";
import { PageHeader } from "@/components/layout/page-header";

/** Placeholder das páginas ainda não construídas. Some quando a página real entrar. */
export function ComingSoon({ href }: { href: string }) {
  const item = mainNav.find((i) => i.href === href);
  if (!item) return null;
  const Icon = item.icon;

  return (
    <div className="space-y-6">
      <PageHeader title={item.title} description={item.description} />
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-dashed text-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-medium">Página em construção</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Layout e navegação já estão prontos. O conteúdo desta página entra na próxima etapa.
        </p>
      </div>
    </div>
  );
}
