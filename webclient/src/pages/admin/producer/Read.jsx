import React, {useEffect} from 'react';
import { Container, Button,Row, Col, Image, ListGroup  } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate, Link} from 'react-router-dom';
import {startLoad, endLoad} from '../../../features/loadingSlice';
import {
  clearLoadStatus,
  clearLoaded,
  clearEditStatus,
  load,
  deleteProducer,
} from '../../../features/admin/producerSlice';
import { useAlert } from 'react-alert';
import { clearDeleteStatus } from '../../../features/admin/producerSlice';
export default function Read(){
  /* hooks */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  /* local vars */
  const { id } = useParams(); 
  /* redux states */
  const {
    producer,
    loadStatus,
    deleteStatus
  } = useSelector(state=>state.admin.producer);

  /* effects */
  // load producer on page visit
  useEffect(() => {
    dispatch(load(id));
    return () => {
      dispatch(clearLoadStatus());
      dispatch(clearLoaded());
    };
  }, []);

  /* load effects */
  useEffect(() => {
    switch( loadStatus ) {
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      dispatch(endLoad());
      dispatch(clearEditStatus());
      break;
    case "failed":
      dispatch(endLoad());
      alert.error("Error in loading Producer data from API.");
      navigate('/admin/producers');
      dispatch(clearEditStatus());
    }
  }, [loadStatus]);

  useEffect(()=>{
    switch(deleteStatus) {
    case "success":
      alert.success('Deleted Producer!');
      dispatch(clearDeleteStatus());
      navigate('/admin/producers');
      break;
    case "failed":
      dispatch(clearDeleteStatus());
      alert.error('error in deleting producer');
      break;
    }
  }, [deleteStatus]);
  
  /* render */
  return <>
    <Helmet>
      <title>{producer?.name || "Producer"}</title>
    </Helmet> 
    <Container as="main" fluid>
      {producer && (
        <>
          <h1>{producer?.name || "Producer"}
            <Button 
              as={Link} 
              to={`/admin/producers/${producer?._id}/edit`}
              size="sm"
              className="material-icons"
            >
                    edit
            </Button>
            <Button  
              onClick={()=>dispatch(deleteProducer(producer._id))}
              size="sm"
              variant="danger"
              className="material-icons"
              title="delete"
            >
                    delete
            </Button>
          </h1>
          <h6><Link to="/admin/producers">List</Link></h6>
          <p>Email: {producer?.email || "N/A"}</p>
          <p>Website: {producer?.website || "N/A"}</p>
          <p>Produced Shows</p>
      
          {producer?.producedShows&& (
            <ListGroup>
              {producer.producedShows.map(produced=> (
                <ListGroup.Item key={produced._id}>
                  <Link to={`/admin/shows/${produced.show._id}`}>
                    {produced.show.title}
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) || <p>No produced shows</p>}
          {producer?.images?.length > 0&& (
            <>
              <h4>Gallery</h4>
              <Row>
                {producer?.images.map(img=> (
                  <Col xs="12" sm="4" lg="3" className="p-2" key={img}>
                    <Image  src={img} fluid max-height="600px"/>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      )}
     
    </Container>
  </>;
}