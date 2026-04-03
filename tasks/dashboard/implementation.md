# Implementacao tecnica por etapas - Dashboard de pets (status atual)

## Data de referencia

03/04/2026

## Estado atual do projeto

### Concluido

- Dashboard base em `/dashboard` ja estruturado por feature.
- Setup Supabase SSR e Cloudinary no backend concluido.
- Prisma atualizado para versao atual (v7) e funcionando com `prisma.config.ts`.
- `prisma generate` e `prisma db push` funcionando.
- Camada `backend/` criada com organizacao clean architecture leve.
- Integracao Contentful movida para backend:
  - `backend/infrastructure/contentful/*`
  - `backend/modules/cms/application/*`
- Endpoints mockados migrados para backend:
  - mocks em `backend/mock/*`
  - regras em `backend/modules/*/application/*`
  - `app/api/*` agora como adaptadores HTTP finos.

### Em andamento

- Migracao de `pets` para dados reais com Prisma (ainda usando mock no modulo de pets).
- Implementacao de endpoints de escrita (`PATCH /api/pets/[id]`, `POST /api/pets/import`).

## Decisoes arquiteturais

### Decisao 1 - Backend orientado a camadas

- `app/api/*` = transporte HTTP (parse/response).
- `backend/modules/*/application/*` = casos de uso.
- `backend/infrastructure/*` = integracoes externas (Prisma, Supabase, Cloudinary, Contentful).
- `backend/mock/*` = dados fake centralizados por dominio.

### Decisao 2 - Prisma no MVP sem migrations

- Usar `db push` para evolucao rapida no MVP.
- Migrations entram na fase de producao/estabilizacao.

### Decisao 3 - Contrato publico preservado

- APIs publicas mantem payload atual para nao quebrar frontend.

## Estrutura de pastas (alvo atual)

```txt
backend/
  infrastructure/
    cloudinary/
    contentful/
    prisma/
    supabase/
  mock/
    bazaar.ts
    donations.ts
    pets.ts
    shelter.ts
    stats.ts
    stories.ts
    transparency.ts
  modules/
    bazaar/application/
    cms/application/
    donations/application/
    pets/application/
    shelter/application/
    stats/application/
    stories/application/
    transparency/application/
  prisma/
    schema.prisma
  shared/
    env.ts

app/
  api/
    * (adaptadores HTTP)
  (admin)/dashboard/
    pets/
      page.tsx
      import/page.tsx
      [id]/page.tsx

prisma.config.ts
```

## Prisma (estado atual)

### Dependencias

- `prisma@7.x`
- `@prisma/client@7.x`
- `@prisma/adapter-pg`
- `pg`

### Configuracao

- `prisma.config.ts` aponta para `backend/prisma/schema.prisma`.
- CLI Prisma usa `DIRECT_URL` (config), client runtime usa `DATABASE_URL` (adapter).

### Scripts

- `pnpm prisma:generate`
- `pnpm prisma:push`
- `pnpm prisma:studio`
- `pnpm prisma:reset`

## Variaveis de ambiente (necessarias)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# opcional de compatibilidade:
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
SUPABASE_SERVICE_ROLE_KEY=

DATABASE_URL=
DIRECT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CONTENTFUL_SPACE_ID=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
```

## Etapas restantes (ordem recomendada)

### Fase 1 - Pets reais no banco

1. Substituir `backend/modules/pets/application/list-pets.ts` (mock) por leitura via Prisma.
2. Manter exatamente o contrato de resposta atual de `GET /api/pets`.
3. Validar filtros e ordenacao existentes (`species`, `size`, `ageGroup`, `city`, `urgentOnly`, `sort`).

### Fase 2 - Escrita de pets

4. Criar `PATCH /api/pets/[id]` com validacao.
5. Criar `POST /api/pets/import` com validacao dupla (frontend/backend), dedupe e relatorio.

### Fase 3 - Dashboard operacional

6. Implementar listagem administrativa real em `/dashboard/pets`.
7. Implementar edicao real em `/dashboard/pets/[id]`.
8. Integrar upload Cloudinary no fluxo de edicao/importacao.

### Fase 4 - Hardening

9. Proteger rotas admin com sessao real.
10. Padronizar erros/logs por modulo.
11. Adicionar testes para parser/importacao.

## Proxima etapa imediata

Migrar `pets` de mock para Prisma no caso de uso `list-pets`.

Esse passo destrava:

- dados reais no site publico
- base para dashboard administrativo real
- continuidade da importacao em lote com persistencia real
