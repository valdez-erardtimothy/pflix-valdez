import React, {useState, useEffect} from 'react';
import {Button, Container, FloatingLabel,Form} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearLoginAttemptStatus } from '../features/authSlice';
import {startLoad, endLoad} from '../features/loadingSlice';
import {useAlert} from 'react-alert';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  let [username, setUsername]= useState("");
  let [password, setPassword] = useState("");

  const {
    loginAttemptStatus,
    loginAttemptError,
    authenticated
  } = useSelector(state => state.auth);

  // handle authentication status
  useEffect(()=> {
    if(authenticated) {
      navigate('/');
    }
  },[authenticated]);
  
  // handle login attempts
  useEffect(()=> {
    switch(loginAttemptStatus) {
    case "idle":
      dispatch(clearLoginAttemptStatus());
      break;
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      dispatch(endLoad());
      alert.success('login success');
      dispatch(clearLoginAttemptStatus());
      navigate('/');
      break;
    case "failed":
      alert.error(loginAttemptError?.message);
      dispatch(endLoad());
      dispatch(clearLoginAttemptStatus());
      break;
    default:
      break;
          
    }
  }, [loginAttemptStatus]);
  const submitHandler = (e) => {
    e.preventDefault();
    let form = e.target;
    dispatch(login(new FormData(form)));
  };
  return (
    <>
      <Container as="main" className="min-vh-100" fluid>
        <Container size="sm" className="mt-auto">
          <h1>Login</h1>
          <Form onSubmit={submitHandler}>
            <FloatingLabel
              controlId="login-username"
              className="mb-3"
              label="Username/Email"
            >
              <Form.Control 
                type="text" 
                name="username"
                
                placeholder="Username/Email"
                value={username}
                onChange={e=>setUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="login-password"
              className="mb-3"
              label="Password"
            >
              <Form.Control 
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
            </FloatingLabel>
            
            <div className="d-flex justify-content-end mb-2 gap-sm">
              <Button 
                type="submit" 
                variant="primary"
                className="me-1"
              >
                Log in
              </Button>
            </div>
            
            
          </Form>
        </Container>
      </Container>
    </>
  );
}