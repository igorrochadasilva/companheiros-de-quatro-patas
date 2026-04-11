# ADR-0001 - Adocao de shadcn/ui como base de componentes

- Data: 2026-03-02
- Status: aprovado

## Contexto

O projeto precisava de uma base de componentes consistente para:

- paginas publicas (adocao, doacao, bazar, sobre, contato)
- area administrativa (`/dashboard/*`)
- padrao visual e acessibilidade baseline com baixa friccao de evolucao

## Decisao

Adotar `shadcn/ui` como base de design system local, com componentes em
`shared/ui/*` e utilitarios em `shared/lib/*`.

Componentes de uso recorrente foram padronizados (button, input, card,
accordion, dialog, table, pagination, sidebar, toast, etc.).

## Consequencias

Positivas:

- aceleracao de entrega com componentes reutilizaveis
- consistencia visual entre area publica e admin
- melhor manutencao por composicao local dos componentes

Trade-offs:

- necessidade de manter componentes locais atualizados com boas praticas
- maior disciplina em padroes de uso para evitar divergencia entre features

## Alternativas consideradas

- construir tudo do zero com Tailwind puro
  - descartada por custo alto de manutencao e tempo de entrega
- usar kit fechado de componentes sem ownership local
  - descartada por menor flexibilidade para personalizacao do projeto
