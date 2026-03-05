# Feature: Home

Tudo que alimenta a página inicial: estatísticas, pets em destaque, doação PIX, transparência, bazar, histórias, FAQ.

## Conteúdo

| Pasta           | Responsabilidade                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **hooks/**      | useStats, useFeaturedPets, useTransparencySummary, useBazaarFeatured, useStories                                                                                                                                                     |
| **services/**   | fetchStats, fetchFeaturedPets, fetchTransparencySummary, fetchBazaarFeatured, fetchStories                                                                                                                                           |
| **components/** | HomeHero, HomeSectionPets, HomeSectionPetsCard, HomeSectionPetsFilters, HomeSectionPetsSkeleton, HomeSectionHowAdoptionWorks, HomeSectionDonationPix, HomeSectionTransparency, HomeSectionBazaar, HomeSectionStories, HomeSectionFaq |

## Dependências

- Tipos em `types/home.ts` (Pet, PetFilters, Stats, DonationConfig, etc.).
- API: `/api/stats`, `/api/pets`, `/api/donations/config`, `/api/transparency/summary`, `/api/bazaar/featured`, `/api/stories`.
- UI e hooks transversais em `shared/`.

## Uso

As páginas e seções em `app/(public)/home/` importam daqui, por exemplo:

```ts
import { useStats } from "@/features/home/hooks/useStats";
import { fetchFeaturedPets } from "@/features/home/services/pets";
```
