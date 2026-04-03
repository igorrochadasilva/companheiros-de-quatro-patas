# Implementacao tecnica por etapas - Dashboard de pets (estrategia Prisma para MVP)

## Contexto real do repositório (03/04/2026)

- Estrutura sem `src/`: usamos `app/`, `features/`, `shared/`, `types/`, `constants/`.
- Dashboard base em `/dashboard` já existe e segue padrão de feature.
- Supabase Auth + middleware SSR já está configurado.
- Cloudinary server-side já está preparado.
- `app/api/pets/route.ts` ainda usa mock e precisa migrar para banco real.
- Decisao atual: usar Prisma para modelagem e `db push` no MVP (sem migrations por enquanto).

## Objetivo do MVP

Entregar um dashboard de pets funcional, com:

- listagem administrativa
- edição manual
- importação por planilha (CSV/XLSX)
- upload de mídia no Cloudinary
- persistência em Postgres via Prisma
- manutenção do contrato da API pública de pets

## Estratégia arquitetural (híbrida)

### Decisao 1 - ORM e schema sync no MVP

Usar Prisma para schema e acesso ao banco, com `prisma db push` para sincronizar tabelas no ambiente de MVP.

Observacao:

- migrations entram na fase de producao, quando o modelo estiver mais estavel.

### Decisão 2 — Auth e sessão

Manter Supabase Auth (`@supabase/ssr`) para autenticação administrativa e sessão.

### Decisão 3 — Camada de acesso a dados

Centralizar queries em serviços de backend (`features/pets/services` + `shared/lib/prisma`), evitando SQL espalhado.

### Decisão 4 — Contrato público estável

`GET /api/pets` continua com o mesmo payload:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "totalPages": 1
}
```

## Escopo MVP

### Incluído

- tabela `pets` criada via Prisma `db push`
- `GET /api/pets` usando Prisma (sem quebrar front público)
- `POST /api/pets/import` com validação dupla e relatório
- `/dashboard/pets` e `/dashboard/pets/[id]`
- `/dashboard/pets/import` com preview e confirmação
- upload assinado para Cloudinary

### Fora do MVP

- múltiplos perfis de permissão
- histórico/auditoria completa
- merge avançado na importação
- workflow de aprovação

## Stack alvo

### Frontend

- Next.js 16 + App Router
- TypeScript
- Tailwind + shadcn
- React Hook Form + Zod
- TanStack Query

### Backend / Infra

- Supabase Auth (SSR)
- Postgres (Supabase) + Prisma ORM
- Cloudinary
- Route Handlers

### Dependências principais

- `@prisma/client`
- `prisma`
- `@supabase/ssr`
- `@supabase/supabase-js`
- `xlsx`
- `cloudinary`

## Variáveis de ambiente (alvo)

```env
# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=sua_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_supabase_service_role_key

# Prisma / Postgres
DATABASE_URL=sua_connection_string_pooling_ou_direta
DIRECT_URL=sua_connection_string_direta

# Cloudinary
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_cloudinary_api_key
CLOUDINARY_API_SECRET=seu_cloudinary_api_secret
```

## Estrutura de pastas proposta

```txt
prisma/
  schema.prisma

app/
  (admin)/
    dashboard/
      pets/
        page.tsx
        import/
          page.tsx
        [id]/
          page.tsx
  api/
    pets/
      route.ts
      import/
        route.ts
      [id]/
        route.ts
    media/
      cloudinary-sign/
        route.ts

features/
  pets/
    components/
    hooks/
    schemas/
    services/
    utils/

shared/
  lib/
    prisma/
      client.ts
    supabase/
      client.ts
      server.ts
      middleware.ts
    cloudinary/
      server.ts
