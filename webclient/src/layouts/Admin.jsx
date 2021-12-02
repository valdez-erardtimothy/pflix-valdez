import React from "react";
import {Container} from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import AdminNav from '../components/Admin/SideNav';
export default function Admin() {
  return <>
    <Container fluid className="ps-0 d-flex flex-col min-vh-100">
      <AdminNav></AdminNav>
      <div className="ps-4 pt-5 w-100">
        <Outlet/>
      </div>
    </Container>
  </>;
}