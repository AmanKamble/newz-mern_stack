import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const { token } = useParams();
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, password));
        navigate("/login");
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
        <Container py={"16"} h="90vh">
            <form onSubmit={submitHandler}>
                <Heading children="Reset Password" my="16" textTransform="uppercase" textAlign={["center", "left"]} />
                <VStack spacing={"8"}>
                    <Input id='password' type='password' value={password} focusBorderColor='yellow.500' onChange={(e) => setPassword(e.target.value)} placeholder='New Password' required />
                    <Button type='submit' w={"full"} colorScheme='yellow'>Reset Password</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default ResetPassword