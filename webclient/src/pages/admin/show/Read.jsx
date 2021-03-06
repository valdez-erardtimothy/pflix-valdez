import React, { useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Container} from 'react-bootstrap';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {Button, Image, Table, Row, Col, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLoad, endLoad } from '../../../features/loadingSlice';
import { fetchShowAdmin, deleteShow } from '../../../features/admin/showSlice';
import { clearLoadedShowAdmin, clearDeleteShowStatus } from '../../../features/admin/showSlice';
import { toShorthand } from '../../../helpers/numberHelper';

export default function Read() {
  let {id}= useParams();
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  const {
    loadedShowAdmin:show,
    showAdminLoadStatus,
    showAdminError,
    deleteShowStatus,
  } = useSelector(state=>state.admin.show);
  // load show on page visit
  useEffect(async()=> {
    dispatch(fetchShowAdmin(id));
  },[]);
  // handle load status changes
  useEffect(async()=> {
    
    switch (showAdminLoadStatus) {
    case 'idle':
      dispatch(endLoad());
      break;
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
  }, [showAdminLoadStatus]);
  
  // handle delete 
  useEffect(()=> {
    switch (deleteShowStatus) {
    case 'loading':
      dispatch(startLoad());
      break;
    case 'success':
      dispatch(endLoad());  
      dispatch(clearLoadedShowAdmin());
      dispatch(clearDeleteShowStatus());
      navigate('/admin/shows');
      break;
    case 'idle':
    case 'failed':
      dispatch(endLoad());  
      break;
    default:
      break;
    }
  }, [deleteShowStatus]);

  const deleteShowHandler = ()=> {
    dispatch(deleteShow(id));
  }; 
  return (
    showAdminLoadStatus==="success" && show?(
      <>
        <Helmet>
          <title>{show.title} | films</title>
        </Helmet>
        <Container fluid>
          <h1>{show.title} 
            <small className="material-icons">
              <Button as={Link}
                to="edit"
                size="sm"
                variant="secondary"
              >
                edit
              </Button>
              <Button 
                size="sm"
                variant="danger"
                onClick={deleteShowHandler}
              >
                delete
              </Button>
            </small>
          </h1> 
          <h6>{show.showType}</h6>
          <h6>{show.genre}</h6>
          <Table size="sm" borderless>
            <tbody>
              <tr>
                <th>Last Updated:</th>
                <td>{new Date(show.updatedAt).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Created:</th>
                <td>{new Date(show.createdAt).toLocaleString()}</td>
              </tr>
            </tbody>
          </Table>
          <p>Runtime: {show.runtimeMinutes} minutes</p>
          <p>Release Date: {new Date(show.released).toDateString()}</p>
          <p>Gross Income: ${toShorthand(show.grossIncome)}</p>
          <h4>Plot</h4>
          <p>{show.plot}</p>
          <h4>Cast</h4>
          {show.cast && <ListGroup>
            {show.cast.map(character=>(
              character?.actor && <ListGroup.Item as={Link}
                key={character._id}
                to={`/admin/actors/${character.actor._id}`}
                action
              >
                <strong>{character.actor.name}</strong> as
                {character.character}
              </ListGroup.Item>
            ))}
          </ListGroup>|| <p>no cast</p>}

          <h4>Producers</h4>
          {show?.producers && <ListGroup>
            {show.producers.map(producer=>(<ListGroup.Item as={Link}
              key={producer._id}
              to={`/admin/producers/${producer.producer._id}`}
              action
            >
              {producer.producer.name}
            </ListGroup.Item>))}
          </ListGroup>
            || <p>No Producers</p>
          }
          <hr/>
          <h4>Gallery</h4>
          {show.images? (
            <Row>
              {show.images.map(img=> (
                <Col sm="4" lg="3" key={img}>
                  <Image src={img} fluid/>
                </Col>
              ))}
            </Row>
          ):""}
          
        </Container>
      </>
    ):(
      <>
        <Helmet>
          <title>Show not found.</title>
        </Helmet>
        <Container fluid>
          <h1>No show.</h1>
        </Container>
      </>
    )
      || showAdminLoadStatus === 'failed' && (
        <>
          <h4>Error!</h4>
          <p>{showAdminError}</p>
        </>
      )
  );
}