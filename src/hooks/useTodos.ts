import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStatus } from '../types';
import { getTodos, saveTodos } from '../utils/storage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoStatus>('all');
  const [loading, setLoading] = useState(true);

  // 初始化加载数据
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const storedTodos = getTodos();
        setTodos(storedTodos);
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // 保存数据到本地存储
  useEffect(() => {
    if (!loading) {
      saveTodos(todos);
    }
  }, [todos, loading]);

  // 根据状态过滤任务
  const filteredTodos = todos.filter((todo) => {
    if (status === 'all') return !todo.deleted;
    if (status === 'active') return !todo.completed && !todo.deleted;
    if (status === 'completed') return todo.completed && !todo.deleted;
    if (status === 'deleted') return todo.deleted;
    return !todo.deleted;
  });

  // 添加任务
  const addTodo = (title: string) => {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // 删除任务（移入回收站）
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, deleted: true, updatedAt: new Date() }
          : todo
      )
    );
  };

  // 永久删除任务
  const permanentlyDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // 恢复任务（从回收站）
  const restoreTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, deleted: false, updatedAt: new Date() }
          : todo
      )
    );
  };

  // 编辑任务
  const editTodo = (id: string, title: string) => {
    if (!title.trim()) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: title.trim(), updatedAt: new Date() }
          : todo
      )
    );
  };

  // 切换任务完成状态
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  };

  // 清除已完成的任务（移入回收站）
  const clearCompleted = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.completed && !todo.deleted
          ? { ...todo, deleted: true, updatedAt: new Date() }
          : todo
      )
    );
  };

  // 清空回收站
  const emptyTrash = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.deleted));
  };

  // 获取回收站中的任务数量
  const getDeletedCount = () => {
    return todos.filter((todo) => todo.deleted).length;
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    status,
    loading,
    setStatus,
    addTodo,
    deleteTodo,
    permanentlyDeleteTodo,
    restoreTodo,
    editTodo,
    toggleTodo,
    clearCompleted,
    emptyTrash,
    getDeletedCount,
  };
};