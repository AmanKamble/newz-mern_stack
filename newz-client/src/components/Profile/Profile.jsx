import {
    Avatar,
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    VStack,
    useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'



const Profile = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const changeImageSubmitHandler = () => {

    }
    return (
        <Container minH="90vh" maxW="container.lg" py="8">
            <Heading children="Profile" m="8" textTransform="uppercase" textAlign="center" />
            <Stack justifyContent="flex-start" direction={["column", "row"]} alignItems="center" spacing={["8", "16"]} padding="8" >
                <VStack >
                    <Avatar boxSize={["32", '48']} src={user.avatar.url} />
                    <Button colorScheme='red' variant="ghost" onClick={onOpen}>
                        Change Photo
                    </Button>
                </VStack>
                <VStack spacing="4" alignItems={["center", "flex-start"]} >
                    <HStack >
                        <Text children="Name" fontWeight="bold" />
                        <Text children={user.name} />
                    </HStack>
                    <HStack >
                        <Text children="Email" fontWeight="bold" />
                        <Text children={user.email} />
                    </HStack>
                    <HStack >
                        <Text children="CreatedAt" fontWeight="bold" />
                        <Text children={user.createdAt.split("T")[0]} />
                    </HStack>
                    <Stack direction={["column", "row"]} alignItems="center">
                        <Link to="/updateprofile">
                            <Button colorScheme='red' variant={'outline'} >Update Profile</Button>
                        </Link>
                        <Link to="/changepassword">
                            <Button colorScheme='red' variant='outline' >Change Password</Button>
                        </Link>
                    </Stack>
                </VStack>
            </Stack>
            <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler} />
        </Container>
    )
}

export default Profile;








function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler, loading }) {
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');

    const changeImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImagePrev(reader.result);
                setImage(file);
            };
        } else {
            setImagePrev('');
            setImage(null);
        }
    };
    const closeHandler = () => {
        onClose();
        setImagePrev('');
        setImage();
    }
    const cantCHangeImage = () => {
        toast.error("Select Image")
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter={"blur(10px)"} />
            <ModalContent >
                <ModalHeader >Change Photo</ModalHeader>
                <ModalCloseButton onClick={closeHandler} />
                <ModalBody >
                    <Container >
                        <form onSubmit={(e) => changeImageSubmitHandler(e, image)} >
                            <VStack spacing="8" >
                                <Avatar src={imagePrev} boxSize={["32", '48']} />
                                <Input
                                    type='file'
                                    // css={{ "&::file-selector-button": fileUploadCss }}
                                    accept='image/*'
                                    onChange={changeImage}
                                />
                                {
                                    imagePrev ?
                                        (<Button isLoading={loading} w="full" colorScheme='yellow' type='submit' >Change</Button>)
                                        :
                                        (<Button isLoading={loading} w="full" onClick={cantCHangeImage} colorScheme='yellow'>Change</Button>)
                                }
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>
                <ModalFooter >
                    <Button mr="3" onClick={closeHandler} >Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}