import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import {Helmet} from 'react-helmet-async';
import {Button, Form, FloatingLabel} from 'react-bootstrap';
import SeparatedDateInput from '../../../components/form_components/SeparatedDateInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowAdmin, editShow, clearEditShowStatus} from '../../../features/admin/showSlice';
import { startLoad, endLoad } from '../../../features/loadingSlice';

export default function Edit()  {
  let navigate =  useNavigate();
  let {
    loadedShowAdmin:show,
    showAdminLoadStatus,
    editShowStatus,
    editShowResponse
  } = useSelector(state=>state.admin.show);
  const dispatch = useDispatch();
  // temporarily disable eslint while form not submittable
  /* eslint-disable no-unused-vars */
  let {id} = useParams();
  let [title, setTitle] = useState("");
  let [runtimeMinutes, setRuntimeMinutes] = useState("");
  let [releaseYear, setReleaseYear] =  useState("");
  let [releaseMonth, setReleaseMonth] = useState("");
  let [releaseDay, setReleaseDay] = useState("");
  let [plot, setPlot] = useState("");
  let [showType, setShowType] = useState("Movie");
  let [images, setImages] = useState('');
  // on first page visit
  useEffect(async ()=> {
    dispatch(fetchShowAdmin(id));
  },[]);

  let releaseDateObject;
  // handle load status changes
  useEffect(async()=> {
    
    switch (showAdminLoadStatus) {
    case 'idle':
      dispatch(endLoad());
      break;
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
      releaseDateObject = new Date(show.released);
      console.debug(releaseDateObject);
      setTitle(show.title);
      setRuntimeMinutes(show.runtimeMinutes);
      setReleaseYear(releaseDateObject.getFullYear());
      setReleaseDay(releaseDateObject.getDay());
      setReleaseMonth(releaseDateObject.getMonth());
      setPlot(show.plot);
      setShowType(show.showType);
      dispatch(endLoad());  
      break;
    case 'failed':
      dispatch(endLoad());  
      break;
    default:
      break;
    }
  }, [showAdminLoadStatus]);

  // handle edit status changes
  useEffect(()=> {
    switch(editShowStatus) {
    case 'idle':
      dispatch(endLoad());
      break;
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
      if(editShowResponse.status === 200) {
        dispatch(clearEditShowStatus()); 
        navigate( -1 );
      }
      break;
    case 'failed':
      dispatch(endLoad());
    }
  },[editShowStatus]);

  let submitHandler = (e) => {
    e.preventDefault();
    console.debug(e.target);
    let formData = new FormData();
    formData.set('title', title);
    formData.set('runtimeMinutes',runtimeMinutes);
    formData.set(
      "released",new Date(
        releaseYear,
        releaseMonth,
        releaseDay
      ),
    );
    formData.set('showType', showType);
    formData.set('plot',plot);
    [...images].forEach(img=>formData.append('images', img));
    console.debug('pre-submit formdata:', formData);
    dispatch(editShow({id:id, editShowData:formData}));
  };

  return(<>
    <Helmet>
      <title>Edit {show?.title || "Film"}</title>
    </Helmet>
    <h3>Edit {show.title}</h3>
    <h6><Link to="/admin/shows">Back to list</Link></h6>
    <Form onSubmit={submitHandler}>
      <FloatingLabel 
        className="mb-4" 
        controlId="createShowTitle" 
        label="Title">
        {/* idea: pull a random title from list of added as placeholder? */}
        <Form.Control 
          type="text" 
          name="title" 
          placeholder="Title"
          onChange={e=>setTitle(e.target.value)} 
          value={title}
          required
        />
      </FloatingLabel>
      <FloatingLabel  
        className="mb-4" 
        controlId="createMovieYear" 
        label="Runtime (minutes)">
        
        <Form.Control 
          type="number" 
          name="minutes" 
          placeholder="Runtime"
          onChange={e=>setRuntimeMinutes(
            parseInt(e.target.value)
          )}
          value={runtimeMinutes}
          required
        />
      </FloatingLabel>
      <div className="mb-4">
        <Form.Label>Date Released</Form.Label>
        <SeparatedDateInput 
          dayChangeFormHandler={e=>setReleaseDay(parseInt(e.target.value))}
          monthChangeFormHandler={e=>setReleaseMonth(parseInt(e.target.value))}
          yearChangeFormHandler={e=>setReleaseYear(parseInt(e.target.value))}
          yearValue={releaseYear}
          monthValue={releaseMonth}
          dayValue={releaseDay}
        />
      </div>
      <Form.Group
        className="mb-3" 
        controlId="createShowPlot" 
      >
        <Form.Label>Plot</Form.Label>
        <Form.Control 
          as="textarea" 
          name="plot" 
          placeholder="Plot"
          value={plot}
          onChange={(e)=>setPlot(e.target.value)} 
        >
        </Form.Control>
      </Form.Group>
      <FloatingLabel 
        className="mb-3"
        label="Type"
        controlId="createShowType"
      >
        <Form.Select 
          name="show_type" 
          value={showType} 
          onChange={e=>setShowType(e.target.value)}>
          <option value="TV Show">TV Show</option>
          <option value="Movie">Movie</option>
        </Form.Select>
      </FloatingLabel>
      <Form.Group 
        controlId="editShowImages"
        className="mb-3"
      >
        <Form.Label>Images</Form.Label>
        <Form.Control
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={e=>setImages(e.target.files)}
        />
      </Form.Group>
      <Button type="submit">Update</Button>
    </Form>
  </>);
}