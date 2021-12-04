import React from "react";
import {Container} from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import AdminNav from '../components/Admin/SideNav';
import LoadingComponent from '../components/Loading.jsx';
import { useSelector } from "react-redux";
import '../css/overlay.css';
export default function Admin() {
  const {status:loading} = useSelector(state=>state.loading);
  return <>
    <Container fluid className="ps-0 d-flex flex-col min-vh-100">
      <AdminNav></AdminNav>
      <div className="ps-4 pt-5 w-100">
        {loading && <div className="page-overlay">
          <LoadingComponent/>
        </div>}
        <Outlet/>
      </div>
    </Container>
  </>;
}