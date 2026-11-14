import React, { useState } from 'react';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const UpdateProfile = ({ user }: { user: any }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: any) => state.profile);
  const navigate = useNavigate();

  const onFinish = async () => {
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  };

  return (
    <div className="page-container">
      <Card className="editorial-card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <Flex vertical gap={24}>
          <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>Update Profile</Title>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item label="Name">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="primary-button">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </div>
  );
};

export default UpdateProfile;