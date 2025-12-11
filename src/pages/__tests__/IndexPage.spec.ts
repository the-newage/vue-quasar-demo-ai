import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IndexPage from '../IndexPage.vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { ref } from 'vue';
import { createI18n } from 'vue-i18n';
import * as useTodosQuery from '@/queries/useTodosQuery';

const queryClient = new QueryClient();

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  messages: { 'en-US': {} },
});

vi.mock('@/queries/useTodosQuery', () => ({
  useTodosQuery: vi.fn(),
  useCreateTodoMutation: vi.fn(),
}));

describe('IndexPage', () => {
  it('displays todos and allows adding a new one', async () => {
    const mockTodos = [
      { id: 1, content: 'Learn Quasar' },
      { id: 2, content: 'Learn Vue' },
    ];
    const refetch = vi.fn();
    const mockResetForm = vi.fn();
    const mutateAsync = vi.fn().mockResolvedValue(undefined);

    vi.mocked(useTodosQuery.useTodosQuery).mockReturnValue({
      data: ref(mockTodos),
      isLoading: ref(false),
      error: ref(null),
      refetch,
    } as any);

    vi.mocked(useTodosQuery.useCreateTodoMutation).mockReturnValue({
      mutateAsync,
    } as any);

    const wrapper = mount(IndexPage, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }], i18n],
        stubs: {
          'q-page': { template: '<div><slot></slot></div>' },
          'q-list': { template: '<div><slot></slot></div>' },
          'q-item': { template: '<div><slot></slot></div>' },
          'q-item-section': { template: '<div><slot></slot></div>' },
          'q-btn': true,
          Form: {
            template: '<form @submit.prevent="handleSubmit"><slot></slot></form>',
            methods: {
              handleSubmit() {
                const inputElement = this.$el.querySelector('input');
                const value = inputElement ? inputElement.value : '';
                this.$emit('submit', { content: value }, { resetForm: mockResetForm });
              },
            },
          },
          BaseInput: {
            template: '<input />',
          },
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
    expect(mockResetForm).toHaveBeenCalled();
  });
});
