import React from 'react'
import { Stack, Container, Button } from '@mui/material'
import Post from '../CRUD/Posts/Post'

const Lounge = () => {
  return (
    <div className='lounge'>
      <Container>
        <Stack direction='row' justifyContent='space-between'> 
          <h1>Lounge Main Page</h1>
          <Stack direction='row' spacing='10px'>
            <Button variant='contained' color='success'>Create Post</Button>
            <Button variant='contained' >My Posts</Button>
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