import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { getAllNews } from '../../redux/actions/news';

const News = () => {
    const { id } = useParams();
    const { news, loading } = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const selectedNewsIndex = news.findIndex((article) => article._id === id);
    const selectedNews = selectedNewsIndex !== -1 ? news[selectedNewsIndex] : null;

    useEffect(() => {
        if (!news || news.length === 0) {
            dispatch(getAllNews());
        }
    }, [dispatch, news]);

    return (
        <Container minH="95vh" maxW="container.xl" paddingY="8">
            {loading ? (
                <p>Loading...</p>
            ) : selectedNews ? (
                <VStack
                    alignItems="center"
                    spacing={4}
                    justifyContent="center"
                    borderRadius="md"
                    backgroundColor="white"
                >
                    <Heading size="4xl" textAlign="justify" children={selectedNews.title} />
                    <Image src={selectedNews.poster.url} width={["full", "500px"]} maxHeight={400} objectFit="contain" />
                    <Text fontSize="x-large" textAlign="justify" children={selectedNews.content} />
                </VStack>
            ) : (
                <p>News article not found</p>
            )}
        </Container>
    );
};

export default News;
