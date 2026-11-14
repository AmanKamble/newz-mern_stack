import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Flex, Image, Row, Spin, Typography } from 'antd';
import { getAllNews } from '../../redux/actions/news';
import dayjs from 'dayjs';
import NewsCard from './NewsCard';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const News = () => {
  const { id } = useParams();
  const { news, loading } = useSelector((state: any) => state.news);
  const dispatch = useDispatch<any>();
  const newsList = Array.isArray(news) ? news : [];
  const selectedNews = newsList.find((article: any) => article._id === id) || null;
  const related = newsList.filter((article: any) => article._id !== id).slice(0, 4);

  useEffect(() => {
    if (newsList.length === 0) {
      dispatch(getAllNews());
    }
  }, [dispatch, newsList.length]);

  return (
    <div className="page-container">
      {loading && newsList.length === 0 ? (
        <Flex justify="center" style={{ minHeight: '60vh' }}>
          <Spin size="large" />
        </Flex>
      ) : selectedNews ? (
        <Flex vertical gap={32}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button type="link" style={{ padding: 0 }}>← Back to Home</Button>
          </Link>
          <Card className="editorial-card" style={{ maxWidth: 980, margin: '0 auto', width: '100%' }} styles={{ body: { padding: 0 } }}>
            <Image
              src={selectedNews.poster?.url}
              alt={selectedNews.title}
              preview={false}
              style={{ width: '100%', maxHeight: 520, objectFit: 'cover' }}
            />
            <div style={{ padding: 32 }}>
              <Flex vertical gap={16}>
                <Text style={{ color: '#D71920', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 2 }}>
                  {selectedNews.category}
                </Text>
                <Title level={1} className="editorial-title" style={{ margin: 0, lineHeight: 1.15 }}>
                  {selectedNews.title}
                </Title>
                <Flex gap={16} wrap="wrap">
                  <Text type="secondary">By {selectedNews.author?.name || selectedNews.author || 'NewZ Staff'}</Text>
                  {selectedNews.createdAt && <Text type="secondary">{dayjs(selectedNews.createdAt).format('MMMM D, YYYY')}</Text>}
                </Flex>
                <Paragraph style={{ fontSize: 18, color: '#222222', lineHeight: 1.9, maxWidth: 760, whiteSpace: 'pre-line' }}>
                  {selectedNews.content}
                </Paragraph>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {Math.max(1, Math.ceil((selectedNews.content?.split(/\\s+/).length || 0) / 200))} min read
                </Text>
              </Flex>
            </div>
          </Card>

          {related.length > 0 && (
            <div>
              <Title level={2} className="editorial-title" style={{ marginBottom: 20 }}>Related News</Title>
              <Row gutter={[20, 20]}>
                {related.map((item: any) => (
                  <Col key={item._id} xs={24} sm={12} md={6}>
                    <Link to={`/news/${item._id}`} style={{ textDecoration: 'none' }}>
                      <NewsCard
                        title={item.title}
                        content={item.content}
                        imgSrc={item.poster?.url}
                        category={item.category}
                        createdAt={item.createdAt}
                      />
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Flex>
      ) : (
        <Title level={4} style={{ opacity: 0.5 }}>News article not found</Title>
      )}
    </div>
  );
};

export default News;