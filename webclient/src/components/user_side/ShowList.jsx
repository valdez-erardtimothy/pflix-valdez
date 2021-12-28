import React, {useEffect} from 'react';
import { Col, Image, Row, Stack } from 'react-bootstrap';

export default function ShowList({shows}) {
  useEffect(()=>{console.debug('Show List!', shows);}, []);
  /* render */
  return <>
    <Stack gap={4}>
      {shows?.length>0 && shows.map(show=>{
        // show component
        return <Row 
          className='bg-dark text-light py-3 me-4' 
          key={show._id}
        >
          <Col
          
            xs={12}
            sm={6}
            lg={3}>
            <Image fluid
              style={{maxHeight:"300px"}}
              src={show?.images[0] ?? "/img/movie_placeholder.png"}/>
          </Col>  
          <Col
          
            xs={12}
            sm={6}
            lg={9}>
            <h3>{show.title}&nbsp; 
              <small className="text-muted">
                {show.showType}
              </small>
            </h3>
          </Col>         
        </Row>;

      })}
    </Stack> 
  </>;
}