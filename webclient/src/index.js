import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import reduxStore from './store.js';
import Home from './pages/Home.jsx';
import MainLayout from './layouts/Main.jsx';
import AdminLayout from './layouts/Admin.jsx';
import reportWebVitals from './reportWebVitals';
import {Provider as AlertProvider} from 'react-alert';
import AlertConfig from './config/react-alert';
import ShowList from './pages/admin/show/List.jsx';
import CreateShow from './pages/admin/show/Create.jsx';
import ReadShow from './pages/admin/show/Read.jsx';
import EditShow from './pages/admin/show/Edit.jsx';
const routes = <>
  <Route to="/" element={<MainLayout/>}>
    <Route index element={<Home/>}/>
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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <AlertProvider {...AlertConfig}>
        <BrowserRouter>
          <HelmetProvider>
            <Routes>
              {routes}
            </Routes>
          </HelmetProvider>
        </BrowserRouter>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
