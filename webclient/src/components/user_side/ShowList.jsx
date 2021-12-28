import React, {useEffect} from 'react';
import {  Image, Stack } from 'react-bootstrap';

export default function ShowList({shows}) {
  useEffect(()=>{console.debug('Show List!', shows);}, []);
  /* render */
  return <>
    <Stack gap={4} >
      {shows?.length>0 && shows.map(show=>{
        // show component
        return <Stack direction="horizontal"
          className='bg-dark text-light p-3 me-4 align-items-start' 
          key={show._id}
        >
          <div
          
            xs={12}
            sm={6}
            lg={3}>
            <Image fluid
              style={{maxHeight:"300px"}}
              src={show?.images[0] ?? "/img/movie_placeholder.png"}/>
          </div>  
          <div
            className="ms-2"
            xs={12}
            sm={6}
            lg={9}>
            <h3>{show.title}&nbsp; 
              <small className="text-muted">
                {show.showType}
              </small>
            </h3>
          </div>         
        </Stack>;

      })}
    </Stack> 
  </>;
}