import { Avatar, Box, Button, Container, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, VStack, } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeUserRole, getAllUsers } from '../../../redux/actions/admin';

const UserModal = ({ isOpen, onClose, userDetail, loading }) => {
    const [userRole, setUserRole] = useState("");
    const dispatch = useDispatch();
    const role = ["User", "Writer", "Admin"];
    const handleClose = () => {
        onClose();
    }
    const changeRoleHandler = async (userId) => {
        await dispatch(changeUserRole(userId, userRole));
        dispatch(getAllUsers());
        onClose();
    }
    return (
        <Modal isOpen={isOpen} size="full" onClose={handleClose} scrollBehavior='inside' >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton  />
                <ModalHeader>User Detail</ModalHeader>
                <ModalBody p="16" h="100vh" >
                    <Container minH="full" maxW="container.lg" py="8">
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
                                <HStack >
                                    <Text children="CreatedAt" fontWeight="bold" />
                                    <Text children={userDetail?.createdAt.split("T")[0]} />
                                </HStack>
                                <HStack >
                                    <Text children="Role" fontWeight="bold" />
                                    <Select
                                        value={userRole || userDetail?.role}
                                        onChange={(e) => setUserRole(e.target.value)}
                                        focusBorderColor='red.300'
                                    >
                                        {
                                            role.map((item, index) => (
                                                <option key={index} value={item}  >
                                                    {item}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                </HStack>
                                <HStack >
                                    {
                                        userRole && userRole !== userDetail.role && (
                                            <Button isLoading={loading} onClick={() => changeRoleHandler(userDetail?._id)} colorScheme='green'>Change Role</Button>
                                        )
                                    }
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

export default UserModal;