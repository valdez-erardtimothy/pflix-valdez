import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from 'react-bootstrap';
export default function Main() {
  return (<>
    <Container fluid>
      <Outlet></Outlet>
    </Container>
  </>);
}