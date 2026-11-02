export type Platform = "instagram" | "tiktok" | "youtube" | "linkedin" | "x";

export type DailyMetric = {
  /** ISO date (YYYY-MM-DD) */
  date: string;
  views: number;
  saves: number;
  follows: number;
};

export type Reel = {
  id: string;
  hook: string;
  postedAt: string;
  views: number;
  saves: number;
  follows: number;
  /** true quando views >= 2x a mediana dos reels do período (ver CLAUDE.md) */
  isHeater: boolean;
};

export type SavedHook = {
  id: string;
  /** Transcrição literal do hook */
  text: string;
  /** Versão templatizada, com [variáveis] entre colchetes */
  template: string;
  creator: string;
  platform: Platform;
  views: number;
  savedAt: string;
  tags: string[];
};

export type ScheduledPost = {
  id: string;
  title: string;
  platforms: Platform[];
  /** ISO datetime */
  scheduledFor: string;
  status: "agendado" | "rascunho";
};

export type TrendingItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  /** 0 a 100 */
  hookScore: number;
  angle: string;
};

export type KpiDelta = {
  label: string;
  value: number;
  previous: number;
  format: "compact" | "number" | "percent";
};
