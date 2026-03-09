# Bazar Detalhe (`/bazar/[slug]`)

## Objetivo da tela

Exibir detalhe do item e facilitar reserva/compra.

## Estado atual

Pagina placeholder (mostra apenas slug).

## Blocos planejados e fonte de dados

| Bloco              | Conteudo                       | Fonte recomendada                   |
| ------------------ | ------------------------------ | ----------------------------------- |
| Galeria do item    | imagens, zoom, ordem           | Banco                               |
| Dados do item      | nome, preco, descricao, status | Banco                               |
| CTA de compra      | texto e canal (WhatsApp)       | Sanity (copy) + Banco (numero/link) |
| Itens relacionados | vitrine de sugestoes           | Banco                               |

## Sanity (sugestao de schema)

- `bazaar_item_detail_page`: copy de CTA e auxiliares.

## Banco (sugestao de entidades)

- `bazaar_items`
- `bazaar_item_images`
- `bazaar_related_rules` (opcional)
