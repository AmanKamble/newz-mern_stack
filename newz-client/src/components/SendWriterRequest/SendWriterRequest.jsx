import { Button, Container, Heading, Stack, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendWriterRequest } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';

const SendWriterRequest = () => {
  const [message, setMessage] = useState("");
  const { message: Message, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch(sendWriterRequest(message));
    setMessage("")
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (Message) {
      toast.success(Message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);

  return (
    <Container h="100vh" p="3" maxW="container.xl">
      <Stack h="full" w="full" justifyContent="center" alignItems="center">
        <Heading children="Why should we apoint you as a writer ?" />
        <Textarea
          focusBorderColor='blue.300'
          value={message}
          placeholder='Content'
          minH="400px"
          onChange={(e) => setMessage(e.target.value)}
          w={["full", "800px"]}
          lineHeight="1.2"
          p="5"
        />
        {
          message && (
            <Button colorScheme='blue' onClick={buttonHandler} children="Send Writer Request" />
          )
        }
      </Stack>
    </Container>
  )
}

export default SendWriterRequest