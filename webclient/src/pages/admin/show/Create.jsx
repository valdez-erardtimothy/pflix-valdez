import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import SeparatedDateInput from '../../../components/form_components/SeparatedDateInput';
import axios from 'axios';
import {Helmet} from 'react-helmet';
export default function Create() {
  // temporarily disable eslint while form not submittable
  /* eslint-disable no-unused-vars */
  let [title, setTitle] = useState("");
  let [runtimeMinutes, setRuntimeMinutes] = useState("");
  let [releaseYear, setReleaseYear] =  useState("");
  let [releaseMonth, setReleaseMonth] = useState("");
  let [releaseDay, setReleaseDay] = useState("");
  let [plot, setPlot] = useState("");
  let [showType, setShowType] = useState("Movie");  
  let [poster, setPoster] = useState("");

  let navigate = useNavigate(); 

  let submitHandler = (e) => {
    e.preventDefault();
    console.debug(e.target);
    
    let createShowData = new FormData();
    createShowData.set('title', title);
    createShowData.set('runtimeMinutes',runtimeMinutes);
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
    createShowData.set('poster', poster);
    console.debug("createmoviedata:");
    console.debug(createShowData);
    

    axios.post('/api/admin/shows', createShowData).then(
      (response) => {
        if(response.status === 200) {
          // get back to show list 
          navigate(-1); 
        }
      }
    );
  };

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
      <Form.Group controlId="createShowPoster">
        <Form.Label>Poster</Form.Label>
        <Form.Control 
          type="file" name="createShowPoster"
          onChange={(e)=>setPoster(e.target.files[0])}/>
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  </>);
}