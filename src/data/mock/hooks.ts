import type { SavedHook } from "@/lib/types";

export const savedHooks: SavedHook[] = [
  {
    id: "h1",
    text: "Eu perdi 40 mil seguidores por causa de um único post. Deixa eu te mostrar qual.",
    template: "Eu perdi [número] [métrica] por causa de [um único erro]. Deixa eu te mostrar qual.",
    creator: "@criador.exemplo1",
    platform: "instagram",
    views: 1840000,
    savedAt: "2026-11-01",
    tags: ["confissão", "curiosidade"],
  },
  {
    id: "h2",
    text: "Se você usa IA só pra escrever e-mail, você está usando 5% dela.",
    template: "Se você usa [ferramenta] só pra [uso básico], você está usando [x]% dela.",
    creator: "@criador.exemplo2",
    platform: "tiktok",
    views: 920000,
    savedAt: "2026-10-31",
    tags: ["provocação", "IA"],
  },
  {
    id: "h3",
    text: "Esse é o print mais caro que eu já tirei.",
    template: "Esse é o [objeto] mais [adjetivo] que eu já [ação].",
    creator: "@criador.exemplo3",
    platform: "instagram",
    views: 640000,
    savedAt: "2026-10-30",
    tags: ["curiosidade"],
  },
];
