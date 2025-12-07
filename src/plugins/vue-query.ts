import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const vueQueryOptions: VueQueryPluginOptions = {
  queryClient,
};
