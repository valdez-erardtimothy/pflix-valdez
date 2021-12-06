// external package imports
import React, {useEffect} from 'react';
import { Routes} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from './components/Loading.jsx';
/* in-app imports */

// initializer actions
import {loadUser} from './features/authSlice';
import routes from './routes';


export default function App() {
  const dispatch = useDispatch();
  const {loadStatus} = useSelector(state=>state.auth);
  let loaded = loadStatus === "success" || loadStatus === "failed";
  // call on-app-load work here
  useEffect(()=>{
    dispatch(loadUser());
  },[]);
  return (
    
    (loaded) ?<Routes>{routes()}</Routes>:<LoadingComponent/>
    
  );
}