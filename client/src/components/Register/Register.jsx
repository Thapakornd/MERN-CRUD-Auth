import React, { useEffect, useRef, useState } from "react";
import "./Register.scss";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../API/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /(?=.*[@])/;

const Register = () => {
  const emailRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // Check value input by regex
  useEffect(() => {
    let isMounted = true;

    isMounted && emailRef.current.focus();
    
    return () => {
      isMounted = false
      isMounted && emailRef;
    }
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd)
  }, [pwd,matchPwd])

  // Function handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = USER_REGEX.test(user);
    const v3 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3) return setErrMsg("Invalid Entry!")
    try {
      const response = await axios.post('/register',
        JSON.stringify({ email, user, pwd }),
        {
          headers: {'Content-Type' : 'application/json'},
          withCredentials: true
        }
      )

      setSuccess(true);

      // Clear state and controlled inputs
      setEmail('');
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (error) {
      if(!error?.response){
        setErrMsg('No Server Response');
      }else if (error?.response?.status === 409){
        setErrMsg('Username or Email Taken');  
      }else{
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login">
      <div className="row">
        {success ? (
          <Alert variant="success" className="alert-success">
            <Alert.Heading className="alert-color">
              Sign Up Successfully!!
            </Alert.Heading>
            <p className="alert-color">You can login with this link.</p>
            <hr className="alert-color" />
            <div className="d-flex ">
              <Button variant="outline-success">
                <Link to={'/login'} className="alert-color">Sign In</Link>
              </Button>
            </div>
          </Alert>
        ) : (
          <p></p>
        )}
        <p ref={errRef} className={errMsg ? "" : "offscreen"}>{errMsg}</p>
        <h1>Register</h1>
        <div>
          <Form>
            <Form.Group>
              <Form.Group className="form" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  ref={emailRef}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <div className={`helpText ${email && !validEmail ? "" : "offscreen"}`}>
                  <Form.Text id="helpEmail">
                    Please include an <span aria-label="at symbol">@</span>{" "}
                    in the email address.
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="type your username"
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoComplete="off"
                  ref={userRef}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  aria-describedby="helpUser"
                />
                <div className={`helpText ${user && !validUser ? "" : "offscreen"}`}>
                  <Form.Text id="helpUser">
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="type your password"
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="helpPass"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  autoComplete="off"
                />
                <div className={`helpText ${pwd && !validPwd ? "instruction" : "offscreen"}`}>
                  <Form.Text id="helpPass">
                    8-24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group className="form">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="type confirm password"
                  required
                  aria-describedby="helpConfirm"
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}                 
                />
                <div className={`helpText ${matchPwd && !validMatch ? "" : "offscreen"}`}>
                  <Form.Text id="helpConfirm">
                    Must match the first password input field.
                  </Form.Text>
                </div>
              </Form.Group>
            </Form.Group>
          </Form>
          <div className="submit">
            <Button variant="success" onClick={handleSubmit} disabled={(!validEmail || !validUser || !validPwd || !validMatch) ? true : false}>Sign Up</Button>
            <p>
              Already registered?
              <span>
                <Link to="/login" className="signUp">
                  Sign In
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
