# Feature: Adoption (Adoção)

Listagem de pets para adoção em `/adocao`: filtros, ordenação, paginação, grid e dialog “Quero adotar”.

## Conteúdo

| Pasta           | Responsabilidade                                                            |
| --------------- | --------------------------------------------------------------------------- |
| **hooks/**      | usePets (listagem paginada), usePetFilters (URL ↔ estado) — quando migrados |
| **services/**   | fetchPets (listagem com page, limit, sort) — quando migrado                 |
| **components/** | AdocaoContent, AdocaoFilters, AdocaoGrid, AdocaoHero, AdocaoToolbar         |

## Dependências

- Tipos em `types/home.ts` (Pet, PetFilters).
- `shared/lib/search-params.ts` para parse/serialize de filtros (ou versão específica aqui).
- API: `GET /api/pets` com page, limit, sort.
- UI e analytics em `shared/`.

## Uso

A página `app/(public)/adocao/page.tsx` importa o conteúdo da adoção daqui:

```ts
import { AdocaoContent } from "@/features/adoption/components/AdocaoContent";
import { usePets } from "@/features/adoption/hooks/usePets";
import { fetchPets } from "@/features/adoption/services/pets";
```
