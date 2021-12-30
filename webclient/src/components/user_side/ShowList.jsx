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
        >
          <ShowJumbotron  show={show}/>
        </Link>;
      })}
    </Stack> 
  </>;
}
