import React from 'react'
import { Stack, Container, Button } from '@mui/material'
import Post from '../CRUD/Posts/Post'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'


const Lounge = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true})
  }

  return (
    <div className='lounge'>
      <Container>
        <Stack direction='row' justifyContent='space-between'> 
          <h1>Lounge Main Page</h1>
          <Stack direction='row' spacing='10px'>
            <Button variant='contained' onClick={handleLogout} color='error'>Logout</Button>
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