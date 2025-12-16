import type { Post } from '@/types/models';
import { http } from './http';

/**
 * Fetches a list of all posts.
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts.
 */
export async function fetchPosts(): Promise<Post[]> {
  const response = await http.get<Post[]>('/posts');
  return response.data;
}

/**
 * Fetches a single post by its ID.
 * @param {number} id - The ID of the post to fetch.
 * @returns {Promise<Post>} A promise that resolves to the post object.
 */
export async function fetchPost(id: number): Promise<Post> {
  const response = await http.get<Post>(`/posts/${id}`);
  return response.data;
}

/**
 * Creates a new post.
 * @param {Omit<Post, 'id'>} post - The post object to create, without the ID.
 * @returns {Promise<Post>} A promise that resolves to the newly created post object.
 */
export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const response = await http.post<Post>('/posts', post);
  return response.data;
}

/**
 * Updates an existing post.
 * @param {Post} post - The post object to update.
 * @returns {Promise<Post>} A promise that resolves to the updated post object.
 */
export async function updatePost(post: Post): Promise<Post> {
  const response = await http.put<Post>(`/posts/${post.id}`, post);
  return response.data;
}

/**
 * Deletes a post by its ID.
 * @param {number} id - The ID of the post to delete.
 * @returns {Promise<void>} A promise that resolves when the post is deleted.
 */
export async function deletePost(id: number): Promise<void> {
  await http.delete(`/posts/${id}`);
}
