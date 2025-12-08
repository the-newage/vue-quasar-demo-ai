import type { Todo } from '@/types/models';

let todos: Todo[] = [
  { id: 1, content: 'Learn Quasar' },
  { id: 2, content: 'Learn Vue' },
  { id: 3, content: 'Learn TypeScript' },
];

export async function getTodos(): Promise<Todo[]> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Promise.resolve(todos);
}

export async function createTodo(content: string): Promise<Todo> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newTodo: Todo = {
    id: todos.length + 1,
    content,
  };
  todos = [...todos, newTodo];
  return Promise.resolve(newTodo);
}
