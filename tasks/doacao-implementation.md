Task: Implementar Página de Doação (/doar)
Objetivo

Criar uma página que maximize conversão de doação com:

PIX rápido (copiar + QR)

Doação recorrente (se existir)

Outras formas (itens/ração, lar temporário, bazar)

Transparência e impacto (confiança)

Critérios de aceite (geral)

Conteúdo e CTAs claros acima da dobra

PIX copiável com toast + QR code (se disponível)

Seções com âncoras (#pix, #recorrente, #itens, #transparencia)

Loading/erro tratado quando depender de API

Analytics preparado (donate_click, pix_copy, open_whatsapp, view_transparency)

Responsivo + acessível (foco, aria-label, contraste)

0. Infra (se necessário / reaproveitar da Home)

Entrega

Reaproveitar DonationConfig e useDonationConfig()

Endpoint mock/real:

GET /api/donations/config → { pixKey, pixQrUrl?, tiers[], whatsapp?, bankAccount?, recurringUrl? }

Definição de pronto

Página consegue renderizar em cima do config (mock ok)

1. Hero / Topo (primeira dobra)

Entrega

H1: “Doe e ajude a manter o abrigo”

Sub: “Sua doação vira ração, vacinas e cuidados veterinários.”

CTAs:

Primary: “Doar via PIX” (scroll #pix)

Secondary: “Ver transparência” (scroll #transparencia)

Mini-métricas (opcional, se você já tiver):

“Animais em tratamento”

“Gastos do mês”

“Adotados”
(puxa do useStats/useTransparencySummary)

2. Seção PIX (core)

ID: #pix
Entrega

Card principal PIX:

Chave PIX + botão “Copiar”

Toast “Chave copiada”

QR Code (se tiver)

Botão “Abrir WhatsApp” (opcional, para confirmar doação / pedir recibo)

Tiers de doação (3–6 cards):

valor + “no que ajuda”

CTA “Copiar chave e doar”

Texto curto: “Se puder, envie o comprovante para…”

Analytics

pix_copy ao copiar

donate_tier_click ao clicar nos tiers

open_whatsapp se tiver

3. Doação recorrente (se existir)

ID: #recorrente
Entrega

Explicação: “Apoio mensal nos ajuda a planejar resgates e tratamentos”

Opções:

Link externo (ex: apoia.se / vakinha / assinatura)

Ou “PIX agendado” (tutorial curto)

CTAs:

“Quero doar mensalmente”

“Como fazer PIX agendado”

Obs
Se você ainda não tem plataforma de recorrência, implementa como “em breve” + CTA “Quero ser avisado” (leva pra contato).

4. Outras formas de ajudar (itens/ração/serviços)

ID: #itens
Entrega

Cards:

Doação de ração e itens (lista do que aceitam)

Voluntariado (link /contato?assunto=voluntariado)

Lar temporário (link /contato?assunto=lar-temporario)

Bazar (link /bazar)

“Pontos de coleta” (se tiver) ou “Fale conosco”

5. Impacto da doação (confiança + emoção na medida certa)

Entrega

Bloco “Para onde vai sua doação”

4 cards: Ração / Vacinas / Consultas / Resgates

(Opcional) 2 histórias curtas (puxa do useStories com limit=2)

6. Transparência (preview + CTA)

ID: #transparencia
Entrega

Resumo mensal (arrecadado/gasto/saldo) + última atualização

Últimas despesas (3 itens)

CTA forte: “Ver relatório completo” → /transparencia

Dados

useTransparencySummary() (já existe)

Analytics

view_transparency quando a seção entra na viewport (opcional)

7. FAQ (Doações)

Entrega

Accordion com 5 perguntas:

“Como envio comprovante?”

“Aceitam doação de itens?”

“Posso doar mensalmente?”

“A doação tem destino específico?”

“Como funciona a transparência?”

CTA “Fale com a gente” → /contato

8. SEO + A11y + Performance

Entrega

Metadata: title/description

Headings corretos

Botões com aria-label (copiar pix/abrir whatsapp)

QR e imagens com alt

Sem layout shift no QR (reserva espaço)

Ordem sugerida de execução

Infra/config (0)

Hero (1)

PIX + tiers + copiar (2)

Transparência teaser (6)

Outras formas de ajudar (4)

Recorrente (3)

Impacto + histórias (5)

FAQ + polish (7–8)
