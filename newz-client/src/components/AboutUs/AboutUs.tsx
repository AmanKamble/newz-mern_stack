import React from 'react';
import { Card, Flex, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '80vh' }}>
      <Card className="editorial-card" style={{ maxWidth: 760, width: '100%' }}>
        <Flex vertical gap={16} align="center">
          <Title level={1} className="editorial-title">About Us</Title>
          <Paragraph style={{ textAlign: 'center', fontSize: 18, color: '#222222' }}>
            Welcome to our news portal! We are dedicated to providing you with the latest and most reliable news from around the world.
          </Paragraph>
          <Paragraph style={{ textAlign: 'center', fontSize: 18, color: '#222222' }}>
            Our team of experienced journalists and editors work tirelessly to bring you accurate and up-to-date news on a wide range of topics.
          </Paragraph>
          <Paragraph style={{ textAlign: 'center', fontSize: 18, color: '#222222' }}>
            We are committed to delivering news that matters to you, keeping you informed and empowered.
          </Paragraph>
          <Paragraph style={{ textAlign: 'center', fontSize: 18, color: '#222222' }}>
            Thank you for choosing us as your trusted source for news.
          </Paragraph>
        </Flex>
      </Card>
    </Flex>
  );
};

export default AboutUs;