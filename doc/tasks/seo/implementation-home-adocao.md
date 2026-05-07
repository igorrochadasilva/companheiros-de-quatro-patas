# SEO Home e Adocao - estrategia de melhoria (Next.js 16)

## Data de revisao

2026-05-07

## Objetivo

Melhorar indexacao, relevancia e CTR organica das rotas `"/"` e `"/adocao"` (incluindo `"/adocao/[slug]"`), seguindo boas praticas atuais do App Router no Next.js 16.

## Fontes oficiais (base tecnica)

- Metadata API (`metadata` e `generateMetadata`):
  - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- robots metadata file:
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- sitemap metadata file:
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- JSON-LD no App Router:
  - https://nextjs.org/docs/app/guides/json-ld
- Open Graph / Twitter image file conventions:
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

## Diagnostico atual (Home e Adocao)

## O que ja esta bom

- Home (`src/app/(public)/page.tsx`) e listagem de adocao (`src/app/(public)/adocao/page.tsx`) ja possuem:
  - `title`
  - `description`
  - `alternates.canonical`
  - `openGraph`
  - `twitter`
- Detalhe de pet (`src/app/(public)/adocao/[slug]/page.tsx`) ja possui `generateMetadata` dinamico com canonical e imagem OG quando disponivel.
- Projeto ja possui `robots.ts` e `sitemap.ts`.

## Gaps de impacto direto em SEO

1. Links internos de pet ainda usam `pet.id` em partes da Home e da grade de Adocao, mas o canonical do detalhe favorece `externalId` quando existe.
2. Listagem `"/adocao"` e filtros/paginacao sao client-first (`useQuery` + `router.push`), com pouco HTML util no primeiro response para crawler.
3. Paginacao da listagem usa botoes, nao links reais `<a href>`, reduzindo rastreabilidade.
4. Nao ha JSON-LD de `Organization`, `ItemList` e `Pet` nas rotas prioritarias.
5. Nao existe estrategia de `opengraph-image`/`twitter-image` por arquivo para padrao visual de compartilhamento.

## Escopo desta frente

- `src/app/(public)/page.tsx`
- `src/app/(public)/adocao/page.tsx`
- `src/app/(public)/adocao/[slug]/page.tsx`
- `src/features/home/*` (links para detalhe de pet)
- `src/features/adoption/*` (links, paginacao, bootstrap SSR)
- `src/app/layout.tsx` (JSON-LD organizacional)
- `src/app/sitemap.ts` (consistencia canonical)

## Estrategia de implementacao (por fases)

## Fase 1 - Consistencia canonica e links internos (prioridade alta)

### Objetivo

Garantir um unico endereco canonico por pet em todo o fluxo Home -> Adocao -> Detalhe.

### Implementar

- Padronizar URL de detalhe para `externalId ?? id` em:
  - `src/features/home/components/HomeSectionPetsCard.tsx`
  - `src/features/adoption/components/AdocaoGridV2.tsx`
- Em `src/app/(public)/adocao/[slug]/page.tsx`, redirecionar para slug canonico quando rota acessada nao for canonica.
- Confirmar alinhamento entre:
  - canonical da pagina
  - links internos
  - entradas de `sitemap.ts`

### Criterio de pronto

- Nenhum link interno para detalhe com slug nao canonico.
- Acesso por slug alternativo retorna redirect para slug canonico.

## Fase 2 - Listagem de adocao server-first para indexacao (prioridade alta)

### Objetivo

Entregar HTML inicial rastreavel da listagem sem depender de hidratacao completa.

### Implementar

- Mover bootstrap de dados da listagem para Server Component em `src/app/(public)/adocao/page.tsx`.
- Passar estado inicial para componente client (hidratar com initial data).
- Manter filtros em query string (`searchParams`) como fonte de verdade.
- Revisar canonical da listagem:
  - canonical limpa para URL principal de categoria.
  - parametros de filtro/paginacao com estrategia explicita (indexavel ou nao, conforme regra do negocio).

### Criterio de pronto

- `view-source` da listagem ja contem itens de pets renderizados.
- Filtros e pagina atual continuam funcionando sem regressao de UX.

## Fase 3 - Paginacao e navegação rastreavel (prioridade alta)

### Objetivo

Substituir controle de pagina somente por botoes para um modelo com links rastreaveis.

### Implementar

- Trocar paginacao de `button + onClick` por `Link` com `href` real:
  - `/adocao?page=2&sort=...&...`
- Manter tracking e estado visual ativo.
- Opcional: manter botao apenas como fallback de interacao, mas com link crawlable no markup.

### Criterio de pronto

- Bots conseguem seguir paginacao apenas lendo HTML.
- Navegacao continua fluida para usuario.

## Fase 4 - Dados estruturados (prioridade media/alta)

### Objetivo

Aumentar compreensao semantica por buscadores e elegibilidade a rich results.

### Implementar

- `Organization` no layout publico (`src/app/layout.tsx`).
- `ItemList` na listagem `/adocao` com os pets da pagina.
- `Pet` + `BreadcrumbList` em `/adocao/[slug]`.
- Sanitizar payload JSON-LD (`replace(/</g, "\\u003c")`) conforme guia oficial.

### Criterio de pronto

- JSON-LD valido no Rich Results Test / Schema Markup Validator.
- Dados estruturados coerentes com conteudo visivel.

## Fase 5 - Social metadata e assets OG (prioridade media)

### Objetivo

Padronizar compartilhamento com imagem social confiavel por rota.

### Implementar

- Adicionar arquivos por convencao:
  - `app/opengraph-image.(png|tsx)`
  - `app/twitter-image.(png|tsx)`
- Definir imagem base de Home e variante para adocao/listagem quando fizer sentido.
- Garantir `title` e `description` alinhados entre metadata e conteudo da pagina.

### Criterio de pronto

- Preview consistente em WhatsApp, X e Facebook para Home e Adocao.

## Fase 6 - Medicao e governanca (prioridade media)

### Objetivo

Fechar ciclo de melhoria continua orientado a dados.

### Implementar

- Medir baseline no Search Console:
  - impressoes
  - cliques
  - CTR
  - posicao media
- Criar rotina quinzenal de revisao.
- Registrar evolucao no `doc/tasks/seo/`.

### Criterio de pronto

- Baseline documentado e primeira comparacao publicada.

## Plano de execucao recomendado

1. Fase 1
2. Fase 2
3. Fase 3
4. Fase 4
5. Fase 5
6. Fase 6

## Checklist tecnico por PR

- [ ] `pnpm lint` sem erros
- [ ] `pnpm build` sem erros
- [ ] canonical consistente com URL final renderizada
- [ ] links internos de detalhe usando slug canonico
- [ ] paginacao rastreavel via `<a href>`
- [ ] JSON-LD valido e sanitizado
- [ ] sem regressao funcional em filtros/paginacao

## Riscos e mitigacao

- Risco: regressao de UX ao migrar listagem para server-first.
  - Mitigacao: hidratar com estado inicial e manter camada client para interacoes.
- Risco: redirect canonico mal configurado gerar loop.
  - Mitigacao: comparar slug atual vs slug canonico antes de redirecionar.
- Risco: JSON-LD divergente do conteudo.
  - Mitigacao: montar schema a partir dos mesmos dados usados no render da pagina.

## Fora de escopo desta etapa

- Link building externo
- Campanhas pagas
- Internacionalizacao
- Redesign visual completo
