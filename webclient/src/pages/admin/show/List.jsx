import axios from 'axios';
import React, {useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button,Table} from 'react-bootstrap';
import {Helmet} from 'react-helmet-async';

export default function List() {
  let [shows, setShows] = useState([]);
  let navigate = useNavigate();
  // 
  useEffect(async() => {
    let response = await axios.get('/api/admin/shows/');
    let {shows} = await response.data;
    setShows(shows);
  }, []);

  let deleteShow = (show) => {
    axios.delete(`/api/admin/shows/${show._id}`).then(response=>{
      if(response.status===200) {
        console.debug('deleting success! deleted data:', show  );
        navigate(0, {replace:true});
      }
    });
  };

  return(
    <>
      <Helmet>
        <title>Shows</title>
      </Helmet>
      <main className="container-fluid">
        <h1>Shows
          <Link 
            to="/admin/shows/create" 
            className="material-icons text-decoration-none">
            add
          </Link>
        </h1>
        {shows.length>0? (<>
          <p>List of Shows</p>
          <Table striped bordered >
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Date</th>
                <th>Runtime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shows.map(
                show=>{
                  let hours = Math.floor(show.runtimeMinutes/60);
                  let minutes = Math.floor(show.runtimeMinutes%60);
                  return (
                    <tr key={show._id}>
                      <td>
                        <Link to={`/admin/shows/${show._id}`}>
                          {show.title}
                        </Link>
                      </td>
                      <td>{new Date(show.released).toDateString()}</td>
                      <td>{hours>0?`${hours} hour/s `:""}{minutes} Minutes</td>
                      <td>
                        <Button 
                          as={Link} 
                          to={`/admin/shows/${show._id}/edit`}
                          className="material-icons"
                          size="sm"
                          variant="secondary"
                        >
                        edit
                        </Button>
                        <Button 
                          className="material-icons"
                          size="sm"
                          variant="danger"
                          onClick={()=>deleteShow(show)}>
                            delete
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </>) : (
          <div >
            <p>No shows added yet</p>
          </div>
        )} 
      </main>
    </>
  );
}