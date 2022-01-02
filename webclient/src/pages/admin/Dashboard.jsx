import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

/* action import */
import {load} from '../../features/admin/dashboardSlice';


export default function Dashboard() {
  /* hooks  */
  const dispatch = useDispatch();

  /* effects */
  useEffect(() => {
    dispatch(load());
    return () => {
     
    };
  }, []);

  return <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
  </>;
}