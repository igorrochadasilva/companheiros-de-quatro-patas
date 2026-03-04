Task: Implementar Home (/) — Companheiros de Quatro Patas
Objetivo

Implementar a página Home com foco em:

Conversão para adoção (listagem + filtros logo no início)

Captação de doações (PIX + tiers)

Confiança (teaser de transparência)

Aquisição/engajamento (bazar, histórias, voluntariado, FAQ)

Critérios de aceite (geral)

Home responsiva (mobile/tablet/desktop) e com layout consistente com DS (shadcn + tailwind)

Seções navegáveis por âncora (#animais, #doar, etc.)

Loading states (skeleton) e empty states onde fizer sentido

Filtros persistem em URL (searchParams) e funcionam sem reload (React Query)

Ações principais rastreáveis (eventos analytics preparados)

SEO básico: title/description + headings corretos

Subtasks por seção

1. Header / Navegação

Entrega

Header com logo + menu (desktop) + CTA

Menu mobile via Sheet

Links: Adoção, Doar, Bazar, Sobre, Contato, Transparência

Botões: “Transparência” (ghost) e “Quero apoiar” (primary)

Checklist técnico

Sticky opcional (com backdrop-blur leve)

Acessibilidade: foco visível + aria-label no menu

2. Hero (primeira dobra)

Entrega

H1 + subtítulo

CTAs: “Ver animais” (scroll #animais) e “Fazer doação” (scroll #doar ou rota /doar)

Bloco de métricas (3 mini-cards):

adotados / em tratamento / resgatados

Imagem/ilustração (ou placeholder) para dar “vida” ao topo

Checklist técnico

GET /api/stats (mock inicial ok) com cache no React Query

Skeleton das métricas enquanto carrega

3. Animais para adoção (seção principal)

Entrega

Título + link “Ver todos” (rota /adocao)

Filtros rápidos:

Espécie (tabs)

Porte (select)

Idade (select)

Cidade (input com debounce)

Toggle “Urgentes”

Botão “Limpar filtros”

Grid de cards (8–12)

foto, nome, idade, porte, cidade, badges (vacinado/castrado/urgente)

CTA: “Ver detalhes”

CTA: “Quero adotar” (Dialog com opções)

Checklist técnico

searchParams na Home (URL como fonte de verdade)

GET /api/pets?limit=12&featured=1&...filters

Loading: Skeleton cards

Empty state: mensagem + “Limpar filtros”

Evento: view_pet_list, filter_pets, select_pet, start_adoption

4. Como funciona a adoção

Entrega

Bloco com 4 passos (cards ou lista)

CTA “Ver regras completas” → /adocao#regras

Checklist técnico

Sem depender de API (conteúdo estático)

Acessível (lista ordenada ol)

5. Doação rápida (PIX + impacto)

Entrega

Bloco PIX:

chave PIX + botão copiar (toast “Copiado”)

QR Code (se existir)

CTA “Ver outras formas” → /doar

Cards de impacto (3 tiers):

R$ 25, R$ 50, R$ 100 com “no que ajuda”

CTA “Quero apoiar” reforçado

Checklist técnico

GET /api/donations/config (pixKey + tiers)

Evento: donate_click, pix_copy

6. Transparência (teaser)

Entrega

Métricas do mês: arrecadado / gasto / saldo + “última atualização”

Lista 3 últimas despesas (nome + valor)

CTA “Ver relatório completo” → /transparencia

Checklist técnico

GET /api/transparency/summary

Skeleton + fallback caso API falhe

7. Bazar (teaser)

Entrega

Bloco com descrição curta

Grid de 4 itens (ou categorias) em destaque

CTA “Acessar bazar” → /bazar

Checklist técnico

GET /api/bazaar/featured (mock ok)

Skeleton

8. Histórias / Depoimentos

Entrega

3 cards com depoimento curto (ou antes/depois)

CTA “Ver mais histórias” → /sobre#historias (ou /historias)

Checklist técnico

GET /api/stories?limit=3 (mock ok)

Layout carrossel no mobile (opcional)

9. Voluntariado / Lar temporário

Entrega

2 cards:

“Seja voluntário”

“Ofereça lar temporário”

CTA para /contato?assunto=...

Checklist técnico

Conteúdo estático (sem API)

Botões com prefill via querystring

10. FAQ

Entrega

Accordion com 5 perguntas principais

Link “Fale com a gente” → /contato

Checklist técnico

Conteúdo estático

Acessibilidade do Accordion (shadcn já ajuda)

11. Footer

Entrega

Nome + slogan

Contatos (WhatsApp/email/cidade)

Links rápidos + redes sociais

(Opcional) CNPJ

Checklist técnico

Layout responsivo em colunas

© 2026 ... (dinâmico pelo ano atual)

Subtasks técnicos (infra/organização)

Criar PageShell + Section wrappers

Criar tipos TS:

Pet, PetFilters, Stats, TransparencySummary, DonationConfig

React Query setup (staleTime/retry) + hooks:

useStats(), useFeaturedPets(filters), useDonationConfig(), useTransparencySummary(), useFeaturedBazaarItems(), useStories()

Criar mocks (JSON) ou endpoints /api/\* iniciais

Implementar util de searchParams <-> filters (parse/serialize)

Preparar camada de analytics (função track(eventName, payload))

Definição de pronto (DoD)

Desktop + mobile validados

Lighthouse básico ok (sem imagens gigantes, sem layout shift)

Estados: loading/empty/error implementados nas seções com API

Links e CTAs funcionando

SearchParams funcionando (filtros persistem/compartilháveis)
