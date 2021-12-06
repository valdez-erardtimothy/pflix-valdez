import React from 'react';
import MainLayout from './layouts/Main';
import {Route} from 'react-router-dom';

import Home from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';

// page imports
import ShowList from './pages/admin/show/List.jsx';
import CreateShow from './pages/admin/show/Create.jsx';
import ReadShow from './pages/admin/show/Read.jsx';
import EditShow from './pages/admin/show/Edit.jsx';
// layout imports
import AdminLayout from './layouts/Admin.jsx';

import AdminRoute from './components/AdminRoute';

// private route solution from https://stackoverflow.com/users/13307304/dallin-romney 
// https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
const routes = () => {
  // return <>
  //   <Route to="/" element={<MainLayout/>}>
  //     <Route index element={<Home/>}/>
  //     <Route path="login" element={<LoginPage/>}/>
  //   </Route>
  //   <AdminRoute 
  //     isAdmin={isAdmin} 
  //     authenticated={authenticated}
  //     path="/admin" 
  //     element={<AdminLayout/>}
  //   >
  //     <Route path="shows">
  //       <Route index element={<ShowList/>}/>
  //       <Route path="create" element={<CreateShow/>}/>
  //       <Route path=":id">
  //         <Route index element={<ReadShow/>}/>
  //         <Route path="edit" element={<EditShow/>}/>
  //       </Route>
  //     </Route>
  //   </AdminRoute>
  // </>;
  
  return <>
    <Route to="/" element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="login" element={<LoginPage/>}/>
    </Route>
    <Route path="/admin" element={<AdminRoute/>}>
      <Route element={<AdminLayout/>}>
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