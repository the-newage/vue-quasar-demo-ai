import { http } from './http';
import type { Todo } from '@/types/models';

interface JsonPlaceholderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = 'todos';

function getLocalTodos(): Todo[] {
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return localData ? JSON.parse(localData) as Todo[] : [];
}

function saveLocalTodos(todos: Todo[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

export async function getTodos(): Promise<Todo[]> {
  const localTodos = getLocalTodos();
  const { data } = await http.get<JsonPlaceholderTodo[]>('/todos');
  const apiTodos = data.slice(0, 10).map((todo) => ({
    id: todo.id,
    content: todo.title,
  }));
  return [...localTodos, ...apiTodos];
}

export async function createTodo(content: string): Promise<Todo> {
  const localTodos = getLocalTodos();
  const newTodo: Todo = {
    id: Date.now(), // Simple unique ID
    content,
  };
  const updatedTodos = [newTodo, ...localTodos];
  saveLocalTodos(updatedTodos);
  return Promise.resolve(newTodo);
}
