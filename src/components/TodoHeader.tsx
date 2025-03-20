import React, { useState, useEffect } from 'react';
import { Typography, Card, Divider } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const motivationalPhrases = [
  "BUG是程序员的经验值，今天你又升级啦！",
  "当生活给你404，就Ctrl+F寻找新机会🚀",
  "今天的你比昨天多了24小时的经验值💪",
  "努力就像Git提交，每天都要有新的版本✨",
  "休息是为了走更长的路（和写更多的代码）☕",
  "每个成功的背后，都是咖啡因与决心的混合物💻",
  "失败只是系统在加载更大的成功进度条⏳",
  "你今天的努力，是未来自己的作弊码🎮",
  "知识就像内存，永远不会嫌多🧠",
  "保持好奇心，世界是你的游乐场🎡",
  "压力是暂时的，成就感的缓存是永久的💾",
  "生活不是单线程，记得给自己安排GC时间♻️",
  "今天的摸鱼是为了明天的灵感跃迁🐟",
  "你比Wi-Fi信号更值得满格📶",
  "每个小目标都是人生游戏里的成就奖杯🏆"
];


const TodoHeader: React.FC = () => {
  // 只在组件挂载时生成一次随机短语
  const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
  const [phrase] = useState(motivationalPhrases[randomIndex]);

  return (
    <Card bordered={false} style={{ borderRadius: 8, textAlign: 'center' }}>
      <Title level={2} style={{ color: '#1890ff', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckSquareOutlined style={{ marginRight: 12 }} />
        任务清单
      </Title>
      <Divider style={{ margin: '16px 0' }} />
      <Text strong className="handwritten-text" style={{ fontSize: 18, display: 'block' }}>
        {phrase}
      </Text>
    </Card>
  );
};

export default TodoHeader;