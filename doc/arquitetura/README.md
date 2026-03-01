# Arquitetura

## Objetivo

Descrever a arquitetura atual e alvo do projeto.

## Visao geral

- Frontend: Next.js 16 com App Router.
- Backend: a confirmar.
- Persistencia: a confirmar.
- Integracoes externas: a confirmar.

## Organizacao de camadas (proposta)

- `app/`: rotas e composicao de paginas (App Router).
- `components/`: componentes de interface reutilizaveis. (a confirmar)
- `lib/`: funcoes utilitarias e servicos de dominio. (a confirmar)
- `services/`: adaptadores de APIs externas. (a confirmar)

## Padrões arquiteturais

- Server Components por padrao quando aplicavel.
- Client Components apenas quando houver necessidade de interatividade.
- Separacao entre camada de apresentacao e regra de negocio.

## Decisoes pendentes

- Modelo de dados para animais, doacoes e itens de bazar.
- Estrategia de autenticacao/autorizacao (se necessaria).
- Estrategia de cache e revalidacao.
