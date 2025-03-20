export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoStatus = 'all' | 'active' | 'completed' | 'deleted';