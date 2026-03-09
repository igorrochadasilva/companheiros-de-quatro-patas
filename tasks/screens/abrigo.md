# Abrigo (`/abrigo`)

## Objetivo da tela

Mostrar progresso da obra e converter apoio financeiro/material.

## Blocos e fonte de dados

| Bloco                          | Conteudo                                    | Fonte recomendada            |
| ------------------------------ | ------------------------------------------- | ---------------------------- |
| Hero                           | titulo, subtitulo, labels, CTAs             | Sanity                       |
| Hero - numeros                 | meta, arrecadado, falta, percentual         | Banco                        |
| Onde o dinheiro vai            | titulos e labels da secao                   | Sanity                       |
| Onde o dinheiro vai - valores  | planejado/gasto por etapa                   | Banco                        |
| Etapas da obra                 | milestones (status, peso, descricao, custo) | Banco                        |
| O que falta                    | lista derivada de etapas pendentes          | Banco                        |
| Atualizacoes                   | titulo, texto, imagens e data               | Banco (timeline operacional) |
| Doar para finalizar            | textos de PIX/WhatsApp/erros                | Sanity                       |
| Doar para finalizar - chave/qr | pixKey, pixQrUrl, whatsapp                  | Banco                        |
| FAQ abrigo                     | perguntas e respostas                       | Sanity                       |

## Sanity (sugestao de schema)

- `shelter_page`: copy de hero, labels de cards, faq, mensagens de erro.
- `shelter_cta`: textos de CTA por secao.

## Banco (sugestao de entidades)

- `shelter_progress`
- `shelter_milestones`
- `shelter_updates`
- `donation_channels` (pode compartilhar com `/doar`)
