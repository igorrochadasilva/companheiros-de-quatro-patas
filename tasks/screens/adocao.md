# Adocao (`/adocao`)

## Objetivo da tela

Listagem de pets com filtros, ordenacao e paginacao para iniciar candidatura.

## Blocos e fonte de dados

| Bloco                 | Conteudo                                         | Fonte recomendada |
| --------------------- | ------------------------------------------------ | ----------------- |
| Hero da pagina        | titulo, subtitulo, breadcrumb                    | Sanity            |
| Filtros e ordenacao   | labels de UI                                     | Sanity            |
| Grid de pets          | nome, foto, especie, idade, cidade, tags, status | Banco             |
| Paginacao             | total, paginas, resultados                       | Banco             |
| Dialog "Quero adotar" | textos de CTA/mensagens                          | Sanity            |

## Sanity (sugestao de schema)

- `adoption_page`: textos do hero, labels de filtro, empty state.
- `adoption_cta_copy`: textos dos botoes e microcopy de conversao.

## Banco (sugestao de entidades)

- `pets`
- `pet_media`
- `pet_tags`
- `pet_adoption_status`
