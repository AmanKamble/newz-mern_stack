import React, { useState } from 'react';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: any) => state.profile);
  const navigate = useNavigate();

  const onFinish = () => {
    dispatch(changePassword(oldPassword, newPassword));
    navigate('/profile');
  };

  return (
    <div className="page-container">
      <Card className="editorial-card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <Flex vertical gap={24}>
          <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>Change Password</Title>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item label="Old Password" required>
              <Input.Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Old Password" />
            </Form.Item>
            <Form.Item label="New Password" required>
              <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="primary-button">
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </div>
  );
};

export default ChangePassword;