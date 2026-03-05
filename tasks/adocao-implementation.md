Task: Implementar Tela de Adoção (/adocao)
Objetivo

Criar uma página de listagem de pets para adoção com:

Busca e filtros fortes (URL-driven)

UX rápida (loading/empty states, paginação/infinite)

SEO básico (indexável, compartilhável por filtros)

Conversão (CTA “Quero adotar” claro)

Critérios de aceite (geral)

URL é fonte de verdade (searchParams) para filtros, ordenação e paginação

Layout responsivo (mobile-first) e consistente com DS

Loading/empty/error states em listagem e filtros

Link compartilhável mantém filtros (/adocao?species=dog&age=adult&city=cotia)

“Ver detalhes” leva para /animais/[slug]

Analytics preparado (select_pet, start_adoption, filter_pets, paginate)

Subtasks 0) Infra / contratos (se necessário)

Se sua infra da Home já cobre isso, aqui é só reaproveitar.

Entrega

PetFilters expandido (se faltar): sex, size, age, species, city, state, tags, urgent, neutered, vaccinated

PetSort: recent, urgent, age_asc, age_desc, name_asc

Util searchParams <-> filtros também para paginação e sort

API

GET /api/pets suportar:

page, limit, sort

filtros acima

retornar { items, total, page, totalPages }

Definição de pronto

Hook usePets(filters, page, sort) funcionando com React Query

1. Layout da página (estrutura base)

Entrega

Hero simples da página:

Título: “Adoção”

Sub: “Filtre e encontre o pet ideal…”

Breadcrumb (opcional): Home / Adoção

Layout 2 colunas (desktop):

esquerda: filtros (sidebar)

direita: resultados (toolbar + grid)

Mobile:

filtros em Sheet/Drawer com botão “Filtrar”

toolbar fixa/visível

Componentes

PageShell, Section, Button, Sheet, Separator

2. Toolbar de resultados (topo do grid)

Entrega

Contador de resultados: “{total} pets encontrados”

Ordenação (Select):

Mais recentes

Urgentes primeiro

Idade (crescente/decrescente)

Nome (A–Z)

View toggle (opcional):

grid / list

Botão “Limpar filtros” (se houver filtros ativos)

Analytics

sort_pets ao trocar sort

clear_filters ao limpar

3. Filtros (Sidebar/Drawer)

Entrega (campos recomendados)

Espécie (Tabs): Todos / Cães / Gatos

Porte (Checkbox/Select): P / M / G

Idade (Select): Filhote / Adulto / Sênior

Sexo (Select): Macho / Fêmea

Cidade (Input com debounce) + Estado (opcional)

Toggles:

Urgentes

Castrados

Vacinados

Tags (opcional): “Especial”, “PNE”, “Sociável com gatos/cães/crianças” (se vocês tiverem isso)

CTA no mobile Drawer:

“Aplicar filtros”

“Limpar”

Comportamento

Alterar filtro atualiza URL e reseta page=1

Debounce na cidade (ex: 300–500ms)

Indicar quantidade de filtros ativos (badge no botão “Filtrar” no mobile)

Analytics

filter_pets com payload {filters} (no apply/change)

4. Grid/Listagem de pets

Entrega

Grid responsivo (cards) com paginação/infinite

Card padrão:

Foto

Nome + badges (urgente, castrado, vacinado)

“{idade} • {porte} • {cidade}”

CTA “Ver detalhes”

CTA “Quero adotar” (Dialog)

Loading: skeleton cards

Empty state:

mensagem “Nenhum pet encontrado…”

botão “Limpar filtros”

sugestão “tente remover cidade/porte”

Error state:

mensagem + botão “Tentar novamente”

Paginação (escolher 1)

Opção A: Paginação clássica (Pagination)

Opção B: “Carregar mais” (infinite)

Analytics

view_pet_list (quando lista carrega)

select_pet (click card / ver detalhes)

start_adoption (click “Quero adotar”)

paginate / load_more

5. Modal “Quero adotar” (rápido e conversor)

Entrega

Dialog com:

Nome do pet

Texto curto “Como prefere falar com a gente?”

Botões:

WhatsApp (link com mensagem pré-preenchida)

Formulário (link /adocao/form?petId=... ou /contato?assunto=adocao&pet=...)

Se não tiver WhatsApp: usar e-mail/contato

Analytics

start_adoption ao abrir

adoption_contact_whatsapp / adoption_contact_form

6. SEO + indexação

Entrega

Metadata (title/description) para /adocao

Canonical (opcional) se filtros gerarem muitas variações

Headings corretos: H1 “Adoção”, seções H2

noindex? (não recomendado; preferível indexar /adocao sem filtros)

7. Acessibilidade e performance

Entrega

Foco visível em filtros e cards

Drawer/Sheet com aria-label

Imagens com alt

Lazy load de imagens + placeholder

Evitar layout shift (altura reservada das imagens)

Ordem sugerida de execução

Infra / API / hooks (0)

Layout base + toolbar (1–2)

Filtros URL-driven (3)

Grid + estados + paginação (4)

Dialog “Quero adotar” (5)

SEO + a11y + perf (6–7)
