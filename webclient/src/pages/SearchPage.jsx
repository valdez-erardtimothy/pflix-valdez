/* package imports */
import React, {useState, useEffect} from 'react';
import { useLocation, useSearchParams,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Placeholder } from 'react-bootstrap';

/* actions */
import { search } from '../features/searchSlice';

/* component imports */
import SearchShow from '../components/SearchBox';
import '../css/search-page.css';
import ShowList from '../components/user_side/ShowList';
import ActorList from '../components/user_side/ActorList';


export default function SearchPage(){
  /* hooks */
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch(); 
  const alert = useAlert();
  
  /* hook-fetched vars */
  const currentKeyword = searchParams.get('keyword');
  const currentEntity = searchParams.get('entity');

  /* redux states */
  const {
    searched, 
    searchStatus
  } = useSelector(state=>state.search);

  /* local vars */
  let [searchLoaded, setSearchLoaded] = useState(true);

  /* effects */
  // search "event" handler
  useEffect(()=>{
    dispatch(search(location.search));
  }, [currentKeyword, currentEntity]);

  // search status checker
  useEffect(()=> {
    // ensure boolean
    setSearchLoaded( searchStatus !== "loading" ); 
    if(searchStatus === "failed") {
      alert.error("failed in Searching");
    }
  }, [searchStatus]);
  /* render */
  return <>
    <div className="mb-5">
      <SearchShow/>
    </div>
    <div id="search-content">
      <aside>
        <h4>Filters</h4>
      </aside>
      <main>
        <h4>Search: {currentKeyword || "n/a"}</h4>
        {searchLoaded ?(<>
          {currentEntity === "show" && <ShowList shows={searched}/>} 
          {currentEntity === "actor" && <ActorList actors={searched}/>}
        </> 
        ):<Placeholder/>}
      </main>
    </div>
    
  </>;
}