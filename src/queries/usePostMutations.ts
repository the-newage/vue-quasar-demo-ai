import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPost, updatePost, deletePost } from '@/api/posts';
import type { Post } from '@/types/models';

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) return [newPost];
        return [newPost, ...oldPosts];
      });
    },
  });
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.setQueryData(['posts', data.data.id], data.data);
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
