import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Home.scss';
import useLogout from '../../hooks/useLogout';

const Home = () => {
  
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = () => {
    logout();
    navigate('/login', {replace: true})
  }

  return (
    <div className='home'>
      <h1>Home</h1>
      <p>You are Logged in</p>
      <Link to='/editor' className='link'>Go to the Editor page</Link>
      <Link to='/admin' className='link' >Go to the Admin page</Link>
      <Link to='/lounge' className='link'>Go to the Lounge</Link>
      <Link to='/linkpage' className='link'>Go to the Link page</Link>
      <div className="flexgrow">
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    </div>
  )
}

export default Home