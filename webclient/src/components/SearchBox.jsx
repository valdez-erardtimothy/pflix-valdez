import React, {useState} from 'react';
import {Row, Col, Container, FloatingLabel, Form,Button} from 'react-bootstrap';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';

export default function SearchBox({
  redirectToSearchPage = false
}) {
  /* hooks */
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  

  /* local states */
  const [searchBox, setSearchBox] = useState(searchParams.get('search') || "");
  let entityParam = searchParams.get('entity') ?? "show";
  const [entityInput, setEntityInput] = useState(entityParam);
 
 
  console.debug('entityinput:', entityParam ,  entityInput);
  /* event handlers */
  const searchHandler = (e) => {
    e.preventDefault();
    const newKeyword =searchBox.trim(); 
    let newParams = {
      keyword:newKeyword,
      entity:entityInput
    };
    setSearchParams(newParams);
    
    if(redirectToSearchPage) {
      navigate({
        pathname:'/search',
        search: `?${createSearchParams(newParams)}`
      });
    }
  };
  
  return  <Container>
    <Form onSubmit={ searchHandler }>
      <Row>
        <Col xs={9} className="px-0">
          <FloatingLabel
            label="Search"
            className="flex-grow-1"
          >
            <Form.Control
              placeholder = "Search a TV Show or Movie here!"
              value={searchBox}
              onChange={(e)=>setSearchBox(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col xs={2} className="px-0">
          <Form.Select
            name="entity"
            className="h-100"
            value={entityInput || "show" }
            onChange={e=>setEntityInput(e.target.value)}
          >
            <option value="show">Shows</option>
            <option value="actor">Actors</option>
          </Form.Select>
        </Col>
        <Col xs={1} className="px-0">
          <Button type="submit" 
            className="d-block material-icons flex-shrink-1 h-100 w-100" >
    search
          </Button>
        </Col>

      </Row>
    </Form>
  </Container>;
}