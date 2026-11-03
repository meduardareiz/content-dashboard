import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ScriptWorkspace } from "@/components/script/script-workspace";
import { getAllHooks } from "@/lib/data";

export const metadata: Metadata = { title: "Script" };

export default async function ScriptPage() {
  const hooks = await getAllHooks();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Script"
        description="Rascunhos de roteiro a partir dos hooks do Vault. Preencha as variáveis e copie o comando pro Claude Code."
      />
      {/* useSearchParams lê a URL: fica dentro de Suspense pro resto da página ser estático */}
      <Suspense fallback={<div className="h-96 animate-pulse rounded-xl border bg-card" />}>
        <ScriptWorkspace hooks={hooks} />
      </Suspense>
    </div>
  );
}
