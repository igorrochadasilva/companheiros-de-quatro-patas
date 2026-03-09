# Home (`/`)

## Objetivo da tela

Entrada principal com impacto, adocao, doacao, transparencia, bazar e historias.

## Blocos e fonte de dados

| Bloco                 | Conteudo                                        | Fonte recomendada                               |
| --------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Hero                  | titulo, subtitulo, CTAs, imagem hero            | Sanity (copy + midia)                           |
| Hero - metricas       | adotados, em tratamento, resgatados             | Banco                                           |
| Pets em destaque      | lista, foto, tags, cidade, disponibilidade      | Banco                                           |
| Como funciona adocao  | titulo, passos, CTA                             | Sanity                                          |
| Doacao PIX rapida     | titulo, textos, CTA, chave PIX                  | Chave/conta no Banco; copy no Sanity            |
| Transparencia preview | resumo mensal e ultima atualizacao              | Banco                                           |
| Bazar destaque        | itens em destaque (nome, preco, imagem, status) | Banco                                           |
| Historias             | cards de historias e imagem                     | Banco (se operacional) ou Sanity (se editorial) |
| FAQ home              | perguntas/respostas + CTA                       | Sanity                                          |

## Sanity (sugestao de schema)

- `home_page`: hero, passos adocao, faq, textos de secoes.
- `global_cta`: rotulos de botoes reutilizados.
- `media_asset`: imagens editoriais.

## Banco (sugestao de entidades)

- `pets`
- `stats`
- `donation_config`
- `transparency_summary` + `transparency_expenses`
- `bazaar_items`
- `stories` (se ja usado em fluxo operacional)
