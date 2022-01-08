import React, { useEffect }  from 'react';
import { Helmet } from 'react-helmet-async';
import {Button, Container, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useAlert} from 'react-alert';

import { 
  fetchActors, 
  resetStatus,
  removeFromList
} from '../../../features/admin/actorsSlice';
import { 
  deleteActor, 
  clearDeleted, 
  clearDeleteStatus
} from '../../../features/admin/actorSlice';
import { startLoad,endLoad } from '../../../features/loadingSlice';

export default function List() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    actors, status
  } = useSelector(state=>state.admin.actors);
  const {
    deletedActor,
    deleteStatus
  } = useSelector(state=>state.admin.actor);
  // load actors on page visit
  useEffect(() => {
    dispatch(fetchActors());
    return () => {
      dispatch(resetStatus());
    };
  }, []);

  useEffect(async()=> {
    
    switch (status) {
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
      dispatch(endLoad()); 
      break;
    case 'failed':
      dispatch(endLoad()); 
      alert.error('Error in loading actor.'); 
      break;
    default:
      break;
    }
  }, [status]);

  useEffect(async()=> {
    
    switch (deleteStatus) {
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
      dispatch(endLoad());  
      alert.success('Deleted actor');
      dispatch(removeFromList(deletedActor));
      dispatch(clearDeleteStatus());
      dispatch(clearDeleted());
      break;
    case 'failed':
      alert.error('Delete actor failed');
      dispatch(clearDeleteStatus());
      dispatch(endLoad());  
      break;
    default:
      break;
    }
  }, [deleteStatus]);

  return<>
    <Helmet>
      <title>Actors</title>
    </Helmet>
    <Container fluid >
      <main>
        <h1>Actors</h1>
        <Link
          to="create"
          className="material-icons text-decoration-none"
        >
          add
        </Link>
        {actors.length>0?(
          <>
            <p>List of Actors</p>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {actors.map(actor=>(
                  <tr key={actor._id}>
                    <td>
                      <Link to={`/admin/actors/${actor._id}`}>
                        {actor.name}
                      </Link>
                    </td>
                    <td>
                      {actor.notes}
                    </td>
                    <td>
                      
                      <Button 
                        as={Link}
                        to={`${actor._id}/edit`} 
                        className="text-sm material-icons">
            edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={()=>{dispatch(deleteActor(actor._id));}}
                        size="sm"
                        className="material-icons"
                      >
            delete
                      </Button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </Table>
          </>
        ):(<>
        </>)
        }
      </main>
    </Container>
  </>
  ;
}