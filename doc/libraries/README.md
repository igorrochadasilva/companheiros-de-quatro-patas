# Bibliotecas

## Objetivo

Listar bibliotecas adotadas no projeto e as diretrizes para novas adocoes.

## Bibliotecas em uso no repositorio

- Base web: `next`, `react`, `react-dom`, `typescript`
- Estilo/UI: `tailwindcss`, `@tailwindcss/postcss`, `shadcn`, `lucide-react`, `class-variance-authority`, `tailwind-merge`, `sonner`
- Dados e validacao: `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers`, `zod`
- Persistencia: `prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`
- Integracoes: `@supabase/supabase-js`, `@supabase/ssr`, `contentful`, `cloudinary`, `xlsx`
- Qualidade: `eslint`, `eslint-config-next`, `prettier`, `husky`, `lint-staged`

## Diretrizes de implementacao

- consultar docs oficiais antes de implementar comportamento novo
- priorizar padroes ja existentes no repositorio
- evitar novas dependencias quando `shared/` ou stack atual resolve o problema
- registrar impacto de novas libs em `doc/decisoes/README.md`

## Criterios para adicao de biblioteca

- necessidade real de produto/engenharia
- manutencao ativa da biblioteca
- compatibilidade com Next.js 16 e React 19
- impacto em bundle/performance
- custo de manutencao e onboarding

## Em aberto

- biblioteca/ferramenta oficial de testes automatizados
