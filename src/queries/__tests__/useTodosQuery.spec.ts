import { describe, it, expect, vi } from 'vitest';
import { useTodosQuery, useCreateTodoMutation } from '../useTodosQuery';
import * as todosApi from '@/api/todos';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { mount } from '@vue/test-utils';

vi.mock('@/api/todos');

const queryClient = new QueryClient();

const TestComponent = {
  template: '<div />',
  setup() {
    const todosQuery = useTodosQuery();
    const createTodoMutation = useCreateTodoMutation();
    return { todosQuery, createTodoMutation };
  },
};

describe('useTodosQuery', () => {
  it('fetches todos', async () => {
    const mockTodos = [{ id: 1, content: 'Test Todo' }];
    vi.spyOn(todosApi, 'getTodos').mockResolvedValue(mockTodos);

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    await wrapper.vm.todosQuery.refetch();

    expect(wrapper.vm.todosQuery.data.value).toEqual(mockTodos);
  });
});

describe('useCreateTodoMutation', () => {
  it('creates a todo and invalidates the todos query', async () => {
    const mockTodo = { id: 1, content: 'New Todo' };
    vi.spyOn(todosApi, 'createTodo').mockResolvedValue(mockTodo);
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    await wrapper.vm.createTodoMutation.mutateAsync('New Todo');

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['todos'] });
  });
});
