# Documentacao do Projeto

Esta pasta e a referencia oficial de contexto funcional e tecnico do projeto
`companheiros-de-quatro-patas`.

## Objetivo

Manter um ponto unico de verdade para orientar pessoas e agentes sobre:

- arquitetura e limites de camadas
- stack e bibliotecas
- escopo funcional e status das features
- decisoes tecnicas registradas em ADR

## Estrutura principal

- `doc/arquitetura/README.md`: arquitetura atual, camadas e fronteiras.
- `doc/stack/README.md`: stack oficial e versoes em uso.
- `doc/stack/contentful.md`: detalhes de integracao com Contentful.
- `doc/libraries/README.md`: bibliotecas adotadas e diretrizes de adocao.
- `doc/features/README.md`: escopo e status consolidado por feature.
- `doc/features/post-mvp.md`: backlog priorizado apos o MVP.
- `doc/decisoes/README.md`: indice de ADRs.
- `doc/decisoes/*.md`: decisoes tecnicas detalhadas.
- `doc/tasks/`: historico de planos e execucoes por tema.

## Regra de atualizacao

Atualize a documentacao no mesmo workstream de mudancas relevantes em:

- arquitetura
- contratos de API e modelo de dados
- stack e bibliotecas
- escopo funcional e roadmap

## Ultima revisao

- Data: 2026-04-11
- Escopo: sincronizacao geral da pasta `doc/` com o estado atual do codigo.
