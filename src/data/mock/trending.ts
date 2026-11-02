import type { TrendingItem } from "@/lib/types";

/** Manchetes fictícias. Quando as 12 fontes reais forem ligadas, isso sai daqui. */
export const trendingItems: TrendingItem[] = [
  { id: "t1", title: "Laboratório lança modelo que roda offline no celular", source: "Fonte A", publishedAt: "2026-11-02T08:10:00-03:00", hookScore: 92, angle: "\"Seu celular agora tem um assistente que não precisa de internet\"" },
  { id: "t2", title: "Estudo mede quanto tempo equipes economizam com agentes", source: "Fonte B", publishedAt: "2026-11-02T06:45:00-03:00", hookScore: 81, angle: "Números do estudo aplicados à rotina de um freelancer" },
  { id: "t3", title: "Plataforma de vídeo libera edição por comando de voz", source: "Fonte C", publishedAt: "2026-11-01T21:20:00-03:00", hookScore: 74, angle: "Testar ao vivo e mostrar antes/depois" },
  { id: "t4", title: "Nova regulação europeia entra em fase de consulta", source: "Fonte D", publishedAt: "2026-11-01T17:00:00-03:00", hookScore: 38, angle: "Pouco apelo pro público atual" },
];
