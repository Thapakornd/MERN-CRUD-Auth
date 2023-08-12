import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import TextCardPrivate from '../TextCardPrivate';

const SelfPost = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await axiosPrivate.get('/posts/current',
                    {
                        signal: controller.signal
                    }
                )

                isMounted && setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getData();

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        }
    },[])

  return (
    <Container>
        <Stack direction='row' justifyContent='space-between'>
            <h1>Self Post</h1>
            <Button variant='contained' onClick={() => navigate(-1)}>Back</Button>
        </Stack>
        <Container sx={{
            backgroundColor: "#24282d",
            borderRadius: "8px",
            padding: "10px",
            margin: "20px 0"
        }}>
            {posts.length
                ? posts.map((post, i) => (
                    <TextCardPrivate key={i} post={post} />
                ))
                : (<Typography>No Content</Typography>)
            }
        </Container>
    </Container>
  )
}

export default SelfPost