import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = ({loading}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email,password));
    }

    return (
        <Container h={"95vh"}>
            <VStack h={"full"} justifyContent="center" spacing={"16"}  >
                <Heading children="News Log In" />
                <form onSubmit={submitHandler} style={{ width: "100%" }}>
                    <Box my={"4"}>
                        <FormLabel htmlFor='email' children="Email" />
                        <Input id='email' type='email' value={email} focusBorderColor='red.500' onChange={(e) => setEmail(e.target.value)} placeholder='abc@gmail.com' required />
                    </Box>
                    <Box my={"4"}>
                        <FormLabel htmlFor='password' children="Password" />
                        <Input id='password' type='password' value={password} focusBorderColor='red.500' onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    </Box>
                    <Box >
                        <Link to="/forgetpassword" ><Button fontSize={"sm"} variant="link" colorScheme='red' >Forget Password?</Button></Link>
                    </Box>
                    <Button w="full" isLoading={loading} type='submit' colorScheme='red' my={"4"} >Login</Button>
                    <Box >
                        New User? <Link to="/register" ><Button fontSize={"sm"} variant="link" colorScheme='red' >Sign Up</Button></Link> {" "} here
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Login