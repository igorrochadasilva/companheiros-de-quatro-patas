# Roadmap pos-MVP

## Objetivo

Organizar as funcionalidades que agregam valor apos o go-live do MVP, sem bloquear a operacao inicial da ONG.

## Prioridade alta (curto prazo)

### 1) Painel de solicitacoes de adocao (dashboard)

- Listagem de solicitacoes (`adoption_requests`) por pet.
- Filtros por status, data e pet.
- Atualizacao de status: `PENDING`, `IN_REVIEW`, `APPROVED`, `REJECTED`, `CANCELLED`.
- Visualizacao rapida dos dados do interessado (nome, contato, cidade/estado, mensagem).
- Linha do tempo minima de mudanca de status (ao menos `updatedAt` confiavel).

### 2) Fluxo publico de solicitacao estruturada

- Reintroduzir formulario de adocao no site publico (alem do WhatsApp, se desejado).
- Validacao forte no backend.
- Anti-spam basico (rate limit/captcha).
- Confirmacao de recebimento para usuario.

### 3) Regras de publicacao e operacao

- Ajustar regra final para pets adotados (`ADOPTED`) no site publico.
- Acoes rapidas no dashboard (publicar/despublicar e destaque).
- Melhorar busca e filtros no dashboard para volume maior.

## Prioridade media

### 4) Midia de pets (evolucao)

- Habilitar upload de video no fluxo atual.
- Regras por tipo de arquivo, tamanho e quantidade.
- Transformacoes otimizadas do Cloudinary por contexto (card, detalhe, admin).

### 5) Importacao de planilha avancada

- Modo `insert` e `upsert`.
- Dry-run detalhado antes de gravar.
- Exportar erros da importacao em CSV/XLSX.

### 6) Observabilidade e suporte operacional

- Log estruturado de falhas por endpoint.
- Correlacao basica por request id.
- Alertas para erros criticos de importacao e upload.

## Prioridade baixa (estrategico)

### 7) Permissoes e governanca

- Suporte a mais de um admin.
- Perfis simples (`admin`, `editor`, `viewer`).
- Auditoria de alteracoes sensiveis.

### 8) Relatorios e metricas

- Metricas de pets publicados, adotados e tempo medio de adocao.
- Funil de solicitacoes (entrada -> aprovacao).
- Exportacao de dados para acompanhamento da ONG.

### 9) Qualidade de dados

- Padronizacao automatica de raca/cidade/estado.
- Deteccao de duplicidade com score.
- Arquivamento em vez de exclusao fisica (soft delete).

## Itens explicitamente fora do MVP atual

- Painel administrativo completo de solicitacoes de adocao.
- Workflow de aprovacao complexo.
- Auditoria completa por usuario.
- RBAC completo.
- BI/dashboard analitico avancado.

## Ordem recomendada de execucao apos MVP

1. Painel de solicitacoes de adocao.
2. Formulario publico + anti-spam.
3. Regras de operacao e filtros admin.
4. Midia com video.
5. Importacao avancada.
6. Permissoes e auditoria.
7. Metricas e relatorios.
