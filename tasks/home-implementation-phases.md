# Home Implementation — Plano por etapas

Plano de execução da [home-implementation.md](./home-implementation.md), em ordem de dependências. Cada etapa pode ser feita em um PR ou sessão.

---

## Status por feature (Home)

| Feature                                                                        | Etapa | Status       | Observação                                                 |
| ------------------------------------------------------------------------------ | ----- | ------------ | ---------------------------------------------------------- |
| Infraestrutura (tipos, React Query, APIs mock, hooks, searchParams, analytics) | 0     | ✅ Concluído | `types/home.ts`, providers, services, hooks                |
| Header (menu mobile, sticky, a11y)                                             | 1     | ✅ Concluído | `PublicHeader` com Sheet, sticky, aria-labels              |
| Hero (H1, CTAs, métricas, imagem)                                              | 2     | ✅ Concluído | `HomeHero`, useStats, âncoras #animais / #doar             |
| Animais para adoção (filtros URL, grid, dialog)                                | 3     | ✅ Concluído | `HomeSectionPets`, usePetFilters, useFeaturedPets          |
| Como funciona a adoção                                                         | 4     | ✅ Concluído | `HomeSectionHowAdoptionWorks`                              |
| Doação PIX (chave, copiar, toast)                                              | 5     | ✅ Concluído | `HomeSectionDonationPix`, Toaster                          |
| Transparência (resumo do mês)                                                  | 6     | ✅ Concluído | `HomeSectionTransparency`, useTransparencySummary          |
| Bazar (destaques)                                                              | 7     | ✅ Concluído | `HomeSectionBazaar`, useBazaarFeatured                     |
| Histórias                                                                      | 8     | ✅ Concluído | `HomeSectionStories`, useStories                           |
| Voluntariado / Lar temporário                                                  | 9     | ⏸️ Stand by  | Mensagens em `home.volunteer`; componente não implementado |
| FAQ / Dúvidas frequentes                                                       | 10    | ✅ Concluído | `HomeSectionFaq`, accordion + link "Fale com a gente"      |
| Footer                                                                         | 11    | ⏳ Pendente  | `PublicFooter` no layout público                           |

---

## Estado atual (resumo)

- **Header:** Concluído (menu mobile com Sheet, sticky, acessibilidade).
- **Home:** Seções 2–10 implementadas (Hero até FAQ); Voluntariado em stand by; Footer pendente.
- **APIs mock:** stats, pets, donations/config, transparency/summary, bazaar/featured, stories.
- **React Query:** Provider + hooks por seção.
- **Mensagens:** `messages/pt-br.json` com `home.*` para todas as seções.

---

## Etapa 0 — Infraestrutura (fazer primeiro)

Base para as seções: tipos, layout, dados e analytics.

| Item                   | Entrega                                                                                                         | Arquivos / ações                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tipos TS               | `Pet`, `PetFilters`, `Stats`, `TransparencySummary`, `DonationConfig`, `BazaarItem`, `Story`                    | `types/pet.ts`, `types/stats.ts`, `types/donation.ts`, `types/transparency.ts`, `types/bazaar.ts`, `types/story.ts` (ou um `types/home.ts` agregado) |
| PageShell + Section    | Wrapper de página com max-width e Section com id para âncoras                                                   | `shared/ui/page-shell.tsx`, `shared/ui/section.tsx` (ou só classes no layout)                                                                        |
| React Query            | Provider + configuração (staleTime/retry)                                                                       | `pnpm add @tanstack/react-query`, `app/providers.tsx` (ou no layout), config                                                                         |
| Hooks de dados         | useStats, useFeaturedPets, useDonationConfig, useTransparencySummary, useFeaturedBazaarItems, useStories        | `shared/hooks/useStats.ts`, `useFeaturedPets.ts`, etc. (camelCase = nome do hook)                                                                    |
| APIs mock              | GET /api/stats, /api/pets, /api/donations/config, /api/transparency/summary, /api/bazaar/featured, /api/stories | Rotas em `app/api/...` retornando JSON mock                                                                                                          |
| searchParams ↔ filtros | Parse e serialize de PetFilters para URL (espécie, porte, idade, cidade, urgentes)                              | `shared/lib/search-params.ts` ou `lib/pet-filters-url.ts`                                                                                            |
| Analytics              | Função `track(eventName, payload)` (stub)                                                                       | `shared/lib/analytics.ts` ou `lib/analytics.ts`                                                                                                      |
| Mensagens Home         | Chaves para hero, animais, doar, transparência, bazar, histórias, voluntariado, FAQ, footer                     | Expandir `messages/pt-br.json` com seções `home.*`                                                                                                   |

