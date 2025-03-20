import React from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TodoHeader from './components/TodoHeader';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { useTodos } from './hooks/useTodos';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  const {
    todos,
    allTodos,
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
  } = useTodos();

  const deletedCount = getDeletedCount();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <Layout className="app-container">
        <Content className="app-content">
          <div className="todo-container">
            <div className='aside'>
              <div className="todo-header">
                <TodoHeader />
              </div>

              <div className="todo-stats">
                <TodoStats allTodos={allTodos} deletedCount={deletedCount} />
              </div>

              <div className="todo-form">
                <TodoForm onAdd={addTodo} />
              </div>
            </div>

            <div className='main'>
              <div className="todo-list">
                <TodoList
                  todos={todos}
                  loading={loading}
                  status={status}
                  onStatusChange={setStatus}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onPermanentDelete={permanentlyDeleteTodo}
                  onRestore={restoreTodo}
                  onEdit={editTodo}
                  onClearCompleted={clearCompleted}
                  onEmptyTrash={emptyTrash}
                  deletedCount={deletedCount}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;