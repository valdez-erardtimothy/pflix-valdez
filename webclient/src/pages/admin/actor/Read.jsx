import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { fetchActor } from '../../../features/admin/actorSlice';
import { endLoad, startLoad } from '../../../features/loadingSlice';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Read() {
  let {id} = useParams(); 

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const alert = useAlert();
  const {
    loadedActor,
    fetchStatus
  } = useSelector(state=>state.admin.actor);
  // load actor on page visit
  useEffect(() => {
    dispatch(fetchActor(id));
  }, []);

  useEffect(() => {
    switch( fetchStatus ) {
    case "loading":
      dispatch(startLoad());
      break;
    case "success":
      dispatch(endLoad());
      break;
    case "failed":
      dispatch(endLoad);
      alert.error("Error in fetching actor data from API.");
      navigate('/admin/actors');
      alert;
    }
  }, [fetchStatus]);

  return (
    <>
      <Helmet>
        <title>{loadedActor.name}</title>
      </Helmet>
      <Container as="main" fluid>
        <h1>{loadedActor.name}
          <Link 
            to="edit" 
            className="text-sm material-icons">
            edit
          </Link>
        </h1>
        <h6>Back to <Link to="/admin/actors">Actors</Link></h6>
        <h4>Notes</h4>
        <p>{loadedActor.notes}</p>
        <hr />
        {loadedActor.images?.length > 0&& (
          <>
            <h4>Gallery</h4>
            <Row>
              {loadedActor.images.map(img=> (
                <Col xs="12" sm="4" lg="3" className="p-2" key="img">
                  <Image  src={img} fluid max-height="600px"/>
                </Col>
              ))}
            </Row>
          </>
        )}
        
      </Container>
    </>
  );


}