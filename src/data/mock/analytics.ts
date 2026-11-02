import type { DailyMetric, Reel } from "@/lib/types";

/** Data "hoje" fixa nos mocks, pra render estático e estável. */
export const MOCK_TODAY = "2026-11-02";

/** 14 dias: 20/10 a 02/11. Os últimos 7 são a "semana atual". */
export const dailyMetrics: DailyMetric[] = [
  { date: "2026-10-20", views: 18400, saves: 412, follows: 96 },
  { date: "2026-10-21", views: 21900, saves: 530, follows: 121 },
  { date: "2026-10-22", views: 16200, saves: 377, follows: 84 },
  { date: "2026-10-23", views: 24800, saves: 611, follows: 142 },
  { date: "2026-10-24", views: 19700, saves: 455, follows: 103 },
  { date: "2026-10-25", views: 14100, saves: 298, follows: 71 },
  { date: "2026-10-26", views: 15600, saves: 340, follows: 77 },
  { date: "2026-10-27", views: 22300, saves: 566, follows: 133 },
  { date: "2026-10-28", views: 41200, saves: 1284, follows: 318 },
  { date: "2026-10-29", views: 27500, saves: 702, follows: 164 },
  { date: "2026-10-30", views: 23100, saves: 590, follows: 139 },
  { date: "2026-10-31", views: 58900, saves: 2011, follows: 472 },
  { date: "2026-11-01", views: 31700, saves: 845, follows: 201 },
  { date: "2026-11-02", views: 19800, saves: 488, follows: 112 },
];

/** Reels publicados nos últimos 14 dias. isHeater é calculado na camada de dados. */
export const reels: Omit<Reel, "isHeater">[] = [
  { id: "r1", hook: "O prompt que substituiu meu estagiário (e ele agradeceu)", postedAt: "2026-10-31", views: 212400, saves: 9810, follows: 1460 },
  { id: "r2", hook: "Pare de usar o ChatGPT assim no trabalho", postedAt: "2026-10-28", views: 148900, saves: 6120, follows: 980 },
  { id: "r3", hook: "3 automações que eu rodaria se começasse do zero hoje", postedAt: "2026-11-01", views: 96300, saves: 4470, follows: 612 },
  { id: "r4", hook: "Testei 5 agentes de IA por uma semana. Só 1 presta", postedAt: "2026-10-29", views: 41800, saves: 1320, follows: 214 },
  { id: "r5", hook: "Como eu monto um roteiro de reel em 4 minutos", postedAt: "2026-10-27", views: 38600, saves: 1580, follows: 188 },
  { id: "r6", hook: "A planilha que todo freelancer devia ter", postedAt: "2026-10-30", views: 33100, saves: 1890, follows: 141 },
  { id: "r7", hook: "Ninguém te conta isso sobre vender pelo direct", postedAt: "2026-10-24", views: 36900, saves: 980, follows: 162 },
  { id: "r8", hook: "O erro que derrubou meu alcance em outubro", postedAt: "2026-10-22", views: 29400, saves: 640, follows: 97 },
  { id: "r9", hook: "Minha rotina de conteúdo de segunda-feira", postedAt: "2026-11-02", views: 18200, saves: 410, follows: 66 },
];
