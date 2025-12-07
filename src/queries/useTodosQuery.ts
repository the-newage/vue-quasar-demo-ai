import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getTodos, createTodo } from '@/api/todos';
import type { Todo } from 'components/models';

export function useTodosQuery() {
  return useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
}

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => createTodo(content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
