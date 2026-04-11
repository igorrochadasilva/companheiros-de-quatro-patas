# Stack Tecnologica

## Objetivo

Registrar a stack oficial em uso no repositorio e evitar divergencia de ferramentas.

## Base confirmada

- Next.js `16.1.6`
- React `19.2.3`
- React DOM `19.2.3`
- TypeScript `^5`
- Tailwind CSS `^4`
- ESLint `^9` + `eslint-config-next`
- Prettier `^3.8.1`

## Stack de aplicacao

- UI/Design system: `shadcn` + componentes em `shared/ui`
- Server state: `@tanstack/react-query`
- Formularios: `react-hook-form` + `@hookform/resolvers`
- Validacao: `zod`
- Banco e ORM: `postgres` + `prisma` + `@prisma/client`
- Auth/SSR: `@supabase/supabase-js` + `@supabase/ssr`
- CMS: `contentful`
- Midia: `cloudinary`
- Importacao de planilhas: `xlsx`

## Qualidade e workflow

- Git hooks: `husky`
- Pre-commit checks: `lint-staged`
- Lint de imports: `eslint-plugin-simple-import-sort`, `eslint-plugin-unused-imports`
- React Compiler: habilitado em `next.config.ts`

## Scripts atuais

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm format`
- `pnpm prisma:generate`
- `pnpm prisma:push`
- `pnpm prisma:studio`
- `pnpm prisma:reset`
- `pnpm prisma:seed:pets`

## A confirmar

- versao minima oficial de Node.js (recomendado: LTS ativa)
- stack de testes automatizados (unitario/integracao/e2e)
- pipeline CI/CD oficial

## Politica de atualizacao

- atualizar versoes de forma incremental
- registrar decisoes de mudanca em `doc/decisoes/README.md`
