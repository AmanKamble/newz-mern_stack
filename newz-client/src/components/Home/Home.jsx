import React, { useEffect, useState } from 'react';
import { Button, Container, HStack, Heading, Image, Input, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from '../../redux/actions/news';
import { Link } from 'react-router-dom';

const News = ({ title, content, imgSrc, category }) => {
    return (
        <HStack
            className='news'
            alignItems={["center", "flex-start"]}
            spacing={4}
            justifyContent="center"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="white"
            border="1px solid #ccc"
            w={["full", "410px"]}
            p="3"
        >
            <Image src={imgSrc} boxSize="40" objectFit="contain" />

            <VStack mb="4" align="flex-start" spacing={2}>
                <HStack alignItems="flex-start" justifyContent="space-between" w="100%">
                    <Text fontSize="sm" textTransform="uppercase" color="gray.600">
                        {category}
                    </Text>
                    <Spacer />
                </HStack>
                <Heading textTransform="uppercase" noOfLines={3}  size="sm" children={title} />
                <Text fontSize="md" noOfLines={3} textAlign="justify"  >{content}</Text>
            </VStack>
        </HStack>
    );
}

const Home = () => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const { news, error, message } = useSelector((state) => state.news);


    const categories = ["Entertainment", "Cars", "Sports", "India", "Technology", "Science", "Business", "Health", "Politics", "Religion", "Travel"];

    useEffect(() => {
        if (error) {
            toast.error(error, {
                duration: 5000,
            });
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message, {
                duration: 5000,
            });
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, message]);
    useEffect(() => {
        dispatch(getAllNews(category, keyword));
    }, [dispatch, category, keyword]);

    return (
        <Container minH="95vh" maxW="container.xl" paddingY="8">
            <HStack
                overflowX="auto"
                paddingY={["8", "2"]}
                css={{
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
                }}
            >
                <Button onClick={() => setCategory()} minW='40' colorScheme='red'>
                    <Text fontSize="md">All News</Text>
                </Button>
                {categories.map((item, index) => (
                    <Button onClick={() => setCategory(item)} key={index} minW='40' colorScheme='red'>
                        <Text fontSize="md">{item}</Text>
                    </Button>
                ))}
            </HStack>
            <Input
                type='text'
                value={keyword}
                my="4"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search News...'
                focusBorderColor='red.500'
            />

            <Stack direction={["column", "row"]} flexWrap="wrap" justifyContent={["flex-start", "space-evenly"]} overflowY={["none","auto"]} alignItems={["center", "flex-start"]} css={{
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
                    news.length > 0 ? (
                        news.map((item, index) => (
                            <Link key={item._id} to={`/news/${item._id}`} >
                                <News
                                    title={item.title}
                                    content={item.content}
                                    imgSrc={item.poster.url}
                                    category={item.category}
                                />
                            </Link>
                        ))
                    ) : (
                        <Heading opacity={0.4} mt="4" children="News Not Found" />
                    )
                }
            </Stack>
        </Container>
    );
};

export default Home;