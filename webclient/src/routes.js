import React from 'react';
import MainLayout from './layouts/Main';
import {Route} from 'react-router-dom';

import Home from './pages/Home.jsx';
import LoginPage from './pages/auth/Login.jsx';
import RegisterPage from './pages/auth/Register.jsx';

// admin page imports
import ShowList from './pages/admin/show/List.jsx';
import CreateShow from './pages/admin/show/Create.jsx';
import ReadShow from './pages/admin/show/Read.jsx';
import EditShow from './pages/admin/show/Edit.jsx';

import ActorList from './pages/admin/actor/List.jsx';
import CreateActor from './pages/admin/actor/Create.jsx';
import ReadActor from './pages/admin/actor/Read';
import EditActor from './pages/admin/actor/Edit';

import ProducerList from './pages/admin/producer/List.jsx';
import CreateProducer from './pages/admin/producer/Create.jsx';
import ReadProducer from './pages/admin/producer/Read.jsx';
import EditProducer from './pages/admin/producer/Edit';

import Dashboard from './pages/admin/Dashboard.jsx';
// layout imports
import AdminLayout from './layouts/Admin.jsx';

import AdminRoute from './components/AdminRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import LoginSuccess from './pages/auth/LoginSuccess';
import RegisterSuccess from './pages/auth/RegisterSuccess';

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
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="register/success" element={<RegisterSuccess/>}/>
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
        <Route path="actors">
          <Route index element={<ActorList/>}/>
          <Route path="create" element={<CreateActor/>}/>
          <Route path=":id">
            <Route index element={<ReadActor/>}/>
            <Route path="edit" element={<EditActor/>}/>
          </Route>
        </Route>
        <Route path="producers">
          <Route index element={<ProducerList/>}/>
          <Route path="create" element={<CreateProducer/>}/>
          <Route path=":id">
            <Route index element={<ReadProducer/>}/>
            <Route path="edit" element={<EditProducer/>}/>
          </Route>
        </Route>
      </Route>
    </Route>
  </>;
};

export default routes;