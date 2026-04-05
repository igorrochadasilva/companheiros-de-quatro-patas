# Implementacao tecnica por etapas - Dashboard de pets (status atual)

## Data de referencia

06/04/2026

## Objetivo do MVP

Entregar dashboard administrativo funcional para pets, sem regressao no site publico, com:

- autenticacao admin
- CRUD de pets
- importacao por planilha
- persistencia em Supabase/Postgres via Prisma
- base pronta para gestao de midias

## Status consolidado

### Concluido

- Estrutura de dashboard consolidada em `/dashboard/*` com organizacao por feature:
  - `features/dashboard/shell/*`
  - `features/dashboard/overview/*`
  - `features/dashboard/pets/*`
- Navegacao e rotas administrativas padronizadas por constantes.
- Tela de login administrativa implementada em `/(public)/login`.
- Guard de acesso admin implementado:
  - server layout em `app/(admin)/dashboard/layout.tsx`
  - protecao de API com `requireAdminApi()`
  - regra de admin por email/role em `backend/modules/auth/application/is-admin-user.ts`
- Backend organizado em camadas (clean architecture leve):
  - `app/api/*` como adaptadores HTTP finos
  - regras em `backend/modules/*/application/*`
  - integracoes em `backend/infrastructure/*`
  - mocks centralizados em `backend/mock/*`
- Prisma v7 configurado e funcional com `prisma.config.ts`.
- Schema principal modelado no Prisma e aplicado no Supabase:
  - `pets`
  - `pet_media`
  - `adoption_requests`
  - enums de dominio (status, species, media type, etc.)
- Endpoints principais de pets entregues:
  - `GET /api/pets`
  - `POST /api/pets`
  - `PATCH /api/pets/[id]`
  - `DELETE /api/pets/[id]`
- Endpoints de importacao entregues:
  - `POST /api/pets/import`
  - `GET /api/pets/import/template`
- Fluxo de importacao no dashboard validado (download template -> upload -> processamento).
- Form de cadastro/edicao com React Hook Form + Zod + toast.
- Integracao Cloudinary concluida para midias de pets:
  - assinatura segura: `POST /api/media/cloudinary-sign`
  - upload no dashboard por pet (imagem)
  - persistencia em `pet_media` (`url`, `publicId`, `isMain`, `sortOrder`)
  - definicao de imagem principal
  - remocao de midia com exclusao no Cloudinary + banco
  - reordenacao da galeria por `sortOrder`
- Tabela administrativa de pets com thumbnail da midia principal.
- Loading de transicao aplicado em rotas admin/public.
- Mensagens desacopladas por dominio (`messages/pt-br/*.ts`) e imports atualizados.
- Script de dev ajustado para Turbopack por padrao (`pnpm dev`).
- Regra de destaque da home validada:
  - secao da home lista pets com `featured = true`
  - se vier vazio, tratar como dado/cadastro (nao fallback automatico).

### Parcialmente concluido

- Suporte de midia focado em imagem no MVP atual.
- Video ainda nao foi habilitado no fluxo de upload.

## Etapa atual do roadmap

As etapas de base, auth, schema, CRUD de pets e importacao por planilha estao funcionais para MVP.

## Proxima etapa recomendada (prioridade)

## Fase de fechamento de operacao do dashboard

1. Validar listagem administrativa com filtros finais
   - revisar UX de filtros e paginaçao.
   - confirmar desempenho com volume maior.

2. Polimento de midia
   - opcional MVP+: habilitar upload de video (`PetMediaType.VIDEO`).
   - opcional MVP+: limite maximo de itens por pet com bloqueio de UI.

3. Fluxo de solicitacoes de adocao no admin
   - criar listagem administrativa de `adoption_requests`.
   - permitir atualizar status (`PENDING`, `IN_REVIEW`, etc.).

4. Hardening de seguranca e deploy
   - revisar RLS/policies no Supabase.
   - revisar envs de producao (Cloudinary/Supabase) e permissao admin.

### Notas de arquitetura

- Supabase Auth continua sendo o gate de seguranca do dashboard e das APIs de assinatura/upload.
- Prisma continua como camada de persistencia para `pet_media`.
- Cloudinary fica como armazenamento e entrega otimizada de imagem/video.

### Referencias usadas

- Cloudinary Programmable Media Overview:
  - https://cloudinary.com/documentation/programmable_media_overview
- Cloudinary Node.js Quick Start:
  - https://cloudinary.com/documentation/node_quickstart

## Definicao de pronto para encerrar MVP

- dashboard acessivel apenas por admin
- CRUD de pets estavel
- importacao por planilha funcionando (template + upload)
- listagem/edicao sem regressao
- upload de imagem principal + galeria via Cloudinary funcionando
- vinculo de midia salvo em `pet_media`
- secao de pets da home obedecendo regra de `featured`

## Notas tecnicas

- MVP continua sem migrations versionadas; evolucao rapida via `prisma db push`.
- Em pre-producao/producao, migrar para fluxo com migrations versionadas.
- Warning de cache do webpack nao impacta MVP; `pnpm dev` agora usa Turbopack por padrao.
