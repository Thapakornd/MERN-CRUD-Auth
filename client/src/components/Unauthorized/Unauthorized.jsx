import React from 'react'
import './Unauthorized.scss'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1); 

  return (
    <div className='unauth'>
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <Button onClick={goBack}>Go Back</Button>
    </div>
  )
}

export default Unauthorized