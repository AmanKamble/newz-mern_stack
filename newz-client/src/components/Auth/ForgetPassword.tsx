import React, { useState } from 'react';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { loading } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onFinish = () => {
    dispatch(forgetPassword(email));
    navigate('/login');
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '80vh' }}>
      <Card className="editorial-card" style={{ width: '100%', maxWidth: 420 }}>
        <Flex vertical gap={24}>
          <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>
            Forget Password
          </Title>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item label="Email" required>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@gmail.com" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="primary-button">
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default ForgetPassword;