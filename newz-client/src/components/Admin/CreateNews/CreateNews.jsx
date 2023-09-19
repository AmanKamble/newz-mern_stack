import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Button, Container, Grid, Heading, Image, Input, Select, Textarea, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createNews } from '../../../redux/actions/admin';
import { fileUploadCss } from "../../Auth/Register"


const CreateNews = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.admin);

    const categories = ["Entertainment", "Cars", "Sports", "India", "Technology", "Science", "Business", "Health", "Politics", "Religion", "Travel"];

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

        myForm.append("title", title);
        myForm.append("content", content);
        myForm.append("category", category);
        myForm.append("file", image);

        dispatch(createNews(myForm));
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
        <Grid minH="100vh" templateColumns={["1fr", "5fr 1fr"]} >
            <Container py="16">
                <form onSubmit={submitHandler}>
                    <Heading textTransform="uppercase" my="16" children="create course" textAlign={["center", "left"]} />
                    <VStack m="auto" spacing="8" >
                        <Input
                            type='text'
                            value={title}
                            focusBorderColor='red.300'
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Title'
                        />
                        <Textarea
                            value={content}
                            focusBorderColor='red.300'
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Content'
                            minH="150px"
                            lineHeight="1.2"
                        />
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            focusBorderColor='red.300'
                        >
                            <option value="">Select Category</option>
                            {
                                categories.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))
                            }
                        </Select>

                        <Input
                            type='file'
                            focusBorderColor='red.300'
                            required accept='image/*'
                            css={{
                                "&::file-selector-button": fileUploadCss
                            }}
                            onChange={changeImageHandler}
                        />

                        {
                            imagePrev && <Image src={imagePrev} boxSize="64" objectFit="contain" />
                        }
                        <Button w="full" isLoading={loading} colorScheme='red' type='submit'>Create</Button>
                    </VStack>
                </form>
            </Container>
            <Sidebar />
        </Grid>
    )
}

export default CreateNews