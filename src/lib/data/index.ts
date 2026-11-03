/**
 * Camada de acesso a dados.
 *
 * Toda página/componente lê dados SOMENTE por aqui. Hoje as funções devolvem
 * mocks de src/data/mock; quando as fontes reais entrarem (Instagram Graph API,
 * scraper de concorrentes, feeds de notícia), só o corpo destas funções muda.
 * As assinaturas são async de propósito, pra não quebrar quem chama.
 */
import { dailyMetrics, MOCK_TODAY, reels } from "@/data/mock/analytics";
import { savedHooks } from "@/data/mock/hooks";
import { scheduledPosts } from "@/data/mock/schedule";
import { trendingItems } from "@/data/mock/trending";
import type { DailyMetric, KpiDelta, Reel } from "@/lib/types";

/** Regra de "heater": views >= 2x a mediana dos reels do período. */
export const HEATER_MULTIPLIER = 2;

function median(values: number[]) {
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function sum(rows: DailyMetric[], key: keyof Omit<DailyMetric, "date">) {
  return rows.reduce((acc, r) => acc + r[key], 0);
}

export async function getToday() {
  return MOCK_TODAY;
}

export async function getDailyMetrics(days = 14): Promise<DailyMetric[]> {
  return dailyMetrics.slice(-days);
}

/** KPIs da semana atual (últimos 7 dias) vs. os 7 dias anteriores. */
export async function getWeeklyKpis(): Promise<KpiDelta[]> {
  const current = dailyMetrics.slice(-7);
  const previous = dailyMetrics.slice(-14, -7);
  const saveRate = (rows: DailyMetric[]) => sum(rows, "saves") / sum(rows, "views");

  return [
    { label: "Views", value: sum(current, "views"), previous: sum(previous, "views"), format: "compact" },
    { label: "Saves", value: sum(current, "saves"), previous: sum(previous, "saves"), format: "number" },
    { label: "Follows", value: sum(current, "follows"), previous: sum(previous, "follows"), format: "number" },
    { label: "Taxa de save", value: saveRate(current), previous: saveRate(previous), format: "percent" },
  ];
}

export async function getReels(): Promise<Reel[]> {
  const threshold = median(reels.map((r) => r.views)) * HEATER_MULTIPLIER;
  return reels
    .map((r) => ({ ...r, isHeater: r.views >= threshold }))
    .sort((a, b) => b.views - a.views);
}

export async function getWeeklyHeaters(limit = 3): Promise<Reel[]> {
  const all = await getReels();
  return all.filter((r) => r.isHeater).slice(0, limit);
}

export async function getRecentHooks(limit = 3) {
  return [...savedHooks]
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
    .slice(0, limit);
}

export async function getHookVaultCount() {
  return savedHooks.length;
}

/** Todos os hooks do Vault, mais recentes primeiro. Filtro e busca rodam no cliente. */
export async function getAllHooks() {
  return [...savedHooks].sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function getHookById(id: string) {
  return savedHooks.find((h) => h.id === id) ?? null;
}

export async function getUpcomingPosts(limit = 4) {
  return [...scheduledPosts]
    .sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor))
    .slice(0, limit);
}

export async function getTrending(limit = 4) {
  return [...trendingItems]
    .sort((a, b) => b.hookScore - a.hookScore)
    .slice(0, limit);
}

/** Mediana de views dos reels do período: base do multiplicador dos heaters. */
export async function getReelViewsMedian() {
  return median(reels.map((r) => r.views));
}
