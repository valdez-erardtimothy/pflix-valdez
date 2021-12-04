import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Button,Table} from 'react-bootstrap';
import {Helmet} from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowsAdmin, removeFromList } from '../../../features/admin/showsSlice';

import { startLoad,endLoad } from '../../../features/loadingSlice';
import { clearDeleteShowStatus, deleteShow } from '../../../features/admin/showSlice';
export default function List() {
  let {
    showsAdmin:shows,
    showsAdminErrors,
    showsAdminStatus
  } = useSelector(state=>state.admin.shows);
  const {
    deleteShowStatus = "idle",
    deleteResponse,
  } = useSelector(state=>state.admin.show);
  const dispatch = useDispatch();
  // load shows on page visit
  useEffect(async() => {
    dispatch(fetchShowsAdmin());
  }, []);

  useEffect(async()=> {
    
    switch (showsAdminStatus) {
    case 'idle':
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
    case 'failed':
      dispatch(endLoad());  
      break;
    default:
      break;
    }
  }, [showsAdminStatus]);

  let deleteShowCallback = (show) => {
    dispatch(deleteShow(show._id));
  };
  
  // handle delete 
  useEffect(async()=> {
    
    switch (deleteShowStatus) {
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
      dispatch(endLoad()); 
      dispatch(removeFromList(deleteResponse.data.show));
      dispatch(clearDeleteShowStatus());
      break;
    case 'idle':
    case 'failed':
      dispatch(endLoad());  
      break;
    default:
      break;
    }
  }, [deleteShowStatus]);
  return (
    <>
      <Helmet>
        <title>Shows</title>
      </Helmet>
      <main className="container-fluid">
        <h1>Shows
          <Link 
            to="/admin/shows/create" 
            className="material-icons text-decoration-none">
            add
          </Link>
        </h1>
        {shows.length>0? (<>
          <p>List of Shows</p>
          <Table striped bordered >
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Date</th>
                <th>Runtime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shows.map(
                show=>{
                  let hours = Math.floor(show.runtimeMinutes/60);
                  let minutes = Math.floor(show.runtimeMinutes%60);
                  return (
                    <tr key={show._id}>
                      <td>
                        <Link to={`/admin/shows/${show._id}`}>
                          {show.title}
                        </Link>
                      </td>
                      <td>{new Date(show.released).toDateString()}</td>
                      <td>{hours>0?`${hours} hour/s `:""}{minutes} Minutes</td>
                      <td>
                        <Button 
                          as={Link} 
                          to={`/admin/shows/${show._id}/edit`}
                          className="material-icons"
                          size="sm"
                          variant="secondary"
                        >
                        edit
                        </Button>
                        <Button 
                          className="material-icons"
                          size="sm"
                          variant="danger"
                          onClick={()=>deleteShowCallback(show)}>
                            delete
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </>) : (
          <div >
            <p>No shows added yet</p>
          </div>
        )} 
        {showsAdminStatus === "failed" && (
          <>
            <h6>Error!</h6>
            <p>{showsAdminErrors}</p>
          </>
        )}
      </main>
    </>
    
  );


}