# Implementacao tecnica por etapas - Dashboard de pets (status atual)

## Data de referencia

07/04/2026

## Objetivo do MVP

Entregar dashboard administrativo funcional para pets, sem regressao no site publico, com:

- autenticacao admin
- CRUD de pets
- importacao por planilha
- persistencia em Supabase/Postgres via Prisma
- gestao de midias por pet
- fluxo publico de adocao via WhatsApp

## Status consolidado

### Concluido

- Estrutura de dashboard consolidada em `/dashboard/*` com organizacao por feature.
- Navegacao e rotas administrativas padronizadas por constantes.
- Tela de login administrativa em `/(public)/login`.
- Guard de acesso admin no layout e nas APIs (`requireAdminApi`).
- Backend organizado em camadas (adaptadores HTTP + casos de uso + infraestrutura).
- Prisma v7 configurado e funcional com `prisma.config.ts`.
- Schema principal aplicado no Supabase:
  - `pets`
  - `pet_media`
  - `adoption_requests`
- Endpoints principais de pets entregues:
  - `GET /api/pets`
  - `POST /api/pets`
  - `PATCH /api/pets/[id]`
  - `DELETE /api/pets/[id]`
- Endpoints de importacao entregues:
  - `POST /api/pets/import`
  - `GET /api/pets/import/template`
- Fluxo de importacao validado no dashboard.
- Integracao Cloudinary concluida para imagem de pets:
  - assinatura segura: `POST /api/media/cloudinary-sign`
  - upload no dashboard por pet
  - persistencia em `pet_media` (`url`, `publicId`, `isMain`, `sortOrder`)
  - definicao de imagem principal
  - remocao com exclusao no Cloudinary + banco
  - reordenacao de galeria por `sortOrder`
- Listagem administrativa com thumbnail da midia principal.
- Mensagens desacopladas por dominio (`messages/pt-br/*.ts`).
- Script de dev ajustado para Turbopack por padrao (`pnpm dev`).
- Regra de destaque da home validada:
  - secao da home lista pets com `featured = true`
- Fluxo publico de adocao ajustado:
  - pagina publica de detalhe em `/adocao/[slug]`
  - CTA de adocao por WhatsApp (mensagem padrao + link da pagina do pet)
  - modal do card sem opcoes de formulario/ficha no MVP atual
- Baseline de SEO tecnico aplicado:
  - metadata global no `app/layout.tsx` com `metadataBase`, Open Graph e Twitter
  - `robots.txt` via `app/robots.ts`
  - `sitemap.xml` via `app/sitemap.ts` (rotas estaticas + pets publicos dinamicos)
  - metadata dinamica em `/adocao/[slug]` com canonical e imagem social
  - `noindex` em rotas sensiveis/nao finais (login, dashboard e placeholders)

### Parcialmente concluido

- Suporte de midia focado em imagem.
- Upload de video ainda nao habilitado.

## Etapa atual do roadmap

As etapas de base, auth, schema, CRUD de pets, importacao por planilha e midia do pet estao funcionais para MVP.

## Proxima etapa recomendada (MVP)

1. Hardening de seguranca e deploy

- revisar RLS/policies no Supabase
- revisar envs de producao e permissao admin

2. QA funcional final

- validar fluxos ponta a ponta: criar, editar, importar, publicar/despublicar
- validar fluxo publico: home (`featured`), adocao, detalhe do pet, CTA WhatsApp

3. Polimentos de UX sem ampliar escopo

- ajustes finos de filtros e paginacao da listagem admin
- melhorias pequenas de mensagens e loading

## Definicao de pronto para encerrar MVP

- dashboard acessivel apenas por admin
- CRUD de pets estavel
- importacao por planilha funcionando
- listagem/edicao sem regressao
- upload de imagem principal + galeria via Cloudinary funcionando
- vinculo de midia salvo em `pet_media`
- secao de pets da home obedecendo regra de `featured`
- pagina publica de detalhe do pet funcionando
- CTA de adocao operando via WhatsApp

## Escopo removido do MVP (por decisao atual)

- painel administrativo de solicitacoes de adocao (`adoption_requests`) fica para pos-MVP
- formulario publico completo de adocao tambem fica para pos-MVP

Referencia: roadmap em `doc/features/post-mvp.md`.

## Notas tecnicas

- MVP continua sem migrations versionadas; evolucao rapida via `prisma db push`.
- Em pre-producao/producao, migrar para fluxo com migrations versionadas.
- Warning de cache do webpack nao impacta MVP; `pnpm dev` usa Turbopack por padrao.
