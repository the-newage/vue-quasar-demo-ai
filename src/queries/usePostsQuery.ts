import { useQuery } from '@tanstack/vue-query';
import { fetchPosts, fetchPost } from '@/api/posts';

export function usePostsQuery() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}

export function usePostQuery(id: number) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  });
}
