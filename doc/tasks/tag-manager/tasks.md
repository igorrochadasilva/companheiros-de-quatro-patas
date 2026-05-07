# Plano de implementacao - Tag Manager

## Objetivo macro

Medir navegacao e intencao de conversao (adocao, contato, doacao) com dados consistentes para analise.

## Estado atual da implementacao

- GTM opcional por env usando abordagem recomendada do Next.js (`@next/third-parties/google`):
  - `NEXT_PUBLIC_GTM_ID`
- `track(...)` envia eventos para GTM/dataLayer.
- `page_view` disparado em mudanca de rota publica.

Arquivos-base:

- `src/app/layout.tsx`
- `src/shared/lib/analytics.ts`
- `src/app/(public)/public-layout-client.tsx`
- `.env.example`

## Task 1 - Contrato de eventos (iniciada)

Status: concluida

- Definir nomenclatura oficial dos eventos.
- Publicar data dictionary (evento -> payload esperado).
- Mover nomes de eventos para constantes globais reutilizaveis.

Entregavel:

- `src/constants/analytics.ts`
- este documento (`tasks.md`)

## Task 2 - Instrumentacao tecnica base (concluida)

Status: concluida

- Injetar GTM no app por env (`NEXT_PUBLIC_GTM_ID`).
- Enviar `track(...)` para `window.dataLayer`.
- Disparar `page_view` em mudanca de rota publica.

## Task 3 - Cobertura de eventos de clique (iniciada)

Status: em andamento

- Validar que CTAs principais ja disparam eventos:
  - adocao
  - doacao
  - contato
  - whatsapp/e-mail
- Completar lacunas de tracking onde faltar.

Progresso atual:

- Header V2: cliques de navegacao e CTA de doacao.
- Header legado: cliques de navegacao, transparencia e CTA de doacao.
- Footer V2 e legado: links rapidos, WhatsApp, e-mail e social.
- Home hero: CTA primario e secundario.

## Task 4 - Mapeamento GTM -> GA4

Status: pendente

- Definir variaveis de dataLayer no GTM.
- Criar triggers por evento.
- Criar tags GA4 Event.

## Task 5 - Qualidade e validacao

Status: pendente

- Testar via Tag Assistant.
- Registrar checklist de QA por rota.
- Garantir ausencia de PII em payload.

## Task 6 - Medicao e governanca

Status: pendente

- Definir dashboard base (GA4/Looker Studio).
- Estabelecer rotina quinzenal de revisao.
- Publicar baseline de conversao por fluxo.

## Data dictionary (fonte unica)

## Regras gerais

- Todos os eventos sao enviados via `track(event, payload)` para GTM/dataLayer.
- Nao enviar PII (nome, telefone, email, documento, endereco completo).
- Usar payload enxuto, com chaves estaveis e valores serializaveis.

## Eventos e payload esperado

## `page_view`

- `path`: string (rota atual)

## `navigation_click`

- `location`: string (origem visual do clique)
- `target`: string (href de destino)

## `social_click`

- `network`: string
- `from`: string

## `view_pet_list`

- `count`: number
- `total`: number

## `filter_pets`

- `filters`: objeto com filtros aplicados

## `sort_pets`

- `sort`: string

## `clear_filters`

- sem payload obrigatorio

## `paginate`

- `page`: number

## `select_pet`

- `petId`: string (id interno, sem PII)

## `start_adoption`

- `petId`: string

## `adoption_contact_whatsapp`

- `petId`: string

## `adoption_contact_form`

- `petId`: string

## `donate_click`

- `location`: string

## `pix_copy`

- `source`: string
- `tierId`: string (opcional)

## `donate_tier_click`

- `tierId`: string
- `amount`: number (opcional)

## `open_whatsapp`

- `from`: string

## `open_email`

- `from`: string

## `view_abrigo`

- sem payload obrigatorio

## `expand_milestone`

- `milestoneId`: string

## `submit_contact`

- `subject`: string

## `contact_success`

- `subject`: string

## `contact_error`

- `subject`: string
- `error`: string (mensagem tecnica curta, sem dados pessoais)

## `prefill_contact`

- `subject`: string
- `hasPet`: boolean

## `view_transparency`

- `from`: string
