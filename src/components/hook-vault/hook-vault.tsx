"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { LayoutGrid, Search, Table2, X } from "lucide-react";

import { HookTemplate } from "@/components/hook-vault/hook-template";
import { HookTypeBadge } from "@/components/hook-vault/hook-type-badge";
import { UseHookButton } from "@/components/hook-vault/use-hook-button";
import { PlatformBadge } from "@/components/platform-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { hookTypeOrder, hookTypes, niches, viewRanges } from "@/lib/hooks";
import type { SavedHook } from "@/lib/types";
import { cn, formatCompact, formatDay, formatNumber } from "@/lib/utils";

const ALL = "todos";
type SortKey = "views" | "recentes";
type ViewMode = "tabela" | "cards";

/** Remove acentos e caixa pra busca ("financas" encontra "Finanças"). */
function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function HookVault({ hooks }: { hooks: SavedHook[] }) {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [minViews, setMinViews] = useState("0");
  const [sort, setSort] = useState<SortKey>("views");
  const [mode, setMode] = useState<ViewMode>("tabela");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = normalize(deferredQuery.trim());
    const min = Number(minViews);
    return hooks
      .filter((h) => niche === ALL || h.niche === niche)
      .filter((h) => type === ALL || h.type === type)
      .filter((h) => h.views >= min)
      .filter(
        (h) =>
          !q ||
          normalize(`${h.text} ${h.template} ${h.creator} ${h.niche} ${hookTypes[h.type].label}`).includes(q)
      )
      .sort((a, b) =>
        sort === "views" ? b.views - a.views : b.savedAt.localeCompare(a.savedAt)
      );
  }, [hooks, deferredQuery, niche, type, minViews, sort]);

  const hasFilters = query !== "" || niche !== ALL || type !== ALL || minViews !== "0";

  function clearFilters() {
    setQuery("");
    setNiche(ALL);
    setType(ALL);
    setMinViews("0");
  }

  return (
    <div className="space-y-4">
      {/* Filtros: uma linha acima dos resultados */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar no hook, template ou criador"
            aria-label="Buscar hooks"
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger aria-label="Filtrar por nicho" className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Todos os nichos</SelectItem>
              {niches.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger aria-label="Filtrar por tipo de hook" className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Todos os tipos</SelectItem>
              {hookTypeOrder.map((t) => {
                const Icon = hookTypes[t].icon;
                return (
                  <SelectItem key={t} value={t}>
                    <Icon className="text-primary" aria-hidden />
                    {hookTypes[t].label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select value={minViews} onValueChange={setMinViews}>
            <SelectTrigger aria-label="Filtrar por número de views" className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {viewRanges.map((r) => (
                <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger aria-label="Ordenar" className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">Mais views</SelectItem>
              <SelectItem value="recentes">Salvos recentemente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span aria-live="polite">
            <span className="font-medium text-foreground tabular-nums">{filtered.length}</span>{" "}
            de {hooks.length} hooks
          </span>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2">
              <X aria-hidden />
              Limpar filtros
            </Button>
          )}
        </div>

        {/* Alternância tabela/cards: só faz sentido a partir de md; no mobile é sempre card */}
        <div role="group" aria-label="Modo de visualização" className="hidden rounded-md border p-0.5 md:flex">
          {(
            [
              { value: "tabela", label: "Tabela", icon: Table2 },
              { value: "cards", label: "Cards", icon: LayoutGrid },
            ] as const
          ).map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant="ghost"
              size="sm"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={cn("h-7 px-2.5", mode === value && "bg-accent text-accent-foreground")}
            >
              <Icon aria-hidden />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-center">
          <p className="text-sm font-medium">Nenhum hook com esses filtros</p>
          <Button variant="link" size="sm" onClick={clearFilters}>Limpar filtros</Button>
        </div>
      ) : (
        <>
          {mode === "tabela" && (
            <div className="hidden rounded-xl border bg-card md:block">
              <HookTable hooks={filtered} />
            </div>
          )}
          <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3", mode === "tabela" && "md:hidden")}>
            {filtered.map((hook) => (
              <HookCard key={hook.id} hook={hook} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function HookTable({ hooks }: { hooks: SavedHook[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-4">Hook</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Criador original</TableHead>
          <TableHead className="text-right">Views</TableHead>
          <TableHead className="pr-4"><span className="sr-only">Ações</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hooks.map((hook) => (
          <TableRow key={hook.id}>
            <TableCell className="max-w-md min-w-72 pl-4 whitespace-normal">
              <HookTemplate value={hook.template} className="text-sm leading-relaxed" />
              <p className="mt-1 text-xs text-muted-foreground">“{hook.text}”</p>
            </TableCell>
            <TableCell>
              <div className="flex flex-col items-start gap-1.5">
                <HookTypeBadge type={hook.type} />
                <span className="text-xs text-muted-foreground">{hook.niche}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col items-start gap-1.5">
                <span className="text-sm">{hook.creator}</span>
                <PlatformBadge platform={hook.platform} />
              </div>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              <span className="text-sm font-medium" title={`${formatNumber(hook.views)} views`}>
                {formatCompact(hook.views)}
              </span>
              <p className="text-xs text-muted-foreground">salvo {formatDay(hook.savedAt)}</p>
            </TableCell>
            <TableCell className="pr-4 text-right">
              <UseHookButton hookId={hook.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function HookCard({ hook }: { hook: SavedHook }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <HookTypeBadge type={hook.type} />
        <Badge variant="secondary" className="font-normal">{hook.niche}</Badge>
      </div>
      <div className="flex-1 space-y-1.5">
        <HookTemplate value={hook.template} className="block text-sm leading-relaxed" />
        <p className="text-xs text-muted-foreground">“{hook.text}”</p>
      </div>
      <div className="flex items-end justify-between gap-3 border-t pt-3">
        <div className="min-w-0 space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <PlatformBadge platform={hook.platform} />
            <span className="truncate">{hook.creator}</span>
          </div>
          <p className="tabular-nums">
            <span className="font-medium text-foreground">{formatCompact(hook.views)}</span> views
          </p>
        </div>
        <UseHookButton hookId={hook.id} className="shrink-0" />
      </div>
    </article>
  );
}
