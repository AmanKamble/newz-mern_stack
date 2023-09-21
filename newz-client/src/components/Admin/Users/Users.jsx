import { Box, Button, Grid, HStack, Heading, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NewsModal from './NewsModal';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/actions/admin';


const Users = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [id, setId] = useState("");
    const [userDetail, setUserDetail] = useState();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllUsers(id));
    }, [dispatch, id]);

    const detailHandler = (user) => {
        setUserDetail(user);
        onOpen()
    }

    return (
        <Grid minH="100vh" templateColumns={["1fr", "5fr 1fr"]} >
            <Box p={["0", "8"]} overflowX="auto" >
                <Heading textTransform="uppercase" my="16" children="All available User" textAlign={["center", "left"]} />
                <Input
                    type='text'
                    value={id}
                    my="4"
                    onChange={(e) => setId(e.target.value)}
                    placeholder='Search News...'
                    focusBorderColor='red.500'
                />
                <TableContainer w={["100vw", "full"]} >
                    <Table variant="simple" >
                        <TableCaption children="All available Users in the database" />
                        <Thead >
                            <Tr >
                                <Th textTransform="uppercase" >ID</Th>
                                <Th textTransform="uppercase" >Name</Th>
                                <Th textTransform="uppercase" >Email</Th>
                                <Th textTransform="uppercase" >Role</Th>
                                <Th textTransform="uppercase" isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {
                                users.map((item, index) => (
                                    <Row key={index} onOpen={onOpen} item={item} detailHandler={detailHandler} />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <NewsModal
                    isOpen={isOpen}
                    onClose={onClose}
                    userDetail={userDetail}
                />
            </Box>
            <Sidebar />
        </Grid>
    )
}

export default Users


function Row({ onOpen, item, detailHandler }) {
    return (
        <Tr>
            <Td>{item._id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.role}</Td>
            <Td isNumeric>
                <HStack justifyContent="flex-end" >
                    <Button onClick={() => detailHandler(item)} variant="outline" colorScheme='green'>Change Role</Button>
                    <Button variant="outline" colorScheme='red' >
                        <RiDeleteBin7Fill />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    )
}