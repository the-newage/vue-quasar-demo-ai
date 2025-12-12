import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { fetchPosts, fetchPost } from '@/api/posts';
import type { Post } from '@/types/models';
import type { AxiosResponse } from 'axios';

export function usePostsQuery(
  options?: Omit<
    UseQueryOptions<AxiosResponse<Post[]>, Error, Post[]>,
    'queryKey' | 'queryFn' | 'select'
  >
) {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    select: (res) => res.data,
    ...options,
  });
}

export function usePostQuery(
  id: number,
  options?: Omit<
    UseQueryOptions<AxiosResponse<Post>, Error, Post>,
    'queryKey' | 'queryFn' | 'select'
  >
) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
    select: (res) => res.data,
    ...options,
  });
}
