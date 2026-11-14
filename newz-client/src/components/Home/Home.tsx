import React, { useEffect, useState } from 'react';
import { Button, Col, Flex, Image, Input, Row, Space, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from '../../redux/actions/news';
import { Link } from 'react-router-dom';
import { message as antdMessage } from 'antd';
import dayjs from 'dayjs';
import NewsCard from '../News/NewsCard';

const { Title, Text, Paragraph } = Typography;

const categories = ['Entertainment', 'Cars', 'Sports', 'India', 'Technology', 'Science', 'Business', 'Health', 'Politics', 'Religion', 'Travel'];

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch<any>();
  const { news, error, message: toastMessage, loading } = useSelector((state: any) => state.news);

  const newsList = Array.isArray(news) ? news : [];
  const featured = newsList.length > 1 ? newsList[0] : null;
  const rest = featured ? newsList.slice(1) : newsList;

  useEffect(() => {
    if (error) {
      antdMessage.error(error);
      dispatch({ type: 'clearError' });
    }
    if (toastMessage) {
      antdMessage.success(toastMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, toastMessage]);

  useEffect(() => {
    dispatch(getAllNews(category, keyword));
  }, [dispatch, category, keyword]);

  return (
    <div className="page-container">
      <Flex vertical gap={40}>
        {/* Hero */}
        {newsList.length > 0 && featured ? (
          <div className="editorial-card hero-section" style={{ overflow: 'hidden', minHeight: 360, position: 'relative' }}>
            <Image
              src={featured.poster?.url}
              alt={featured.title}
              preview={false}
              style={{ width: '100%', height: 360, objectFit: 'cover', opacity: 0.55 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.92) 100%)', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#D71920', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 2 }}>{featured.category}</Text>
              <Title level={1} className="editorial-title" style={{ margin: '8px 0', maxWidth: 900 }}>{featured.title}</Title>
              <Paragraph style={{ color: '#222222', maxWidth: 760, fontSize: 16 }} ellipsis={{ rows: 2 }}>
                {featured.content}
              </Paragraph>
              <Space>
                <Text type="secondary">{featured.createdAt ? dayjs(featured.createdAt).format('MMMM D, YYYY') : ''}</Text>
                <Link to={`/news/${featured._id}`}>
                  <Button type="primary" className="primary-button">Read Full Story</Button>
                </Link>
              </Space>
            </div>
          </div>
        ) : loading ? (
          <Flex justify="center" style={{ minHeight: 240 }}><Spin size="large" /></Flex>
        ) : newsList.length === 0 ? (
          <div className="editorial-card" style={{ padding: 40, textAlign: 'center' }}>
            <Title level={3} style={{ opacity: 0.6 }}>No featured news available</Title>
          </div>
        ) : null}

        {/* Controls */}
        <Flex gap={16} wrap="wrap" align="center" justify="space-between">
          <Space wrap>
            <Button type={category === '' ? 'primary' : 'default'} onClick={() => setCategory('')} className="primary-button">
              All News
            </Button>
            {categories.map((item) => (
              <Button key={item} type={category === item ? 'primary' : 'default'} onClick={() => setCategory(item)}>
                {item}
              </Button>
            ))}
          </Space>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search news..."
            style={{ maxWidth: 360 }}
            allowClear
          />
        </Flex>

        {/* Trending / All news grid */}
        <div>
          <Title level={2} className="editorial-title" style={{ marginBottom: 20 }}>Latest News</Title>
          {loading && newsList.length === 0 ? (
            <Flex justify="center" style={{ minHeight: 200 }}><Spin size="large" /></Flex>
          ) : rest.length > 0 ? (
            <Row gutter={[20, 20]}>
              {rest.map((item: any) => (
                <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
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
          ) : newsList.length === 0 ? (
            <div className="editorial-card" style={{ padding: 40, textAlign: 'center' }}>
              <Title level={4} style={{ opacity: 0.5 }}>News Not Found</Title>
            </div>
          ) : null}
        </div>
      </Flex>
    </div>
  );
};

export default Home;