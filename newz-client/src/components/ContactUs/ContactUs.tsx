// ContactUs.js

import React from 'react';
import {
    Container,
    Heading,
    Text,
    VStack,
    Link,
} from '@chakra-ui/react';

const ContactUs = () => {
    return (
        <Container h="100vh" maxW="container.lg" py={4}>
            <VStack spacing={6} h="full" justify="center" align="center" p="16">
                <Heading as="h1" size="xl">
                    Contact Us
                </Heading>

                <Text fontSize="lg" textAlign="center">
                    If you have any questions or feedback, please feel free to contact us:
                </Text>

                <Text fontSize="lg" textAlign="center">
                    Email: <Link href="mailto:contact@newz.com" color="blue.500">contact@newz.com</Link>
                </Text>
            </VStack>
        </Container>
    );
};

export default ContactUs;
