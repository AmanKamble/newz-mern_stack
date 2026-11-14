import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Flex, Modal, Typography, Upload } from 'antd';
import { Link } from 'react-router-dom';

import { updateProfilePicture } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { message as antdMessage } from 'antd';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, message: toastMessage, error } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch<any>();

  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState<any>(null);

  const changeImageSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!image) {
      antdMessage.error('Select Image');
      return;
    }
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    setIsOpen(false);
    setImagePrev('');
    setImage(null);
    dispatch(loadUser());
  };

  const changeImage = (file: any) => {
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

  useEffect(() => {
    if (error) {
      antdMessage.error(error);
      dispatch({ type: 'clearError' });
    }
    if (toastMessage) {
      antdMessage.success(toastMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, toastMessage, error]);

  return (
    <div className="page-container">
      <Card className="editorial-card" style={{ maxWidth: 900, margin: '0 auto' }}>
        <Flex vertical gap={24} align="center">
          <Title level={1} className="editorial-title" style={{ marginBottom: 0 }}>Profile</Title>
          <Flex gap={48} wrap="wrap" justify="center" align="center">
            <Flex vertical gap={16} align="center">
              <Avatar size={160} src={user?.avatar?.url} />
              <Button type="primary" onClick={() => setIsOpen(true)}>Change Photo</Button>
            </Flex>
            <Flex vertical gap={16} style={{ minWidth: 280 }}>
              <Flex justify="space-between"><Text strong>Name</Text><Text>{user?.name}</Text></Flex>
              <Flex justify="space-between"><Text strong>Email</Text><Text>{user?.email}</Text></Flex>
              <Flex justify="space-between"><Text strong>Created At</Text><Text>{user?.createdAt ? dayjs(user.createdAt).format('YYYY-MM-DD') : ''}</Text></Flex>
              <Flex gap={12} wrap="wrap">
                <Link to="/updateprofile">
                  <Button>Update Profile</Button>
                </Link>
                <Link to="/changepassword">
                  <Button>Change Password</Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} title="Change Photo">
        <Flex vertical gap={16} align="center">
          <Avatar size={120} src={imagePrev || user?.avatar?.url} />
          <Upload beforeUpload={changeImage} maxCount={1} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          <Flex gap={12}>
            <Button type="primary" loading={loading} onClick={changeImageSubmitHandler} disabled={!imagePrev}>
              Change
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </Flex>
        </Flex>
      </Modal>
    </div>
  );
};

export default Profile;