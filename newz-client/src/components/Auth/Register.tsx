import React, { useState } from 'react';
import { Avatar, Button, Card, Flex, Form, Input, Typography, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const fileUploadCss = {};

const Register = ({ loading }: { loading: boolean }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState<any>(null);
  const dispatch = useDispatch<any>();

  const changeImageHandler = (file: any) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePrev(reader.result as string);
        setImage(file);
      };
    } else {
      setImagePrev('');
      setImage(null);
    }
    return false;
  };

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);
    dispatch(register(myForm));
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '85vh' }}>
      <Card className="editorial-card" style={{ width: '100%', maxWidth: 460 }}>
        <Flex vertical gap={24}>
          <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>
            Registration
          </Title>
          <Flex justify="center">
            <Avatar src={imagePrev} size={96} />
          </Flex>
          <Form layout="vertical" onFinish={submitHandler} requiredMark={false}>
            <Form.Item label="Full Name" required>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="abc" />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@gmail.com" />
            </Form.Item>
            <Form.Item label="Password" required>
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Item>
            <Form.Item label="Choose Avatar" required>
              <Upload beforeUpload={changeImageHandler} maxCount={1} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Select Avatar</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="primary-button">
                Sign Up
              </Button>
            </Form.Item>
            <Flex justify="center" gap={8}>
              <span>Already Signed Up?</span>
              <Link to="/login">
                <Button type="link">Login</Button>
              </Link>
            </Flex>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Register;