import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Navbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import LoadingComponent from '../components/Loading.jsx';
import { useSelector } from "react-redux";

export default function Main() {
  const {status:loading} = useSelector(state=>state.loading);
  return (<>
    <Container fluid>
      <Navbar/>
      <div className="ps-4 pt-5 w-100">
        {loading && <div className="page-overlay">
          <LoadingComponent/>
        </div>}
        <Outlet/>
      </div>
      <Footer/>
    </Container>
  </>);
}