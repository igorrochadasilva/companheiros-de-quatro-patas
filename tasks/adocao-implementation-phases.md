# Adoção (/adocao) — Plano por etapas

Plano de execução baseado no [adocao-implementation.md](./adocao-implementation.md), em ordem de dependências. Cada etapa pode ser feita em um PR ou sessão. Foco em padrão do projeto, reuso (tipos, hooks, UI, mensagens) e clean code.

---

## Status por feature (Adoção)

| Feature                                                | Etapa | Status      | Observação                                                     |
| ------------------------------------------------------ | ----- | ----------- | -------------------------------------------------------------- |
| Infra (API paginada, sort, usePets, searchParams)      | 0     | 🔲 Pendente | API `page/limit/totalPages`, hook usePets, sort na URL         |
| Layout base (PageShell, hero, 2 colunas, Sheet mobile) | 1     | 🔲 Pendente | Hero + sidebar filtros + área resultados                       |
| Toolbar (contador, ordenação, limpar filtros)          | 2     | 🔲 Pendente | Reusa AdocaoFilters; toolbar acima do grid                     |
| Filtros URL-driven (sidebar + Drawer mobile)           | 3     | 🟡 Parcial  | `AdocaoFilters` existe; integrar URL + debounce cidade + Sheet |
| Grid + estados + paginação                             | 4     | 🟡 Parcial  | `AdocaoGrid` existe; falta paginação e link “Ver detalhes”     |
| Dialog “Quero adotar” (WhatsApp + formulário)          | 5     | 🔲 Pendente | Reusar lógica do card da Home ou componente dedicado           |
| SEO + a11y + performance                               | 6     | 🔲 Pendente | Metadata, H1/H2, alt, lazy, layout estável                     |

---

## Estado atual (resumo)

- **Página:** `app/(public)/adocao/page.tsx` — apenas H1 + subtítulo; sem layout 2 colunas.
- **Componentes existentes:**
  - `AdocaoFilters`: espécie (tabs), porte, idade, cidade, urgentes, limpar; usa `home.pets` e `adoption.toolbar` em mensagens (checar se `adoption` existe em `pt-br.json`).
  - `AdocaoGrid`: loading (skeleton), empty, error, grid de cards; usa `HomeSectionPetsCard` e `HomeSectionPetsSkeleton`; track `view_pet_list`.
- **Back-end:** `GET /api/pets` aceita filtros e `limit`; retorna `{ items }` (sem `total`, `page`, `totalPages`).
- **Tipos:** `Pet`, `PetFilters` em `types/home.ts`; `search-params` em `shared/lib/search-params.ts`.
- **Rota de detalhe:** `/adocao/[slug]` existe (página mínima); “Ver detalhes” deve levar para ela.

---

## Etapa 0 — Infraestrutura (fazer primeiro)

Garantir API listagem completa, hook de listagem e URL como fonte de verdade (filtros + sort + paginação).

| Item              | Entrega                                                                                                                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API GET /api/pets | Aceitar `page`, `limit`, `sort`; retornar `{ items, total, page, totalPages }`. Manter filtros atuais (species, size, ageGroup, city, urgentOnly).                                                                                                                         |
| Sort              | Valores: `recent` (default), `urgent`, `age_asc`, `age_desc`, `name_asc`. Aplicar na lista mock antes de fatiar.                                                                                                                                                           |
| Serviço           | `fetchPets(filters, page, limit, sort)` em `shared/services/pets.ts` (ou novo `fetchPetsForAdoption`), retorno tipado com paginação.                                                                                                                                       |
| Hook usePets      | `usePets(filters, page, sort)` em `shared/hooks/usePets.ts` — React Query, key com filters/page/sort; retorna `{ data, isLoading, isError, refetch }`.                                                                                                                     |
| searchParams      | Estender `parsePetFiltersFromSearchParams` / `toPetFiltersSearchParams` se precisar de novos campos. Adicionar `page`, `sort` na URL (ex.: `?page=1&sort=recent`). Util centralizado em `shared/lib/search-params.ts` (ou `adocao-search-params.ts`) para leitura/escrita. |
| Mensagens         | Garantir `messages.adoption` em `pt-br.json`: `hero`, `toolbar`, `empty`, `error`, `breadcrumb` (opcional).                                                                                                                                                                |

