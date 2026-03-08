Task — Implementar tela do Bazar

Título
Implementar página do Bazar com listagem de produtos e CTA de contato

Objetivo
Criar a página pública do bazar da ONG para exibir itens disponíveis, permitindo que visitantes visualizem produtos, preço, descrição e forma de contato para compra ou reserva.

Escopo do MVP

A tela deve ter:

banner ou header da página com título e breve descrição

listagem de produtos em grid responsivo

card de produto com:

imagem

nome

preço

descrição curta

status do item (disponível, reservado, vendido)

botão de contato

filtro por status

busca por nome do produto

estado de vazio quando não houver itens

loading e tratamento de erro

paginação simples ou botão “carregar mais” se necessário

Regras de negócio

itens com status vendido podem:

aparecer desabilitados no grid, ou

ficar ocultos por padrão no MVP
Eu recomendo ocultar por padrão e deixar apenas disponíveis/reservados

item reservado deve continuar visível, mas com badge específica

botão de contato pode abrir:

WhatsApp com mensagem pré-preenchida

ou página/detalhe com instruções
Para MVP, WhatsApp direto é o mais simples

se não existir imagem, usar placeholder padrão

descrição longa deve ser truncada no card

Estrutura sugerida da página
Seções

Hero/Header

título: Bazar Solidário

descrição curta explicando que a renda ajuda a ONG / abrigo

Barra de filtros

input de busca

select de status

contador de itens encontrados

Grid de produtos

cards responsivos

1 coluna mobile

2 tablet

3 ou 4 desktop

Estado vazio

mensagem amigável

CTA para voltar para home ou entrar em contato

Tipagem sugerida
export type BazaarItemStatus = 'available' | 'reserved' | 'sold';

export interface BazaarItem {
id: string;
name: string;
description: string;
price: number;
imageUrl: string | null;
status: BazaarItemStatus;
category?: string;
createdAt: string;
updatedAt: string;
}
Critérios de aceite

página /bazar renderiza corretamente em mobile e desktop

usuário consegue visualizar lista de itens do bazar

usuário consegue buscar por nome

usuário consegue filtrar por status

itens exibem imagem, nome, preço e status

botão de contato funciona corretamente

página possui loading, erro e empty state

layout segue identidade visual do projeto

componentes com acessibilidade básica (aria-label, contraste, foco visível)

Sugestão técnica
Componentes

BazaarHero

BazaarFilters

BazaarGrid

BazaarCard

BazaarEmptyState

Hooks

useBazaarItems

useBazaarFilters

Organização

types/bazaar.ts

services/bazaar/get-bazaar-items.ts

hooks/use-bazaar-items.ts

hooks/use-bazaar-filters.ts

components/features/bazaar/\*

Dados mock iniciais

Vale começar com fake data para acelerar:

roupas

caminhas

coleiras

brinquedos

utensílios

itens doados diversos

Mensagem pré-pronta do WhatsApp

Algo assim:

Olá! Tenho interesse no item "{nome do produto}" do Bazar Solidário.
