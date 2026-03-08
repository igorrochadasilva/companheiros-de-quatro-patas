Task: Implementar Página “Sobre” (/sobre)
Objetivo

Construir uma página que:

explique claramente quem somos / missão

mostre impacto + credibilidade

direcione para adoção, doação, voluntariado

tenha conteúdo “CMS friendly” (fácil de editar via JSON/CMS depois)

Critérios de aceite (geral)

Responsiva e consistente com DS

CTAs claros (Adoção / Doar / Voluntariar / Lar temporário)

Seções com âncoras (#missao, #como-ajudamos, #historias, #time, #parceiros)

Conteúdo carregável via messages/pt-br.json (ou CMS futuramente)

SEO básico: title/description, H1/H2, imagens com alt

Subtasks (Sobre)

1. Hero / Introdução

H1 “Sobre a ONG”

Texto curto: missão + região de atuação

CTAs:

Primary: “Ver animais” → /adocao

Secondary: “Doar” → /doar

(Opcional) banner/foto do abrigo

2. Missão, Visão e Valores (#missao)

3 cards: Missão / Visão / Valores

Texto curto e objetivo (sem textão)

3. O que fazemos (#como-ajudamos)

Cards com ícones:

Resgate

Tratamento veterinário

Castração

Adoção responsável

Pós-adoção / acompanhamento

CTA “Entenda o processo de adoção” → /adocao#regras (ou seção equivalente)

4. Impacto / Números (#impacto)

Métricas (reaproveitar stats/transparency se fizer sentido):

adotados / em tratamento / resgatados

(opcional) gastos do mês

Loading state se puxar de API

CTA “Ver transparência” → /transparencia

5. Histórias (#historias)

Grid de 3–6 histórias (ou 3 + “ver mais”)

Se não existir página de histórias, usar /sobre#historias mesmo

(Opcional) carrossel no mobile

6. Time / Voluntários (#time)

Bloco com:

“Somos voluntários” (texto)

Cards com funções (ex: resgate, feiras, triagem, vet parceiros)

CTA “Quero ajudar” → /contato?assunto=voluntariado

7. Parceiros e Apoio (#parceiros) (opcional)

Logos ou lista simples

CTA “Quero ser parceiro” → /contato?assunto=parceria

8. FAQ Sobre (opcional, 4 perguntas)

“Como vocês se mantêm?”

“Como posso ajudar?”

“Como funciona lar temporário?”

“Como garantir adoção responsável?”

9. SEO + A11y + Performance

Metadata, headings, alt, sem layout shift

APIs / Dados (opcional)

useStats() e/ou useStories() (já existem)

Tudo o resto estático via messages/pt-br.json

Arquivos sugeridos

app/(public)/sobre/page.tsx

components/sobre/AboutHero.tsx

components/sobre/AboutMission.tsx

components/sobre/AboutWhatWeDo.tsx

components/sobre/AboutImpact.tsx

components/sobre/AboutStories.tsx

components/sobre/AboutTeam.tsx

components/sobre/AboutPartners.tsx (opcional)