**Arquivos sugeridos:** `app/api/pets/route.ts`, `shared/services/pets.ts`, `shared/hooks/usePets.ts`, `shared/lib/search-params.ts`, `messages/pt-br.json`.

**Definição de pronto:** GET /api/pets retorna paginação e sort; usePets consome a API; filtros e paginação/sort refletidos na URL; mensagens da adoção disponíveis.

---

## Etapa 1 — Layout da página (estrutura base)

Estrutura visual e navegação da página de adoção.

| Item        | Entrega                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PageShell   | Envolver conteúdo em `PageShell` (ou equivalente do DS) para max-width e padding consistente.                                                                                                            |
| Hero        | Título “Adoção” (H1), subtítulo “Filtre e encontre o pet ideal…” (ou igual em mensagens). Breadcrumb opcional: Home / Adoção.                                                                            |
| Layout      | Desktop: 2 colunas — esquerda sidebar (filtros), direita área de resultados (toolbar + grid). Mobile: botão “Filtrar” que abre Sheet/Drawer com os mesmos filtros; toolbar sempre visível acima do grid. |
| Componentes | Reusar Section, Button, Sheet, Separator do DS; garantir aria-label no Sheet do menu de filtros.                                                                                                         |

**Arquivos sugeridos:** `app/(public)/adocao/page.tsx`, possível `AdocaoHero.tsx` e `AdocaoLayout.tsx` (ou tudo em page + \_components).

**Definição de pronto:** Página com hero e layout 2 colunas (desktop) e drawer de filtros (mobile); PageShell aplicado; a11y básico no drawer.

---

## Etapa 2 — Toolbar de resultados

Área acima do grid: contador, ordenação e limpar filtros.

| Item      | Entrega                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Contador  | Texto “{total} pets encontrados” (ou “Nenhum pet” quando total === 0), usando mensagens.                                                       |
| Ordenação | Select com opções: Mais recentes, Urgentes primeiro, Idade (crescente/decrescente), Nome (A–Z). Valor sincronizado com `sort` na URL.          |
| Limpar    | Botão “Limpar filtros” visível quando houver filtros ativos; ao clicar, limpa filtros e sort/page na URL e dispara track (ex.: clear_filters). |
| Analytics | `sort_pets` ao trocar ordenação; `clear_filters` ao limpar.                                                                                    |

**Arquivos sugeridos:** `AdocaoToolbar.tsx` em `app/(public)/adocao/_components/`, uso em page ou layout de resultados.

**Definição de pronto:** Toolbar mostra total, select de sort e botão limpar; URL atualiza; eventos de analytics disparados.

---

## Etapa 3 — Filtros (sidebar + Drawer, URL-driven)

Filtros já existem em `AdocaoFilters`; integrar à URL e ao mobile.

| Item      | Entrega                                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| URL       | Qualquer alteração de filtro atualiza searchParams e reseta `page=1`. Leitura inicial dos filtros a partir da URL (SSR ou cliente). |
| Debounce  | Campo cidade com debounce (ex.: 300–500 ms) antes de atualizar URL/dados.                                                           |
| Mobile    | No Sheet/Drawer, mesmo conteúdo de filtros; botões “Aplicar filtros” e “Limpar”; ao aplicar, fecha o drawer e atualiza URL.         |
| Badge     | No botão “Filtrar” (mobile), exibir badge com quantidade de filtros ativos quando > 0.                                              |
| Analytics | `filter_pets` com payload de filtros ao aplicar/alterar (evitar disparo excessivo no debounce).                                     |

**Arquivos sugeridos:** `AdocaoFilters.tsx`, hook ou util que lê/escreve filtros na URL; page ou layout que monta sidebar + Sheet.

**Definição de pronto:** Filtros refletem e atualizam a URL; cidade com debounce; mobile com Sheet e badge; analytics ao aplicar filtros.

---

## Etapa 4 — Grid, estados e paginação

Completar listagem: links, paginação ou “Carregar mais” e estados bem definidos.

