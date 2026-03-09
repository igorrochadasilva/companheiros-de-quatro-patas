# Bazar (`/bazar`)

## Objetivo da tela

Listar produtos do bazar, com busca/filtro e contato para compra.

## Blocos e fonte de dados

| Bloco              | Conteudo                                         | Fonte recomendada |
| ------------------ | ------------------------------------------------ | ----------------- |
| Hero bazar         | titulo e subtitulo                               | Sanity            |
| Filtros            | labels de busca/status                           | Sanity            |
| Grid de itens      | nome, descricao, preco, foto, status, slug       | Banco             |
| Paginacao          | pagina atual e disponibilidade de proxima pagina | Banco             |
| Empty/error states | textos e CTA                                     | Sanity            |

## Sanity (sugestao de schema)

- `bazaar_page`: copy de hero, empty state, erros.
- `bazaar_ui_labels`: rotulos de filtros/paginacao.

## Banco (sugestao de entidades)

- `bazaar_items`
- `bazaar_item_images`
- `bazaar_item_status_history` (opcional)
