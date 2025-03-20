import React from 'react';
import { List, Empty, Spin, Card, Typography, Tabs, Badge, Button, Popconfirm, Radio } from 'antd';
import {
  UnorderedListOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteFilled,
  ClearOutlined
} from '@ant-design/icons';
import TodoItem from './TodoItem';
import { Todo, TodoStatus } from '../types';

const { Title } = Typography;
const { TabPane } = Tabs;

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  status: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPermanentDelete: (id: string) => void;
  onRestore: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onClearCompleted: () => void;
  onEmptyTrash: () => void;
  deletedCount: number;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  status,
  onStatusChange,
  onToggle,
  onDelete,
  onPermanentDelete,
  onRestore,
  onEdit,
  onClearCompleted,
  onEmptyTrash,
  deletedCount,
}) => {
  const handleTabChange = (activeKey: string) => {
    onStatusChange(activeKey as TodoStatus);
  };

  const renderTabBar = () => {
    return (
      <div className="filter-container">
        <Radio.Group
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          size="middle"
        >
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="active">未完成</Radio.Button>
          <Radio.Button value="completed">已完成</Radio.Button>
          <Radio.Button value="deleted">
            <Badge count={deletedCount} size="small" offset={[5, -3]}>
              <span style={{ marginRight: 8 }}>回收站</span>
            </Badge>
          </Radio.Button>
        </Radio.Group>

        {status === 'completed' && (
          <Button
            icon={<DeleteOutlined />}
            onClick={onClearCompleted}
            size="middle"
            danger
          >
            清除已完成
          </Button>
        )}

        {status === 'deleted' && deletedCount > 0 && (
          <Popconfirm
            title="清空回收站"
            description="此操作不可撤销，确定要清空回收站吗？"
            onConfirm={onEmptyTrash}
            okText="确定"
            cancelText="取消"
          >
            <Button
              icon={<ClearOutlined />}
              size="middle"
              danger
            >
              清空回收站
            </Button>
          </Popconfirm>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <Spin size="large" />
        </div>
      );
    }

    if (todos.length === 0) {
      return (
        <Empty
          description={status === 'deleted' ? "回收站为空" : "暂无任务"}
          style={{ padding: '40px 0' }}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    return (
      <List
        dataSource={todos}
        renderItem={(todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onPermanentDelete={onPermanentDelete}
            onRestore={onRestore}
            onEdit={onEdit}
            isInTrash={status === 'deleted'}
          />
        )}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 8,
        }}
      />
    );
  };

  return (
    <Card bordered={false} style={{ borderRadius: 8 }}>
      <Title level={4} style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
        {status === 'deleted' ? (
          <>
            <DeleteFilled className="trash-icon" style={{ marginRight: 8 }} />
            回收站
          </>
        ) : (
          <>
            <UnorderedListOutlined style={{ marginRight: 8 }} />
            任务列表
          </>
        )}
      </Title>

      {renderTabBar()}
      {renderContent()}
    </Card>
  );
};

export default TodoList;