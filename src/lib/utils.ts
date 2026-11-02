import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const compact = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** 128400 -> "128,4 mil" */
export function formatCompact(n: number) {
  return compact.format(n);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("pt-BR").format(n);
}

export function formatPercent(n: number, digits = 1) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n);
}

/** Datas só-dia (YYYY-MM-DD) são tratadas em UTC pra não "voltar" um dia. */
export function formatDay(isoDate: string, opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" }) {
  return new Intl.DateTimeFormat("pt-BR", { ...opts, timeZone: "UTC" })
    .format(new Date(`${isoDate}T00:00:00Z`))
    .replace(".", "");
}

/** Datetimes com fuso são exibidos no horário de Brasília. */
export function formatDateTime(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("pt-BR", { ...opts, timeZone: "America/Sao_Paulo" })
    .format(new Date(iso))
    .replace(".", "");
}
