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
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react';
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getMyNews } from '../../../redux/actions/admin';

const AdminNews = () => {
    const [keyward, setKeyward] = useState('');
    const dispatch = useDispatch();
    const { news } = useSelector((state) => state.admin);
    const deleteNewsHandler = (newsId) => {
        dispatch(deleteNews(newsId));
    }
    useEffect(() => {
        dispatch(getMyNews(keyward));
    }, [dispatch, keyward]);
    return (
        <Grid minH="100vh" templateColumns={["1fr", "5fr 1fr"]} >
            <Box p={["0", "8"]} overflowX="auto" >
                <Heading textTransform="uppercase" mt="16" mb="10" children="All available News" textAlign={["center", "left"]} />
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
                        <TableCaption children="All available News in the database" />
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
                                    <Row key={index} item={item} deleteNewsHandler={deleteNewsHandler} />
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


function Row({ item, deleteNewsHandler }) {
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
                    <Button onClick={() => deleteNewsHandler(item._id)} variant="outline" colorScheme='red' >
                        <RiDeleteBin7Fill />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    )
}
