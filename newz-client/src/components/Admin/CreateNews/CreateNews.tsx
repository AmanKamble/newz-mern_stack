import React, { useState } from 'react';
import { Button, Card, Flex, Form, Image, Input, Select, Typography, Upload } from 'antd';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { message as antdMessage } from 'antd';
import { createNews } from '../../../redux/actions/admin';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

export const fileUploadCss = {};

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<any>(null);
  const [imagePrev, setImagePrev] = useState('');

  const dispatch = useDispatch<any>();
  const { loading, error, message: adminMessage } = useSelector((state: any) => state.admin);

  const categories = ['Entertainment', 'Cars', 'Sports', 'India', 'Technology', 'Science', 'Business', 'Health', 'Politics', 'Religion', 'Travel'];

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

  const submitHandler = async () => {
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('content', content);
    myForm.append('category', category);
    myForm.append('file', image);
    await dispatch(createNews(myForm));
    setTitle('');
    setContent('');
    setCategory('');
    setImagePrev('');
    setImage(null);
  };

  React.useEffect(() => {
    if (error) {
      antdMessage.error(error);
      dispatch({ type: 'clearError' });
    }
    if (adminMessage) {
      antdMessage.success(adminMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, adminMessage]);

  return (
    <Flex style={{ minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: 24 }}>
        <Card className="editorial-card" style={{ maxWidth: 760, margin: '0 auto' }}>
          <Flex vertical gap={24}>
            <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>Create News</Title>
            <Form layout="vertical" onFinish={submitHandler} requiredMark={false}>
              <Form.Item label="Title" required>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
              </Form.Item>
              <Form.Item label="Content" required>
                <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" autoSize={{ minRows: 6 }} />
              </Form.Item>
              <Form.Item label="Category" required>
                <Select value={category} onChange={setCategory} placeholder="Select Category" options={categories.map((item) => ({ label: item, value: item }))} />
              </Form.Item>
              <Form.Item label="Image" required>
                <Upload beforeUpload={changeImageHandler} maxCount={1} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
                {imagePrev && <Image src={imagePrev} width={160} style={{ marginTop: 12, borderRadius: 12 }} />}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block className="primary-button">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        </Card>
      </div>
      <Sidebar />
    </Flex>
  );
};

export default CreateNews;