# Implementacao Layout V2 (Stitch)

## Objetivo

Criar uma nova Home baseada no layout do Stitch (Projeto `7226519066164972013`) sem alterar o layout atual em producao.

## Referencias Stitch

- Home Desktop: `Home - Novo Visual (Desktop)`
- Home Mobile: `Home - Novo Visual (Mobile)`
- Arquivos locais de referencia:
  - `tmp/stitch/home-desktop.html`
  - `tmp/stitch/home-mobile.html`

## Estrategia

- Tudo novo entra com namespace/layout v2.
- Nada existente e removido nesta etapa.
- Rollout por fases para reduzir risco de regressao.
- Validacao incremental via URL de teste: `/?layout=v2`.

## Fase 0 (Fundacao) - concluida

- Tokens e utilitarios visuais v2 adicionados em `src/app/globals.css` com namespace `.layout-v2`.
- Shell interno v2 criado em `src/shared/ui/v2/layout-v2-shell.tsx`.
- Fontes de referencia (`Noto Serif` / `Manrope`) adicionadas como variaveis CSS no `RootLayout`.

## Fase 1 (Header v2) - concluida

- Novo Header v2 (desktop + mobile).
- Paridade visual com Stitch para navegacao e estado ativo.

## Fase 2 (Footer v2) - concluida

- Novo Footer v2.
- Paridade visual com Stitch e links reais do projeto.

## Fase 3 (Home v2 por secoes) - em andamento

- Nova Home v2 por secoes:
  - [x] Hero (estrutura inicial)
  - [x] Pets (estrutura inicial)
  - [x] Jornada de adocao (estrutura inicial)
  - [x] Doacao PIX (estrutura inicial)
  - [x] Transparencia (estrutura inicial)
  - [x] Bazar (estrutura inicial)
  - [x] Historias (estrutura inicial)
  - [x] FAQ (estrutura inicial)

### Ordem de implementacao recomendada (Fase 3)

1. Hero (layout + tipografia + metricas + CTA + imagem)
2. Pets (cabecalho, filtros/chips, cards)
3. Jornada de adocao
4. Doacao PIX
5. Transparencia
6. Bazar
7. Historias
8. FAQ

### Criterio de pronto por secao

- Paridade estrutural com `tmp/stitch/home-desktop.html` e `tmp/stitch/home-mobile.html`.
- Tipografia e cores usando tokens v2 (`.layout-v2`).
- Comportamento responsivo mobile/desktop alinhado ao Stitch.
- Sem regressao no layout atual (somente em `?layout=v2`).

### Hero v2 - status atual

- Hero v2 inicial criada em `src/features/home/components/HomeHeroV2.tsx`.
- Home alterna entre v1 e v2 por query param em `/?layout=v2`.
- Proximos ajustes da Hero: refinamento fino de espacamento/tipografia para paridade total Stitch.

## Fase 4

- QA visual (desktop/mobile), ajuste fino de espacamento, tipografia e contraste.
- Promocao de v2 para rota principal apos validacao.
