# Etapas de implementação — Schemas e CRUD (MVP)

## Objetivo

Implementar primeiro a base de dados e operações CRUD dos domínios centrais:

1. `pets`
2. `pet_media`
3. `adoption_requests`

Sem incluir upload de planilha nesta fase.

---

## Escopo desta fase

### Incluído

- modelagem Prisma com enums e relações
- sincronização de schema no Supabase (`db push`)
- CRUD de `pets` e `pet_media` no backend
- criação/listagem de `adoption_requests`
- endpoints HTTP em `app/api/*` como adaptadores
- validação com Zod nos payloads de escrita

### Fora desta fase

- importação por Excel/CSV
- upload Cloudinary no fluxo final
- painel completo de triagem de solicitações

---

## Estrutura alvo

```txt
backend/
  prisma/
    schema.prisma
  modules/
    pets/
      application/
        create-pet.ts
        list-pets.ts
        get-pet-by-id.ts
        update-pet.ts
        delete-pet.ts (opcional no MVP)
        set-main-media.ts
    adoption-requests/
      application/
        create-adoption-request.ts
        list-adoption-requests.ts
        update-adoption-request-status.ts
  infrastructure/
    prisma/
      client.ts

app/
  api/
    pets/
      route.ts              # GET list, POST create
      [id]/
        route.ts            # GET by id, PATCH update
    pet-media/
      route.ts              # POST create media
      [id]/
        route.ts            # PATCH update media / DELETE
    adoption-requests/
      route.ts              # GET list, POST create
      [id]/
        route.ts            # PATCH status
```

---

## Etapa 1 — Schema Prisma

## Entidades

### `Pet`

- dados principais do animal
- controle de publicação e destaque
- relação `1:N` com `PetMedia`
- relação `1:N` com `AdoptionRequest`

### `PetMedia`

- mídia de pet (imagem/vídeo)
- ordenação de galeria
- marcação de mídia principal

### `AdoptionRequest`

- solicitação de adoção vinculada ao pet
- status de acompanhamento

## Enums recomendados

- `PetSpecies`: `DOG | CAT | OTHER`
- `PetSize`: `SMALL | MEDIUM | LARGE`
- `PetGender`: `MALE | FEMALE | UNKNOWN`
- `PetStatus`: `AVAILABLE | RESERVED | ADOPTED | TREATMENT`
- `PetMediaType`: `IMAGE | VIDEO`
- `AdoptionRequestStatus`: `PENDING | IN_REVIEW | APPROVED | REJECTED | CANCELLED`

## Regras de modelagem

- `pets.external_id` opcional, mas único quando informado
- `adoption_requests.status` default `PENDING`
- `pet_media.sort_order` inteiro para ordenar galeria
- `pet_media.is_main` controlado por regra de aplicação (apenas 1 principal por pet)

## Comandos

```bash
pnpm prisma:generate
pnpm prisma:push
```

---

## Etapa 2 — Contratos de validação (Zod)

Criar schemas de entrada para escrita:

- `createPetSchema`
- `updatePetSchema`
- `createPetMediaSchema`
- `updatePetMediaSchema`
- `createAdoptionRequestSchema`
- `updateAdoptionRequestStatusSchema`

Regras mínimas:

- `name` obrigatório para pet
- `petId` obrigatório em `pet_media` e `adoption_requests`
- `phone` obrigatório em solicitação
- `email` opcional (mas válido quando presente)

---

## Etapa 3 — Casos de uso (backend/modules)

Implementar casos de uso isolados, sem acoplamento com HTTP:

- `listPets`
- `getPetById`
- `createPet`
- `updatePet`
- `createPetMedia`
- `updatePetMedia`
- `createAdoptionRequest`
- `listAdoptionRequests`
- `updateAdoptionRequestStatus`

Regra crítica:

- ao marcar uma mídia como principal, remover `is_main=true` das demais mídias do mesmo pet (transação).

---

## Etapa 4 — Endpoints HTTP

Mapear casos de uso para endpoints:

### Pets

- `GET /api/pets`
- `POST /api/pets`
- `GET /api/pets/[id]`
- `PATCH /api/pets/[id]`

### Pet media

- `POST /api/pet-media`
- `PATCH /api/pet-media/[id]`
- `DELETE /api/pet-media/[id]` (opcional)

### Adoption requests

- `GET /api/adoption-requests` (admin)
- `POST /api/adoption-requests` (público)
- `PATCH /api/adoption-requests/[id]` (admin, status)

Padrão de resposta em erro:

```json
{
  "ok": false,
  "message": "Validation failed",
  "issues": []
}
```

---

## Etapa 5 — Critérios de pronto

- schema Prisma sincronizado no Supabase
- CRUD de pets funcional
- CRUD de pet_media funcional
- criação e atualização de status de adoption_requests funcional
- regra de mídia principal aplicada corretamente
- lint e build passando

---

## Próxima fase após esta

Depois de concluir schemas + CRUD:

1. implementar importação por planilha (`xlsx`)
2. criar preview de importação no dashboard
3. aplicar persistência em lote com relatório final
