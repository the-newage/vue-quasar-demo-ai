import type { Comment } from '@/types/models';
import { http } from './http';

export async function fetchComments(postId: number): Promise<Comment[]> {
  const response = await http.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
}
