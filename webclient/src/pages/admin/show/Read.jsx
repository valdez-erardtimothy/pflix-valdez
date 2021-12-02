import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Container} from 'react-bootstrap';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {Button, Image,Table, Row, Col} from 'react-bootstrap';


export default function Read() {
  let {id}= useParams();
  let [show, setShow] = useState(null);
  let navigate = useNavigate(); 

  useEffect(async()=> {
    let { data } = await axios.get(`/api/admin/shows/${id}`)
      .then();
    setShow(data.show);
  },[]);
  console.debug('show:', show);
  return (
    show?(
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
                onClick={()=>{
                  axios.delete(`/api/admin/shows/${id}`)
                    .then(response=> {
                      if(response.status === 200) { 
                        navigate("/admin/shows");
                      }
                    });
                }}
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
  );
}