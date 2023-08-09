import React from 'react'
import './Register.scss'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="login">
      <div className="row">
        <h1>Register</h1>
        <div>
          <Form>
            <Form.Group>
              <Form.Group className="form">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="type your username"
                  required
                />
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="type your password"
                  required
                />
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="type confirm password"
                  required
                />
              </Form.Group>
              <Form.Check
                className="checkbox"
                type="checkbox"
                id="persist"
                label="Trust this device"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="submit">
          <Button variant="success">Sign In</Button>
          <p>
            Already registered?
            <span>
              <Link to='/login' className="signUp">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>  
  )
}

export default Register