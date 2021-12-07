import React,{useEffect} from 'react';
import {Button, Container, FloatingLabel, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {register, clearRegisterStatus} from '../../features/authSlice';
import { startLoad, endLoad } from '../../features/loadingSlice';
import { useAlert } from 'react-alert';
export default function Register() {
  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();
  const {registerError, registerStatus} = useSelector(state=>state.auth);
  useEffect(() => {
    return () => {
      // cleanup register status on exit
      dispatch(clearRegisterStatus);
    };
  }, []);
  // handle status change
  useEffect(()=>{
    switch(registerStatus) {
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      navigate('/register/success');
      dispatch(endLoad());
      break;
    case "failed":
      alert.error(registerError.message);
      dispatch(endLoad());
      break;
    default:
      break;
    }
  },[registerStatus]);

  const submitHandler = (formEvent)=>{
    formEvent.preventDefault();
    const formData = new FormData(formEvent.target);
    dispatch(register(formData));
  };

  return <Container fluid="sm">
    <h3>Register</h3>
    <Form onSubmit={submitHandler}>
      <FloatingLabel
        label="Name" 
        controlId="register-name"
        className="mb-3"
      >
        <Form.Control 
          type="text" 
          name="name" 
          placeholder="Name"
          required
        />
      </FloatingLabel>
      <FloatingLabel
        label="username" 
        controlId="register-uname"
        className="mb-3"
      >
        <Form.Control 
          type="text" 
          name="username" 
          placeholder="username"
          minLength="6"
          required
        />
      </FloatingLabel>
      <FloatingLabel
        label="E-mail" 
        controlId="register-email"
        className="mb-3"
      >
        <Form.Control 
          type="email" 
          name="email" 
          placeholder="E-mail"
          required
        />
      </FloatingLabel>
      
      <FloatingLabel
        label="Password" 
        controlId="register-password"
        className="mb-3"
      >
        <Form.Control 
          type="password" 
          name="password" 
          placeholder="Password"
          required
          minLength='8'
        />
      </FloatingLabel>
      <Button type="submit">
        Register
      </Button>
    </Form>
  </Container>;
}