# Fontes do projeto

Mapeamento das fontes atualmente usadas na aplicacao.

## Fontes ativas

- `Alata`
  - variavel: `--font-alata`
  - uso: corpo, componentes e textos gerais (`--font-sans`)
- `Abril Fatface`
  - variavel: `--font-abril`
  - uso: titulos e display (`--font-display`)

## Onde esta configurado

- `src/app/layout.tsx`
  - importacao via `next/font/google`
  - injecao das variaveis CSS no `<body>`
- `src/app/globals.css`
  - definicao de `--font-sans` e `--font-display`

## Diretriz

- manter `Alata` como fonte principal de legibilidade
- usar `Abril Fatface` somente em pontos de destaque (titulos)
- qualquer troca de fonte deve atualizar este documento e avaliar impacto em
  legibilidade, carregamento e identidade visual
