/* package imports */
import React, {useEffect} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* actions */

import { search } from '../features/searchSlice';
/* component imports */
import SearchShow from '../components/SearchBox';
import '../css/search-page.css';


export default function SearchPage(){
  /* hooks */
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch(); 
  
  /* hook-fetched vars */
  const currentKeyword = searchParams.get('keyword');

  /* effects */
  useEffect(()=>{
    dispatch(search(location.search));
  }, [currentKeyword]);
  
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
        <div></div>
      </main>
    </div>
    
  </>;
}