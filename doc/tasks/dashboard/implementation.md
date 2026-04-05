# Implementacao tecnica por etapas - Dashboard de pets (status atual)

## Data de referencia

05/04/2026

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
- Loading de transicao aplicado em rotas admin/public.
- Mensagens desacopladas por dominio (`messages/pt-br/*.ts`) e imports atualizados.
- Script de dev ajustado para Turbopack por padrao (`pnpm dev`).

### Parcialmente concluido

- `pet_media` no backend ja possui CRUD de metadados:
  - `POST /api/pet-media`
  - `PATCH /api/pet-media/[id]`
  - `DELETE /api/pet-media/[id]`
- Ainda falta fluxo completo de upload Cloudinary no dashboard (assinatura/upload/UX).

## Etapa atual do roadmap

As etapas de base, auth, schema, CRUD de pets e importacao por planilha estao funcionais para MVP.

## Proxima etapa recomendada (prioridade)

## Fase de midias (Cloudinary + Supabase/Auth + pet_media)

### Diretriz tecnica (com base na documentacao Cloudinary)

- Usar SDK Node da Cloudinary no backend para assinar uploads e operar assets.
- Nao expor `API_SECRET` no cliente.
- Fazer upload assinado do browser direto para o Upload API da Cloudinary.
- Persistir no banco somente metadados necessarios (`url`, `publicId`, `type`, `isMain`, `sortOrder`).

### Etapas que vamos seguir

1. Padronizar configuracao Cloudinary no backend
   - manter `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` no servidor.
   - reforcar que segredo nunca sai do backend.

2. Criar endpoint de assinatura de upload
   - `POST /api/media/cloudinary-sign`
   - protegido por `requireAdminApi()`
   - payload minimo: `petId` (e metadados do arquivo, opcional)
   - retorno: `signature`, `timestamp`, `apiKey`, `cloudName`, `folder`, `resourceType`.

3. Implementar upload no frontend do dashboard (tela de pet)
   - usar input de arquivo na tela de edicao de pet.
   - fluxo:
     - solicitar assinatura ao backend
     - enviar arquivo para `https://api.cloudinary.com/v1_1/<cloudName>/<resourceType>/upload`
     - receber `secure_url` e `public_id`.

4. Persistir vinculo da midia no pet
   - chamar `POST /api/pet-media` apos upload bem-sucedido.
   - salvar `petId`, `type`, `url`, `publicId`, `isMain`, `sortOrder`.
   - atualizar UI com preview imediato.

5. Finalizar operacoes de gestao de midia
   - marcar/desmarcar principal: `PATCH /api/pet-media/[id]`.
   - remover: `DELETE /api/pet-media/[id]` e apagar asset no Cloudinary.
   - garantir regra de uma unica midia principal por pet.

6. Guard rails de MVP (obrigatorio)
   - validar MIME/type e tamanho maximo por arquivo.
   - limitar quantidade de itens por pet.
   - mensagens claras de erro e sucesso (toast).

7. Entrega final desta fase
   - criar pet -> editar pet -> subir imagem principal e galeria.
   - recarregar pagina e manter midias persistidas.
   - excluir/alterar principal funcionando ponta a ponta.

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

## Notas tecnicas

- MVP continua sem migrations versionadas; evolucao rapida via `prisma db push`.
- Em pre-producao/producao, migrar para fluxo com migrations versionadas.
- Warning de cache do webpack nao impacta MVP; `pnpm dev` agora usa Turbopack por padrao.
