import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <h1>Home</h1>
      <p>You are Logged in</p>
      <Link to='/editor'>Go to the Editor page</Link>
      <Link to='/admin'>Go to the Admin page</Link>
      <Link to='/lounge'>Go to the Lounge</Link>
      <Link to='/linkpage'>Go to the Link page</Link>
      <div className="flexGrow">
        <Button>Sign Out</Button>
      </div>
    </div>
  )
}

export default Home