**Definição de pronto Etapa 0:** Tipos e hooks existem; APIs mock respondem; Provider de React Query envolve a app; searchParams util e `track()` utilizáveis; mensagens da home em pt-br.

---

## Etapa 1 — Header (complementos)

Alinhado à subtask 1 da task: menu mobile + sticky + acessibilidade.

| Item           | Entrega                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Menu mobile    | Menu hambúrguer que abre Sheet com os mesmos links (Adoção, Doar, Bazar, Sobre, Contato, Transparência) + botões Transparência e Quero apoiar |
| Sticky         | Header com `sticky top-0 z-50` e backdrop-blur (já tem blur, só garantir que não quebra em scroll)                                            |
| Acessibilidade | `aria-label` no botão do menu mobile; foco visível nos links (já coberto pelo DS)                                                             |

**Arquivos:** Ajustes em `shared/ui/public-header.tsx`; possível `PublicHeaderNavSheet` ou lógica dentro do próprio header.

**Definição de pronto:** Em mobile, abrir menu mostra Sheet com navegação; header permanece no topo ao rolar; aria-label no botão do menu.

---

## Etapa 2 — Hero (primeira dobra)

Subtask 2: H1, subtítulo, CTAs, métricas, imagem.

| Item     | Entrega                                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Conteúdo | H1 + subtítulo; CTAs "Ver animais" (scroll para #animais) e "Fazer doação" (scroll #doar ou link /doar)                |
| Métricas | 3 mini-cards: adotados / em tratamento / resgatados; dados de GET /api/stats via useStats(); skeleton enquanto carrega |
| Imagem   | Imagem ou placeholder ao lado (grid 2 col no desktop)                                                                  |

**Arquivos:** Componente `HomeHero` (ou seções dentro de `app/(public)/page.tsx`); uso de `PageShell`/`Section`; ids `#animais`, `#doar` nas seções correspondentes.

**Definição de pronto:** Hero renderiza com métricas (mock); skeleton nas métricas; CTAs fazem scroll ou navegação correta.

---

## Etapa 3 — Animais para adoção

Subtask 3: Filtros, grid de cards, API, URL, eventos.

| Item      | Entrega                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Seção     | Título + link "Ver todos" → /adocao; id #animais                                                                                           |
| Filtros   | Espécie (tabs), Porte (select), Idade (select), Cidade (input debounce), Toggle Urgentes, "Limpar filtros"; sincronizados com searchParams |
| Grid      | 8–12 cards: foto, nome, idade, porte, cidade, badges (vacinado/castrado/urgente); "Ver detalhes" e "Quero adotar" (Dialog com opções)      |
| Dados     | GET /api/pets?limit=12&featured=1&...filters; useFeaturedPets(filters); loading = skeleton cards; empty = mensagem + Limpar filtros        |
| Analytics | view_pet_list, filter_pets, select_pet, start_adoption (chamadas a track())                                                                |

**Arquivos:** `HomeSectionPets` (ou nome similar); componente de card de pet; Dialog de "Quero adotar"; uso do util de searchParams; hooks useFeaturedPets e useStats já existentes da Etapa 0.

**Definição de pronto:** Filtros alteram URL e lista; skeleton e empty state ok; eventos disparados.

---

## Etapa 4 — Como funciona a adoção

Subtask 4: Conteúdo estático, 4 passos, CTA.

| Item           | Entrega                                                                               |
| -------------- | ------------------------------------------------------------------------------------- |
| Bloco          | 4 passos em cards ou lista ordenada (ol); CTA "Ver regras completas" → /adocao#regras |
| Acessibilidade | Estrutura semântica (ol/li ou headings)                                               |

**Arquivos:** Componente `HomeSectionAdoptionSteps`; textos em `messages/pt-br.json` (home.adoptionSteps).

**Definição de pronto:** Seção estática visível; link para /adocao#regras funciona.

---

## Etapa 5 — Doação rápida (PIX + impacto)

Subtask 5: PIX, tiers, eventos.

| Item      | Entrega                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------- |
| PIX       | Chave PIX + botão copiar (toast "Copiado"); QR Code se existir; CTA "Ver outras formas" → /doar |
| Tiers     | 3 cards (ex.: R$ 25, R$ 50, R$ 100) com "no que ajuda"; CTA "Quero apoiar"                      |
| Dados     | GET /api/donations/config (pixKey + tiers); useDonationConfig(); skeleton se necessário         |
| Analytics | donate_click, pix_copy                                                                          |

**Arquivos:** `HomeSectionDonate`; uso de Sonner (toast); config vinda da API mock.

**Definição de pronto:** Copiar PIX mostra toast; tiers e CTA visíveis; eventos disparados.

---

## Etapa 6 — Transparência (teaser)

Subtask 6: Resumo do mês + últimas despesas.

| Item     | Entrega                                                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Conteúdo | Métricas: arrecadado / gasto / saldo + "última atualização"; 3 últimas despesas (nome + valor); CTA "Ver relatório completo" → /transparencia |
| Dados    | GET /api/transparency/summary; useTransparencySummary(); skeleton + fallback se API falhar                                                    |

**Arquivos:** `HomeSectionTransparency`; hook e API da Etapa 0.

**Definição de pronto:** Seção mostra dados mock; fallback em erro; link para /transparencia.

---

## Etapa 7 — Bazar (teaser)

Subtask 7: Destaques + CTA.

| Item     | Entrega                                                                                 |
| -------- | --------------------------------------------------------------------------------------- |
| Conteúdo | Descrição curta; grid 4 itens (ou categorias) em destaque; CTA "Acessar bazar" → /bazar |
| Dados    | GET /api/bazaar/featured; useFeaturedBazaarItems(); skeleton                            |

**Arquivos:** `HomeSectionBazaar`; tipos e API da Etapa 0.

**Definição de pronto:** Grid com mock; skeleton; link para /bazar.

---

## Etapa 8 — Histórias / Depoimentos

Subtask 8: 3 cards + CTA.

| Item     | Entrega                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------- |
| Conteúdo | 3 cards depoimento (ou antes/depois); CTA "Ver mais histórias" → /sobre#historias (ou /historias) |
| Dados    | GET /api/stories?limit=3; useStories(); skeleton                                                  |
| Opcional | Carrossel no mobile                                                                               |

**Arquivos:** `HomeSectionStories`; API e hook da Etapa 0.

**Definição de pronto:** 3 cards renderizam; link para sobre/histórias.

---

## Etapa 9 — Voluntariado / Lar temporário

Subtask 9: 2 cards estáticos + prefill contato.

| Item     | Entrega                                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Conteúdo | Cards "Seja voluntário" e "Ofereça lar temporário"; CTAs para /contato?assunto=voluntario e /contato?assunto=lar-temporario (ou equivalente) |

**Arquivos:** `HomeSectionVolunteer`; textos em messages.

**Definição de pronto:** Dois CTAs levam ao contato com assunto correto.

---

## Etapa 10 — FAQ

Subtask 10: Accordion estático.

| Item           | Entrega                                                                  |
| -------------- | ------------------------------------------------------------------------ |
| Conteúdo       | Accordion com 5 perguntas principais; link "Fale com a gente" → /contato |
| Acessibilidade | Accordion shadcn já acessível                                            |

**Arquivos:** `HomeSectionFaq`; conteúdo em messages (home.faq).

**Definição de pronto:** 5 itens no accordion; link para contato.

---

## Etapa 11 — Footer

Subtask 11: Rodapé completo.

| Item     | Entrega                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------- |
| Conteúdo | Nome + slogan; contatos (WhatsApp, email, cidade); links rápidos + redes; (opcional) CNPJ; © ano dinâmico |
| Layout   | Colunas responsivas                                                                                       |

**Arquivos:** Componente `PublicFooter`; uso no layout público (`app/(public)/layout.tsx`); mensagens e constants (URLs redes, contato).

**Definição de pronto:** Footer visível em todas as páginas públicas; links e ano corretos.

---

## Ordem sugerida de execução

1. **Etapa 0** — Infra (tipos, React Query, APIs mock, hooks, searchParams, analytics, mensagens).
2. **Etapa 1** — Header (menu mobile + sticky + a11y).
3. **Etapa 2** — Hero.
4. **Etapa 3** — Animais (maior esforço: filtros + URL + grid + dialog).
5. **Etapas 4–10** — Seções estáticas e com API em sequência (4 → 5 → 6 → 7 → 8 → 9 → 10).
6. **Etapa 11** — Footer e integração no layout.

Após a Etapa 0, as seções 2–10 podem ser paralelizadas em parte (ex.: uma pessoa em Hero, outra em Doação), desde que os dados e mensagens estejam definidos.

---

## Checklist final (DoD da task)

- [ ] Desktop + mobile validados
- [ ] Lighthouse básico ok (imagens, layout shift)
- [ ] Loading / empty / error nas seções com API
- [ ] Links e CTAs funcionando
- [ ] SearchParams dos filtros persistem e são compartilháveis
- [ ] SEO: title/description + headings corretos na Home
