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
      hook-vault/           # /hook-vault (pronta)
      script/               # /script: rascunhos de roteiro (fora das 6, grupo "Ferramentas")
      analytics/            # /analytics
      concorrentes/         # /concorrentes
      agendador/            # /agendador
      calendario/           # /calendario
      em-alta/              # /em-alta
  components/
    ui/                     # primitivos shadcn (button, card, badge, separator, sheet,
                            #   input, textarea, label, select, table)
    layout/                 # sidebar, perfil, header mobile, PageHeader, ComingSoon
    overview/               # blocos da Overview (KPIs, gráfico, listas)
    hook-vault/             # Vault (filtros, tabela/cards), badge de tipo, template, "Usar este"
    script/                 # editor de rascunho e lista de rascunhos
    platform-badge.tsx      # sigla da plataforma (IG, TikTok, YT...)
  config/
    site.ts                 # @ e nome do cliente (vazios por enquanto)
    nav.ts                  # as 6 páginas + ferramentas: título, rota, ícone, descrição
  data/mock/                # dados fictícios, um arquivo por domínio
  lib/
    data/index.ts           # camada de acesso a dados (única porta de entrada)
    types.ts                # tipos de domínio (DailyMetric, Reel, SavedHook...)
    hooks.ts                # tipos de hook, nichos, faixas de views, helpers de template
                            #   e buildScriptCommand
    script-drafts.ts        # store dos rascunhos do /script (localStorage)
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
12. **Responsivo (base):** sidebar fixa a partir de `lg` (1024px). Abaixo disso, header com o @ e menu em `Sheet` lateral. Grids da Overview usam `grid-cols-1` explícito pra que textos truncados não estourem a largura no mobile.
13. **Tipos de hook (8):** Notícia (`[X] acabou de matar [Y]`), Proibição (`Para de fazer [X]`), Lista (`[NUMERO] coisas que eu queria saber`), Confissão, Curiosidade, Contraintuitivo, Tutorial e Comparação. Rótulo, ícone e exemplo ficam em `hookTypes` (`src/lib/hooks.ts`). Os badges de tipo são neutros, com ícone terracota: a cor não diferencia tipos, o texto sim.
14. **Nichos:** IA, Marketing, Finanças, Produtividade, Negócios, Carreira e Fitness (`niches`). Cada hook tem um nicho só.
15. **Convenção de variáveis do template:** `[MAIUSCULAS_SEM_ACENTO]`, com `_` no lugar de espaço. A mesma variável repetida no template é preenchida uma vez só (`templateVariables` deduplica).
16. **Busca e filtros do Vault rodam no cliente** sobre a lista inteira, e a busca ignora acento e caixa ("financas" encontra "Finanças"). O estado dos filtros não vai pra URL. Com centenas de hooks reais, mover filtro pra camada de dados e pra `searchParams` (dentro de `<Suspense>`, por causa do `cacheComponents`).
17. **Tabela e cards:** a partir de `md` dá pra alternar entre os dois. Abaixo disso é sempre card.
18. **Fluxo do "Usar este":** abre `/script?hook=ID`, que cria um rascunho e troca a URL por `/script?draft=ID` (assim recarregar não duplica). O rascunho guarda uma cópia do hook, os valores das variáveis, desenvolvimento e CTA.
19. **Rascunhos no localStorage** (`content-os:script-drafts`), com fallback em memória se o navegador bloquear. São por navegador e não sincronizam entre dispositivos. A interface (`useDrafts`, `createDraft`, `updateDraft`, `deleteDraft`) foi pensada pra trocar o miolo por uma API depois.
20. **Comando do Claude Code:** o botão copia `/script "<hook preenchido>"`. Esse formato é uma suposição. Se o comando `/script` esperar outro argumento, ajuste só `buildScriptCommand` em `src/lib/hooks.ts`.

## Pendências conhecidas

- O @ e o nome do cliente ainda não foram definidos. Em `src/config/site.ts` eles ficam vazios e a UI mostra "Content OS" no lugar. Ao preencher `handle`, ele aparece na sidebar, no header mobile e no subtítulo da Overview.
- Prontas: Overview, Hook Vault e /script. As outras 5 páginas ainda exibem `ComingSoon` e são construídas uma por vez.
- Confirmar o formato de argumento do comando `/script` (decisão 20).
- Mocks de concorrentes e calendário ainda não existem.
- Manchetes e criadores dos mocks são fictícios (`Fonte A`, `@lucas.ia.exemplo`). Os handles terminam em `.exemplo` de propósito, pra não apontar pra perfis reais.
