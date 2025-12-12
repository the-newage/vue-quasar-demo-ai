import { useQuery } from '@tanstack/vue-query';
import { fetchComments } from '@/api/comments';

export function useCommentsQuery(postId: number) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
}
