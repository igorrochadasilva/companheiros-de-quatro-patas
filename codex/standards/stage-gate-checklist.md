# Stage Gate Checklist (PM -> Dev -> QA)

Use este checklist para cada etapa de implementacao.

## 1) PM Gate (entrada da etapa)

- Escopo da etapa esta fechado (`in-scope` e `out-of-scope`).
- Criterios de aceite funcionais estao explicitos.
- Criterios de aceite visuais (desktop/mobile) estao explicitos para UI.
- Dependencias e riscos conhecidos estao registrados.
- Handoff PM -> Dev foi preenchido.

## 2) Dev Gate (saida para QA)

- Implementacao restrita a etapa aprovada.
- Padroes de arquitetura e responsabilidade preservados.
- Validacoes tecnicas minimas executadas (tipo/lint/teste aplicavel).
- Testes/snapshots da etapa foram criados/atualizados quando aplicavel.
- Handoff Dev -> QA foi preenchido:
  - arquivos alterados
  - escopo implementado
  - passos de validacao manual
  - riscos residuais

## 3) QA Gate (aprovacao da etapa)

- Funcional da etapa aprovado.
- Regressao adjacente aprovada.
- Para UI: paridade visual desktop e mobile revisada contra referencia aprovada.
- Evidencias salvas em `doc/qa/...`.
- Resultado final definido: `approved` ou `changes required`.

## 4) Padrao de QA Visual (Playwright)

- Viewports fixos:
  - Desktop: `1440x900`
  - Mobile: `390x844`
- Capturas minimas:
  - pagina completa
  - secoes criticas da etapa
- Estabilidade visual:
  - desativar animacoes/transicoes durante captura
  - aguardar carregamento de fontes/imagens
  - usar dados estaveis (mock/fixture) quando necessario

## 5) Politica de Snapshot / Diff

- Definir limiar de diferenca visual por etapa.
- So atualizar baseline quando houver aprovacao explicita de QA.
- Diferenca acima do limiar: etapa bloqueada ate correcao ou excecao documentada.
- Toda excecao deve registrar motivo e impacto.
