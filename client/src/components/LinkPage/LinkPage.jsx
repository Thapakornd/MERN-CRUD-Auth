import React from 'react'
import { Link } from 'react-router-dom'

const LinkPage = () => {
  return (
    <div className='link-page'>
      <h1>Links</h1>
      <div className="r1">
        <h2>Public</h2>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
      <div className="r2">
        <h2>Private</h2>
        <Link to='/'>Home</Link>
        <Link to='/editor'>Editor</Link>
        <Link to='/admin'>Admin</Link>
      </div>
    </div>
  )
}

export default LinkPage