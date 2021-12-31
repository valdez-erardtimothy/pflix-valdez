import React from 'react';
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/* component import */
import ActorJumbotron from './ActorJumbotron';

export default function ActorList({actors}) {

  /* render */
  return <>
    <Stack gap={4} >
      {actors?.length>0 && actors.map(actor=>{
        // show component
        return <Link
          key={actor._id}
          to={`/actors/${actor._id}`}
          className='text-decoration-none'
          title={`Go to actor details page`}
        >
          <ActorJumbotron key={actor._id} actor={actor}/> 
        </Link>; 

      })}
    </Stack> 
  </>;
}