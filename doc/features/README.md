# Features

## Objetivo

Consolidar escopo funcional e status atual por feature com base no codigo em producao.

## Status consolidado (2026-04-11)

### Publico

- [x] `home` (`/`)
  - hero, pets em destaque, transparencia, historias, bazar e FAQ
- [x] `adocao` (`/adocao`, `/adocao/[slug]`, `/adocao/[slug]/candidatar`)
  - listagem, filtros, detalhe do pet e CTA de candidatura
- [x] `doar` (`/doar`)
  - conteudo de doacao com PIX, impacto e transparencia
- [x] `bazar` (`/bazar`, `/bazar/[slug]`)
  - listagem, filtros e detalhe de item
- [x] `sobre` (`/sobre`)
  - contexto institucional e secoes de impacto
- [x] `contato` (`/contato`)
  - canais rapidos e formulario
- [x] `abrigo` (`/abrigo`)
  - progresso e necessidades do abrigo
- [x] `transparencia` (`/transparencia`)
- [x] `login` (`/login`)

### Admin

- [x] `dashboard` (`/dashboard`)
- [x] gestao de pets (`/dashboard/pets`)
- [x] criar/editar pet (`/dashboard/pets/new`, `/dashboard/pets/[id]`)
- [x] importacao de pets (`/dashboard/pets/import`)

## APIs disponiveis

Principais endpoints ativos:

- pets: `GET/POST /api/pets`, `PATCH/DELETE /api/pets/[id]`
- pet media: `POST /api/pet-media`, `PATCH/DELETE /api/pet-media/[id]`
- importacao: `POST /api/pets/import`, `GET /api/pets/import/template`
- adoption requests: `GET/POST /api/adoption-requests`, `PATCH /api/adoption-requests/[id]`
- conteudo e institucional: `/api/stats`, `/api/stories`, `/api/transparency/summary`, `/api/shelter/progress`, `/api/donations/config`
- bazar: `/api/bazaar/featured`, `/api/bazaar/items`
- cms/contentful: `/api/cms/contentful/health`, `/api/cms/contentful/home`, `/api/cms/contentful/adoption`
- suporte: `/api/contact`, `/api/auth`, `/api/webhooks`, `/api/media/cloudinary-sign`

## Pontos de atencao

- padronizar nome da feature de doacao (`donatation`) para evitar inconsistencias futuras.
- consolidar definicao de pronto para testes automatizados por feature.

## Proximo documento

Backlog de evolucao apos o estado atual: `doc/features/post-mvp.md`.
