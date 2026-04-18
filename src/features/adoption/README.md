# Feature: Adoption (Adocao)

Listagem de pets para adocao em `/adocao`: filtros, ordenacao, paginacao, grid e dialog "Quero adotar".

## Conteudo

| Pasta           | Responsabilidade                                                              |
| --------------- | ----------------------------------------------------------------------------- |
| **hooks/**      | usePets (listagem paginada)                                                   |
| **services/**   | fetchPets (listagem com page, limit, sort)                                    |
| **components/** | AdocaoContentV2, AdocaoFiltersV2, AdocaoGridV2, AdocaoHeroV2, AdocaoToolbarV2 |

## Dependencias

- Tipos em `types/home.ts` (Pet, PetFilters).
- `shared/lib/search-params.ts` para parse/serialize de filtros.
- API: `GET /api/pets` com page, limit, sort.
- UI e analytics em `shared/`.

## Uso

A pagina `app/(public)/adocao/page.tsx` importa o conteudo da adocao daqui:

```ts
import { AdocaoContentV2 } from "@/features/adoption/components/AdocaoContentV2";
import { usePets } from "@/features/adoption/hooks/usePets";
import { fetchPets } from "@/features/adoption/services/pets";
```
