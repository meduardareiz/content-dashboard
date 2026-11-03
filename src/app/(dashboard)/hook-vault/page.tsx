import type { Metadata } from "next";

import { HookVault } from "@/components/hook-vault/hook-vault";
import { PageHeader } from "@/components/layout/page-header";
import { getAllHooks } from "@/lib/data";

export const metadata: Metadata = { title: "Hook Vault" };

export default async function HookVaultPage() {
  const hooks = await getAllHooks();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hook Vault"
        description="Todo hook viral salvo, transcrito e templatizado. Use um como ponto de partida de roteiro."
      />
      <HookVault hooks={hooks} />
    </div>
  );
}
