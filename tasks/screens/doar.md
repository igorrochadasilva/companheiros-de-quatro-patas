# Doar (`/doar`)

## Objetivo da tela

Converter doacoes via PIX e outras formas de apoio.

## Blocos e fonte de dados

| Bloco                   | Conteudo                                    | Fonte recomendada                                    |
| ----------------------- | ------------------------------------------- | ---------------------------------------------------- |
| Hero                    | titulo, subtitulo, CTAs                     | Sanity                                               |
| Hero - metricas         | em tratamento, gasto mensal, adotados       | Banco                                                |
| PIX                     | chave, qr, tiers, whatsapp                  | Banco                                                |
| PIX - copy              | titulos, mensagens, labels de botoes        | Sanity                                               |
| Doacao recorrente       | copy + url de recorrencia                   | URL no Banco; copy no Sanity                         |
| Outras formas de ajudar | itens aceitos, voluntariado, lar temporario | Sanity (copy) + Banco (se tiver inventario)          |
| Impacto e historias     | cards de impacto, historias curtas          | Sanity para copy de cards; historias no Banco/Sanity |
| Transparencia preview   | arrecadado, gasto, saldo, despesas          | Banco                                                |
| FAQ doacao              | perguntas e respostas                       | Sanity                                               |

## Sanity (sugestao de schema)

- `donation_page`: textos de secoes, faq, impacto, itens.
- `donation_tiers_copy`: descricoes editoriais por faixa.

## Banco (sugestao de entidades)

- `donation_config`
- `stats`
- `transparency_summary`
- `transparency_expenses`
- `stories` (se operacional)
