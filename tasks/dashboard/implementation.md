# Implementação técnica por etapas — Dashboard de pets (adaptado ao projeto atual)

## Contexto real do repositório (30/03/2026)

Antes de implementar, estes pontos já existem hoje e impactam o plano:

- Estrutura sem `src/`: usamos `app/`, `features/`, `shared/`, `types/`, `constants/`.
- Dashboard inicial já existe em `app/(admin)/dashboard`, mas ainda é placeholder.
- Não há autenticação administrativa ativa (sem `middleware.ts`, sem guard de rota).
- `app/api/pets/route.ts` usa dados mock e já abastece o site público de adoção.
- Supabase e Cloudinary ainda não estão integrados no projeto.
- Variáveis atuais em `.env.example` cobrem apenas Contentful.

## Objetivo do MVP (revisado)

Entregar um dashboard funcional para gestão de pets sem quebrar o fluxo público atual, com:

- listagem administrativa de pets
- importação em lote por planilha (CSV/XLSX)
- edição manual de pet
- upload de mídia via Cloudinary
- persistência no Supabase
- proteção de rotas administrativas

## Escopo do MVP

### Incluído

- autenticação administrativa simples (Supabase Auth)
- tabela `pets` no Supabase (com índices e constraints essenciais)
- endpoint de importação em lote (`POST /api/pets/import`)
- tela de importação com preview e erros por linha
- listagem `/dashboard/pets` com filtros básicos
- edição `/dashboard/pets/[id]`
- upload de imagem principal e galeria (Cloudinary)
- adaptação da API pública de pets para usar Supabase (sem mudar contrato)

### Fora do MVP inicial

- workflow de aprovação
- histórico/auditoria completa
- múltiplos níveis de permissão
- merge avançado na importação
- editor avançado de imagem

## Decisões arquiteturais (adaptadas)

### Decisão 1 — Rota administrativa

Manter prefixo atual `/dashboard` (coerente com `app/(admin)/dashboard`) e não migrar para `/admin` neste MVP.

Motivo:

- reduz refactor de rota e risco de quebrar links
- acelera entrega inicial

Observação:

- o menu atual usa links `/admin/...`; isso precisa ser corrigido no primeiro PR.

### Decisão 2 — Fonte de verdade dos pets

Supabase passa a ser a fonte oficial de pets.

Motivo:

- hoje `/api/pets` usa mock; manter mock paralelamente cria divergência
- o site público deve continuar consumindo `/api/pets`, mas com backend real

### Decisão 3 — Importação

Importação sempre passa por Route Handler (nunca cliente → banco direto).

Motivo:

- validação dupla (cliente + servidor)
- regra de duplicidade centralizada
- trilha mínima de logs

### Decisão 4 — Upload de mídia

Upload assinado no backend para Cloudinary público com transformações automáticas.

Motivo:

- equilíbrio entre simplicidade e segurança no MVP

## Stack (estado alvo do MVP)

### Frontend

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS + shared UI existente
- React Hook Form + Zod
- TanStack Query

### Backend / Infra

- Supabase (Database + Auth)
- Cloudinary
- Route Handlers do Next.js

### Dependências a adicionar

- `@supabase/supabase-js`
- `xlsx`
- `cloudinary`
- opcional: `slugify`

## Estrutura de pastas proposta (sem `src/`)

```txt
app/
  (admin)/
    dashboard/
      page.tsx
      pets/
        page.tsx
        import/
          page.tsx
        [id]/
          page.tsx
  api/
    pets/
      route.ts                # GET público (mantém contrato atual)
      import/
        route.ts              # POST importação em lote
      [id]/
        route.ts              # PATCH edição
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
    supabase/
      client.ts
      server.ts
    cloudinary/
      server.ts

types/
  pets-admin.ts               # tipos de administração/importação
```

## Modelo de dados `pets` (MVP)

```sql
create table public.pets (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  name text not null,
  species text not null,
  breed text,
  age text,
  size text,
  gender text,
  color text,
  castrated boolean not null default false,
  vaccinated boolean not null default false,
  description text,
  status text not null default 'available',
  city text,
  state text,
  featured boolean not null default false,
  published boolean not null default true,
  main_image_url text,
  gallery_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists uq_pets_external_id
  on public.pets (external_id)
  where external_id is not null;

create index if not exists idx_pets_status on public.pets(status);
create index if not exists idx_pets_published on public.pets(published);
create index if not exists idx_pets_featured on public.pets(featured);
create index if not exists idx_pets_species on public.pets(species);
```

Nota:

- `status`, `species`, `size`, `gender` devem ter lista fechada no app (e opcionalmente `check constraint`).

## Etapas de implementação (ordem recomendada)

### Fase 0 — Fundacional (bloqueadores)

1. Corrigir navegação do dashboard para `/dashboard/...`.
2. Adicionar variáveis em `.env.example` para Supabase e Cloudinary.
3. Instalar dependências ausentes.
4. Criar cliente Supabase (server/client).
5. Implementar proteção mínima de rota para `(admin)`.

### Fase 1 — Dados reais de pets

6. Criar migration da tabela `pets` + índices.
7. Trocar `app/api/pets/route.ts` de mock para Supabase mantendo o contrato atual (`items`, `total`, `page`, `totalPages`).
8. Validar filtros e ordenação atuais (`species`, `size`, `ageGroup`, `city`, `urgentOnly`, `sort`).

### Fase 2 — Dashboard operacional

9. Implementar `/dashboard/pets` com tabela, busca e filtros.
10. Implementar `/dashboard/pets/[id]` com formulário RHF + Zod.
11. Implementar upload de mídia para Cloudinary e persistência de URLs.

### Fase 3 — Importação por planilha

12. Definir template oficial (`external_id`, campos obrigatórios, booleanos).
13. Criar schema Zod de linha + normalização (cliente e servidor).
14. Implementar `/dashboard/pets/import` com preview e erros por linha.
15. Implementar `POST /api/pets/import` com validação dupla e relatório final.

### Fase 4 — Hardening

16. Revisar RLS/policies para leitura pública e escrita admin.
17. Padronizar logs de erro e observabilidade básica.
18. Refinar UX com estados de loading/erro/sucesso.

## Contratos importantes (para evitar regressão)

### API pública atual de pets

Enquanto migramos para Supabase, manter resposta:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "totalPages": 1
}
```

### API de importação (`POST /api/pets/import`)

Resposta recomendada:

```json
{
  "inserted": 0,
  "ignored": 0,
  "duplicates": [],
  "errors": []
}
```

## Riscos e mitigação (críticos)

### Risco 1 — Quebra do site público na migração do mock

Mitigação:

- preservar contrato de `GET /api/pets`
- adicionar fallback controlado (erro explícito) se Supabase indisponível

### Risco 2 — Duplicidade na importação

Mitigação:

- `external_id` único quando informado
- regra de dedupe secundária (`name + species + city` normalizados)

### Risco 3 — Upload inseguro

Mitigação:

- assinatura no backend
- limite de MIME e tamanho
- pasta/prefixo por pet no Cloudinary

### Risco 4 — Admin sem proteção real

Mitigação:

- guard de rota antes de liberar operações de escrita
- uso exclusivo de segredo no servidor

## Checklist de pronto (MVP)

- dashboard acessível apenas por admin
- `/dashboard/pets` listando dados reais
- edição manual funcionando
- importação com preview + relatório
- upload de mídia funcional
- `/api/pets` público lendo Supabase sem regressão no front de adoção
