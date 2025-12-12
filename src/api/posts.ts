import type { Post } from '@/types/models';
import { http } from './http';

export function fetchPosts() {
  return http.get<Post[]>('/posts');
}

export function fetchPost(id: number) {
  return http.get<Post>(`/posts/${id}`);
}

export function createPost(post: Omit<Post, 'id'>) {
  return http.post<Post>('/posts', post);
}

export function updatePost(post: Post) {
  return http.put<Post>(`/posts/${post.id}`, post);
}

export function deletePost(id: number) {
  return http.delete(`/posts/${id}`);
}
