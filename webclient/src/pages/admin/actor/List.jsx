import React, { useEffect }  from 'react';
import { Helmet } from 'react-helmet-async';
import {Container, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchActors, resetStatus } from '../../../features/admin/actorsSlice';
import { startLoad,endLoad } from '../../../features/loadingSlice';
export default function List() {
  const {
    actors, status
  } = useSelector(state=>state.admin.actors);
  const dispatch = useDispatch();
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
    case 'failed':
      dispatch(endLoad());  
      break;
    default:
      break;
    }
  }, [status]);

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