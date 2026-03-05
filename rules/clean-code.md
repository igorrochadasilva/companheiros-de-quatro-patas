# Clean code rules

- Prefira funções pequenas, com uma única responsabilidade clara.
- Nomeie variáveis, funções e componentes de forma descritiva (sem abreviações obscuras).
- Evite duplicação: extraia helpers em `shared/lib` ou em hooks/services da feature quando um padrão se repetir.
- Não deixe código morto ou comentários grandes de código comentado.
- Comentários devem explicar _por que_ algo é feito, não _o que_ o código já deixa claro.
- Prefira early-return para reduzir níveis de indentação.
- Mantenha tipos TypeScript explícitos em APIs públicas (props, retornos de hooks, services).
