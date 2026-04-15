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

## Fase 0 (Fundacao) - concluida
- Tokens e utilitarios visuais v2 adicionados em `src/app/globals.css` com namespace `.layout-v2`.
- Shell interno v2 criado em `src/shared/ui/v2/layout-v2-shell.tsx`.
- Fontes de referencia (`Noto Serif` / `Manrope`) adicionadas como variaveis CSS no `RootLayout`.

## Fase 1
- Novo Header v2 (desktop + mobile).
- Paridade visual com Stitch para navegacao e estado ativo.

## Fase 2
- Novo Footer v2.
- Paridade visual com Stitch e links reais do projeto.

## Fase 3
- Nova Home v2 por secoes:
  - Hero
  - Pets
  - Jornada de adocao
  - Doacao PIX
  - Transparencia
  - Bazar
  - Historias
  - FAQ

## Fase 4
- QA visual (desktop/mobile), ajuste fino de espacamento, tipografia e contraste.
- Promocao de v2 para rota principal apos validacao.

