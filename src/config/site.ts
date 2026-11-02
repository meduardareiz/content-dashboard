/**
 * Identidade do perfil exibida na sidebar.
 * handle e displayName vazios = a UI mostra o nome do produto no lugar.
 * Preencha quando o perfil do cliente for definido (ex.: handle: "@perfil").
 */
export const siteConfig = {
  name: "Content OS",
  handle: "",
  displayName: "",
} as const;

/** Nome principal mostrado na sidebar e no header mobile. */
export const profileLabel = siteConfig.handle || siteConfig.name;

/** Iniciais do avatar: do nome do cliente, se houver, senão do produto. */
export const profileInitials = (siteConfig.displayName || siteConfig.name)
  .split(/\s+/)
  .slice(0, 2)
  .map((w) => w[0]?.toUpperCase() ?? "")
  .join("");
