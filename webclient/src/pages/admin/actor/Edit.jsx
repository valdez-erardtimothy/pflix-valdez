import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import {fetchActor, edit,clearEditStatus} from '../../../features/admin/actorSlice';
import ImgFieldGallery from '../../../components/ImgFieldGallery';
import { endLoad, startLoad } from '../../../features/loadingSlice';
import { useAlert } from 'react-alert';
import CharacterInputs from './CharacterInputs';
import { fetchTitles } from '../../../features/admin/showsSlice';

export default function Edit() {
  // hooks
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate() ;
  const alert = useAlert();
  
  // hook-initialized variables
  const [imgUploads, setImgUploads] = useState([]);
  const {
    createStatus, 
    fetchStatus,
    error,
    editStatus,
    loadedActor
  } = useSelector(state=>state.admin.actor);
  
  // form states
  const [actorName, setActorName] = useState('');
  const [notes, setNotes] = useState('');

  const submitHandler = (formEvent) => {
    formEvent.preventDefault();
    let formData = new FormData(formEvent.target);
    dispatch(edit({id:id, form: formData}));
  };

  // load actor
  // clear status on visit and exit
  useEffect(() => {
    dispatch(fetchActor(id));
    dispatch(clearEditStatus());
    dispatch(fetchTitles());
    return ()=>{
      dispatch(clearEditStatus());
    };
  }, []);

  useEffect(()=>{
    switch(fetchStatus) {
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      dispatch(endLoad());
      setActorName(loadedActor.name);
      setNotes(loadedActor.notes);
      break;
    case "failed":
      dispatch(endLoad());
      alert.error(error?.message || "Error fetching actor");
      break;
    }
  },[fetchStatus]);

  useEffect(() => {
    switch(createStatus){
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      dispatch(endLoad());
      alert.success('Created Actor!');
      navigate('/admin/actors/'+id);
      break;
    case"failed":
      dispatch(endLoad());
      break;
    }
  }, [createStatus]);

  useEffect(() => {
    switch(editStatus){
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      dispatch(endLoad());
      alert.success('Updated Actor!');
      navigate('/admin/actors/'+id);
      break;
    case"failed":
      dispatch(endLoad());
      break;
    }
  }, [editStatus]);
  
  return (
    <>
      <Helmet>
        <title>Edit {loadedActor.name || "Acto"}</title>
      </Helmet>
      <Container fluid>
        <h3>Edit {loadedActor.name}
          <Button 
            variant="secondary" 
            onClick={()=>{navigate(-1);}}
            size="sm"
            className="mx-1 material-icons"
            title="Cancel Edit"
          >
              arrow_back
          </Button>
        </h3>
        <Form onSubmit={submitHandler}>
          <FloatingLabel  
            className="mb-4" 
            controlId="createActorName" 
            label="Name">
            <Form.Control 
              type="text" 
              name="name" 
              placeholder="Name"
              value={actorName}
              onChange={e=>{setActorName(e.target.value);}}
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
              value={notes}
              onChange={e=>{setNotes(e.target.value);}}
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

          <CharacterInputs actorId={id} initialList={loadedActor.filmography}/>
          <Button type="submit">Submit</Button>
          
          {imgUploads.length>0 && (<>
            <h5>Upload Preview</h5>
            <p className="text-info bg-dark">
              The pictures will replace the existing pictures (if any)
            </p>
            <ImgFieldGallery fileList={imgUploads}/>
          </>
          )}
        </Form>
      </Container>
      
    </>
    
  );
}