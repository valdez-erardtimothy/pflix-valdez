import React, {useEffect} from 'react';
import { Container, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { 
  clearLoaded, 
  clearLoadStatus 
} from '../../../features/admin/producerSlice';
import { load } from '../../../features/admin/producersSlice';
import { endLoad, startLoad } from '../../../features/loadingSlice';
import { useAlert } from 'react-alert';

export default function List() {
  /* hooks */
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); 
  /* redux states */
  const {producers, loadStatus} = useSelector(state=>state.admin.producers);
  
  /* effects */

  // load producers on page visit
  useEffect(()=> {
    dispatch(load());
    return () => {
      dispatch(clearLoadStatus);
      dispatch(clearLoaded);
    };  
  }, []);

  /* status effects */
  useEffect(() => {
    switch(loadStatus) {
    case "loading":
      dispatch(startLoad());
      break;
    case "success": 
      dispatch(endLoad());
      break;
    case "failed":
      dispatch(endLoad());
      alert.error('Failed loading producers');
      navigate('/admin');
      break;
    }
  }, [loadStatus]);

  /* component render  */
  return <>
    <Helmet>
      <title>Producers</title>
    </Helmet>
    <Container fluid>
      <h1>Producers</h1>
      <Link 
        to="/admin/producers/create"
        className="material-icons text-decoration-none">add
      </Link>
      {producers.length>0 ? (
        <>
          <p>List of Producers</p>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Email</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {producers.map(producer=>(
                <tr key={producer._id}>
                  <td>
                    <Link to={`/admin/producers/${producer._id}`}>
                      {producer.name}
                    </Link>
                  </td>
                  <td>{producer.email || "N/A"}</td>
                  <td>{producer.website || "N/A"}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ):<p>No Producers</p>}
    </Container>
  </>;
}