import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Image, Input, Popconfirm, Space, Table, Typography } from 'antd';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNews, getMyNews } from '../../../redux/actions/admin';
import { message as antdMessage } from 'antd';

const { Title } = Typography;

const AdminNews = () => {
  const [keyward, setKeyward] = useState('');
  const dispatch = useDispatch<any>();
  const { news, loading, message: adminMessage, error } = useSelector((state: any) => state.admin);

  const deleteNewsHandler = async (newsId: string) => {
    await dispatch(deleteNews(newsId));
    dispatch(getMyNews(keyward));
  };

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

  useEffect(() => {
    dispatch(getMyNews(keyward));
  }, [dispatch, keyward]);

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id', width: 220 },
    {
      title: 'Poster',
      dataIndex: 'poster',
      key: 'poster',
      render: (poster: any) => <Image src={poster?.url} width={80} height={60} style={{ objectFit: 'cover', borderRadius: 8 }} />,
    },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Author', dataIndex: 'author', key: 'author', render: (author: any) => author?.name || author },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm title="Delete this news?" onConfirm={() => deleteNewsHandler(record._id)} okText="Delete" cancelText="Cancel">
          <Button danger icon={<RiDeleteBin7Fill />} loading={loading} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Flex style={{ minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: 24 }}>
        <Title level={2} className="editorial-title">All Available News</Title>
        <Input value={keyward} onChange={(e) => setKeyward(e.target.value)} placeholder="Search News..." style={{ maxWidth: 360, marginBottom: 16 }} />
        <Card className="editorial-card">
          <Table rowKey="_id" columns={columns} dataSource={Array.isArray(news) ? news : []} loading={loading} pagination={{ pageSize: 8 }} />
        </Card>
      </div>
      <Sidebar />
    </Flex>
  );
};

export default AdminNews;