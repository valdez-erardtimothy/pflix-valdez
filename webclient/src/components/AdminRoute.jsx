import React from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Page403 from '../pages/Forbidden.jsx';
import AuthenticatedRoute from './AuthenticatedRoute';

function BlockNonAdmin() {
  console.debug('here at blocknonadmin');
  let alert = useAlert();
  alert.error("You're browsing somewhere you're not supposed to.");
  return <Page403/>; 
}

export default function AdminRoute() {
  let {
    isAdmin = false
  } = useSelector(state=>state.auth);
  console.debug("admin?", isAdmin);
  return <AuthenticatedRoute>
    {isAdmin?<Outlet/>:<BlockNonAdmin/>}
  </AuthenticatedRoute>;
}