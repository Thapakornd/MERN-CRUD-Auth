import React from "react";
import { Form } from "react-bootstrap";
import "./Login.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "../../API/axios";

const Login = () => {

  return (
    <div className="login">
      <div className="row">
        <h1>Login</h1>
        <div>
          <Form>
            <Form.Group>
              <Form.Group className="form">
                <Form.Label>Email address or Username</Form.Label>
                <Form.Control
                  placeholder="name@example.com or username"
                  required
                />
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="name@example.com"
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
            Need an account?
            <span>
              <Link to='/register' className="signUp">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
