import { z } from 'zod';

export const todoSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export type TodoFormValues = z.infer<typeof todoSchema>;

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
});

export type PostFormValues = z.infer<typeof postSchema>;
