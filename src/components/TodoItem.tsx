import React, { useState } from 'react';
import { Checkbox, Input, Button, Tooltip, Space, Typography, Card, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  UndoOutlined,
  DeleteFilled
} from '@ant-design/icons';
import { Todo } from '../types';

const { Text } = Typography;

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPermanentDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  isInTrash?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onPermanentDelete,
  onRestore,
  onEdit,
  isInTrash = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  const handleSave = () => {
    if (editValue.trim() !== '') {
      onEdit(todo.id, editValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(todo.title);
  };

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    return `${month}月${day}日 ${hour}时`;
  };

  return (
    <Card
      className={`todo-item ${todo.completed ? 'todo-item-completed' : ''} ${isInTrash ? 'todo-item-deleted' : ''}`}
      bordered={false}
      style={{ marginBottom: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
          {!isInTrash && (
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              style={{ marginRight: 12, marginTop: 4 }}
            />
          )}

          {isEditing ? (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onPressEnter={handleSave}
              autoFocus
              style={{ flex: 1 }}
            />
          ) : (
            <div style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#999' : isInTrash ? '#ff4d4f' : 'inherit',
                  wordBreak: 'break-word',
                  display: 'block',
                  marginBottom: 6
                }}
              >
                {todo.title}
              </Text>
              <div>
                <Text type="secondary" style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  创建于: {formatDate(todo.createdAt)}
                  {todo.updatedAt.getTime() !== todo.createdAt.getTime() &&
                    ` | 更新于: ${formatDate(todo.updatedAt)}`}
                </Text>
              </div>
            </div>
          )}
        </div>

        <Space style={{ marginLeft: 12 }}>
          {isEditing ? (
            <>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={handleSave}
              />
              <Button
                type="default"
                size="small"
                icon={<CloseOutlined />}
                onClick={handleCancel}
                danger
              />
            </>
          ) : isInTrash ? (
            <>
              <Tooltip title="恢复">
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  onClick={() => onRestore && onRestore(todo.id)}
                  size="small"
                />
              </Tooltip>
              <Popconfirm
                title="永久删除"
                description="此操作不可撤销，确定要永久删除吗？"
                onConfirm={() => onPermanentDelete && onPermanentDelete(todo.id)}
                okText="确定"
                cancelText="取消"
              >
                <Tooltip title="永久删除">
                  <Button
                    type="primary"
                    icon={<DeleteFilled />}
                    size="small"
                    danger
                  />
                </Tooltip>
              </Popconfirm>
            </>
          ) : (
            <>
              <Tooltip title="编辑">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  size="small"
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(todo.id)}
                  size="small"
                  danger
                />
              </Tooltip>
            </>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default TodoItem;