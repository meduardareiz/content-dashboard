import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Hook Vault" };

export default function Page() {
  return <ComingSoon href="/hook-vault" />;
}
