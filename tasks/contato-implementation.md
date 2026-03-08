Task: Implementar Página “Contato” (/contato)
Objetivo

Criar um canal único e simples para:

adoção (interessado em pet)

doação/comprovante

voluntariado / lar temporário / parceria
com experiência rápida e sem fricção.

Critérios de aceite (geral)

Funciona bem em mobile

Suporta ?assunto= e ?pet= (prefill)

Botões rápidos (WhatsApp, Email, Instagram) + formulário

Form validação (Zod + RHF) e feedback (toast)

Se o backend não existir: enviar via endpoint mock e armazenar log (ou fallback “mailto/whatsapp”)

Acessibilidade: labels, erros claros, foco no erro

Subtasks (Contato)

1. Hero / Contexto

H1 “Contato”

Texto curto: “Fale com a gente…”

Chips/atalhos de assunto (seletores rápidos):

Adoção

Doação

Voluntariado

Lar temporário

Parceria

Outros

2. Canais rápidos (cards)

Card WhatsApp (CTA abrir conversa)

Card Email (mailto)

Card Instagram (link)

(Opcional) Endereço/horário/pontos de coleta (se tiver)

3. Formulário principal

Campos

Nome (obrigatório)

WhatsApp/Telefone (obrigatório)

Email (opcional)

Assunto (select) — prefill via querystring

Mensagem (obrigatório)

(condicional) Se assunto = Adoção:

Campo “Pet” (string) prefill via ?pet= ou ?petId=

Campo “Cidade/Bairro”

Checkbox “Tenho ciência do processo de adoção responsável” (opcional)

Botão “Enviar”

Validação

Zod: required, min length, telefone simples

Erros inline + toast de sucesso/erro

4. Integração de envio

Escolha uma estratégia (MVP):

Opção A (rápida): ao enviar, abrir WhatsApp com mensagem formatada

Opção B (melhor): POST /api/contact salvar/encaminhar (mock agora; real depois)

Opção C: integrar com Supabase (tabela contact_messages)

Entrega

Implementar pelo menos A ou B

Loading state no submit

5. Prefill via URL (obrigatório)

Ler searchParams:

assunto=voluntariado|lar-temporario|parceria|adocao|doacao|outros

pet=Nome (ou petId)

Inicializar select + campos condicionais

6. FAQ Contato (opcional)

“Quanto tempo para responder?”

“Como envio comprovante?”

“Como funciona lar temporário?”

7. Analytics

open_whatsapp, open_email, submit_contact, contact_success, contact_error

prefill_contact quando entra com querystring

Endpoints sugeridos

POST /api/contact:

body: { name, phone, email?, subject, message, pet?, city? }

response: { ok: true }

(Mock inicial ok)

Arquivos sugeridos

app/(public)/contato/page.tsx

components/contato/ContactHero.tsx

components/contato/ContactQuickChannels.tsx

components/contato/ContactForm.tsx

shared/lib/contact-prefill.ts

app/api/contact/route.ts (se for opção B)
