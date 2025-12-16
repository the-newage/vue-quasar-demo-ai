import { describe, it, expect, vi } from 'vitest';
import { useTodosQuery, useCreateTodoMutation } from '../useTodosQuery';
import * as todosApi from '@/api/todos';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { mount } from '@vue/test-utils';
import type { Todo } from '@/types/models';

vi.mock('@/api/todos');

const queryClient = new QueryClient();

interface TestComponentInstance {
  todosQuery: ReturnType<typeof useTodosQuery>;
  createTodoMutation: ReturnType<typeof useCreateTodoMutation>;
}

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

    await (wrapper.vm as unknown as TestComponentInstance).todosQuery.refetch();

    expect((wrapper.vm as unknown as TestComponentInstance).todosQuery.data.value).toEqual(
      mockTodos,
    );
  });
});

describe('useCreateTodoMutation', () => {
  it('creates a todo and updates the todos query cache', async () => {
    const mockTodo = { id: 1, content: 'New Todo' };
    vi.spyOn(todosApi, 'createTodo').mockResolvedValue(mockTodo);
    const setQueryDataSpy = vi.spyOn(queryClient, 'setQueryData');

    // Set initial data for the query
    queryClient.setQueryData(['todos'], []);

    // Clear the spy history before mounting the component
    setQueryDataSpy.mockClear();

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    await (wrapper.vm as unknown as TestComponentInstance).createTodoMutation.mutateAsync(
      'New Todo',
    );

    expect(setQueryDataSpy).toHaveBeenCalledWith(['todos'], expect.any(Function));

    // Verify the update function adds the new todo
    const updateFn = setQueryDataSpy.mock.calls[0]![1] as (oldData: Todo[]) => Todo[];
    const oldData: Todo[] = [{ id: 2, content: 'Old Todo' }];
    const newData = updateFn(oldData);
    expect(newData).toEqual([mockTodo, ...oldData]);
  });
});
