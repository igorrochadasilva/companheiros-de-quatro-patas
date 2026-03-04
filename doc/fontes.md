# Fontes do projeto

Paleta de fontes e onde cada uma é usada.

## Mapeamento atual (visão técnica)

| Fonte             | Uso no sistema                            | Onde aparece                                                  |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------- |
| **Alata**         | `--font-sans` (padrão)                    | Corpo de texto, navegação, botões, formulários, cards, footer |
| **Abril Fatface** | `--font-display` (classe `.font-display`) | Títulos H1–H4 (Hero, seções, cards de destaque)               |

## Fontes disponíveis no Google Fonts (implementadas)

- **Alata** — sans-serif limpa, boa legibilidade. Usada como fonte principal da interface.
- **Abril Fatface** — serif display “fatface”, moderna e com personalidade. Usada em títulos (substituiu Chewy).

## Fontes não disponíveis no Google Fonts

**Sergio Trendy** e **Lucky Bones** não estão no Google Fonts. Para usá-las:

1. Obtenha os arquivos (`.woff2` ou `.ttf`) e coloque em `public/fonts/`, por exemplo:
   - `public/fonts/SergioTrendy.woff2`
   - `public/fonts/LuckyBones.woff2`
2. Em `app/layout.tsx`, use `next/font/local`:

   ```ts
   import localFont from "next/font/local";
   const sergioTrendy = localFont({
     src: "../public/fonts/SergioTrendy.woff2",
     variable: "--font-sergio",
     display: "swap",
   });
   const luckyBones = localFont({
     src: "../public/fonts/LuckyBones.woff2",
     variable: "--font-lucky",
     display: "swap",
   });
   ```

3. Passe as variáveis no `className` do `<body>` e em `app/globals.css`:
   - Para **Sergio Trendy** (elegante, display): defina `--font-display: var(--font-sergio), ...` para títulos.
   - Para **Lucky Bones** (playful): defina `--font-accent` e use em badges, CTAs ou subtítulos, conforme a identidade desejada.

## Resumo de uso recomendado

- **Sergio Trendy** (quando disponível): títulos principais (H1, hero), logotipo.
- **Alata**: texto corrido, UI, acessibilidade.
- **Lucky Bones** (quando disponível): acentos, badges, frases de impacto.
- **Abril Fatface**: atualmente em todos os títulos (H1–H4). Alternativas fora do Google Fonts (Mogena, Bugaki, Karimun) exigem arquivos locais; ver instruções acima para Sergio Trendy / Lucky Bones.
