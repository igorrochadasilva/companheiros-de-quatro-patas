# Implementacao SEO por etapas - Home e Adocao

## Data de referencia

2026-04-11

## Objetivo

Elevar o ranqueamento organico do projeto com foco principal em intencao de busca de adocao de animais, mantendo a home como pagina de autoridade e distribuicao de links internos.

## Escopo

### Prioridade principal

- `src/app/(public)/adocao/page.tsx`
- `src/app/(public)/adocao/[slug]/page.tsx`
- `src/features/adoption/*`

### Prioridade secundaria

- `src/app/(public)/page.tsx`
- `src/features/home/*`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/layout.tsx`

## Estado atual (baseline)

Ja existe:

- metadata global no layout
- sitemap e robots
- metadata dinamica em detalhe de pet
- canonical em algumas paginas principais

Gaps de impacto:

- listagem de adocao renderizada majoritariamente no client
- paginacao com `href="#"` (fraca rastreabilidade)
- falta de dados estruturados (JSON-LD) para pet/lista/organizacao
- links internos de pet nem sempre apontam para slug canonico
- metadata incompleta em parte das paginas publicas

## Meta de resultado

1. Melhor indexacao da listagem e detalhes de adocao.
2. Maior cobertura de queries long-tail de adocao por pet/cidade/porte.
3. Melhor CTR organica por snippets enriquecidos e metadata consistente.

## Principios de implementacao

- Seguir docs oficiais do Next.js Metadata API e JSON-LD.
- Priorizar mudancas incrementais com validacao por etapa.
- Evitar regressao de UX enquanto otimiza crawl/indexacao.
- Sempre manter canonical consistente entre links internos, sitemap e metadata.

## Etapas de implementacao

## Etapa 1 - Canonical e arquitetura de URL (fundacao)

### Objetivo

Consolidar uma unica URL canonica para cada pet e evitar duplicidade de sinais SEO.

### Implementar

- Padronizar links internos para usar slug canonico do pet (`externalId` quando existir).
- Em `src/app/(public)/adocao/[slug]/page.tsx`, redirecionar para URL canonica quando acessar variante nao canonica.
- Garantir alinhamento entre:
  - `alternates.canonical`
  - links internos
  - entradas do sitemap

### Criterios de pronto

- qualquer acesso alternativo ao mesmo pet resolve em URL canonica
- links de home e adocao apontam para formato unico
- nenhuma pagina de pet indexavel sem canonical explicita

### Validacao

- testar manualmente 3 pets com e sem `externalId`
- conferir header/location de redirect
- rodar `pnpm lint` e `pnpm build`

## Etapa 2 - Listagem de adocao indexavel e paginacao rastreavel

### Objetivo

Tornar `/adocao` mais amigavel para rastreamento e indexacao sem perder filtros.

### Implementar

- mover bootstrap da listagem para render no servidor em `src/app/(public)/adocao/page.tsx`
- manter estado de filtros em URL (`searchParams`)
- substituir paginacao de `href="#"` por links reais (`/adocao?page=2&...`)
- manter fallback client para interatividade, mas com HTML inicial util para crawler

### Criterios de pronto

- pagina inicial de adocao entrega conteudo util sem depender de hidratacao completa
- links de pagina e filtros sao rastreaveis
- canonical da listagem respeita combinacao principal definida

### Validacao

- inspecionar HTML renderizado da listagem
- navegar em 3 combinacoes de filtros via URL
- verificar ausencia de loops de navegacao
- rodar `pnpm lint` e `pnpm build`

## Etapa 3 - Dados estruturados (JSON-LD)

### Objetivo

Melhorar entendimento semantico para buscadores.

### Implementar

- `Organization` no layout publico (dados institucionais da ONG)
- `ItemList` em `/adocao` (pets renderizados na pagina atual)
- `Pet` + `BreadcrumbList` em `/adocao/[slug]`
- `FAQPage` quando FAQ da home/adocao estiver estavel no conteudo

### Criterios de pronto

- JSON-LD valido e consistente com conteudo visivel
- sem campos inventados ou divergentes da pagina

### Validacao

- validar em Rich Results Test
- validar ausencia de warnings criticos no Schema.org
- confirmar render server-side do script JSON-LD

## Etapa 4 - Metadata completa em rotas publicas

### Objetivo

Uniformizar sinais de SEO on-page nas rotas mais importantes.

### Implementar

- completar `alternates.canonical`, `openGraph` e `twitter` nas paginas publicas que ainda estao incompletas
- revisar titulos e descricoes com foco em intencao de adocao local
- padronizar tom de copy para facilitar CTR sem keyword stuffing

### Criterios de pronto

- todas as rotas publicas indexaveis com metadata coerente
- sem conflito entre metadata de layout e metadata de pagina

### Validacao

- checklist por rota publica
- revisar codigo-fonte renderizado
- rodar `pnpm lint` e `pnpm build`

## Etapa 5 - Home como hub de autoridade para adocao

### Objetivo

Fortalecer distribuicao de autoridade da home para adocao e paginas de pet.

### Implementar

- reforcar linking interno contextual para `/adocao` e detalhes de pet
- revisar headings e copy da home para intencao "adocao responsavel"
- revisar FAQ da home com perguntas transacionais e informacionais sobre adocao

### Criterios de pronto

- trilha de navegacao clara home -> listagem -> detalhe
- links com ancoras descritivas e sem duplicidade excessiva

### Validacao

- auditoria manual de links internos
- checagem de heading hierarchy (`h1`, `h2`, etc.)

## Etapa 6 - Medicao e iteracao

### Objetivo

Fechar ciclo de melhoria continua orientado a dados.

### Implementar

- definir baseline e acompanhamento em Search Console:
  - impressao
  - clique
  - CTR
  - posicao media
- acompanhar cobertura de indexacao para `/adocao` e `/adocao/[slug]`
- registrar resultados quinzenais em doc de acompanhamento

### Criterios de pronto

- baseline registrado
- primeira rodada de comparacao publicada

## Sequenciamento recomendado

1. Etapa 1
2. Etapa 2
3. Etapa 3
4. Etapa 4
5. Etapa 5
6. Etapa 6

## Divisao sugerida para agents

### Agent A - Arquitetura SEO

Responsavel por canonical, redirects e consistencia de URL.

Arquivos principais:

- `src/app/(public)/adocao/[slug]/page.tsx`
- `src/features/home/components/HomeSectionPetsCard.tsx`
- `src/app/sitemap.ts`

### Agent B - Render e navegabilidade da listagem

Responsavel por indexabilidade da listagem e paginacao.

Arquivos principais:

- `src/app/(public)/adocao/page.tsx`
- `src/features/adoption/components/AdocaoContent.tsx`
- `src/features/adoption/hooks/usePets.ts`

### Agent C - Dados estruturados

Responsavel por JSON-LD e validacao semantica.

Arquivos principais:

- `src/app/layout.tsx`
- `src/app/(public)/adocao/page.tsx`
- `src/app/(public)/adocao/[slug]/page.tsx`

### Agent D - Metadata e conteudo SEO

Responsavel por metadata das rotas publicas e melhoria de copy.

Arquivos principais:

- `src/app/(public)/*/page.tsx`
- `src/messages/pt-br/*.ts`

## Checklist de validacao por PR

- [ ] `pnpm lint` sem erros
- [ ] `pnpm build` sem erros
- [ ] canonical consistente por pagina
- [ ] paginacao rastreavel sem `href="#"`
- [ ] JSON-LD valido
- [ ] sem regressao de UX

## Riscos e mitigacao

- Risco: regressao de UX ao migrar fluxo para server-first.
  - Mitigacao: manter interatividade client incremental e testes manuais por fluxo.
- Risco: canonical incorreto em cenarios com slug alternativo.
  - Mitigacao: testes com amostra de pets com e sem `externalId`.
- Risco: schema markup divergente do conteudo.
  - Mitigacao: gerar JSON-LD a partir dos mesmos dados usados no render.

## Fora de escopo desta frente

- link building externo
- campanhas pagas
- internacionalizacao
- redesign completo de layout

## Referencias oficiais

- Next.js Metadata API
  - https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js `generateMetadata`
  - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js `robots.txt`
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js `sitemap.xml`
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js JSON-LD guide
  - https://nextjs.org/docs/app/guides/json-ld
