import React from 'react';
import {Image, Stack} from 'react-bootstrap';

export default function ActorJumbotron({actor}) {
  return (
    <Stack direction="horizontal"
      className='bg-dark text-light p-3 me-4 align-items-start' 
    >
      <div>
        <Image 
          style={{height:"300px", width:"200px", objectFit:"cover"}}
          src={actor?.images[0] ?? "/img/movie_placeholder.png"}/>
      </div>  
      <div
        className="ms-2">
        <h3>{actor.name}&nbsp;</h3>
        {actor?.ratings ? <p>{actor.ratings.toFixed(2)}
          <span className="material-icons">grade</span> out of 5&nbsp;
          <small className="text-muted">({actor.reviewCount} reviews)</small>
        </p> : (
          <p>No Reviews</p>
        )}
        {actor?.notes && (<p>{actor.notes}</p>)}
      </div>         
    </Stack>
  );
}