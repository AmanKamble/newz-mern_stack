import React, { useState } from 'react';
import { Avatar, Button, Flex, Modal, Select, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { changeUserRole, getAllUsers } from '../../../redux/actions/admin';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const UserModal = ({ isOpen, onClose, userDetail, loading }: { isOpen: boolean; onClose: () => void; userDetail: any; loading: boolean }) => {
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch<any>();
  const role = ['User', 'Writer', 'Admin'];

  const changeRoleHandler = async (userId: string) => {
    await dispatch(changeUserRole(userId, userRole));
    dispatch(getAllUsers());
    onClose();
  };

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} title="User Detail" width="90%">
      <Flex gap={32} wrap="wrap" justify="center" align="center" style={{ padding: 16 }}>
        <Avatar size={160} src={userDetail?.avatar?.url} />
        <Flex vertical gap={16} style={{ minWidth: 320 }}>
          <Flex justify="space-between"><Text strong>Name</Text><Text>{userDetail?.name}</Text></Flex>
          <Flex justify="space-between"><Text strong>Email</Text><Text>{userDetail?.email}</Text></Flex>
          <Flex justify="space-between"><Text strong>Created At</Text><Text>{userDetail?.createdAt ? dayjs(userDetail.createdAt).format('YYYY-MM-DD') : ''}</Text></Flex>
          <Flex justify="space-between" align="center">
            <Text strong>Role</Text>
            <Select
              value={userRole}
              onChange={setUserRole}
              style={{ width: 220 }}
              placeholder="Select Role"
              options={role.map((item) => ({ label: item, value: item }))}
            />
          </Flex>
          <Button type="primary" loading={loading} onClick={() => changeRoleHandler(userDetail?._id)}>
            Change Role
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default UserModal;