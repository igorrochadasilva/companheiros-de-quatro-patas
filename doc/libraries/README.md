# Bibliotecas

## Objetivo

Listar bibliotecas aprovadas, em avaliacao e descartadas.

## Aprovadas (base atual)

- `next`
- `react`
- `react-dom`
- `typescript`
- `eslint`
- `eslint-config-next`
- `tailwindcss`
- `@tailwindcss/postcss`

## Aprovadas para adocao no projeto

- Estado global: `zustand`
- UI: `shadcn/ui`
- Server state: `@tanstack/react-query`
- Formularios: `react-hook-form`
- Validacao: `zod`
- Git hooks e qualidade pre-commit: `husky`, `lint-staged`
- CMS headless: `contentful`

## Observacoes de nomenclatura

- "react-query" = pacote atual `@tanstack/react-query`.
- "reacct hook form" = `react-hook-form`.

## Documentacao oficial por biblioteca

- `next`: https://nextjs.org/docs
- `react`: https://react.dev/
- `typescript`: https://www.typescriptlang.org/docs/
- `tailwindcss`: https://tailwindcss.com/docs
- `@tailwindcss/postcss`: https://tailwindcss.com/docs/installation/using-postcss
- `eslint`: https://eslint.org/docs/latest/
- `eslint-config-next`: https://nextjs.org/docs/app/api-reference/config/eslint
- `eslint-plugin-unused-imports`: https://www.npmjs.com/package/eslint-plugin-unused-imports
- `eslint-plugin-simple-import-sort`: https://github.com/lydell/eslint-plugin-simple-import-sort
- `prettier`: https://prettier.io/docs/
- `husky`: https://typicode.github.io/husky/
- `lint-staged`: https://github.com/lint-staged/lint-staged
- `zustand`: https://zustand.docs.pmnd.rs/
- `@tanstack/react-query`: https://tanstack.com/query/latest/docs/framework/react/overview
- `react-hook-form`: https://react-hook-form.com/docs
- `zod`: https://zod.dev/
- `contentful` (SDK): https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/

## Diretriz de implementacao

- Toda adocao de biblioteca deve incluir link de documentacao oficial nesta pagina.
- Sempre consultar docs oficiais antes de implementar, atualizar versao ou aplicar workaround.

## Em avaliacao

- Biblioteca de testes: a confirmar
- Estrategia de testes (unitario/integracao/e2e): a confirmar

## Criterios para adicao de biblioteca

- Necessidade real de produto/engenharia
- Maturidade e manutencao ativa
- Compatibilidade com Next.js 16
- Impacto em bundle/performance
- Curva de aprendizado e manutencao

## Registro de decisao

Toda nova biblioteca deve ser registrada com motivacao em `doc/decisoes/README.md`.
