import React, { useState } from 'react';
import {
    Button,
    Container,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from "../../redux/actions/profile";
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
    const [name, setName] = useState(user.name || ''); 
    const [email, setEmail] = useState(user.email || '');
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email));
        dispatch(loadUser());
        navigate("/profile")
    }
    return (
        <Container minH="90vh" py="16">
            <form onSubmit={submitHandler}>
                <Heading children="Update Profile" textTransform="uppercase" my="16" textAlign={['center', 'left']} />
                <VStack spacing="8" >
                    <Input
                        type='text'
                        value={name}
                        focusBorderColor='red.500'
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                    />

                    <Input
                        type='email'
                        value={email}
                        focusBorderColor='red.500'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />

                    <Button isLoading={loading} w="full" colorScheme='red' type='submit' >Update</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default UpdateProfile