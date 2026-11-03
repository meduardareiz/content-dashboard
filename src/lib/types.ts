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

export type HookType =
  | "noticia"
  | "proibicao"
  | "lista"
  | "confissao"
  | "curiosidade"
  | "contraintuitivo"
  | "tutorial"
  | "comparacao";

export type Niche =
  | "IA"
  | "Marketing"
  | "Finanças"
  | "Produtividade"
  | "Negócios"
  | "Carreira"
  | "Fitness";

export type SavedHook = {
  id: string;
  /** Transcrição literal do hook */
  text: string;
  /** Versão templatizada, com [VARIÁVEIS] entre colchetes */
  template: string;
  type: HookType;
  niche: Niche;
  creator: string;
  platform: Platform;
  views: number;
  /** ISO date (YYYY-MM-DD) */
  savedAt: string;
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
