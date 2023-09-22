import { Button, ButtonGroup, Container, Grid, HStack, Heading, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllWriterRequests } from '../../../redux/actions/admin';

const WriterRequest = ({ item }) => {
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
          <Heading textTransform="uppercase" size="sm">
            User Id :
          </Heading>
          <Text fontSize="md" textAlign="justify">
            {item._id}
          </Text>
        </HStack>
        <HStack>
          <Heading textTransform="uppercase" size="sm">
            Name :
          </Heading>
          <Text fontSize="md" textAlign="justify">
            {item.name}
          </Text>
        </HStack>
        <HStack>
          <Heading textTransform="uppercase" size="sm">
            Email :
          </Heading>
          <Text fontSize="md" textAlign="justify">
            {item.email}
          </Text>
        </HStack>
        <VStack align="flex-start" pt="2">
          <Heading
            textAlign="left"
            textTransform="uppercase"
            size="sm"
          >
            Message :
          </Heading>
          <Text fontSize="md">{item.message}</Text>
        </VStack>
      </VStack>

      <VStack w="full" mb="4">
        <ButtonGroup gap="2">
          <Button colorScheme='green' >Confirm</Button>
          <Button colorScheme='red' variant="outline" >Delete</Button>
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

const WriterRequests = () => {
  const { writerRequest } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWriterRequests());
  }, [dispatch]);
  return (
    <Grid minH="100vh" templateColumns={["1fr", "5fr 1fr"]} >
      <Container py="16">
        <Stack direction={["column", "row"]} flexWrap="wrap" justifyContent={["flex-start", "space-evenly"]} overflowY={["none", "auto"]} alignItems={["center", "flex-start"]} >
          {
            writerRequest.map((item, index) => (
              <WriterRequest
                key={index}
                item={item}
              />
            ))
          }
        </Stack>
      </Container>
      <Sidebar />
    </Grid>
  )
}

export default WriterRequests