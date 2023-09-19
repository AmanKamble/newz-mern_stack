import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    HStack,
    Heading,
    Image,
    Input,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNews, getMyNews } from '../../../redux/actions/admin';

const AdminNews = () => {
    const [keyward, setKeyward] = useState('');
    const dispatch = useDispatch();
    const { news, loading } = useSelector((state) => state.admin);

    const deleteNewsHandler = async (newsId) => {
        await dispatch(deleteNews(newsId));
        dispatch(getMyNews(keyward));
    }
    useEffect(() => {
        dispatch(getMyNews(keyward));
    }, [dispatch, keyward]);
    return (
        <Grid minH="100vh" templateColumns={["1fr", "5fr 1fr"]} >
            <Box p={["0", "8"]} overflowX="auto" >
                <Heading textTransform="uppercase" mt="16" mb="5" children="All available News" textAlign={["center", "left"]} />
                <Input
                    type='text'
                    value={keyward}
                    my="4"
                    onChange={(e) => setKeyward(e.target.value)}
                    placeholder='Search News...'
                    focusBorderColor='red.500'
                />
                <TableContainer w={["100vw", "full"]} >
                    <Table variant="simple" >
                        <Thead >
                            <Tr >
                                <Th textTransform="uppercase" >ID</Th>
                                <Th textTransform="uppercase" >Poster</Th>
                                <Th textTransform="uppercase" >Title</Th>
                                <Th textTransform="uppercase" >category</Th>
                                <Th textTransform="uppercase" >author</Th>
                                <Th textTransform="uppercase" isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {
                                news.map((item, index) => (
                                    <Row key={index} item={item} loading={loading} deleteNewsHandler={deleteNewsHandler} />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Sidebar />
        </Grid>
    )
}

export default AdminNews;


function Row({ item, deleteNewsHandler, loading }) {
    return (
        <Tr>
            <Td>{item._id}</Td>
            <Td>
                <Image src={item.poster.url} />
            </Td>
            <Td textTransform="uppercase" >{item.title}</Td>
            <Td textTransform="uppercase" >{item.category}</Td>
            <Td>{item.author}</Td>

            <Td isNumeric>
                <HStack justifyContent="flex-end" >
                    <Button onClick={() => deleteNewsHandler(item._id)} isLoading={loading} variant="outline" colorScheme='red' >
                        <RiDeleteBin7Fill />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    )
}
