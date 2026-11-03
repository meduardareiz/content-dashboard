import {
  Ban,
  Eye,
  ListOrdered,
  MessageCircle,
  Newspaper,
  Scale,
  Shuffle,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { HookType, Niche } from "@/lib/types";

export const hookTypes: Record<HookType, { label: string; icon: LucideIcon; example: string }> = {
  noticia: { label: "Notícia", icon: Newspaper, example: "[X] acabou de matar [Y]" },
  proibicao: { label: "Proibição", icon: Ban, example: "Para de fazer [X]" },
  lista: { label: "Lista", icon: ListOrdered, example: "[NUMERO] coisas que eu queria saber" },
  confissao: { label: "Confissão", icon: MessageCircle, example: "Eu perdi [X] por causa de [Y]" },
  curiosidade: { label: "Curiosidade", icon: Eye, example: "Ninguém fala sobre [X]" },
  contraintuitivo: { label: "Contraintuitivo", icon: Shuffle, example: "[CRENÇA] está errado" },
  tutorial: { label: "Tutorial", icon: Wrench, example: "Como [RESULTADO] em [PRAZO]" },
  comparacao: { label: "Comparação", icon: Scale, example: "[A] vs. [B]: qual vale mais" },
};

export const hookTypeOrder = Object.keys(hookTypes) as HookType[];

export const niches: Niche[] = [
  "IA",
  "Marketing",
  "Finanças",
  "Produtividade",
  "Negócios",
  "Carreira",
  "Fitness",
];

/** Faixas do filtro de views (mínimo). */
export const viewRanges = [
  { value: "0", label: "Todas as views", min: 0 },
  { value: "100000", label: "100 mil+", min: 100_000 },
  { value: "500000", label: "500 mil+", min: 500_000 },
  { value: "1000000", label: "1 mi+", min: 1_000_000 },
  { value: "5000000", label: "5 mi+", min: 5_000_000 },
] as const;

/** Variáveis do template, na ordem em que aparecem, sem repetir. "[X] e [X]" -> ["X"] */
export function templateVariables(template: string): string[] {
  const found = template.match(/\[([^\]]+)\]/g) ?? [];
  return [...new Set(found.map((v) => v.slice(1, -1)))];
}

/** Troca cada [VAR] pelo valor preenchido; variáveis vazias continuam como [VAR]. */
export function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\[([^\]]+)\]/g, (match, name: string) =>
    values[name]?.trim() ? values[name].trim() : match
  );
}

/**
 * Comando pra colar no Claude Code. O formato do argumento do /script é uma
 * suposição (hook entre aspas): ajuste aqui se o comando esperar outra coisa.
 */
export function buildScriptCommand(filledHook: string) {
  return `/script "${filledHook.replace(/"/g, '\\"')}"`;
}
