# Home — Contentful

## O que está feito

- **Endpoint** `GET /api/cms/contentful/home` alinhado ao content type `home` **atual** (ver tabela abaixo).
- **Tipo** `HomeCmsContent` em `types/home.ts` — só o que existe no modelo. Copy da home vem do Contentful; em `messages/pt-br.json` ficam só strings **não** modeladas no CMS (ver abaixo).
- **Passos da adoção:** campo **`adoptionHowStepsJson`** (tipo Object no Contentful). Aceita **array** `[{ "title", "description" }, …]` ou objeto com chave `steps`, `items` ou `adoptionHowSteps`.
- **FAQ:** campo **`faqItems`** (Object). Aceita **array** `[{ "question", "answer" }, …]` ou objeto com `items`, `faq`, `questions` ou `faqItems`.
- **`include: 2`** — suficiente para resolver o asset do hero (`heroImage`).

## Campos do schema atual (`home`)

| Área          | IDs                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Hero          | `title`, `subtitle`, `primaryCtaLabel`, `secondaryCtaLabel`, `heroImage` (Asset)                                                 |
| Animais       | `petsSectionTitle`, `petsSectionCtaLabel`, `petsSectionCtaHref`                                                                  |
| Como funciona | `adoptionHowTitle`, `adoptionHowSubtitle`, `adoptionHowCtaLabel`, `adoptionHowCtaHref`, `adoptionHowStepsJson`                   |
| Doação        | `donationTitle`, `donationSubtitle`, `donationPixLabel`, `donationPixCopyLabel`, `donationMoreWaysLabel`, `donationMoreWaysHref` |
| Transparência | `transparencyTitle`, `transparencySubtitle`, `transparencyCtaLabel`, `transparencyCtaHref`                                       |
| Bazar         | `bazaarTitle`, `bazaarSubtitle`, `bazaarCtaLabel`, `bazaarCtaHref`                                                               |
| Histórias     | `storiesTitle`, `storiesSubtitle`, `storiesCtaLabel`, `storiesCtaHref`                                                           |
| FAQ           | `faqTitle`, `faqContactLabel`, `faqContactHref`, `faqItems`                                                                      |

**Contagem:** 35 campos no modelo enviado — folga confortável abaixo do limite de 50.

## O que permanece em `messages/pt-br.json` (`home`)

- **`home.hero.stats`** — rótulos das três métricas do hero (dados vêm da API; textos não estão no CMS).
- **`home.pets`** — `filters`, `card`, `badges`, `clearFilters` (filtros e cards da listagem; não estão no content type `home`).
- **`home.donation.pixCopied`** — texto do toast ao copiar a chave PIX.
- **`home.transparency.cards`** — rótulos dos três cards quando a **API** de transparência retorna dados (títulos da **seção** vêm do Contentful).

Textos de estado vazio / erro de API para bazar, histórias e transparência estão como **constantes no código** dos componentes (não duplicados no JSON). O estado vazio da lista de pets por **filtro** está como constante em `HomeSectionPets.tsx`.

**Chave PIX:** `GET /api/donations/config` (fallback local no componente).

## Limite de 50 campos

Com **Object** para passos e FAQ, o modelo permanece enxuto. Se precisar de mais campos depois, prefira novos **content types** referenciados em vez de inflar o `home`.

## Checklist

- [x] Remover do código campos que não existem mais no Contentful.
- [ ] Publicar entrada `home` e validar passos + FAQ no formato Object/array.
- [ ] Validar `heroImage` (domínios `images.ctfassets.net` em `next.config.ts`).
- [ ] (Opcional) Preview com `CONTENTFUL_PREVIEW_ACCESS_TOKEN`.
