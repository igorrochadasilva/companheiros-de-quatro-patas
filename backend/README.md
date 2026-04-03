# Backend

Camada backend com organizacao orientada a Clean Architecture leve.

## Estrutura

```txt
backend/
  infrastructure/
    prisma/
    supabase/
    cloudinary/
  shared/
    env.ts
```

## Regras

- `app/api/*` atua como adaptador HTTP e delega para backend.
- Integracoes externas (DB/Auth/Storage) ficam em `infrastructure/`.
- Nao acessar `process.env` diretamente fora de `backend/shared/env.ts`.
