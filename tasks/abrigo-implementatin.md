Task: Implementar Página “Abrigo” (/abrigo) — Progresso da obra
Objetivo

Exibir, de forma clara e confiável:

% do abrigo concluído

quanto falta (R$ e/ou itens/etapas)

em que fase estamos (marcos da obra)

como ajudar (PIX/doação de material/serviço)

(opcional) atualizações com fotos e timeline

Critérios de aceite (geral)

Página responsiva e “captação friendly” (CTA visível)

Progresso (% concluído) calculado de forma consistente

Mostrar meta total, já realizado e falta (R$)

Lista de marcos/etapas com status (feito/em andamento/pendente)

Se houver fotos/updates: mostrar pelo menos 3 e link “ver todas”

Loading/erro tratados quando depender de API

Analytics preparado (view_abrigo, donate_click, pix_copy, expand_milestone)

0. Infra de dados (model + endpoint)
   Entrega

Criar tipos:

ShelterProgress

ShelterMilestone

ShelterUpdate

Criar endpoint mock (ou CMS/Supabase):

GET /api/shelter/progress

Hook:

useShelterProgress()

Sugestão de contrato (JSON)
type ShelterMilestoneStatus = "done" | "in_progress" | "pending";

type ShelterMilestone = {
id: string;
title: string; // Ex: "Estrutura e alvenaria"
description?: string;
weight: number; // 0..100 (peso na % total)
status: ShelterMilestoneStatus;
costPlanned?: number; // R$ meta dessa etapa
costSpent?: number; // R$ gasto nessa etapa
updatedAt?: string; // ISO date
};

type ShelterUpdate = {
id: string;
title: string;
date: string; // ISO date
text: string;
images: { url: string; alt: string }[];
};

type ShelterProgress = {
percentComplete: number; // calculado (ou vindo pronto)
goalAmount: number; // meta total R$
  raisedAmount: number;      // arrecadado R$
spentAmount: number; // gasto R$ (opcional)
remainingAmount: number; // goal - raised ou goal - spent (definir regra)
lastUpdated: string; // ISO date
milestones: ShelterMilestone[];
updates?: ShelterUpdate[];
donation: {
pixKey: string;
pixQrUrl?: string;
whatsapp?: string;
};
};

Regra de % (recomendada)

percentComplete = sum(weight de milestones done) + (weight parcial se in_progress opcional)

Alternativa simples: gravar percentComplete direto no CMS.

1. Hero (primeira dobra)
   Entrega

H1: “Abrigo em construção”

Sub: “Acompanhe o progresso e veja como ajudar a finalizar.”

Barra de progresso + número grande: 78%

Cards de números:

“Meta: R$ X”

“Arrecadado: R$ Y”

“Falta: R$ Z”

CTAs:

Primary: “Doar agora” (scroll #doar ou link /doar#pix)

Secondary: “Ver etapas” (scroll #etapas)

Componentes (shadcn)

Progress, Card, Button, Badge

2. Seção “Onde o dinheiro vai” (confiança rápida)

ID: #resumo

Entrega

Mini breakdown (3–5 itens):

Materiais

Mão de obra

Estrutura

Acabamento

Instalações

Se você tiver dados reais: exibir planejado x gasto por etapa

Link para transparência completa: /transparencia

3. Etapas da obra (marcos) — parte principal

ID: #etapas

Entrega

Lista de milestones em formato:

Título

Status (done/in_progress/pending)

Peso (%)

(Opcional) “custo planejado / gasto”

Visual:

Done: check

In progress: barra parcial

Pending: cinza

Filtro/aba:

“Todas”

“Em andamento”

“Pendentes”

CTA pequeno dentro de etapas pendentes:

“Quero ajudar nessa etapa” → /doar ou /contato?assunto=doacao-materiais&etapa=...

Componentes

Accordion (detalhes por etapa) ou Card list

Tabs/Select para filtro

Analytics

expand_milestone ao abrir detalhes

4. O que falta (lista objetiva)

ID: #falta

Entrega

Checklist do que falta (derivado de milestones pending + in_progress)

Exibir:

“Faltam X etapas”

“Estimativa: R$ Z” (se tiver)

CTA: “Doar materiais/serviços” → /contato?assunto=parceria (ou específico)

5. Atualizações com fotos (opcional mas MUITO bom)

ID: #updates

Entrega

Feed das últimas 3 atualizações (data + texto curto + 1–3 imagens)

CTA “Ver todas atualizações” (se tiver rota /abrigo/atualizacoes ou modal)

Imagens com placeholder e lazy

Componentes

Card, AspectRatio, Carousel (opcional)

6. Doar para finalizar (CTA forte)

ID: #doar

Entrega

PIX key + copiar + toast

QR Code (se houver)

WhatsApp para enviar comprovante (se tiver)

Tiers (R$ 25/50/100 ou “Etapa X precisa de R$…”)

Texto direto: “Se puder, envie o comprovante…”

Analytics

pix_copy, donate_click, open_whatsapp

7. FAQ Abrigo (curto)

Entrega

“Como é calculado o progresso?”

“Posso doar material/serviço?”

“Onde acompanho as despesas?”

“Quanto falta para finalizar?”

8. SEO + A11y + Performance

Metadata: title/description

H1 único; seções com H2

aria-label no copiar pix

Reservar espaço de imagens pra evitar CLS
