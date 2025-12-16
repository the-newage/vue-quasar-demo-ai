import type { Post } from '@/types/models';
import type { AxiosResponse } from 'axios';
import { http } from './http';

export function fetchPosts(): Promise<AxiosResponse<Post[]>> {
  return http.get<Post[]>('/posts');
}

export function fetchPost(id: number): Promise<AxiosResponse<Post>> {
  return http.get<Post>(`/posts/${id}`);
}

export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const response = await http.post<Post>('/posts', post);
  return response.data;
}

export function updatePost(post: Post): Promise<AxiosResponse<Post>> {
  return http.put<Post>(`/posts/${post.id}`, post);
}

export function deletePost(id: number): Promise<AxiosResponse<unknown>> {
  return http.delete(`/posts/${id}`);
}
