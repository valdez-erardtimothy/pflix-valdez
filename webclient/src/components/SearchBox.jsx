import React, {useState} from 'react';
import {FloatingLabel, Form,Button} from 'react-bootstrap';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';

export default function SearchBox({
  redirectToSearchPage = false
}) {
  /* hooks */
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /* local states */
  const [searchBox, setSearchBox] = useState(searchParams.get('search') || "");

  /* event handlers */
  const searchHandler = (e) => {
    e.preventDefault();
    const newKeyword =searchBox.trim(); 
    setSearchParams({keyword:newKeyword});
    
    if(redirectToSearchPage) {
      navigate({
        pathname:'/search',
        search: `?${createSearchParams({keyword:newKeyword})}`
      });
    }
  };
  
  return  <Form onSubmit={ searchHandler }>
    <div className="d-flex">

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
      <Button type="submit" className="d-block material-icons" >
      search
      </Button>
    </div>
  </Form>;
}