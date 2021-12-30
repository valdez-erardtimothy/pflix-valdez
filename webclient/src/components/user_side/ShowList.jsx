import React from 'react';
import { Stack } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ShowJumbotron from './ShowJumbotron';

export default function ShowList({shows}) {
  /* render */
  return <>
    <Stack gap={4} >
      {shows?.length>0 && shows.map(show=>{
        return <Link
          key={show._id}
          to={`/shows/${show._id}`}
          className='text-decoration-none'
          title={`Go to show details page`}
        >
          <ShowJumbotron  show={show}/>
        </Link>;
      })}
    </Stack> 
  </>;
}
