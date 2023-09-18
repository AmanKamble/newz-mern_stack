import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from "../../redux/actions/profile";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const {loading, message, error } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(changePassword(oldPassword, newPassword));
        navigate("/profile")
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, message, error]);
    return (
        <Container minH="90vh" py="16">
            <form onSubmit={submitHandler}>
                <Heading children="Change Password" textTransform="uppercase" my="16" textAlign={['center', 'left']} />
                <VStack spacing="8" >
                    <Input
                        type='password'
                        value={oldPassword}
                        focusBorderColor='red.500'
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder='Old Password'
                        required
                    />

                    <Input
                        type='password'
                        value={newPassword}
                        focusBorderColor='red.500'
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='New Password'
                        required
                    />

                    <Button isLoading={loading} w="full" colorScheme='red' type='submit' >Change Password</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default ChangePassword