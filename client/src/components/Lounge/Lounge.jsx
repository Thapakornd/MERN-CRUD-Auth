import React from 'react'
import { Stack, Container, Button } from '@mui/material'
import Post from '../CRUD/Posts/Post'
import { useNavigate } from 'react-router-dom'


const Lounge = () => {
  const navigate = useNavigate();

  return (
    <div className='lounge'>
      <Container>
        <Stack direction='row' justifyContent='space-between'> 
          <h1>Lounge Main Page</h1>
          <Stack direction='row' spacing='10px'>
            <Button variant='contained' color='success' onClick={() => navigate('/createpost')}>Create Post</Button>
            <Button variant='contained' onClick={() => navigate('/selfpost')}>My Posts</Button>
          </Stack>
        </Stack>
        <Container>
          <Post />
        </Container>
      </Container>
    </div>
  )
}

export default Lounge