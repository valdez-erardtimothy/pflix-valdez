import React, { useState, useEffect } from 'react';
import { Container, FloatingLabel, Form, Button} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ImgFieldGallery from '../../../components/ImgFieldGallery';
import { useSelector, useDispatch } from 'react-redux';
import { startLoad, endLoad } from '../../../features/loadingSlice';
import { useAlert } from 'react-alert';
import { clearCreateStatus, create } from '../../../features/admin/producerSlice';


export default function Create() {
  /* hooks */
  const dispatch = useDispatch();
  const alert = useAlert();

  /* redux states */
  const {
    createStatus
  } = useSelector(state=>state.admin.producer);

  /* component state */
  const [imgUploads, setImgUploads] = useState([]);
  
  /* effects */
  // clear create status on page exit
  useEffect(()=>{
    return ()=> {
      dispatch(clearCreateStatus());
    };
  }, []);

  /* redux load state effects */
  useEffect(() => {
    switch(createStatus) {
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success': 
      dispatch(endLoad());
      alert.success('Created Producer!');
      break;
    case 'failed':
      dispatch(endLoad());
      alert.error('failed creating producer');
      break;
    }
  }, [createStatus]);

  /* event handlers */
  const submitHandler = (formEvent) =>  {
    formEvent.preventDefault();
    let formData = new FormData(formEvent.target);
    console.debug('producer create submit event:', formData);
    dispatch(create(formData));
  };
  /* component render */
  return <>
    <Helmet>
      <title>Add a Producer</title>
    </Helmet>
    <Container fluid>
      <h3>Add a new Producer</h3>
      <h6><Link to="/admin/producers">Cancel</Link></h6>
      <Form onSubmit = {submitHandler}>
        <FloatingLabel
          className="mb-4"
          controlId="producer-create-name"
          label="Name"
        >
          <Form.Control 
            type="text" 
            name="name" 
            placeholder="Name"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-4"
          controlId="producer-create-email"
          label="E-mail"
        >
          <Form.Control 
            type="email" 
            name="email" 
            placeholder="E-mail"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-4"
          controlId="producer-create-website"
          label="Website"
        >
          <Form.Control 
            type="url" 
            name="website" 
            placeholder="Website"
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
  </>;
}