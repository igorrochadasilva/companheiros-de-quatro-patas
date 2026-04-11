# Contentful - Integracao atual

## Objetivo

Documentar a integracao ativa com Contentful no projeto.

## Configuracao no codigo

- SDK oficial: `contentful`
- facade de configuracao: `shared/config/contentful.ts`
- cliente backend: `backend/infrastructure/contentful/client.ts`
- endpoints:
  - `GET /api/cms/contentful/health`
  - `GET /api/cms/contentful/home`
  - `GET /api/cms/contentful/adoption`

## Variaveis de ambiente

```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
```

## Contratos consumidos hoje

### Home (`/api/cms/contentful/home`)

Campos usados para hero e secoes da home (titulos, subtitulos, CTAs,
imagem principal e blocos estruturados como FAQ/passos).

### Adoption (`/api/cms/contentful/adoption`)

Campos usados no hero da pagina de adocao:

- `adoptionTitle`
- `adoptionSubtitle`

## Comportamento de fallback

Quando o CMS nao responde ou nao retorna dados, a UI usa mensagens locais em
`messages/pt-br/*` para manter a pagina funcional.

## Checklist operacional

- validar `health` localmente antes de testar conteudo
- publicar entradas no ambiente correto (`CONTENTFUL_ENVIRONMENT`)
- manter `next.config.ts` com dominios de imagem do Contentful
