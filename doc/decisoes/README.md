# Decisoes de Projeto (ADR)

## Objetivo

Registrar decisoes tecnicas e funcionais relevantes com contexto e consequencias.

## Formato padrao

Use o template abaixo para novas decisoes.

---

### ADR-XXXX - Titulo da decisao

- Data: YYYY-MM-DD
- Status: proposto | aprovado | substituido
- Contexto:
  Problema, restricoes e motivacao.
- Decisao:
  O que foi escolhido.
- Consequencias:
  Impactos positivos, trade-offs e riscos.
- Alternativas consideradas:
  Opcoes avaliadas e motivo de descarte.

---

## ADRs registradas

1. `ADR-0001` - adocao de `shadcn/ui` como base de componentes
   - arquivo: `doc/decisoes/shadcn-componentes.md`
   - status: aprovado

## Regra de manutencao

- toda mudanca relevante de arquitetura, contratos ou stack deve gerar ADR
- ao substituir decisao anterior, atualizar status para `substituido` e apontar sucessora
