# Contentful - Configuracao Inicial

## Base oficial utilizada

- https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/
- https://www.contentful.com/developers/docs/references/content-delivery-api/

## O que foi configurado no projeto

- SDK oficial instalado: `contentful`
- Variaveis de ambiente em `.env.example`
- Client server-side em `shared/lib/contentful.ts`
- Config/env em `shared/config/contentful.ts`
- Healthcheck em `GET /api/cms/contentful/health`
- Endpoint de conteudo Home em `GET /api/cms/contentful/home`
  - Campos mapeados: `title`, `subtitle`, `primaryCtaLabel`, `secondaryCtaLabel`, `heroImage`
- Dominios de imagem do Contentful em `next.config.ts`

## Variaveis necessarias

```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
```

## Proximo passo recomendado

Definir os content types no Contentful para as telas de `tasks/screens/` e criar os services por feature (ex.: `features/home/services/contentful-home.ts`) para substituir gradualmente os mocks.
