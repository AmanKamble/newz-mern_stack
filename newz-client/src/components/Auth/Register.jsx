import React, { useState } from 'react';
import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import {  Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';

export const fileUploadCss = {
    cursor: "pointer",
    marginLeft: "-5%",
    width: "110%",
    border: "none",
    height: "100%",
    color: "red",
    backgroundColor: "white",
}


const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss
}

const Register = ({loading}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();



    const changeImageHandler = (e) => {
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

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData(); 
    
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("file", image);
    
        dispatch(register(myForm));
    }
    return (
        <Container h={"95vh"}>
            <VStack h={"full"} justifyContent="center" spacing={"16"}  >
                <Heading textTransform="uppercase" children="Registration" />
                <form onSubmit={submitHandler} style={{ width: "100%" }}>
                    <Box my={"4"} display={"flex"} justifyContent="center">
                        <Avatar src={imagePrev} size={"xl"} />
                    </Box>
                    <Box my={"4"}>
                        <FormLabel htmlFor='name' children="Full Name" />
                        <Input id='name' type='text' value={name} focusBorderColor='red.500' onChange={(e) => setName(e.target.value)} placeholder='abc' required />
                    </Box>
                    <Box my={"4"}>
                        <FormLabel htmlFor='email' children="Email" />
                        <Input id='email' type='email' value={email} focusBorderColor='red.500' onChange={(e) => setEmail(e.target.value)} placeholder='abc@gmail.com' required />
                    </Box>
                    <Box my={"4"}>
                        <FormLabel htmlFor='password' children="Password" />
                        <Input id='password' type='password' value={password} focusBorderColor='red.500' onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    </Box>
                    <Box my={"4"}>
                        <FormLabel htmlFor='chooseAvatar' children="Choose Avatar" />
                        <Input
                            id='chooseAvatar'
                            type='file'
                            focusBorderColor='red.500'
                            required accept='image/*'
                            css={fileUploadStyle}
                            onChange={changeImageHandler}
                        />
                    </Box>


                    <Button w="full" type='submit' isLoading={loading} colorScheme='red' my={"4"} >Sign Up</Button>
                    <Box >
                        Already Signed Up? <Link to="/login" ><Button fontSize={"sm"} variant="link" colorScheme='red' >Login</Button></Link> {" "} here
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Register