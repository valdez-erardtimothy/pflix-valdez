import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Navbar from '../components/UserNavbar';
import Footer from '../components/Footer';
export default function Main() {
  return (<>
    <Container fluid>
      <Navbar/>
      <Outlet></Outlet>
      <Footer/>
    </Container>
  </>);
}