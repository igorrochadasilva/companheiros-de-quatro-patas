# Arquitetura

## Objetivo

Descrever a arquitetura atual do sistema e os limites de responsabilidade de cada camada.

## Visao geral

- Framework: Next.js 16 (App Router).
- Frontend: React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui.
- Backend app-level: route handlers em `src/app/api/*` + casos de uso em `backend/modules/*`.
- Dados: Postgres (Supabase) via Prisma.
- Integracoes: Supabase Auth/SSR, Contentful, Cloudinary.

## Camadas e ownership

- `src/app/`
  - composicao de paginas, layouts e metadata
  - route handlers HTTP em `src/app/api/*`
  - sem regra de negocio complexa
- `src/features/`
  - dominio funcional por feature
  - `components/`, `hooks/`, `services/` por contexto
  - sem importacao direta entre features
- `backend/`
  - casos de uso por modulo em `backend/modules/*/application`
  - contratos de entrada em `backend/modules/*/schemas`
  - integracoes em `backend/infrastructure/*`
- `src/shared/`
  - design system (`shared/ui`)
  - utilitarios e clientes compartilhados (`shared/lib`)
  - providers transversais (`shared/providers`)
- `src/types/`
  - tipos compartilhados entre rotas/features
- `src/constants/`
  - rotas, SEO e constantes reutilizaveis
- `src/messages/`
  - textos de interface por dominio (`messages/pt-br/*.ts`)

## Fluxo padrao de dados

1. Pagina em `src/app/(public|admin)` compoe conteudo da feature.
2. Hook em `features/*/hooks` orquestra estado e consultas.
3. Service em `features/*/services` consome `src/app/api/*`.
4. Route handler valida e delega para `backend/modules/*/application`.
5. Caso de uso acessa infraestrutura (`prisma`, `supabase`, `contentful`, `cloudinary`).
6. Resposta tipada retorna para a feature.

## Modelagem de dominio atual

No Prisma (`backend/prisma/schema.prisma`):

- `pets`
- `pet_media`
- `adoption_requests`
- enums de especie, porte, genero, status e tipo de midia

## Fronteiras obrigatorias

- API routes sem logica de apresentacao.
- Componentes de UI sem regra de negocio pesada.
- Regras de dominio fora de `src/app/`, preferencialmente em `backend/modules`.
- Se duas features precisarem compartilhar algo, extrair para `shared/` ou `types/`.

## Pendencias arquiteturais conhecidas

- unificar nomenclatura da feature de doacao (`features/donatation` vs `features/donation`).
- evoluir estrategia de testes automatizados por camada.
