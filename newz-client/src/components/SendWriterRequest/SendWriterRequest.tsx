import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sendWriterRequest } from '../../redux/actions/user';
import { message as antdMessage } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const SendWriterRequest = () => {
  const [messageText, setMessageText] = useState('');
  const { message: toastMessage, error, loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<any>();

  const buttonHandler = () => {
    dispatch(sendWriterRequest(messageText));
    setMessageText('');
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
      <Flex justify="center" align="center" style={{ minHeight: '80vh' }}>
        <Card className="editorial-card" style={{ width: '100%', maxWidth: 860 }}>
          <Flex vertical gap={24} align="center">
            <Title level={2} className="editorial-title" style={{ textAlign: 'center', marginBottom: 0 }}>
              Why should we appoint you as a writer?
            </Title>
            <TextArea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Content"
              autoSize={{ minRows: 12, maxRows: 20 }}
              style={{ width: '100%' }}
            />
            {messageText && (
              <Button type="primary" onClick={buttonHandler} loading={loading} className="primary-button">
                Send Writer Request
              </Button>
            )}
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default SendWriterRequest;