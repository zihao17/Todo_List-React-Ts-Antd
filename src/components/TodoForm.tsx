import React, { useState } from 'react';
import { Input, Button, Form, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface TodoFormProps {
  onAdd: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [form] = Form.useForm();

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle('');
      form.resetFields();
    }
  };

  return (
    <Card bordered={false} style={{ borderRadius: 8 }}>
      <Title level={4} style={{ marginBottom: 16 }}>添加新任务</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: '请输入任务内容' }]}
          style={{ marginBottom: 0 }}
        >
          <div className="todo-input-group">
            <Input
              placeholder="输入任务内容..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onPressEnter={handleSubmit}
              size="large"
              style={{ borderRadius: '6px 0 0 6px' }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleSubmit}
              size="large"
              style={{ borderRadius: '0 6px 6px 0' }}
            >
              添加
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TodoForm;