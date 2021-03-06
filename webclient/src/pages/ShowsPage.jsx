/* package imports */
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Helmet} from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Placeholder } from 'react-bootstrap';

/* redux action imports */
import {
  load,
  clearLoadStatus,
  clearLoaded
} from '../features/showsSlice';

/* component imports */
import ShowList from '../components/user_side/ShowList';

/* 
  this is the "browse all shows" page.
*/
export default function ShowsPage(){
  /* hooks */
  const dispatch = useDispatch();

  /* redux state */
  const {
    showTotalCount,
    loaded, 
  } = useSelector(state=>state.shows);
  /* react effect hooks */
  useEffect(()=> {
    fetchMore();
    return ()=> {
      dispatch(clearLoadStatus());
    };
  }, []);

  /* helper methods */
  const fetchMore = () => {
    dispatch(load());
  };

  /* event handlers */
  const refreshShows = (e) => {
    e.preventDefault();
    dispatch(clearLoaded());
    dispatch(load());
  };

  /* render */
  return <>
    <Helmet>
      <title>Shows</title>
    </Helmet> 
    <h1>Browse all shows
      <a onClick={refreshShows}
        className="material-icons no-underline text-decoration-none"
        href="javascript:;"
      >refresh</a>
    </h1>
    
    <InfiniteScroll
      dataLength={loaded.length}
      next={fetchMore}
      hasMore={loaded.length<showTotalCount}
      loader={<Placeholder 
        animation="wave" 
        style={{height:"200px",width:"100%"}}
      />}
    >
      <ShowList shows={loaded}/>
    </InfiniteScroll>
  </>;
}