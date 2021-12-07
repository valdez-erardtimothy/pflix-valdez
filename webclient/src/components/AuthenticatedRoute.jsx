import React from 'react';
import {useAlert} from 'react-alert';
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
function RedirectUnauthenticated() {
  let alert = useAlert();
  alert.error("Not Logged in.");
  return <Navigate to="/login"/>;
}

export default function AuthenticatedRoute({children}) {
  let {
    authenticated
  } = useSelector(state=>state.auth);
  console.debug("authenticated?", authenticated);
  console.debug("children:", children);

  return authenticated?children || <Outlet/>:<RedirectUnauthenticated/>;
}