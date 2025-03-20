import { Todo } from '../types';

const STORAGE_KEY = 'react-todo-list';

export const getTodos = (): Todo[] => {
  const todosJson = localStorage.getItem(STORAGE_KEY);
  if (!todosJson) return [];

  try {
    const todos = JSON.parse(todosJson);
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt)
    }));
  } catch (error) {
    console.error('Failed to parse todos from localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};