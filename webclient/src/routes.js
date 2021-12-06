import React from 'react';
import MainLayout from './layouts/Main';
import {Route} from 'react-router-dom';

import Home from './pages/Home.jsx';
import LoginPage from './pages/auth/Login.jsx';

// page imports
import ShowList from './pages/admin/show/List.jsx';
import CreateShow from './pages/admin/show/Create.jsx';
import ReadShow from './pages/admin/show/Read.jsx';
import EditShow from './pages/admin/show/Edit.jsx';

import Dashboard from './pages/admin/Dashboard.jsx';
// layout imports
import AdminLayout from './layouts/Admin.jsx';

import AdminRoute from './components/AdminRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import LoginSuccess from './pages/auth/LoginSuccess';

// private route solution from https://stackoverflow.com/users/13307304/dallin-romney 
// https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
const routes = () => {
  return <>
    <Route to="/" element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route element={<AuthenticatedRoute/>}>
        <Route path="loginsuccess" element={<LoginSuccess/>}/>
      </Route>
    </Route>
    <Route path="/admin" element={<AdminRoute/>}>
      <Route element={<AdminLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="shows">
          <Route index element={<ShowList/>}/>
          <Route path="create" element={<CreateShow/>}/>
          <Route path=":id">
            <Route index element={<ReadShow/>}/>
            <Route path="edit" element={<EditShow/>}/>
          </Route>
        </Route>
      </Route>
    </Route>
  </>;
};

export default routes;