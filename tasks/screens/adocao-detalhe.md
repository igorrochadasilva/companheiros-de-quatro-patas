# Adocao Detalhe (`/adocao/[slug]`)

## Objetivo da tela

Exibir ficha completa do animal e direcionar para candidatura/contato.

## Estado atual

Pagina placeholder (mostra apenas slug).

## Blocos planejados e fonte de dados

| Bloco                | Conteudo                                 | Fonte recomendada                        |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| Hero do pet          | nome, fotos, badges, status              | Banco                                    |
| Sobre o pet          | historia, temperamento, cuidados, rotina | Banco (dados de ONG)                     |
| Requisitos de adocao | texto editorial e checklist              | Sanity                                   |
| Saude                | vacinas, castracao, exames, observacoes  | Banco                                    |
| CTAs de conversao    | candidatar, whatsapp, formulario         | Sanity (copy) + Banco (links/parametros) |

## Sanity (sugestao de schema)

- `adoption_pet_detail_page`: copy de estrutura e orientacoes.
- `adoption_requirements`: regras e textos padrao.

## Banco (sugestao de entidades)

- `pets`
- `pet_health_records`
- `pet_profile_sections`
- `pet_media`
