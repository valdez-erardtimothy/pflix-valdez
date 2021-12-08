import React from 'react';
import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {create} from '../../../features/admin/actorSlice';

export default function Create() {
  const dispatch = useDispatch();
  
  const submitHandler = (formEvent) => {
    formEvent.preventDefault();
    let formData = new FormData(formEvent.target);
    dispatch(create(formData));
  };
  return (
    <>
      <Helmet>
        <title>Add an Actor</title>
      </Helmet>
      <Container fluid>
        <h3>Add a new actor</h3>
        <h6><Link to="/admin/actors">Back to list</Link></h6>
        <Form onSubmit={submitHandler}>
          <FloatingLabel  
            className="mb-4" 
            controlId="createActorName" 
            label="Name">
            <Form.Control 
              type="text" 
              name="name" 
              placeholder="Name"
              required
            />
          </FloatingLabel>
          <FloatingLabel 
            className="mb-4" 
            controlId="createActorNotes" 
            label="Notes">
            <Form.Control 
              as="textarea"
              type="text" 
              name="notes " 
              placeholder="Notes"
            />
          </FloatingLabel>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
      
    </>
    
  );
}