# Adoption feature rules

- Toda lógica de listagem de pets para `/adocao` fica em `features/adoption` (hooks, services, components).
- Filtros, ordenação e paginação são **dirigidos pela URL** (searchParams), usando `parseAdoptionSearchParams` / `toAdoptionSearchParams`.
- O hook `usePets(filters, page, sort)` é a fonte de dados da listagem; não faça paginação em memória no front.
- O backend `/api/pets` deve ser responsável por aplicar filtros, ordenação e paginação, retornando `{ items, total, page, totalPages }`.
- A página `app/(public)/adocao/page.tsx` deve importar apenas `AdocaoContent` da feature e definir metadata de SEO.
- Qualquer novo texto da página de adoção deve ser adicionado em `messages.adoption.*`.
- Eventos de analytics relacionados à adoção usam `track` com nomes definidos em `shared/lib/analytics.ts` (`view_pet_list`, `filter_pets`, `sort_pets`, `clear_filters`, `paginate`, `start_adoption`, etc.).
