/* package imports */
import React, {useState, useEffect} from 'react';
import { useLocation, useSearchParams,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button, ButtonGroup,FloatingLabel, Form, Placeholder } from 'react-bootstrap';

/* actions */
import { search } from '../features/searchSlice';

/* component imports */
import SearchShow from '../components/SearchBox';
import '../css/search-page.css';
import ShowList from '../components/user_side/ShowList';
import ActorList from '../components/user_side/ActorList';


export default function SearchPage(){
  /* hooks */
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch(); 
  const alert = useAlert();
  
  /* hook-fetched vars */
  const currentKeyword = searchParams.get('keyword');
  const currentEntity = searchParams.get('entity');
  const ratingFloor = searchParams.get('rating') ?? "none";

  /* redux states */
  const {
    searched, 
    searchStatus
  } = useSelector(state=>state.search);

  /* local state */
  let [searchLoaded, setSearchLoaded] = useState(true);

  /* effects */
  // search "event" handler
  useEffect(()=>{
    dispatch(search(location.search));
  }, [currentKeyword, currentEntity, ratingFloor]);

  // search status checker
  useEffect(()=> {
    // ensure boolean
    setSearchLoaded( searchStatus !== "loading" ); 
    if(searchStatus === "failed") {
      alert.error("failed in Searching");
    }
  }, [searchStatus]);

  /* event handlers */
  const ratingChangeHandler = (e) => {
    // setRatingInput(e.target.value);
    console.debug([...searchParams.entries()]);
    let entries = [...searchParams.entries()].filter(entry=>entry[0]!=='rating');
    setSearchParams([
      ...entries,
      ['rating', e.target.value]
    ]);
  };

  /* render */
  return <>
    <div className="mb-5">
      <SearchShow/>
    </div>
    <div id="search-content">
      <aside>
        <h4>Filters</h4>
        <Form.Group className="mb-4">
          <Form.Label>
            Exclude ratings below
          </Form.Label>
          <Form.Select
            value={ratingFloor  }
            onChange={ratingChangeHandler}
          >
            {[...Array(5).keys()].map(index => (
              <option value={index+1} key={index}>
                {index+1} star{index+1>1 &&"s"}
              </option>
            ))}
            <option value="none">None</option>
          </Form.Select>
        </Form.Group>
        {currentEntity === "show" && (
          <Form.Group>
              Filter Date Range
            <FloatingLabel
              label="From"
              controlId="releaseFilterFrom"
              className="mb-2"
            >
              <Form.Control type="date"/>  
            </FloatingLabel>
            <FloatingLabel
              label="To"
              controlId="releaseDateFilterTo"
            >
              <Form.Control type="date"/>  
            </FloatingLabel>
            <ButtonGroup className="mt-2">
              <Button>Apply</Button>
              <Button variant="secondary">Clear</Button>
            </ButtonGroup> 
          </Form.Group>
        )}
      </aside>
      <main>
        <h4>Search: {currentKeyword || "n/a"}</h4>
        {searchLoaded ?(<>
          {currentEntity === "show" && <ShowList shows={searched}/>} 
          {currentEntity === "actor" && <ActorList actors={searched}/>}
        </> 
        ):<Placeholder className="w-100"/>}
      </main>
    </div>
    
  </>;
}