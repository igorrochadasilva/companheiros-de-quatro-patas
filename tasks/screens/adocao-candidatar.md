# Candidatar Adocao (`/adocao/[slug]/candidatar`)

## Objetivo da tela

Capturar candidatura para adocao de um pet especifico.

## Estado atual

Pagina placeholder (mostra apenas slug).

## Blocos planejados e fonte de dados

| Bloco                     | Conteudo                              | Fonte recomendada                                       |
| ------------------------- | ------------------------------------- | ------------------------------------------------------- |
| Contexto do pet           | nome, foto, resumo                    | Banco                                                   |
| Formulario de candidatura | campos, validacoes, consentimentos    | Banco (schema de formulario) + Sanity (copy dos textos) |
| FAQ curto do processo     | perguntas e respostas                 | Sanity                                                  |
| Pos-envio                 | mensagem de sucesso e proximos passos | Sanity                                                  |

## Sanity (sugestao de schema)

- `adoption_application_page`: textos de orientacao, termos e faq.
- `form_feedback_messages`: sucesso/erro.

## Banco (sugestao de entidades)

- `adoption_applications`
- `adoption_application_events`
- `pets` (referencia por `slug`/`id`)
