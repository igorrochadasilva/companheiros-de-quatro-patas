# Feature: Donatation

Tudo que alimenta a pagina de doacao: config de PIX, transparencia, impacto e FAQ.

## Conteudo

| Pasta           | Responsabilidade                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **hooks/**      | `useDonationConfig`, `useStats`, `useStories`, `useTransparencySummary`                                |
| **services/**   | Chamadas de API para doacoes, stats, historias e transparencia                                         |
| **components/** | `DonatationContent` e secoes da pagina (`Hero`, `Pix`, `Recurring`, `Items`, `Impact`, `Transparency`) |

## Uso

A rota em `app/(public)/doar` importa o conteudo da feature:

```ts
import { DonatationContent } from "@/features/donatation/components/DonatationContent";
```
