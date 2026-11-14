import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Input, Popconfirm, Table, Typography } from 'antd';
import UserModal from './UserModal';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../../redux/actions/admin';
import { message as antdMessage } from 'antd';

const { Title } = Typography;

const Users = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState('');
  const [userDetail, setUserDetail] = useState<any>(null);
  const dispatch = useDispatch<any>();
  const { loading, users, message: adminMessage, error } = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      antdMessage.error(error);
      dispatch({ type: 'clearError' });
    }
    if (adminMessage) {
      antdMessage.success(adminMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, adminMessage]);

  const detailHandler = (user: any) => {
    setUserDetail(user);
    setModalOpen(true);
  };

  const deleteUserHandler = async (userId: string) => {
    await dispatch(deleteUser(userId));
    dispatch(getAllUsers());
  };

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id', width: 220 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Flex gap={8}>
          <Button type="primary" onClick={() => detailHandler(record)}>Change Role</Button>
          <Popconfirm title="Delete this user?" onConfirm={() => deleteUserHandler(record._id)} okText="Delete" cancelText="Cancel">
            <Button danger icon={<RiDeleteBin7Fill />} loading={loading} />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <Flex style={{ minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: 24 }}>
        <Title level={2} className="editorial-title">All Available Users</Title>
        <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="Search by ID..." style={{ maxWidth: 360, marginBottom: 16 }} />
        <Card className="editorial-card">
          <Table rowKey="_id" columns={columns} dataSource={Array.isArray(users) ? users : []} loading={loading} pagination={{ pageSize: 8 }} />
        </Card>
        <UserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} userDetail={userDetail} loading={loading} />
      </div>
      <Sidebar />
    </Flex>
  );
};

export default Users;