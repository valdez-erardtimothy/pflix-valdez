import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import reduxStore from './store.js';
import {Provider as AlertProvider} from 'react-alert';
import AlertConfig from './config/react-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import App from './App.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <AlertProvider {...AlertConfig}>
        <HelmetProvider>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </HelmetProvider>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
