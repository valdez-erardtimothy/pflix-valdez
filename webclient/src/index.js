import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.jsx';
import MainLayout from './layouts/Main.jsx';

import reportWebVitals from './reportWebVitals';

import MovieList from './pages/admin/show/List.jsx';
import CreateMovie from './pages/admin/show/Create.jsx';

const routes = <>
  <Route to="/" element={<MainLayout/>}>
    <Route index element={<App/>}/>
    <Route path="admin">
      <Route path="shows">
        <Route index element={<MovieList/>}/>
        <Route path="create" element={<CreateMovie/>}/>
      </Route>

    </Route>
  </Route>
</>;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {routes}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
