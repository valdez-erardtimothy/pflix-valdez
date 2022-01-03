import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement
} from 'chart.js';
import {Doughnut, Chart} from 'react-chartjs-2';

/* action import */
import {load} from '../../features/admin/dashboardSlice';
import {startLoad, endLoad} from '../../features/loadingSlice';

/* helper import */
import {generateRGBAStrings} from '../../helpers/colorGenerator';

ChartJS.register(ArcElement,
  Tooltip, 
  Legend, 
  LinearScale, 
  CategoryScale,
  BarElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  /* hooks  */
  const dispatch = useDispatch();
  
  /* redux states */
  // remember to re-enable
  /* eslint-disable no-unused-vars */
  const {
    loadStatus,
    showCount,
    tvCount,
    movieCount,
    topActors,
    topMovies,
    topTv,
    popularTvGenre,
    popularMovieGenre
  } = useSelector(state=>state.admin.dashboard);

  /* effects */
  useEffect(() => {
    dispatch(load());
    return () => {
    };
  }, []);

  /* chart object property generation methods */

  const showCountPieData = ({tvCount, movieCount}) => {
    return {
      labels: ["TV Shows", "Movies"],
      datasets: [{
        label: "# of Shows",
        data: [tvCount, movieCount],
        borderWidth:2,
        ...generateRGBAStrings(2)
      }]
    };
  };

  const topMoviesChartObject = ({topMovies}) => {
    return {
      data: {
        labels: topMovies.map(movie=>movie.title),
        datasets:[
          {
            label: "Rating",
            type:"bar",
            yAxisID: "avgRating",
            data: topMovies.map(movie=>movie.ratings),
            ...generateRGBAStrings(1),
          },
          {
            label: "Votes",
            type:"bar",
            yAxisID: "votes",
            data: topMovies.map(movie=>movie.reviewCount),
            ...generateRGBAStrings(1),
          },
        ]
      },
      options: {
        scales: {
          avgRating: {
            type:"linear",
            position:"left"
          },
          votes: {
            type: 'linear',
            position: "right"
          }
        }
      }

    };
  };

  const topTVShowsChartObject = ({topTv}) => {
    return {
      data: {
        labels: topTv.map(tvShow=>tvShow.title),
        datasets:[
          {
            label: "Rating",
            type:"bar",
            yAxisID: "avgRating",
            data: topTv.map(tvShow=>tvShow.ratings),
            ...generateRGBAStrings(1),
          },
          {
            label: "Votes",
            type:"bar",
            yAxisID: "votes",
            data: topTv.map(tvShow=>tvShow.reviewCount),
            ...generateRGBAStrings(1),
          },
        ]
      },
      options: {
        scales: {
          avgRating: {
            type:"linear",
            position:"left"
          },
          votes: {
            type: 'linear',
            position: "right"
          }
        }
      }

    };
  };

  useEffect(()=> {
    let isLoaded = loadStatus !== "loading";
    if(isLoaded) { 
      dispatch (endLoad());
    } else dispatch(startLoad());
  }, [loadStatus]);

  return <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Container fluid>
      {loadStatus === "success" && (
        <> 
          <Row className="text-center" >
            <Col sm="5" className="bg-light">
              <h4>Shows</h4>
              <Doughnut 
                data={showCountPieData({tvCount,movieCount})}
              />
              <p className="mt-2">Total: {showCount}</p>
            </Col>
            <Col sm={7}>
              <Row>
                <Col md="6">
                  <h6>Top Rated Movies</h6>
                  <Table size="sm" borderless striped hover className='text-start'>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Rating&nbsp;
                          <span className="text-muted">
                       (reviews)
                          </span>
                        </th>
                      </tr>

                    </thead>
                    <tbody>
                      {topMovies.map(movie=>{
                        return <tr key={movie._id}>
                          <td>
                            <Link to={`/admin/shows/${movie._id}`}>
                              {movie.title}
                            </Link>
                          </td>
                          <td>{movie.ratings.toFixed(2)} &nbsp;
                            <small className="text-muted">
                          ({movie.reviewCount})
                            </small>
                          </td>
                        </tr>;
                      })}
                    </tbody>
                  </Table>

                </Col>
                <Col md="6">
                  <h6>Top Rated TV Shows</h6>
                  <Table size="sm" borderless striped hover className='text-start'>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Rating&nbsp;
                          <span className="text-muted">
                       (reviews)
                          </span>
                        </th>
                      </tr>

                    </thead>
                    <tbody>
                      {topTv.map(tvShow=>{
                        return <tr key={tvShow._id}>
                          <td>
                            <Link to={`/admin/shows/${tvShow._id}`}>
                              {tvShow.title}
                            </Link>
                          </td>
                          <td>{tvShow.ratings.toFixed(2)} &nbsp;
                            <small className="text-muted">
                          ({tvShow.reviewCount})
                            </small>
                          </td>
                        </tr>;
                      })}
                    </tbody>
                  </Table>

                </Col>
              </Row>
              <Row sm="6">
                
              </Row>
            </Col>
          </Row>
          <div className="bg-light mt-4 p-1">
            <h4 className='p-2'>Top rated Movies</h4>
            <Chart {...topMoviesChartObject({topMovies})}/>

          </div>
          <div className="bg-light mt-4 p-1">
            <h4 className='p-2'>Top rated TV Shows</h4>
            <Chart {...topTVShowsChartObject({topTv})}/>

          </div>
        </>

      )}
     
    </Container>
  </>;
}
