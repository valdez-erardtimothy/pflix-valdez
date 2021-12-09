import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import {create,clearCreateStatus} from '../../../features/admin/actorSlice';
import ImgFieldGallery from '../../../components/ImgFieldGallery';
import { endLoad, startLoad } from '../../../features/loadingSlice';
import { useAlert } from 'react-alert';

export default function Create() {
  const dispatch = useDispatch();
  const navigate=useNavigate() ;
  const alert = useAlert();
  const [imgUploads, setImgUploads] = useState([]);
  const {createStatus} = useSelector(state=>state.admin.actor);
  const submitHandler = (formEvent) => {
    formEvent.preventDefault();
    let formData = new FormData(formEvent.target);
    dispatch(create(formData));
  };
  // clear status on visit and exit
  useEffect(()=>{
    dispatch(clearCreateStatus());
    return ()=> {
      dispatch(clearCreateStatus());
    };
  },[]);

  useEffect(() => {
    switch(createStatus){
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      dispatch(endLoad());
      alert.success('Created Actor!');
      navigate('/admin/actors');
      break;
    case"failed":
      dispatch(endLoad());
      break;
    }
  }, [createStatus]);
  
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
              name="notes" 
              placeholder="Notes"
            />
          </FloatingLabel>
          <Form.Group className="mb-4" controlId="createActorImages">
            <Form.Label>Images</Form.Label>
            <Form.Control 
              type="file" 
              multiple 
              name="images" 
              accept="image/*"
              onChange={e=>{setImgUploads(e.target.files);}}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
          
          {imgUploads.length>0 && (<>
            <h5>Upload Preview</h5>
            <ImgFieldGallery fileList={imgUploads}/>
          </>
          )}
        </Form>
      </Container>
      
    </>
    
  );
}