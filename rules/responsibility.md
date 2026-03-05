# Responsibility separation rules

- Cada componente React deve ter uma função principal clara (layout, card, seção, etc.).
- Lógica de dados (fetch, React Query) deve ficar em hooks/services, não diretamente em componentes de UI.
- Componentes de página devem apenas orquestrar seções e hooks, não conter lógica de negócio complexa.
- Separar preocupações por arquivo: evitar arquivos gigantes que misturam muitas responsabilidades.
- Ao adicionar nova funcionalidade, primeiro decidir: isso é domínio de qual feature? Em seguida, criar/mover para a pasta dessa feature.
- Ao tocar código existente, manter a separação atual (não misturar regras de adoção em código da home, por exemplo).
