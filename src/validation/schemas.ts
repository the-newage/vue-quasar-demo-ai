import { z } from 'zod';

export const todoSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
