import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IndexPage from '../IndexPage.vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { Quasar } from 'quasar';
import { ref } from 'vue';
import * as useTodosQuery from '@/queries/useTodosQuery';

const queryClient = new QueryClient();

vi.mock('@/queries/useTodosQuery', () => ({
  useTodosQuery: vi.fn(),
  useCreateTodoMutation: vi.fn(),
}));

describe('IndexPage', () => {
  it.skip('displays todos and allows adding a new one', async () => {
    const mockTodos = [
      { id: 1, content: 'Learn Quasar' },
      { id: 2, content: 'Learn Vue' },
    ];
    const refetch = vi.fn();
    const mutateAsync = vi.fn();

    vi.mocked(useTodosQuery.useTodosQuery).mockReturnValue({
      data: ref(mockTodos),
      isLoading: ref(false),
      error: ref(null),
      refetch,
    } as any as ReturnType<typeof useTodosQuery.useTodosQuery>);

    vi.mocked(useTodosQuery.useCreateTodoMutation).mockReturnValue({
      mutateAsync,
    } as any as ReturnType<typeof useTodosQuery.useCreateTodoMutation>);

    const wrapper = mount(IndexPage, {
      global: {
        plugins: [
          [VueQueryPlugin, { queryClient }],
          Quasar,
        ],
        mocks: {
          $t: (key: string) => key,
        },
      },
    });

    // Check that the initial todos are displayed
    expect(wrapper.text()).toContain('Learn Quasar');
    expect(wrapper.text()).toContain('Learn Vue');

    // Add a new todo
    await wrapper.find('input').setValue('Test Playwright');
    await wrapper.find('form').trigger('submit');

    // Check that the mutation was called
    expect(mutateAsync).toHaveBeenCalledWith('Test Playwright');
  });
});
