# Adoption Feature Standard

- All listing logic for `/adocao` stays in `features/adoption` (hooks, services, components).
- Filtering, sorting, and pagination are URL-driven (`searchParams`) using `parseAdoptionSearchParams` / `toAdoptionSearchParams`.
- `usePets(filters, page, sort)` is the data source for the listing.
- Backend `/api/pets` is responsible for filters, sorting, and pagination, returning `{ items, total, page, totalPages }`.
- `app/(public)/adocao/page.tsx` should only compose `AdocaoContent` and SEO metadata.
- Any new adoption UI text must be added to `messages.adoption.*`.
- Adoption analytics events should use the `track` naming in `shared/lib/analytics.ts`.
