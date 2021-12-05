import React from 'react';
import {Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../features/authSlice';

export default function MainNavbar() {
  let { authenticated,
    authenticatedUser 
  } = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  return <Navbar>
    <Container fluid>
      <Navbar.Brand as={Link} to="/">PFlix</Navbar.Brand>
      <Nav  className="">
        <Nav.Link as={Link} to="/shows">Shows</Nav.Link>

        {authenticated?(
          <NavDropdown title={authenticatedUser.name}>
            <NavDropdown.Item as={Button} onClick={()=>{dispatch(logout());}}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        ):(
          <Nav.Link as={Link} to="/login">
            Log in
          </Nav.Link>
        )}
      </Nav>
    </Container>
    
  </Navbar>;
}