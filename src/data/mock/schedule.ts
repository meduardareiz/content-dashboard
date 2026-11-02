import type { ScheduledPost } from "@/lib/types";

export const scheduledPosts: ScheduledPost[] = [
  { id: "p1", title: "Os 4 prompts que eu uso toda segunda", platforms: ["instagram", "tiktok"], scheduledFor: "2026-11-03T12:00:00-03:00", status: "agendado" },
  { id: "p2", title: "Reagindo ao novo modelo que saiu essa semana", platforms: ["instagram", "youtube", "tiktok"], scheduledFor: "2026-11-04T18:30:00-03:00", status: "agendado" },
  { id: "p3", title: "Carrossel: o funil que eu usaria com R$ 0", platforms: ["instagram", "linkedin"], scheduledFor: "2026-11-05T09:00:00-03:00", status: "rascunho" },
  { id: "p4", title: "Bastidores: como eu gravo 10 reels num dia", platforms: ["instagram"], scheduledFor: "2026-11-06T19:00:00-03:00", status: "agendado" },
];
