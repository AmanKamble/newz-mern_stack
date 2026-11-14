import React, { useState } from 'react';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/profile';

const { Title } = Typography;

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: any) => state.profile);
  const navigate = useNavigate();

  const onFinish = () => {
    dispatch(resetPassword(token, password));
    navigate('/login');
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '80vh' }}>
      <Card className="editorial-card" style={{ width: '100%', maxWidth: 420 }}>
        <Flex vertical gap={24}>
          <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>
            Reset Password
          </Title>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item label="New Password" required>
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="primary-button">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default ResetPassword;