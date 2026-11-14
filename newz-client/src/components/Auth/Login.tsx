import React from 'react';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';

const { Title } = Typography;

const Login = ({ loading }: { loading: boolean }) => {
  const dispatch = useDispatch<any>();

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '85vh' }}>
      <Card className="editorial-card" style={{ width: '100%', maxWidth: 420 }}>
        <Flex vertical gap={24}>
          <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>
            News Log In
          </Title>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="abc@gmail.com" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
              <Link to="/forgetpassword">
                <Button type="link">Forget Password?</Button>
              </Link>
            </Flex>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="primary-button">
                Login
              </Button>
            </Form.Item>
            <Flex justify="center" gap={8}>
              <span>New User?</span>
              <Link to="/register">
                <Button type="link">Sign Up</Button>
              </Link>
            </Flex>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Login;