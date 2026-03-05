# Architecture rules

- Respeitar a arquitetura descrita em `doc/arquitetura/README.md`.
- Lógica de domínio em `features/<feature>/{hooks,services,components}`.
- UI compartilhada (Design System) em `shared/ui`; utilitários e clientes HTTP em `shared/lib`.
- Rotas e composição de páginas em `app/(public|admin)/...`.
- API routes em `app/api`, retornando dados tipados, sem lógica de apresentação.
- Evitar dependência entre features: se algo for usado por mais de uma feature, extrair para `shared` ou `types`.
- Preferir Server Components para páginas e seções; Client Components apenas quando houver interatividade/estado de navegador.
