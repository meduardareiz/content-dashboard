"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Copy, FilePen, Trash2 } from "lucide-react";

import { HookTemplate } from "@/components/hook-vault/hook-template";
import { HookTypeBadge } from "@/components/hook-vault/hook-type-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildScriptCommand, fillTemplate, templateVariables } from "@/lib/hooks";
import {
  createDraft,
  deleteDraft,
  updateDraft,
  useDrafts,
  type ScriptDraft,
} from "@/lib/script-drafts";
import type { SavedHook } from "@/lib/types";
import { cn, formatDateTime } from "@/lib/utils";

export function ScriptWorkspace({ hooks }: { hooks: SavedHook[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const drafts = useDrafts();
  const hookParam = params.get("hook");
  const draftParam = params.get("draft");
  const handled = useRef<string | null>(null);

  // ?hook=ID vira um rascunho novo e a URL passa a apontar pro rascunho,
  // pra que recarregar a página não crie duplicatas.
  useEffect(() => {
    if (!hookParam || handled.current === hookParam) return;
    handled.current = hookParam;
    const hook = hooks.find((h) => h.id === hookParam);
    if (!hook) {
      router.replace("/script");
      return;
    }
    const draft = createDraft(hook);
    router.replace(`/script?draft=${draft.id}`);
  }, [hookParam, hooks, router]);

  const activeId = draftParam ?? (hookParam ? null : drafts[0]?.id ?? null);
  const active = drafts.find((d) => d.id === activeId) ?? null;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_18rem]">
      <div className="min-w-0">
        {active ? (
          <DraftEditor key={active.id} draft={active} />
        ) : hookParam ? (
          <div className="h-96 animate-pulse rounded-xl border bg-card" aria-label="Criando rascunho" />
        ) : (
          <EmptyState />
        )}
      </div>
      <DraftList drafts={drafts} activeId={active?.id ?? null} />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <FilePen className="size-5" aria-hidden />
      </span>
      <p className="text-sm font-medium">Nenhum rascunho aberto</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Escolha um hook no Hook Vault e clique em “Usar este” pra começar um roteiro.
      </p>
      <Button asChild size="sm">
        <Link href="/hook-vault">Ir pro Hook Vault</Link>
      </Button>
    </div>
  );
}

function DraftEditor({ draft }: { draft: ScriptDraft }) {
  const router = useRouter();
  const [copied, setCopied] = useState<"ok" | "erro" | null>(null);
  const variables = templateVariables(draft.hook.template);
  const filled = fillTemplate(draft.hook.template, draft.values);
  const command = buildScriptCommand(filled);
  const missing = variables.filter((v) => !draft.values[v]?.trim()).length;

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied("ok");
    } catch {
      setCopied("erro");
    }
    setTimeout(() => setCopied(null), 2000);
  }

  function remove() {
    deleteDraft(draft.id);
    router.replace("/script");
  }

  return (
    <div className="space-y-5">
      {/* Hook de origem */}
      <section className="space-y-4 rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Hook</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <HookTypeBadge type={draft.hook.type} />
            <span>de {draft.hook.creator}</span>
          </div>
        </div>
        <div className="space-y-1">
          <HookTemplate value={draft.hook.template} className="block text-sm leading-relaxed" />
          <p className="text-xs text-muted-foreground">Original: “{draft.hook.text}”</p>
        </div>

        {variables.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {variables.map((v) => (
              <div key={v} className="space-y-1.5">
                <Label htmlFor={`var-${v}`} className="font-mono text-xs text-primary">[{v}]</Label>
                <Input
                  id={`var-${v}`}
                  value={draft.values[v] ?? ""}
                  onChange={(e) =>
                    updateDraft(draft.id, { values: { ...draft.values, [v]: e.target.value } })
                  }
                  placeholder={`Valor de ${v.toLowerCase().replace(/_/g, " ")}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            Seu hook {missing > 0 && `· faltam ${missing} de ${variables.length} variáveis`}
          </p>
          <HookTemplate value={filled} className="block text-base leading-relaxed font-medium" />
        </div>
      </section>

      {/* Roteiro */}
      <section className="space-y-4 rounded-xl border bg-card p-4 sm:p-5">
        <h2 className="text-sm font-semibold">Roteiro</h2>
        <div className="space-y-1.5">
          <Label htmlFor="body">Desenvolvimento</Label>
          <Textarea
            id="body"
            value={draft.body}
            onChange={(e) => updateDraft(draft.id, { body: e.target.value })}
            placeholder="O que você entrega depois do hook: os pontos, a história ou o passo a passo."
            className="min-h-40"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cta">CTA</Label>
          <Textarea
            id="cta"
            value={draft.cta}
            onChange={(e) => updateDraft(draft.id, { cta: e.target.value })}
            placeholder="Ex.: Salva pra usar depois e me segue pra parte 2."
          />
        </div>
      </section>

      {/* Ações */}
      <section className="space-y-3 rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Mandar pro Claude Code</h2>
          <span className="text-xs text-muted-foreground">
            Salvo neste navegador · {formatDateTime(draft.updatedAt, { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <pre className="overflow-x-auto rounded-md border bg-background px-3 py-2 font-mono text-xs whitespace-pre-wrap text-muted-foreground">
          {command}
        </pre>
        <div className="flex flex-wrap gap-2">
          <Button onClick={copyCommand}>
            {copied === "ok" ? <Check aria-hidden /> : <Copy aria-hidden />}
            {copied === "ok" ? "Copiado" : copied === "erro" ? "Não deu pra copiar" : "Copiar comando /script"}
          </Button>
          <Button variant="ghost" onClick={remove} className="text-muted-foreground hover:text-destructive">
            <Trash2 aria-hidden />
            Excluir rascunho
          </Button>
        </div>
      </section>
    </div>
  );
}

function DraftList({ drafts, activeId }: { drafts: ScriptDraft[]; activeId: string | null }) {
  return (
    <aside aria-label="Rascunhos salvos" className="space-y-2">
      <h2 className="px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        Rascunhos ({drafts.length})
      </h2>
      {drafts.length === 0 ? (
        <p className="px-1 text-sm text-muted-foreground">Nenhum ainda.</p>
      ) : (
        <ul className="space-y-1.5">
          {drafts.map((d) => (
            <li key={d.id}>
              <Link
                href={`/script?draft=${d.id}`}
                prefetch={false}
                aria-current={d.id === activeId ? "page" : undefined}
                className={cn(
                  "block rounded-lg border p-3 text-sm transition-colors hover:bg-accent",
                  d.id === activeId ? "border-primary/40 bg-accent" : "bg-card"
                )}
              >
                <span className="line-clamp-2">{fillTemplate(d.hook.template, d.values)}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {formatDateTime(d.updatedAt, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
