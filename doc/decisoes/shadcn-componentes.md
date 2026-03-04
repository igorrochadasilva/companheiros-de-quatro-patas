# Análise técnica: componentes shadcn/ui para Companheiros de Quatro Patas

Documento de referência para escolha e instalação dos componentes [shadcn/ui](https://ui.shadcn.com/docs/components) no projeto, alinhado ao MVP e à estrutura atual (site público + área admin).

---

## 1. Contexto do projeto

- **Site público:** Adoção, Doar, Bazar, Sobre, Contato, Transparência.
- **Área admin:** Animais, Adoções, Bazar (produtos e pedidos), Doações.
- **Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, App Router.

Os componentes abaixo foram mapeados por área (navegação, listagens, formulários, feedback, admin) e priorizados para o MVP.

---

## 2. Componentes recomendados

### 2.1 Navegação e layout

| Componente          | Uso no projeto                                                                                         | Prioridade   |
| ------------------- | ------------------------------------------------------------------------------------------------------ | ------------ |
| **Navigation Menu** | Menu principal do header (Adoção, Doar, Bazar, Sobre, Contato); possível submenu (ex.: Transparência). | Alta         |
| **Breadcrumb**      | Navegação contextual: ex. `Home > Adoção > [Nome do animal]`, `Home > Bazar > [Produto]`.              | Média        |
| **Tabs**            | Abas na listagem de adoção (Cachorros / Gatos), tipos de doação, etapas do processo de adoção.         | Alta         |
| **Sidebar**         | Área admin: menu lateral com links (Animais, Adoções, Bazar, Doações).                                 | Alta (admin) |
| **Separator**       | Divisão visual entre seções (hero x conteúdo, blocos na página Sobre/Transparência).                   | Média        |

### 2.2 Exibição de conteúdo (cards, listas, estados)

| Componente       | Uso no projeto                                                                                           | Prioridade |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **Card**         | Card de animal na listagem de adoção; card de item do bazar; blocos de “como doar” / “formas de doação”. | Alta       |
| **Avatar**       | Foto do animal (com fallback); possível uso em depoimentos ou equipe na Sobre.                           | Alta       |
| **Badge**        | Status do animal (Disponível, Em processo, Adotado); categorias no bazar; tags em filtros.               | Alta       |
| **Accordion**    | Orientações de adoção (passo a passo); formas de doação; FAQ; como comprar no bazar.                     | Alta       |
| **Aspect Ratio** | Manter proporção das fotos dos animais e dos produtos do bazar.                                          | Alta       |
| **Skeleton**     | Estado de carregamento nas listagens (adoção, bazar) e na página de detalhes.                            | Alta       |
| **Empty**        | “Nenhum animal disponível no momento”; “Nenhum item no bazar”; lista vazia no admin.                     | Alta       |
| **Carousel**     | Galeria de fotos do animal na página de detalhes; destaques na home ou no bazar.                         | Média      |

### 2.3 Formulários e entrada de dados

| Componente                     | Uso no projeto                                                                       | Prioridade |
| ------------------------------ | ------------------------------------------------------------------------------------ | ---------- |
| **Button**                     | CTAs (Quero adotar, Doar, Enviar mensagem, Candidatar-se); ações no admin.           | Alta       |
| **Input**                      | Contato (nome, e-mail, telefone); busca/filtros; formulário de candidatura à adoção. | Alta       |
| **Label**                      | Labels acessíveis em todos os formulários.                                           | Alta       |
| **Textarea**                   | Mensagem no contato; observações na candidatura; descrições no admin.                | Alta       |
| **Select** / **Native Select** | Filtros (espécie, porte, idade, sexo); tipo de doação; status no admin.              | Alta       |
| **Checkbox**                   | Termos de adoção; aceite de contato; “doação recorrente”; filtros múltiplos.         | Alta       |
| **Radio Group**                | Escolha única (ex.: forma de retirada no bazar, tipo de doação).                     | Média      |
| **Field**                      | Encapsular Input/Select + Label + mensagem de erro (formulários com validação).      | Média      |

_Sugestão:_ usar **React Hook Form** + **Zod** com os componentes acima; o shadcn tem documentação de [Forms](https://ui.shadcn.com/docs/forms/react-hook-form).

### 2.4 Feedback, overlays e notificações

| Componente                    | Uso no projeto                                                                              | Prioridade |
| ----------------------------- | ------------------------------------------------------------------------------------------- | ---------- |
| **Toast (Sonner)**            | “Formulário enviado”, “Candidatura registrada”, “Erro ao enviar”; feedback no admin.        | Alta       |
| **Dialog** / **Alert Dialog** | Confirmação de ações (ex.: “Tem certeza que deseja enviar?”); avisos importantes.           | Alta       |
| **Sheet** / **Drawer**        | Filtros na adoção/bazar em mobile; menu hambúrguer; detalhe rápido de item.                 | Alta       |
| **Progress**                  | Metas de arrecadação (ex.: “50% da meta do abrigo”); barras de transparência.               | Média      |
| **Alert**                     | Avisos na página (ex.: “Processo de adoção temporariamente suspenso”); erros de formulário. | Média      |
| **Tooltip**                   | Explicação de status (ex.: “Em processo”); ícones de rede social; dicas em filtros.         | Média      |

### 2.5 Listagens e dados (tabelas, paginação)

| Componente        | Uso no projeto                                                          | Prioridade    |
| ----------------- | ----------------------------------------------------------------------- | ------------- |
| **Table**         | Admin: listagem de animais, adoções, pedidos do bazar, doações.         | Alta (admin)  |
| **Data Table**    | Admin: tabelas com ordenação, filtros e seleção (quando necessário).    | Média (admin) |
| **Pagination**    | Listagem pública de animais e itens do bazar; listagens do admin.       | Alta          |
| **Dropdown Menu** | Ações por linha no admin (Editar, Excluir, Ver); filtros “Ordenar por”. | Alta (admin)  |

### 2.6 Acessórios e utilitários

| Componente      | Uso no projeto                                                                | Prioridade |
| --------------- | ----------------------------------------------------------------------------- | ---------- |
| **Spinner**     | Botões em loading (enviar formulário, salvar no admin).                       | Alta       |
| **Scroll Area** | Listas longas ou conteúdo com scroll customizado (modal de termos, sidebar).  | Média      |
| **Collapsible** | Seções expansíveis (ex.: “Ver mais” em descrição do animal ou do produto).    | Baixa      |
| **Typography**  | Títulos e textos padronizados, se o projeto definir um sistema de tipografia. | Baixa      |

---

## 3. Resumo por prioridade

### Instalação recomendada (MVP – primeira leva)

Componentes de uso imediato no site público e no admin:

1. **button** – CTAs e ações
2. **card** – Animais, bazar, blocos de conteúdo
3. **input** – Formulários e busca
4. **label** – Formulários
5. **textarea** – Mensagens e observações
6. **select** – Filtros e opções únicas
7. **checkbox** – Termos e filtros
8. **avatar** – Fotos dos animais
9. **badge** – Status e categorias
10. **tabs** – Abas (adoção, doação, etc.)
11. **accordion** – Orientações e FAQs
12. **separator** – Divisão de seções
13. **skeleton** – Loading
14. **dropdown-menu** – Ações e filtros
15. **dialog** – Confirmações e modais
16. **alert-dialog** – Confirmações destrutivas/importantes
17. **sheet** – Filtros mobile e menu
18. **sonner** (toast) – Notificações
19. **table** – Listagens no admin
20. **pagination** – Listagens
21. **navigation-menu** – Menu principal
22. **breadcrumb** – Navegação contextual
23. **aspect-ratio** – Fotos
24. **alert** – Avisos em página
25. **empty** – Estado vazio
26. **progress** – Metas de arrecadação
27. **spinner** – Loading em botões
28. **sidebar** – Layout do admin
29. **tooltip** – Dicas e legendas
30. **scroll-area** – Áreas com scroll

### Segunda leva (refino e admin)

- **carousel** – Galeria de fotos
- **radio-group** – Escolhas únicas em formulários
- **field** – Campos com validação integrada
- **data-table** – Tabelas avançadas no admin (se necessário)
- **drawer** – Alternativa ao Sheet em mobile
- **collapsible** – Conteúdo expansível
- **button-group** – Grupos de ações (opcional)

### Dependências comuns do shadcn

- **Radix UI** – Base de vários componentes (o CLI instala o que cada um exige).
- **class-variance-authority (cva)** e **tailwind-merge** – Variantes e classes.
- **lucide-react** – Ícones (recomendado pelo shadcn).

---

## 4. Compatibilidade com o projeto

- **Next.js 16 / React 19:** shadcn/ui é compatível; os componentes são client ou server conforme a doc de cada um.
- **Tailwind CSS 4:** O shadcn suporta Tailwind v4; na instalação inicial pode ser necessário configurar `tailwind.config` e `components.json` (o CLI pergunta pelo estilo e por Tailwind v4).
- **App Router:** Uso de `"use client"` apenas nos componentes interativos (modais, dropdowns, formulários controlados, etc.).

---

## 5. Próximos passos (após validação)

1. **Inicializar shadcn no projeto** (se ainda não estiver):  
   `npx shadcn@latest init`
   - Escolher estilo (default/new-york), tema claro/escuro, e confirmar Tailwind v4 e App Router.

2. **Instalar os componentes aprovados** em lotes, por exemplo:

   ```bash
   npx shadcn@latest add button card input label textarea select checkbox avatar badge tabs accordion separator skeleton dropdown-menu dialog alert-dialog sheet sonner table pagination navigation-menu breadcrumb aspect-ratio alert empty progress spinner sidebar tooltip scroll-area
   ```

   Ou um por um:  
   `npx shadcn@latest add button`  
   `npx shadcn@latest add card`  
   …

3. **Estrutura do projeto:** Utilitários e componentes shadcn ficam em **`shared/`**: `shared/lib/utils.ts` (função `cn`), `shared/ui/*` (componentes), `shared/hooks/*` (ex.: `useIsMobile.ts`, `useStats.ts`). O `components.json` está configurado com aliases `utils: "@/shared/lib/utils"`, `ui: "@/shared/ui"`, `lib: "@/shared/lib"`, `hooks: "@/shared/hooks"`. Ao adicionar novos componentes com `npx shadcn@latest add <nome>`, o CLI grava em `shared/ui/` se os aliases forem mantidos.

4. Opcional: configurar **React Hook Form** + **Zod** e usar os componentes de formulário (Input, Select, Checkbox, Field) conforme a doc de Forms do shadcn.

---

## 6. Referências

- [Componentes shadcn/ui](https://ui.shadcn.com/docs/components)
- [Instalação shadcn](https://ui.shadcn.com/docs/installation)
- [Forms (React Hook Form)](https://ui.shadcn.com/docs/forms/react-hook-form)
- README e MVP do repositório Companheiros de Quatro Patas

---

_Documento criado para validação antes da instalação dos componentes. Após sua aprovação, os itens da primeira leva (e os que forem escolhidos da segunda) podem ser instalados conforme a seção 5._
