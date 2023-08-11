import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import "./Login.scss";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../API/axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {

  const { setAuth, persist, setPersist} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth',
        JSON.stringify({ user, pwd}),
        {
          headers: {'Content-Type' : 'application/json'},
          withCredentials: true
        }
      );

      console.log(response.data);

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      console.log(accessToken);
      console.log(roles);

      setAuth({ user, pwd, roles, accessToken });
      console.log(roles);
      setUser('');
      setPwd('');
      
      navigate(from, { replace: true });
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No Server Response');
      }else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      }else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      }else{
        setErrMsg('Login Failed')
      }
    }
  }

  return (
    <div className="login">
      <div className="row">
        <p className={errMsg ? '' : 'offscreen'}>{errMsg}</p>
        <h1>Login</h1>
        <div>
          <Form>
            <Form.Group>
              <Form.Group className="form">
                <Form.Label>Email address or Username</Form.Label>
                <Form.Control
                  placeholder="name@example.com or username"
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="name@example.com"
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Form.Group>
              <Form.Check
                className="checkbox"
                type="checkbox"
                id="persist"
                label="Trust this device"
                checked={persist}
                onChange={togglePersist}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="submit">
          <Button variant="success" onClick={handleSubmit} disabled={!user || !pwd}>Sign In</Button>
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