```

## Modelo de dados `Pet` (Prisma)

```prisma
model Pet {
  id           String   @id @default(uuid()) @db.Uuid
  externalId   String?  @map("external_id")
  name         String
  species      String
  breed        String?
  age          String?
  size         String?
  gender       String?
  color        String?
  castrated    Boolean  @default(false)
  vaccinated   Boolean  @default(false)
  description  String?
  status       String   @default("available")
  city         String?
  state        String?
  featured     Boolean  @default(false)
  published    Boolean  @default(true)
  mainImageUrl String?  @map("main_image_url")
  galleryUrls  String[] @default([]) @map("gallery_urls")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@index([status], map: "idx_pets_status")
  @@index([published], map: "idx_pets_published")
  @@index([featured], map: "idx_pets_featured")
  @@index([species], map: "idx_pets_species")
  @@unique([externalId], map: "uq_pets_external_id")
  @@map("pets")
}
```

## Etapas de implementacao (reorganizadas)

### Fase 0 — Base técnica (status: em andamento)

1. Dashboard base e rotas `/dashboard` prontas.
2. Supabase SSR e Cloudinary server-side prontos.
3. Definir estratégia Prisma como padrão de banco.

### Fase 1 - Prisma foundation

4. Instalar `prisma` e `@prisma/client`.
5. Criar `prisma/schema.prisma` com datasource PostgreSQL.
6. Criar `shared/lib/prisma/client.ts` (singleton).
7. Atualizar `.env.example` com `DATABASE_URL` e `DIRECT_URL`.

### Fase 2 - Schema e sync inicial

8. Modelar `Pet` no Prisma.
9. Rodar `prisma db push` para criar/atualizar tabelas no Supabase.
10. Rodar `prisma generate` e validar queries no app.

### Fase 3 - APIs com dados reais

11. Trocar `GET /api/pets` de mock para Prisma mantendo contrato.
12. Implementar `PATCH /api/pets/[id]`.
13. Implementar `POST /api/pets/import` com dedupe e relatório.

### Fase 4 - Dashboard operacional

14. Listagem admin `/dashboard/pets` com busca/filtros.
15. Edição `/dashboard/pets/[id]` com RHF + Zod.
16. Upload Cloudinary integrado ao fluxo de edição.

### Fase 5 - Importacao por planilha

17. Template oficial de planilha.
18. Schema Zod para linha, normalização e parsing.
19. Preview com erros por linha e resumo final.

### Fase 6 - Hardening

20. Guard de rotas admin com sessão real.
21. Logs padronizados e tratamento de erro consistente.
22. Cobertura mínima de testes de parser/importação.

## Riscos e mitigação

### Risco 1 — Duas fontes de verdade (Prisma vs Supabase client)

Mitigação:

- definir Prisma como fonte de escrita/leitura das APIs de pets
- usar Supabase client apenas para Auth/sessão

### Risco 2 — Regressão no front público

Mitigação:

- preservar contrato de `GET /api/pets`
- validar paginação/filtros antigos durante migração

### Risco 3 — Duplicidade de importação

Mitigação:

- `externalId` único
- dedupe secundário (`name + species + city` normalizados)

### Risco 4 — Exposição de segredos

Mitigação:

- Prisma apenas server-side
- `SERVICE_ROLE` e segredos Cloudinary nunca no cliente

## Comandos Prisma para MVP

Sugestao de scripts no `package.json`:

- `prisma:generate`: `prisma generate`
- `prisma:push`: `prisma db push`
- `prisma:studio`: `prisma studio`
- `prisma:reset`: `prisma db push --force-reset` (usar so em ambiente de dev)

Fluxo operacional recomendado no MVP:

1. editar `prisma/schema.prisma`
2. rodar `pnpm prisma:generate`
3. rodar `pnpm prisma:push`
4. validar no Supabase e no app

Transicao para producao:

- congelar schema
- introduzir migrations com `prisma migrate`
- passar a versionar alteracoes de banco no repositorio

## Checklist de pronto (MVP)

- Prisma configurado e schema sincronizado com `db push`
- `GET /api/pets` usando Prisma sem regressão
- dashboard de pets funcional
- importação em lote com preview e relatório
- upload de mídia integrado
- auth admin ativa nas rotas sensíveis
