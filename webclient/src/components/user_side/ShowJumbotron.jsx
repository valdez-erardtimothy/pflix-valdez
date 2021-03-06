import React from 'react';
import {Stack, Image} from 'react-bootstrap';

import { toShorthand } from '../../helpers/numberHelper';

export default function ShowJumbotron({show}) {
  return <Stack direction="horizontal"
    className='bg-dark text-light p-3 me-4 align-items-start' 
  >
    <div>
      <Image 
        style={{height:"300px", width:"200px", objectFit:"cover"}}
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
      {show?.ratings ? <p>{show.ratings.toFixed(2)}
        <span className="material-icons">grade</span> out of 5&nbsp;
        <small className="text-muted">({show.reviewCount} reviews)</small>
      </p> : (
        <p>No Reviews</p>
      )}
      <p>Released: {(new Date(show.released)).toDateString()}</p>
      <p>{show.genre}</p>
      <p>{show.runtimeMinutes} minutes</p>
      <p>Gross income: ${toShorthand(show.grossIncome).toString()}</p>
      <p>{show.plot}</p>
    </div>         
  </Stack>;
}