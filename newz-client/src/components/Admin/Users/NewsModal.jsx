import { Avatar, Box, Button, Container, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, } from '@chakra-ui/react';
import React from 'react';

const NewsModal = ({ isOpen, onClose, userDetail }) => {
    console.log()
    const handleClose = () => {
        onClose();
    }
    return (
        <Modal isOpen={isOpen} size="full" onClose={handleClose} scrollBehavior='inside' >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton colorScheme='red' />
                <ModalHeader>User Detail</ModalHeader>
                <ModalBody p="16" >
                    <Container minH="90vh" maxW="container.lg" py="8">
                        <Stack justifyContent="flex-start" direction={["column", "row"]} alignItems="center" spacing={["8", "16"]} padding="8" >
                            <VStack >
                                <Avatar boxSize={["32", '48']} src={userDetail?.avatar.url} />
                            </VStack>
                            <VStack spacing="4" alignItems={["center", "flex-start"]} >
                                <HStack >
                                    <Text children="Name" fontWeight="bold" />
                                    <Text children={userDetail?.name} />
                                </HStack>
                                <HStack >
                                    <Text children="Email" fontWeight="bold" />
                                    <Text children={userDetail?.email} />
                                </HStack>
                                <HStack >
                                    <Text children="CreatedAt" fontWeight="bold" />
                                    <Text children={userDetail?.createdAt.split("T")[0]} />
                                </HStack>
                            </VStack>
                        </Stack>
                    </Container>
                </ModalBody>
                <ModalFooter >
                    <Button colorScheme='red' onClick={handleClose} textTransform="uppercase" >Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NewsModal;