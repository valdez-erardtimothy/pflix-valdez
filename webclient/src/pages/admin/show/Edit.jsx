import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import {Button, Form, FloatingLabel} from 'react-bootstrap';
import SeparatedDateInput from '../../../components/form_components/SeparatedDateInput';
export default function Edit()  {
  let navigate =  useNavigate();
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
  
  useEffect(async ()=> {
    let {data} = await axios.get(`/api/admin/shows/${id}`).then();
    let {
      title,
      runtimeMinutes,
      released,
      plot,
      showType
    } = data.show;
    let releaseDateObject = new Date(released);
    console.debug(releaseDateObject);
    setTitle(title);
    setRuntimeMinutes(runtimeMinutes);
    setReleaseYear(releaseDateObject.getFullYear());
    setReleaseDay(releaseDateObject.getDay());
    setReleaseMonth(releaseDateObject.getMonth());
    setPlot(plot);
    setShowType(showType);
    

  },[]);
  let submitHandler = (e) => {
    e.preventDefault();
    console.debug(e.target);
    
    let editShowData = new FormData();
    editShowData.set('title', title);
    editShowData.set('runtimeMinutes',runtimeMinutes);
    editShowData.set(
      "released",
      new Date(
        releaseYear,
        releaseMonth,
        releaseDay
      )
    );
    editShowData.set('showType', showType);
    editShowData.set('plot',plot);
    [...images].forEach(img=>editShowData.append('images', img));
    

    axios.patch(`/api/admin/shows/${id}`, editShowData).then(
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
      <title>Edit {title}</title>
    </Helmet>
    <h3>Edit {title}</h3>
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