import type { Comment } from '@/types/models';
import { http } from './http';

export function fetchComments(postId: number) {
  return http.get<Comment[]>(`/posts/${postId}/comments`);
}
