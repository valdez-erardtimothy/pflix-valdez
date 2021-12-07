import React from "react";
import {
  Nav 
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../../css/admin-sidenav.css';
export default function SideNav() {
  return(
    <Nav className="d-flex flex-column ps-4 pe-5 admin-sidenav justify-content-between">
      <div className="d-flex flex-column">
        <h1 className="pt-5 pb-2">
          <Nav.Item className="text-light">
            <Nav.Link as={Link} to="/admin">
            PFlix
            </Nav.Link>
          </Nav.Item>
        </h1>
        <Nav.Item >
          <Nav.Link 
            as={Link} 
            to="/admin/shows"
            className="hoverable"
          >
          Shows
          </Nav.Link>
        </Nav.Item>
      </div>
      <p><Link to="/">Browse as user</Link></p>
    </Nav>
  );
}