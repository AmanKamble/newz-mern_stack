import React from 'react';
import { Card, Flex, Image, Typography } from 'antd';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

interface NewsCardProps {
  title: string;
  content: string;
  imgSrc?: string;
  category: string;
  createdAt?: string;
}

const NewsCard = ({ title, content, imgSrc, category, createdAt }: NewsCardProps) => {
  return (
    <Card
      className="editorial-card news-card"
      hoverable
      cover={
        <div style={{ overflow: 'hidden', height: 200 }}>
          <Image
            src={imgSrc}
            alt={title}
            preview={false}
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        </div>
      }
      styles={{ body: { padding: 18 } }}
    >
      <Flex vertical gap={8}>
        <Flex justify="space-between" align="center">
          <Text style={{ color: '#D71920', textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>
            {category}
          </Text>
          {createdAt && <Text type="secondary" style={{ fontSize: 12 }}>{dayjs(createdAt).format('MMM D, YYYY')}</Text>}
        </Flex>
        <Title level={5} style={{ margin: 0, color: '#222222', lineHeight: 1.35 }}>{title}</Title>
        <Paragraph ellipsis={{ rows: 3 }} style={{ color: '#666666', marginBottom: 0, fontSize: 14 }}>
          {content}
        </Paragraph>
      </Flex>
    </Card>
  );
};

export default NewsCard;