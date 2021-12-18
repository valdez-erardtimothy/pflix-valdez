import React, {useEffect} from 'react';
import { Container, Button,Row, Col, Image  } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate, Link} from 'react-router-dom';
import {startLoad, endLoad} from '../../../features/loadingSlice';
import {
  clearLoadStatus,
  clearLoaded,
  clearEditStatus,
  load
} from '../../../features/admin/producerSlice';
import { useAlert } from 'react-alert';
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
  } = useSelector(state=>state.admin.producer);
  /* render */

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
      alert;
    }
  }, [loadStatus]);
  
  return <>
    <Helmet>
      <title>{producer?.name || "Producer"}</title>
    </Helmet> 
    <Container as="main" fluid>
      <h1>{producer?.name || "Producer"}
        <Button 
          as={Link} 
          to={`/admin/producers/${producer?._id}/edit`}
          size="sm"
        >
                    Edit
        </Button></h1>
      <h6><Link to="/admin/producers">List</Link></h6>
      <p>Email: {producer?.email || "N/A"}</p>
      <p>Website: {producer?.website || "N/A"}</p>
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
    </Container>
  </>;
}