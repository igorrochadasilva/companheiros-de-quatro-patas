# Roadmap pos-MVP

## Objetivo

Priorizar evolucoes de produto e engenharia apos consolidacao do fluxo atual.

## Prioridade alta

1. Solicitacoes de adocao no dashboard

- ampliar triagem em `adoption_requests` (filtros, timeline e historico de status)
- visao operacional para equipe da ONG

2. Fortalecer fluxo publico de candidatura

- revisar UX do `/adocao/[slug]/candidatar`
- anti-spam (rate limit/captcha)
- confirmacao e rastreabilidade de envio

3. Hardening de seguranca e operacao

- revisar policies/RLS no Supabase
- revisar trilha de auditoria basica em acoes administrativas

## Prioridade media

4. Midia avancada de pets

- suporte melhor a video
- regras de tamanho/tipo e transformacoes por contexto

5. Importacao avancada

- dry-run detalhado
- modo upsert
- exportacao de erros de importacao

6. Observabilidade

- logs estruturados por endpoint
- correlacao por request id
- alertas para falhas criticas

## Prioridade baixa

7. Governanca de acesso

- multiplos perfis (`admin`, `editor`, `viewer`)

8. Relatorios e metricas

- funil de adocao e tempo medio ate adocao
- indicadores de arrecadacao e engajamento

9. Qualidade de dados

- padronizacao de raca/cidade/estado
- deteccao de duplicidade

## Fora do escopo imediato

- BI analitico avancado
- workflow complexo de aprovacao com varias etapas

## Ordem recomendada

1. Solicitacoes de adocao no dashboard
2. Hardening de seguranca
3. Evolucao do formulario/candidatura publica
4. Midia e importacao avancadas
5. Observabilidade e metricas
