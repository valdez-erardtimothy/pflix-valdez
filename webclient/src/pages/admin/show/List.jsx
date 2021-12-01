import React from 'react';
import {Link} from 'react-router-dom';
export default function List() {
  let movies = {};
  let shows = {};
  return(
    <>
      <main className="container-fluid">
        <h1>Shows
          <Link 
            to="/admin/shows/create" 
            className="material-icons text-decoration-none">
            add
          </Link>
        </h1>
        {movies.length>0? (
          <p>List of Movies</p>
        ) : (
          <div >
            <p>No movies added yet</p>
          </div>
        ) 
        }
        {shows.length>0? (
          <p>List of Shows</p>
        ) : (
          <div >
            <p>No Shows added yet</p>
          </div>
        ) 
        }
      </main>
    </>
  );
}