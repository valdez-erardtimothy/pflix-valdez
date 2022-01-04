/* package imports */
import React, {useState, useEffect} from 'react';
import { useLocation, useSearchParams,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button, ButtonGroup,FloatingLabel, Form, Placeholder } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

/* actions */
import { clearSearchStatus, displayMore, search } from '../features/searchSlice';

/* component imports */
import SearchShow from '../components/SearchBox';
import '../css/search-page.css';
import ShowList from '../components/user_side/ShowList';
import ActorList from '../components/user_side/ActorList';
import { Helmet } from 'react-helmet-async';


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
  const filterFrom = searchParams.get('dateStart') ?? "";
  const filterTo = searchParams.get('dateEnd') ?? "";

  /* redux states */
  const {
    searched,
    searchStatus,
    displayed,
    
  } = useSelector(state=>state.search);

  /* local state */
  let [searchLoaded, setSearchLoaded] = useState(true);
  const [dateStartInput, setDateStartInput ]= useState(filterFrom);
  const [dateEndInput, setDateEndInput]= useState(filterTo);

  /* effects */
  // search "event" handler
  useEffect(()=>{
    dispatch(search(location.search));
  }, [currentKeyword, currentEntity, ratingFloor, filterFrom, filterTo]);

  // search status checker
  useEffect(()=> {
    // ensure boolean
    setSearchLoaded( searchStatus !== "loading" ); 
    if(searchStatus === "failed") {
      alert.error("failed in Searching");
      dispatch(clearSearchStatus());
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

  const applyDateFilter = () => {
    if(!(dateStartInput) || !dateEndInput) {
      alert.error('Both Start and end range must be set');
      return;
    }
    let entries = [...searchParams.entries()]
      .filter(param=>!['dateStart','dateEnd'].includes(param[0]));
    setSearchParams([
      ...entries,
      ['dateStart', dateStartInput],
      ['dateEnd', dateEndInput],
    ]);
    
  };
  const resetDateFilter = () => {
    let entries = [...searchParams.entries()]
      .filter(param=>!['dateStart','dateEnd'].includes(param[0]));
    
    setSearchParams([...entries]);
    setDateStartInput('');
    setDateEndInput('');
  };

  /* render */
  return <>
    <Helmet>
      <title>Search: {currentKeyword ?? "N/A"} | Pflix</title>
    </Helmet>
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
            value={ratingFloor}
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
              <Form.Control type="date"
                value={dateStartInput}
                onChange={(e)=>setDateStartInput(e.target.value )}
              />  
            </FloatingLabel>
            <FloatingLabel
              label="To"
              controlId="releaseDateFilterEnd"
            >
              <Form.Control type="date"
                value={dateEndInput}
                onChange={(e)=>setDateEndInput(e.target.value )}
              />  
            </FloatingLabel>
            <ButtonGroup className="mt-2">
              <Button onClick={applyDateFilter}>Apply</Button>
              <Button variant="secondary" onClick={resetDateFilter}>Clear</Button>
            </ButtonGroup> 
          </Form.Group>
        )}
      </aside>
      <main>
        <h4>Search: {currentKeyword || "n/a"}</h4>
        {searchLoaded ?(<>
          <InfiniteScroll
            dataLength={displayed.length}
            next={()=>{dispatch(displayMore());}}
            hasMore={searched.length>displayed.length}
            loader={<h6>Loading</h6>}
            endMessage={
              <p className="bg-light" style={{ textAlign: "center" }}>
                <b>Nothing more to load.</b>
              </p>
            }
          >
            {currentEntity === "show" && <ShowList shows={displayed}/>} 
            {currentEntity === "actor" && <ActorList actors={displayed}/>}
          </InfiniteScroll>
        </> 
        ):<Placeholder className="w-100"/>}
      </main>
    </div>
    
  </>;
}