import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getTodos, createTodo } from '@/api/todos';
import type { Todo } from '@/types/models';

export function useTodosQuery() {
  return useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: getTodos,
    enabled: true,
  });
}

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => createTodo(content),
    onSuccess: (newTodo: Todo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
        if (!oldTodos) return [newTodo];
        return [newTodo, ...oldTodos];
      });
    },
  });
}
