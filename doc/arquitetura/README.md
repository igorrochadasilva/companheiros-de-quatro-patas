# Arquitetura

## Objetivo

Descrever a arquitetura atual e alvo do projeto.

## Visao geral

- Frontend: Next.js 16 com App Router.
- Backend: a confirmar.
- Persistencia: a confirmar.
- Integracoes externas: a confirmar.

## Organizacao de camadas

- **app/** — Rotas e composição de páginas (App Router). Componentes específicos de uma rota em `_components/`.
- **features/** — Estrutura **feature-based**: cada feature tem `hooks/`, `services/`, `components/` (opcional). Agrupa lógica e dados por domínio (home, adoption). Ver [features/README.md](../../features/README.md).
- **shared/** — Transversal: `ui/` (Design System), `lib/` (utils, API client, analytics), `providers/`, hooks genéricos (ex.: useWhenVisible, useIsMobile).
- **types/** — Tipos compartilhados entre features e app.

## Padrões arquiteturais

- Server Components por padrao quando aplicavel.
- Client Components apenas quando houver necessidade de interatividade.
- Separacao entre camada de apresentacao e regra de negocio.

## Decisoes pendentes

- Modelo de dados para animais, doacoes e itens de bazar.
- Estrategia de autenticacao/autorizacao (se necessaria).
- Estrategia de cache e revalidacao.
