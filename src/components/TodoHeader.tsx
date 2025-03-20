import React, { useState, useEffect } from 'react';
import { Typography, Card, Divider } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';

const { Title } = Typography;

const motivationalPhrases = [
  "行动是成功的阶梯",
  "今天做的最好，明天会更好",
  "把时间用在进步上",
  "成功源于不懈的努力",
  "让每一天都充满意义",
  "专注当下，成就未来",
  "坚持就是胜利",
  "做最好的自己",
  "让梦想照进现实",
  "付出终有回报"
];

const TodoHeader: React.FC = () => {
  const [phrase, setPhrase] = useState(motivationalPhrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
      setPhrase(motivationalPhrases[randomIndex]);
    }, 5000); // 每5秒更换一次短语

    return () => clearInterval(interval);
  }, []);

  return (
    <Card bordered={false} style={{ borderRadius: 8, textAlign: 'center' }}>
      <Title level={2} style={{ color: '#1890ff', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckSquareOutlined style={{ marginRight: 12 }} />
        任务清单
      </Title>
      <Divider style={{ margin: '16px 0' }} />
      <Typography.Text type="secondary" style={{ fontSize: 16 }}>
        {phrase}
      </Typography.Text>
    </Card>
  );
};

export default TodoHeader;