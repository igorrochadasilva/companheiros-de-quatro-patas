# Contato (`/contato`)

## Objetivo da tela

Centralizar canais e formulario para adocao, doacao, parceria e voluntariado.

## Blocos e fonte de dados

| Bloco                 | Conteudo                                   | Fonte recomendada                                  |
| --------------------- | ------------------------------------------ | -------------------------------------------------- |
| Hero contato          | titulo, subtitulo, chips de assunto        | Sanity                                             |
| Canais rapidos        | whatsapp, email, instagram (copy e labels) | Sanity (copy) + Banco/Config (enderecos)           |
| Formulario            | estrutura de campos e validacoes           | Banco (schema tecnico) + Sanity (labels/mensagens) |
| Envio de contato      | payload e persistencia                     | Banco                                              |
| FAQ contato           | perguntas e respostas                      | Sanity                                             |
| Mensagens de feedback | sucesso/erro/prefill                       | Sanity                                             |

## Sanity (sugestao de schema)

- `contact_page`
- `contact_faq`
- `contact_feedback_messages`

## Banco (sugestao de entidades)

- `contact_messages`
- `contact_subjects` (se administravel)
- `settings_channels` (telefone/email/redes)
