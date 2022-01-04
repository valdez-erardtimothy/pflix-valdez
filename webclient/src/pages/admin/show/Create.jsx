import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import SeparatedDateInput from '../../../components/form_components/SeparatedDateInput';
import { useSelector, useDispatch } from 'react-redux';
import {Helmet} from 'react-helmet-async';
import {startLoad, endLoad} from '../../../features/loadingSlice';
import {createShow, clearCreateShowStatus} from '../../../features/admin/showSlice';
export default function Create() {
  // temporarily disable eslint while form not submittable
  let [title, setTitle] = useState("");
  let [genre, setGenre] = useState("");
  let [runtimeMinutes, setRuntimeMinutes] = useState("");
  let [gross, setGross] = useState("");
  let [releaseYear, setReleaseYear] =  useState("");
  let [releaseMonth, setReleaseMonth] = useState("");
  let [releaseDay, setReleaseDay] = useState("");
  let [plot, setPlot] = useState("");
  let [showType, setShowType] = useState("Movie");  
  let [images, setImages] = useState('');

  let navigate = useNavigate(); 
  const {
    createShowStatus,
    createShowResponse
  } = useSelector(state=>state.admin.show);
  const dispatch = useDispatch();
  let submitHandler = (e) => {
    e.preventDefault();
    console.debug(e.target);
    
    let createShowData = new FormData();
    createShowData.set('title', title);
    createShowData.set('genre', genre);
    createShowData.set('runtimeMinutes',runtimeMinutes);
    createShowData.set('grossIncome',gross);
    createShowData.set(
      "released",
      new Date(
        releaseYear,
        releaseMonth,
        releaseDay
      )
    );
    createShowData.set('showType', showType);
    createShowData.set('plot',plot);
    [...images].forEach(img=>createShowData.append('images', img));

    
    dispatch(createShow(createShowData));
  };

  // handle create status changes
  useEffect(()=> {
    switch(createShowStatus) {
    case 'idle':
      dispatch(endLoad());
      break;
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
      if(createShowResponse.status === 200) {
        dispatch(clearCreateShowStatus()); 
        navigate( "/admin/shows/"+createShowResponse.data.show._id );
      }
      break;
    case 'failed':
      dispatch(endLoad());
    }
  },[createShowStatus]);
  return(<>
    <Helmet>
      <title>Add a Show</title>
    </Helmet>
    <h3>Add a new show </h3>
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
        controlId="createShowGenre" 
        label="Genre">
        
        <Form.Control 
          type="text" 
          name="genre" 
          placeholder="Genre"
          onChange={e=>setGenre(e.target.value)} 
          value={genre}
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
      
      <FloatingLabel  
        className="mb-4" 
        controlId="editMovieGross" 
        label="Gross Income">
        
        <Form.Control 
          type="number" 
          name="grossIncome" 
          placeholder="Gross Income"
          onChange={e=>setGross(e.target.value)}
          value={gross}
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
      <Button type="submit">Add</Button>
    </Form>
  </>);
}