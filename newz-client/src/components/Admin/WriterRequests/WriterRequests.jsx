import { Button, ButtonGroup, Container, Grid, HStack, Heading, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { changeUserRole, deleteWriterRequest, getAllWriterRequests } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const WriterRequest = ({ item, deleteWriterRequestHandler, acceptWriterRequest }) => {
  const accept = () => {
    acceptWriterRequest(item._id, item.userId)
  }
  return (
    <VStack
      className="news"
      alignItems={["center", "flex-start"]}
      spacing={4}
      justifyContent="center"
      borderRadius="md"
      boxShadow="md"
      backgroundColor="white"
      border="1px solid #ccc"
      p="3"
    >
      <VStack mb="4" align="flex-start" spacing={2}>
        <HStack>
          <Heading textTransform="uppercase" size="sm" children="User Id :" />
          <Text fontSize="md" textAlign="justify">
            {item.userId}
          </Text>
        </HStack>
        <HStack>
          <Heading textTransform="uppercase" size="sm" children="Name :" />
          <Text fontSize="md" textAlign="justify">
            {item.name}
          </Text>
        </HStack>
        <HStack>
          <Heading textTransform="uppercase" size="sm" children="Email :" />
          <Text fontSize="md" textAlign="justify">
            {item.email}
          </Text>
        </HStack>
        <VStack align="flex-start" pt="2">
          <Heading textAlign="left" textTransform="uppercase" size="sm" children="Why we apoint you as a writer ?" />
          <Text fontSize="md">{item.message}</Text>
        </VStack>
      </VStack>

      <VStack w="full" mb="4">
        <ButtonGroup gap="2">
          <Button colorScheme='green' onClick={accept} >Accept</Button>
          <Button colorScheme='red' variant="outline" onClick={() => deleteWriterRequestHandler(item._id)} >Decline</Button>
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

const WriterRequests = () => {
  const { writerRequest, message, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const deleteWriterRequestHandler = async (requestID) => {
    await dispatch(deleteWriterRequest(requestID));
    dispatch(getAllWriterRequests());
  }

  const acceptWriterRequest = async (requestID, userId) => {
    const userRole = "writer";
    await dispatch(changeUserRole(userId, userRole));
    await dispatch(deleteWriterRequest(requestID));
    dispatch(getAllWriterRequests());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);

  useEffect(() => {
    dispatch(getAllWriterRequests());
  }, [dispatch]);
  return (
    <Grid minH="100vh" templateColumns={["1fr", "5fr 1fr"]} >
      <Container py="16">
        <Stack direction={["column", "row"]} flexWrap="wrap" justifyContent={["flex-start", "space-evenly"]} alignItems={["center", "flex-start"]} css={{
          "&::-webkit-scrollbar": {
            width: 10,
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "red",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "10px",
            background: "linear-gradient(left, #212121, #323232)",
            boxShadow: "0 0 0.5px 0.5px #111",
          },
        }} >
          {
            writerRequest.length > 0 ? (
              writerRequest.map((item, index) => (
                <WriterRequest
                  key={index}
                  item={item}
                  deleteWriterRequestHandler={deleteWriterRequestHandler}
                  acceptWriterRequest={acceptWriterRequest}
                />
              ))
            ) : (
              <Heading opacity={0.4} mt="4">
                Writer Request Not Found
              </Heading>
            )
          }

        </Stack>
      </Container>
      <Sidebar />
    </Grid>
  )
}

export default WriterRequests