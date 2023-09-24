// AboutUs.js

import React from 'react';
import {
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Container h="100vh" maxW="container.lg" py={4}>
      <VStack spacing={6} h="full" justify="center" align="center" p="16">
        <Heading as="h1" size="xl" pb="5">
          About Us
        </Heading>

        <Text fontSize="lg" textAlign="center">
          Welcome to our news portal! We are dedicated to providing you with the latest and most reliable news from around the world.
        </Text>

        <Text fontSize="lg" textAlign="center">
          Our team of experienced journalists and editors work tirelessly to bring you accurate and up-to-date news on a wide range of topics.
        </Text>

        <Text fontSize="lg" textAlign="center">
          We are committed to delivering news that matters to you, keeping you informed and empowered.
        </Text>

        <Text fontSize="lg" textAlign="center">
          Thank you for choosing us as your trusted source for news.
        </Text>
      </VStack>
    </Container>
  );
};

export default AboutUs;