# Stack Tecnologica

## Objetivo

Registrar a stack oficial do projeto e evitar divergencia de ferramentas.

## Base confirmada no repositorio

- Next.js `16.1.6`
- React `19.2.3`
- React DOM `19.2.3`
- TypeScript `^5`
- ESLint `^9` + `eslint-config-next`
- Tailwind CSS `^4`
- PostCSS com `@tailwindcss/postcss`

## Stack definida para o projeto

- Gerenciamento de estado: `zustand`
- UI e componentes: `shadcn/ui`
- Data fetching e cache server state: `@tanstack/react-query` (React Query)
- Formularios: `react-hook-form`
- Validacao de schema: `zod`
- Qualidade de codigo em git hooks: `husky` + `lint-staged`

## Convencoes importantes

- "React Query" sera implementado com `@tanstack/react-query`.
- "shadcn" refere-se ao ecossistema `shadcn/ui`.
- Formularios devem combinar `react-hook-form` + `zod`.

## Documentacao oficial (referencia obrigatoria)

- Next.js: https://nextjs.org/docs
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind CSS v4: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/docs
- Zustand: https://zustand.docs.pmnd.rs/
- TanStack Query (React Query): https://tanstack.com/query/latest/docs/framework/react/overview
- React Hook Form: https://react-hook-form.com/docs
- Zod: https://zod.dev/
- ESLint: https://eslint.org/docs/latest/
- Prettier: https://prettier.io/docs/
- Husky: https://typicode.github.io/husky/
- lint-staged: https://github.com/lint-staged/lint-staged

## Diretriz de consulta

- Antes de implementar ou alterar comportamento, consultar primeiro a documentacao oficial da stack envolvida.
- Em caso de conflito entre exemplos de terceiros e docs oficiais, priorizar docs oficiais.

## A confirmar

- Versao minima do Node.js
- Ferramenta de testes
- CI/CD
- Plataforma de deploy
- Ferramentas de observabilidade

## Politica de atualizacao

- Atualizar versoes de forma incremental e controlada.
- Registrar mudancas significativas em `doc/decisoes/README.md`.
