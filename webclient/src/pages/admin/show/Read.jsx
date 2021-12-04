import React, { useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Container} from 'react-bootstrap';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {Button, Image,Table, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLoad, endLoad } from '../../../features/loadingSlice';
import { fetchShowAdmin, deleteShow } from '../../../features/admin/showSlice';
import { clearLoadedShowAdmin, clearDeleteShowStatus } from '../../../features/admin/showSlice';

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
          <h4>Plot</h4>
          <p>{show.plot}</p>

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