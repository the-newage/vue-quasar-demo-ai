import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

export const vueQueryOptions: VueQueryPluginOptions = {
  queryClient,
};
