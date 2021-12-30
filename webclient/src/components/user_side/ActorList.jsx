import React from 'react';
import {  Image, Stack } from 'react-bootstrap';

export default function ActorList({actors}) {

  /* render */
  return <>
    <Stack gap={4} >
      {actors?.length>0 && actors.map(actor=>{
        // show component
        return <Stack direction="horizontal"
          className='bg-dark text-light p-3 me-4 align-items-start' 
          key={actor._id}
        >
          <div>
            <Image 
              style={{height:"300px", width:"200px", objectFit:"cover"}}
              src={actor?.images[0] ?? "/img/movie_placeholder.png"}/>
          </div>  
          <div
            className="ms-2">
            <h3>{actor.name}&nbsp;
            </h3>
            {actor?.notes && (<p>{actor.notes}</p>)}
          </div>         
        </Stack>;

      })}
    </Stack> 
  </>;
}