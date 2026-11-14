import React, { useEffect } from 'react';
import { Button, Card, Flex, Space, Typography } from 'antd';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserRole, deleteWriterRequest, getAllWriterRequests } from '../../../redux/actions/admin';
import { message as antdMessage } from 'antd';

const { Title, Text } = Typography;

const WriterRequestCard = ({ item, deleteWriterRequestHandler, acceptWriterRequest }: any) => {
  return (
    <Card className="editorial-card" style={{ width: 420, margin: 8 }}>
      <Flex vertical gap={16}>
        <Flex justify="space-between"><Text strong>User Id</Text><Text>{item.userId}</Text></Flex>
        <Flex justify="space-between"><Text strong>Name</Text><Text>{item.name}</Text></Flex>
        <Flex justify="space-between"><Text strong>Email</Text><Text>{item.email}</Text></Flex>
        <Flex vertical gap={8}>
          <Text strong>Why should we appoint you as a writer?</Text>
          <Text>{item.message}</Text>
        </Flex>
        <Space>
          <Button type="primary" onClick={() => acceptWriterRequest(item._id, item.userId)}>Accept</Button>
          <Button danger onClick={() => deleteWriterRequestHandler(item._id)}>Decline</Button>
        </Space>
      </Flex>
    </Card>
  );
};

const WriterRequests = () => {
  const { writerRequest, message: adminMessage, error } = useSelector((state: any) => state.admin);
  const dispatch = useDispatch<any>();

  const deleteWriterRequestHandler = async (requestID: string) => {
    await dispatch(deleteWriterRequest(requestID));
    dispatch(getAllWriterRequests());
  };

  const acceptWriterRequest = async (requestID: string, userId: string) => {
    await dispatch(changeUserRole(userId, 'writer'));
    await dispatch(deleteWriterRequest(requestID));
    dispatch(getAllWriterRequests());
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
  }, [dispatch, adminMessage, error]);

  useEffect(() => {
    dispatch(getAllWriterRequests());
  }, [dispatch]);

  return (
    <Flex style={{ minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: 24 }}>
        <Title level={2} className="editorial-title">Writer Requests</Title>
        <Flex wrap="wrap" justify="flex-start">
          {Array.isArray(writerRequest) && writerRequest.length > 0 ? (
            writerRequest.map((item: any, index: number) => (
              <WriterRequestCard
                key={index}
                item={item}
                deleteWriterRequestHandler={deleteWriterRequestHandler}
                acceptWriterRequest={acceptWriterRequest}
              />
            ))
          ) : (
            <Title level={4} style={{ opacity: 0.5, marginTop: 32 }}>Writer Request Not Found</Title>
          )}
        </Flex>
      </div>
      <Sidebar />
    </Flex>
  );
};

export default WriterRequests;