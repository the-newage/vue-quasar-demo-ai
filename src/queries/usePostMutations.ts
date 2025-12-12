import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPost, updatePost, deletePost } from '@/api/posts';

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

import type { Post } from '@/types/models';

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.setQueryData(['posts', (data as Post).id], data);
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
