import React from 'react'
import Users from '../MVC/Users'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
        <h1>Admin Page</h1>
        <Users />
        <div className="">
            <Link to='/'>Home</Link>
        </div>
    </div>
  )
}

export default Admin