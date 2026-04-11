# Feature Flags - Visibilidade de conteudo (Home, Paginas e Header)

## Objetivo

Controlar rapidamente o que fica visivel no site publico antes e durante o go-live, sem precisar remover codigo ou alterar rotas manualmente.

## Onde esta implementado

- Config central: `src/shared/config/feature-flags.ts`
- Export: `src/shared/config/index.ts`
- Header: `src/shared/ui/public-header.tsx`
- Footer (links rapidos): `src/shared/ui/public-footer.tsx`
- Home (secoes): `src/app/(public)/home/Home.tsx`
- Paginas publicas (gate): `src/app/(public)/*/page.tsx`
- Sitemap: `src/app/sitemap.ts`
- Variaveis: `.env.example`

## Como funciona

- Flags usam variaveis `NEXT_PUBLIC_*`.
- Valores aceitos: `true/false`, `1/0`, `yes/no`, `on/off`.
- Valor invalido cai no default (`true`).

## Grupo 1 - Rotas publicas

Quando uma rota e desligada:

- a pagina retorna `notFound()`
- links principais deixam de exibir essa rota
- sitemap para de anunciar a rota

Flags:

- `NEXT_PUBLIC_FLAG_ROUTE_ADOPTION`
- `NEXT_PUBLIC_FLAG_ROUTE_SHELTER`
- `NEXT_PUBLIC_FLAG_ROUTE_DONATE`
- `NEXT_PUBLIC_FLAG_ROUTE_BAZAAR`
- `NEXT_PUBLIC_FLAG_ROUTE_ABOUT`
- `NEXT_PUBLIC_FLAG_ROUTE_CONTACT`
- `NEXT_PUBLIC_FLAG_ROUTE_TRANSPARENCY`

## Grupo 2 - Links do header

Controla visibilidade dos links no header desktop/mobile e CTA de apoio.

Flags:

- `NEXT_PUBLIC_FLAG_HEADER_LINK_ADOPTION`
- `NEXT_PUBLIC_FLAG_HEADER_LINK_SHELTER`
- `NEXT_PUBLIC_FLAG_HEADER_LINK_DONATE`
- `NEXT_PUBLIC_FLAG_HEADER_LINK_BAZAAR`
- `NEXT_PUBLIC_FLAG_HEADER_LINK_ABOUT`
- `NEXT_PUBLIC_FLAG_HEADER_LINK_CONTACT`
- `NEXT_PUBLIC_FLAG_HEADER_LINK_TRANSPARENCY`
- `NEXT_PUBLIC_FLAG_HEADER_SUPPORT_CTA`

Observacao: link no header so aparece se a flag do header e a flag da rota estiverem ativas.

## Grupo 3 - Secoes da home

Controla secoes renderizadas na pagina inicial.

Flags:

- `NEXT_PUBLIC_FLAG_HOME_HERO`
- `NEXT_PUBLIC_FLAG_HOME_PETS`
- `NEXT_PUBLIC_FLAG_HOME_ADOPTION_HOW`
- `NEXT_PUBLIC_FLAG_HOME_DONATION_PIX`
- `NEXT_PUBLIC_FLAG_HOME_TRANSPARENCY`
- `NEXT_PUBLIC_FLAG_HOME_BAZAAR`
- `NEXT_PUBLIC_FLAG_HOME_STORIES`
- `NEXT_PUBLIC_FLAG_HOME_FAQ`

## Recomendacao de go-live (conservadora)

1. Manter todas as rotas ativas.
2. Desligar no header apenas o que ainda nao quer divulgar.
3. Desligar secoes da home por ordem de prioridade de comunicacao.
4. Revalidar sitemap/links depois de cada alteracao.

## Checklist rapido de validacao

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] Header sem links para rotas desligadas
- [ ] Home sem secoes desligadas
- [ ] Rotas desligadas retornam 404
- [ ] Sitemap sem rotas desligadas
