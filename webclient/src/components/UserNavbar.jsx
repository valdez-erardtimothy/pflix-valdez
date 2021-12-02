import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function MainNavbar() {
  return <Navbar expand="md" >
    <Navbar.Brand as={Link} to="/">PFlix</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Nav>
      <Navbar.Collapse>
        <Nav.Link as={Link} to="/shows">Shows</Nav.Link>
      </Navbar.Collapse>
    </Nav>
  </Navbar>;
}