"use client";

/**
 * Rascunhos de roteiro (/script), guardados no localStorage do navegador.
 * É provisório: quando houver backend, troque read/write por chamadas à API
 * e mantenha a mesma interface (useDrafts, createDraft, updateDraft, deleteDraft).
 * Se o localStorage estiver indisponível (aba anônima, bloqueio), cai pra memória.
 */
import { useSyncExternalStore } from "react";

import type { SavedHook } from "@/lib/types";

export type ScriptDraft = {
  id: string;
  /** Cópia do hook no momento em que o rascunho foi criado */
  hook: Pick<SavedHook, "id" | "text" | "template" | "type" | "creator">;
  /** Valores das [VARIÁVEIS] do template */
  values: Record<string, string>;
  body: string;
  cta: string;
  createdAt: string;
  updatedAt: string;
};

const KEY = "content-os:script-drafts";
const EMPTY: ScriptDraft[] = [];
const listeners = new Set<() => void>();

let memory: ScriptDraft[] = EMPTY;
let lastRaw: string | null | undefined;

function read(): ScriptDraft[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw !== lastRaw) {
      lastRaw = raw;
      memory = raw ? (JSON.parse(raw) as ScriptDraft[]) : EMPTY;
    }
  } catch {
    // sem localStorage: segue com o que está em memória
  }
  return memory;
}

function write(drafts: ScriptDraft[]) {
  memory = drafts;
  try {
    const raw = JSON.stringify(drafts);
    window.localStorage.setItem(KEY, raw);
    lastRaw = raw;
  } catch {
    // sem localStorage: fica só em memória até recarregar a página
  }
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function useDrafts() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createDraft(hook: SavedHook): ScriptDraft {
  const now = new Date().toISOString();
  const draft: ScriptDraft = {
    id: newId(),
    hook: { id: hook.id, text: hook.text, template: hook.template, type: hook.type, creator: hook.creator },
    values: {},
    body: "",
    cta: "",
    createdAt: now,
    updatedAt: now,
  };
  write([draft, ...read()]);
  return draft;
}

export function updateDraft(id: string, patch: Partial<Pick<ScriptDraft, "values" | "body" | "cta">>) {
  write(
    read().map((d) =>
      d.id === id ? { ...d, ...patch, updatedAt: new Date().toISOString() } : d
    )
  );
}

export function deleteDraft(id: string) {
  write(read().filter((d) => d.id !== id));
}
