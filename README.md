# companheiros-de-quatro-patas

Site institucional e de engajamento para uma ONG de adoção de animais, com foco em adoção, doações, transparência e arrecadação via bazar.

## Sobre o projeto

O **companheiros-de-quatro-patas** é um projeto web criado para apoiar uma ONG de proteção animal na divulgação de ações, captação de recursos e conexão com a comunidade.

O objetivo é centralizar, em uma experiência simples e acessível, as principais frentes da ONG:

1. **Adoção**: listar animais disponíveis, apresentar detalhes e orientar o processo de adoção.
2. **Doações**: facilitar doações financeiras e/ou de itens, com informações claras sobre como ajudar.
3. **Informações da ONG**: comunicar missão, transparência, canais de contato e redes sociais.
4. **Bazar**: divulgar produtos/itens do bazar para arrecadação e orientar como comprar.
5. **Objetivo final**: contribuir para a manutenção e finalização do abrigo por meio de apoio financeiro e engajamento.

## Stack e tecnologias

### Confirmado no repositório

- **Next.js 16.1.6**
- **React 19.2.3**
- **React DOM 19.2.3**
- **TypeScript 5**
- **ESLint 9** + `eslint-config-next`
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **App Router** (diretório `/app`)

### A confirmar

- Biblioteca de componentes/UI (se houver padrão definido)
- Solução de testes automatizados
- Plataforma de deploy e CI/CD
- Integrações externas (pagamentos, CRM, analytics etc.)

## Como rodar localmente

## Requisitos

- **Node.js**: versão do projeto **a confirmar** (recomendado usar LTS)
- **pnpm** (há `pnpm-lock.yaml` no repositório)

## Instalação

```bash
pnpm install
```

## Scripts disponíveis

```bash
pnpm dev    # inicia ambiente de desenvolvimento
pnpm build  # gera build de produção
pnpm start  # executa build em modo produção
pnpm lint   # roda linting
```

> Script de testes (`test`) não está configurado no `package.json` no momento.

## Estrutura de pastas

Estrutura atual (resumo):

```text
.
├─ app/                 # App Router (rotas, layout e páginas)
│  ├─ layout.tsx        # layout raiz da aplicação
│  ├─ page.tsx          # página inicial
│  └─ globals.css       # estilos globais
├─ public/              # arquivos estáticos
├─ next.config.ts       # configuração do Next.js
├─ eslint.config.mjs    # configuração de lint
├─ postcss.config.mjs   # configuração de PostCSS/Tailwind
├─ tsconfig.json        # configuração TypeScript
└─ package.json         # scripts e dependências
```

## Configuração de ambiente

Crie um arquivo `.env.local` com base em um `.env.example` na raiz do projeto.

### Exemplo de `.env.example`

```env
# Aplicação
NEXT_PUBLIC_APP_NAME=companheiros-de-quatro-patas
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contato institucional
ONG_PUBLIC_EMAIL=contato@exemplo.org
ONG_PUBLIC_PHONE=+55XXXXXXXXXXX

# Redes sociais (opcional)
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/SEU_PERFIL
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/SUA_PAGINA

# Doações / apoio (opcional)
NEXT_PUBLIC_DONATION_PAGE_URL=https://exemplo.org/doar
```

> Use apenas placeholders e nunca versione segredos reais.

## Contribuição

## Estratégia de branches

- `main`: código estável de produção
- `develop`: integração contínua de funcionalidades
- `feature/<nome-curto>`: novas funcionalidades
- `fix/<nome-curto>`: correções
- `hotfix/<nome-curto>`: correções urgentes em produção

## Padrão de commits

Padrão recomendado: **Conventional Commits**

Exemplos:

- `feat: adiciona seção de animais para adoção`
- `fix: corrige validação do formulário de contato`
- `docs: atualiza README com instruções de ambiente`
- `refactor: reorganiza componentes da home`

## Checklist de Pull Request

- [ ] Objetivo da PR está claro e descrito
- [ ] Mudanças limitadas ao escopo proposto
- [ ] `pnpm lint` executado sem erros
- [ ] Build local validada (`pnpm build`)
- [ ] Prints/GIFs anexados (quando houver alteração visual)
- [ ] Sem segredos ou dados sensíveis versionados
- [ ] README/documentação atualizados (se necessário)

## Roadmap / MVP

## MVP (prioridade inicial)

- [ ] **Adoção**
  - [ ] Listagem de animais
  - [ ] Página de detalhes por animal
  - [ ] Orientações de processo de adoção
- [ ] **Doações**
  - [ ] Página com formas de doação financeira
  - [ ] Página/lista de doações em itens
- [ ] **Informações da ONG**
  - [ ] Missão, visão e valores
  - [ ] Transparência (prestação de contas/conteúdo institucional)
  - [ ] Contato e redes sociais
- [ ] **Bazar**
  - [ ] Vitrine de itens/produtos
  - [ ] Orientações de compra e retirada/entrega

## Evoluções futuras

- [ ] Filtros avançados na adoção (porte, idade, sexo, localização)
- [ ] Painel administrativo para gestão de animais e bazar
- [ ] Blog/notícias da ONG
- [ ] Métricas de engajamento e conversão
- [ ] Automação de comunicação com adotantes/doadores

## Licença

**A confirmar** (ex.: MIT, Apache-2.0, licença proprietária da ONG).

## Créditos

- Equipe e voluntários da ONG **Companheiros de Quatro Patas**
- Comunidade e mantenedores de **Next.js**, **React** e ecossistema open source

## Pendências / a confirmar

- Definição da licença oficial do projeto
- Versão mínima oficial do Node.js
- Estratégia de testes (ferramenta e cobertura mínima)
- Ambiente de deploy e pipeline CI/CD
- Canais oficiais da ONG (e-mail, telefone, redes sociais)
- Fluxo final de doações (financeira e itens) e responsáveis internos
