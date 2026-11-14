import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ContactUs = () => {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '80vh' }}>
      <Card className="editorial-card" style={{ maxWidth: 640, width: '100%' }}>
        <Flex vertical gap={16} align="center">
          <Title level={1} className="editorial-title">Contact Us</Title>
          <Paragraph style={{ textAlign: 'center', fontSize: 18, color: '#222222' }}>
            If you have any questions or feedback, please feel free to contact us:
          </Paragraph>
          <Button type="primary" href="mailto:contact@newz.com" className="primary-button">
            contact@newz.com
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default ContactUs;