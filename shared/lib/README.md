# Shared Lib

Funcoes utilitarias compartilhadas (utils, formatters, validators).

## Integracoes

- `contentful.ts`: client server-side para Contentful (Delivery/Preview API).
- `supabase/*`: facades que delegam para `backend/infrastructure/supabase`.
- `cloudinary/server.ts`: facade que delega para `backend/infrastructure/cloudinary`.
- `prisma/client.ts`: facade de acesso ao Prisma singleton do backend.
