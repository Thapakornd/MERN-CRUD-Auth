import React from 'react'
import { Link } from 'react-router-dom'
import './LinkPage.scss';

const LinkPage = () => {
  return (
    <div className='link-page'>
      <h1>Links</h1>
      <div className="row r-1">
        <h2>Public</h2>
        <Link className='link' to='/login'>Login</Link>
        <Link className='link' to='/register'>Register</Link>
      </div>
      <div className="row r-1">
        <h2>Private</h2>
        <Link className='link' to='/'>Home</Link>
        <Link className='link' to='/editor'>Editor</Link>
        <Link className='link' to='/admin'>Admin</Link>
      </div>
    </div>
  )
}

export default LinkPage