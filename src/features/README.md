# Features (estrutura feature-based)

Cada **feature** agrupa tudo que é específico de um domínio: hooks, serviços, componentes e tipos. O que é transversal fica em `shared/`.

## Estrutura de uma feature

```
features/
  <feature-name>/
    hooks/       # Hooks de dados e estado da feature
    services/    # Chamadas à API / lógica de rede
    components/  # Componentes reutilizáveis da feature (opcional)
    README.md    # Escopo e responsabilidades da feature
```

- **hooks/** — React Query, estado derivado da URL, etc. Ex.: `useStats`, `useFeaturedPets`, `usePets`.
- **services/** — Funções que fazem fetch (usando `@/shared/lib/api`). Ex.: `fetchStats`, `fetchFeaturedPets`, `fetchPets`.
- **components/** — Componentes que pertencem só a essa feature e são usados em mais de uma página. Componentes de uma página podem continuar em `app/(public)/<rota>/_components/` e importar hooks/services da feature.

## O que fica em `shared/`

- **shared/ui/** — Design System (Button, Card, Dialog, etc.).
- **shared/lib/** — Utils, cliente HTTP, analytics, searchParams genéricos.
- **shared/providers/** — React Query, tema, etc.
- **shared/hooks/** — Hooks transversais (ex.: `useWhenVisible`, `useIsMobile`), não ligados a uma feature.

## Regras

1. **Feature não importa de outra feature.** Se precisar compartilhar, extrair para `shared/` ou tipos em `types/`.
2. **Imports:** usar alias `@/features/<feature>/hooks/...`, `@/features/<feature>/services/...`.
3. **Tipos compartilhados** (ex.: `Pet`, `PetFilters`) continuam em `types/` para evitar dependência circular.
4. **API routes** permanecem em `app/api/`; as features chamam essas rotas via services.

## Features atuais

| Feature      | Escopo principal                                                     | Observação                 |
| ------------ | -------------------------------------------------------------------- | -------------------------- |
| **home**     | Hero, pets em destaque, doação, transparência, bazar, histórias, FAQ | Hooks e services da home   |
| **adoption** | Listagem /adocao, filtros, grid, paginação, dialog “Quero adotar”    | Hooks e services da adoção |

## Migração

A migração pode ser feita por feature: mover hooks e services de `shared/` para `features/<feature>/`, atualizar imports e depois remover os arquivos antigos. Componentes de página podem permanecer em `app/` e passar a importar de `@/features/...`.
