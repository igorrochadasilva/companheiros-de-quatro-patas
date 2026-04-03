# Adoção (`/adocao`) — Contentful

**Status: implementado** — hero consome `GET /api/cms/contentful/adoption`.

## Content type no Contentful

| ID do tipo | `adoptPage`                                           |
| ---------- | ----------------------------------------------------- |
| **Campos** | `adoptionTitle` (Symbol), `adoptionSubtitle` (Symbol) |

## API

- **`GET /api/cms/contentful/adoption`** — retorna `AdoptionCmsContent`: `adoptionTitle`, `adoptionSubtitle`, `entryId`.
- **Cliente:** `fetchAdoptionCmsContent` + `useAdoptionCmsContent()` em `features/adoption/`.
- **`AdocaoHero`:** título e subtítulo do CMS; skeleton enquanto carrega; fallback para `messages.adoption.hero` se o CMS estiver vazio ou indisponível.

## Fora do CMS

- Breadcrumb, toolbar, filtros, lista, empty/error → `messages/adoption.*` e API de pets (inalterado).

## Checklist

- [x] Content type `adoptPage` com `adoptionTitle` + `adoptionSubtitle`.
- [x] Endpoint + tipos + hook + `AdocaoHero`.
