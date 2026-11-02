# Content OS: dashboard de conteúdo

Dashboard de conteúdo pro negócio de um cliente (criador no Instagram). Todo o texto da UI é em português brasileiro.

> Leia também `AGENTS.md`: ele é gerado pelo Next.js 16 e avisa que a API mudou em relação a versões anteriores. A documentação da versão instalada fica em `node_modules/next/dist/docs/`.

## Stack

| Peça | Versão | Observação |
|---|---|---|
| Next.js (App Router, Turbopack) | 16.4.4 | `cacheComponents` e `partialPrefetching` ligados (padrão do create-next-app 16) |
| React | 19.3 | |
| Tailwind CSS | v4 | Config via CSS (`@theme inline` em `globals.css`), sem `tailwind.config` |
| shadcn/ui | estilo new-york | Componentes em `src/components/ui` (ver decisão 1) |
| radix-ui | 1.8 | Pacote unificado: `import { Dialog } from "radix-ui"` |
| lucide-react | 1.66 | Não tem ícones de marca (Instagram, YouTube etc.) |
| Fonte | Geist / Geist Mono | via `next/font/google` |

Comandos: `npm run dev`, `npm run build`, `npm run lint`.

## Estrutura de pastas

```
src/
  app/
    layout.tsx              # raiz: fontes, <html class="dark">, metadata
    globals.css             # tokens de cor (dark + terracota) e mapeamento do Tailwind
    (dashboard)/            # route group: tudo aqui ganha sidebar
      layout.tsx            # sidebar fixa (lg+) + header com menu (mobile)
      page.tsx              # Overview  (/)
      hook-vault/           # /hook-vault
      analytics/            # /analytics
      concorrentes/         # /concorrentes
      agendador/            # /agendador
      calendario/           # /calendario
      em-alta/              # /em-alta
  components/
    ui/                     # primitivos shadcn (button, card, badge, separator, sheet)
    layout/                 # sidebar, perfil, header mobile, PageHeader, ComingSoon
    overview/               # blocos da Overview (KPIs, gráfico, listas)
    platform-badge.tsx      # sigla da plataforma (IG, TikTok, YT...)
  config/
    site.ts                 # @ e nome do cliente (vazios por enquanto)
    nav.ts                  # as 6 páginas: título, rota, ícone, descrição
  data/mock/                # dados fictícios, um arquivo por domínio
  lib/
    data/index.ts           # camada de acesso a dados (única porta de entrada)
    types.ts                # tipos de domínio (DailyMetric, Reel, SavedHook...)
    utils.ts                # cn() e formatadores pt-BR
```

## Decisões

1. **shadcn/ui escrito à mão.** O CLI (`npx shadcn init/add`) precisa de `ui.shadcn.com`, que estava bloqueado na rede do ambiente onde o projeto foi criado. Os componentes de `src/components/ui` foram escritos seguindo o padrão do shadcn (data-slot, cva, `cn`, Radix) e `components.json` existe, então em uma máquina com acesso o CLI funciona normalmente: `npx shadcn@latest add tooltip`. Se um componente adicionado pelo CLI conflitar com um existente, compare antes de sobrescrever (o `Badge` tem uma variante extra, `accent`).
2. **Dark-only.** A classe `dark` é fixa no `<html>` e `:root` já contém a paleta escura. Não há toggle de tema. Se um dia precisar de light mode, criar os tokens claros em `:root` e mover os atuais pra `.dark`.
3. **Accent terracota `#d9714a`.** Usado em `--primary`, `--ring`, `--sidebar-primary` e `--chart-1`. Fundo em preto quente (`#141110`). A cor foi validada como cor de gráfico contra o fundo escuro (contraste ≥ 3:1). No vocabulário do shadcn, `--accent` é a cor de hover/ativo, não a cor da marca. Pra marca, use `primary`.
4. **Dados só pela camada `src/lib/data`.** Páginas e componentes nunca importam de `src/data/mock` diretamente. As funções são `async` mesmo devolvendo mocks, pra que ligar a fonte real (Instagram Graph API, scraper, feeds) mude só o corpo delas.
5. **"Hoje" fixo nos mocks** (`MOCK_TODAY = 2026-11-02`) pra que as páginas sejam pré-renderizadas como estáticas e não variem entre builds. Ao ligar dados reais, trocar por data real e revisar o cache (`cacheComponents` está ligado: leitura de dado não cacheado precisa de `<Suspense>` ou `"use cache"`).
6. **Regra de heater:** um reel é heater quando `views >= 2 × mediana` das views dos reels do período (`HEATER_MULTIPLIER` em `src/lib/data`). A Overview mostra o multiplicador ("5,5× a mediana").
7. **Semana = últimos 7 dias** terminando em "hoje", comparada aos 7 anteriores. Não é semana de calendário.
8. **Potencial de hook (Em Alta):** score de 0 a 100. A partir de 70 é tratado como alto e ganha destaque terracota (`HIGH_HOOK_SCORE`). O cálculo real do score ainda não foi definido.
9. **Gráfico sem biblioteca.** O "Views por dia" é feito com divs + Tailwind (série única, barras com topo arredondado, tooltip no hover/foco ao lado da barra). Se a página Analytics precisar de gráficos de linha ou múltiplas séries, avaliar adicionar Recharts (via `npx shadcn add chart`).
10. **Plataformas como siglas** em `PlatformBadge`, porque o lucide removeu ícones de marca.
11. **Datas:** strings só-dia (`YYYY-MM-DD`) são formatadas em UTC (`formatDay`) e datetimes com fuso em `America/Sao_Paulo` (`formatDateTime`), pra evitar o bug do "dia anterior".
12. **Responsivo:** sidebar fixa a partir de `lg` (1024px). Abaixo disso, header com o @ e menu em `Sheet` lateral. Grids da Overview usam `grid-cols-1` explícito pra que textos truncados não estourem a largura no mobile.

## Pendências conhecidas

- O @ e o nome do cliente ainda não foram definidos. Em `src/config/site.ts` eles ficam vazios e a UI mostra "Content OS" no lugar. Ao preencher `handle`, ele aparece na sidebar, no header mobile e no subtítulo da Overview.
- As 6 páginas exibem `ComingSoon`. A ordem combinada é construir uma por vez, a partir da Overview aprovada.
- Mocks de concorrentes e calendário ainda não existem.
- Manchetes e criadores dos mocks são fictícios (`Fonte A`, `@criador.exemplo1`).
