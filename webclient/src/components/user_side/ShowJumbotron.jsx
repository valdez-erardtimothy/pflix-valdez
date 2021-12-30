import React from 'react';
import {Stack, Image} from 'react-bootstrap';
export default function ShowJumbotron({show}) {
  return <Stack direction="horizontal"
    className='bg-dark text-light p-3 me-4 align-items-start' 
  >
    <div>
      <Image 
        style={{height:"300px"}}
        src={show?.images[0] ?? "/img/movie_placeholder.png"}/>
    </div>  
    <div
      className="ms-2"
    >
      <h3>{show.title}&nbsp; 
        <small className="text-muted">
          {show.showType}
        </small>
      </h3>
      <p>{show.genre}</p>
      <p>{show.runtimeMinutes} minutes</p>
      <p>{show.plot}</p>
    </div>         
  </Stack>;
}