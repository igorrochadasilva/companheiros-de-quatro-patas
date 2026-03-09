# Transparencia (`/transparencia`)

## Objetivo da tela

Exibir prestacao de contas, entradas e saidas, com historico confiavel.

## Estado atual

Pagina placeholder com texto institucional.

## Blocos planejados e fonte de dados

| Bloco               | Conteudo                                     | Fonte recomendada |
| ------------------- | -------------------------------------------- | ----------------- |
| Hero transparencia  | titulo, subtitulo, explicacao da metodologia | Sanity            |
| Resumo mensal       | arrecadado, gasto, saldo, periodo            | Banco             |
| Lista de despesas   | categoria, valor, data, comprovante          | Banco             |
| Filtros por periodo | mes/ano/categoria                            | Banco             |
| FAQ/transparencia   | perguntas e respostas                        | Sanity            |

## Sanity (sugestao de schema)

- `transparency_page`: copy institucional e explicacoes.
- `transparency_faq`.

## Banco (sugestao de entidades)

- `transparency_summary`
- `transparency_entries`
- `transparency_expenses`
- `transparency_attachments` (opcional)
