import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { HeatersList } from "@/components/overview/heaters-list";
import { KpiCard } from "@/components/overview/kpi-card";
import { RecentHooks } from "@/components/overview/recent-hooks";
import { SectionCard } from "@/components/overview/section-card";
import { TrendingList } from "@/components/overview/trending-list";
import { UpcomingPosts } from "@/components/overview/upcoming-posts";
import { ViewsChart } from "@/components/overview/views-chart";
import { siteConfig } from "@/config/site";
import {
  getDailyMetrics,
  getHookVaultCount,
  getRecentHooks,
  getReelViewsMedian,
  getToday,
  getTrending,
  getUpcomingPosts,
  getWeeklyHeaters,
  getWeeklyKpis,
} from "@/lib/data";
import { formatDay } from "@/lib/utils";

export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage() {
  const [today, kpis, daily, heaters, median, posts, trending, hooks, hookCount] =
    await Promise.all([
      getToday(),
      getWeeklyKpis(),
      getDailyMetrics(14),
      getWeeklyHeaters(3),
      getReelViewsMedian(),
      getUpcomingPosts(4),
      getTrending(4),
      getRecentHooks(3),
      getHookVaultCount(),
    ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description={`Semana de ${siteConfig.handle} até ${formatDay(today, { day: "2-digit", month: "long" })}`}
      />

      <section aria-label="Indicadores da semana" className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <SectionCard
          title="Views por dia"
          description="Instagram, últimos 14 dias"
          href="/analytics"
          className="xl:col-span-3"
        >
          <ViewsChart data={daily} />
        </SectionCard>

        <SectionCard
          title="Heaters da semana"
          description="Reels com views ≥ 2× a mediana"
          href="/analytics"
          className="xl:col-span-2"
        >
          <HeatersList reels={heaters} median={median} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <SectionCard title="Próximos posts" description="Do Agendador" href="/agendador">
          <UpcomingPosts posts={posts} />
        </SectionCard>

        <SectionCard title="Em alta" description="Ordenado por potencial de hook" href="/em-alta">
          <TrendingList items={trending} />
        </SectionCard>

        <SectionCard
          title="Hooks salvos recentes"
          description={`${hookCount} no Hook Vault`}
          href="/hook-vault"
          className="lg:col-span-2 xl:col-span-1"
        >
          <RecentHooks hooks={hooks} />
        </SectionCard>
      </div>
    </div>
  );
}
