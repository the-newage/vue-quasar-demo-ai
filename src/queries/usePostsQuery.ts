import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { fetchPosts, fetchPost } from '@/api/posts';
import type { Post } from '@/types/models';

export function usePostsQuery(
  options?: Omit<UseQueryOptions<Post[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    ...options,
  });
}

export function usePostQuery(
  id: number,
  options?: Omit<UseQueryOptions<Post, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
    ...options,
  });
}
