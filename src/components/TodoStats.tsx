import React from 'react';
import { Statistic, Row, Col, Card, Progress } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Todo } from '../types';

interface TodoStatsProps {
  allTodos: Todo[];
  deletedCount: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ allTodos, deletedCount }) => {
  const totalTodos = allTodos.length;
  const completedTodos = allTodos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card className="stat-card" bordered={false}>
            <Statistic
              title={<span style={{ fontSize: 14 }}>总任务</span>}
              value={totalTodos}
              prefix={<UnorderedListOutlined style={{ marginRight: 6 }} />}
              valueStyle={{ color: '#1890ff', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card" bordered={false}>
            <Statistic
              title={<span style={{ fontSize: 14 }}>已完成</span>}
              value={completedTodos}
              prefix={<CheckCircleOutlined style={{ marginRight: 6 }} />}
              valueStyle={{ color: '#52c41a', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card" bordered={false}>
            <Statistic
              title={<span style={{ fontSize: 14 }}>未完成</span>}
              value={activeTodos}
              prefix={<ClockCircleOutlined style={{ marginRight: 6 }} />}
              valueStyle={{ color: '#faad14', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card" bordered={false}>
            <Statistic
              title={<span style={{ fontSize: 14 }}>回收站</span>}
              value={deletedCount}
              prefix={<DeleteOutlined style={{ marginRight: 6 }} />}
              valueStyle={{ color: '#ff4d4f', fontSize: 24 }}
            />
          </Card>
        </Col>
      </Row>
      {totalTodos > 0 && (
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <div style={{ padding: '0 8px' }}>
            <Progress
              percent={completionRate}
              size="small"
              status="active"
              strokeColor="#52c41a"
              format={(percent) => `已完成 ${percent}%`}
              style={{ marginBottom: 0 }}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default TodoStats;