// external package imports
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* in-app imports */

// page imports
import ShowList from './pages/admin/show/List.jsx';
import CreateShow from './pages/admin/show/Create.jsx';
import ReadShow from './pages/admin/show/Read.jsx';
import EditShow from './pages/admin/show/Edit.jsx';
import LoginPage from './pages/Login.jsx';
import Home from './pages/Home.jsx';
// layout imports
import MainLayout from './layouts/Main.jsx';
import AdminLayout from './layouts/Admin.jsx';

// initializer actions
import {loadUser} from './features/authSlice';


const routes = <>
  <Route to="/" element={<MainLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="login" element={<LoginPage/>}/>
  </Route>
  <Route path="admin" element={<AdminLayout/>}>
    <Route path="shows">
      <Route index element={<ShowList/>}/>
      <Route path="create" element={<CreateShow/>}/>
      <Route path=":id">
        <Route index element={<ReadShow/>}/>
        <Route path="edit" element={<EditShow/>}/>
      </Route>
    </Route>

  </Route>
</>;


export default function App() {
  const dispatch = useDispatch();
  // call state initializing dispatches here
  dispatch(loadUser());

  return (
    <Routes>
      {routes}
    </Routes>
  );
}