| Item      | Entrega                                                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Card      | Manter ou adaptar card (foto, nome, badges, idade/porte/cidade). “Ver detalhes” → link para `/adocao/[slug]`. “Quero adotar” abre Dialog (Etapa 5).      |
| Empty     | Mensagem “Nenhum pet encontrado…” + sugestão “tente remover cidade/porte” + botão “Limpar filtros” (já existe em AdocaoGrid).                            |
| Error     | Mensagem + botão “Tentar novamente” (já existe).                                                                                                         |
| Paginação | Escolher uma: (A) Paginação clássica (Pagination) ou (B) “Carregar mais” (infinite). `page` e `totalPages` vêm da API; URL com `page`.                   |
| Analytics | `view_pet_list` (já existe); `select_pet` ao clicar em “Ver detalhes”; `start_adoption` ao abrir “Quero adotar”; `paginate` ou `load_more` se aplicável. |

**Arquivos sugeridos:** `AdocaoGrid.tsx`, possível `AdocaoCard.tsx` ou reuso de `HomeSectionPetsCard` com prop de link (detalhe) e callback “Quero adotar”.

**Definição de pronto:** Grid com links corretos, empty/error/loading ok, paginação ou “Carregar mais” funcionando com URL; analytics cobertos.

---

## Etapa 5 — Modal “Quero adotar”

Dialog focado em conversão, sem formulário pesado na primeira ação.

| Item      | Entrega                                                                                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conteúdo  | Nome do pet; texto “Como prefere falar com a gente?” (ou similar em mensagens).                                                                                                                     |
| Ações     | Botão WhatsApp (link com mensagem pré-preenchida); botão/link para formulário (ex.: `/adocao/[slug]/candidatar` ou `/contato?assunto=adocao&pet=...`). Se não houver WhatsApp, usar e-mail/contato. |
| Analytics | `start_adoption` ao abrir; `adoption_contact_whatsapp` e `adoption_contact_form` ao clicar em cada opção.                                                                                           |

**Arquivos sugeridos:** Componente `AdoptionContactDialog.tsx` ou similar em `_components`; reutilizável a partir do card da Home e da página de adoção.

**Definição de pronto:** Dialog abre ao clicar “Quero adotar”; WhatsApp e formulário/contato funcionando; eventos disparados.

---

## Etapa 6 — SEO, acessibilidade e performance

| Item     | Entrega                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Metadata | `title` e `description` para `/adocao` (generateMetadata ou export estático). Canonical opcional se houver muitas variações de filtros.     |
| Headings | H1 “Adoção” na hero; seções com H2 onde fizer sentido (ex.: “Resultados”).                                                                  |
| A11y     | Foco visível em filtros e cards; Sheet com aria-label; botões e links descritivos.                                                          |
| Imagens  | `alt` em todas as imagens de pets; lazy load (exceto primeiras da lista se quiser otimizar LCP); altura reservada para evitar layout shift. |

**Arquivos sugeridos:** `app/(public)/adocao/page.tsx` (metadata), componentes de card e grid (alt, dimensões).

**Definição de pronto:** SEO básico ok; navegação por teclado e leitores de tela; imagens com alt e sem shift relevante.

---

## Ordem sugerida de execução

1. **Etapa 0** — Infra (API paginada + sort, usePets, searchParams com page/sort, mensagens adoption).
2. **Etapa 1** — Layout (PageShell, hero, 2 colunas, Sheet mobile).
3. **Etapa 2** — Toolbar (contador, sort, limpar).
4. **Etapa 3** — Filtros URL + debounce + Sheet mobile + badge.
5. **Etapa 4** — Grid completo (links, paginação ou load more, estados, analytics).
6. **Etapa 5** — Dialog “Quero adotar”.
7. **Etapa 6** — SEO, a11y e performance.

As etapas 2 e 3 podem ser feitas em paralelo após a 1; a 4 depende de 0 e da estrutura de layout da 1.

---

## Checklist final (DoD da página de adoção)

- [ ] URL é fonte de verdade para filtros, sort e page; links compartilháveis.
- [ ] Layout responsivo (sidebar + drawer mobile) e consistente com o DS.
- [ ] Loading, empty e error states na listagem.
- [ ] “Ver detalhes” → `/adocao/[slug]`; “Quero adotar” abre dialog com WhatsApp e formulário/contato.
- [ ] Analytics: view_pet_list, select_pet, start_adoption, filter_pets, sort_pets, clear_filters, paginate/load_more.
- [ ] SEO: title/description e H1/H2 corretos.
- [ ] A11y e imagens com alt; sem layout shift relevante.
