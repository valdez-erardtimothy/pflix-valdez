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
  LineElement,
  RadialLinearScale
} from 'chart.js';
import {Doughnut, Chart, PolarArea, Bar as BarChart} from 'react-chartjs-2';

/* action import */
import {load} from '../../features/admin/dashboardSlice';
import {startLoad, endLoad} from '../../features/loadingSlice';

/* helper import */
import {generateRGBAStrings} from '../../helpers/colorGenerator';
import { toShorthand } from '../../helpers/numberHelper';

ChartJS.register(ArcElement,
  Tooltip, 
  Legend, 
  LinearScale, 
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale
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
    popularMovieGenre,
    topGrossingTv, 
    topGrossingMovie
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

  const topActorsChartObject = ({topActors}) => {
    return {
      data: {
        labels: topActors.map(actor=>actor.name),
        datasets:[
          {
            label: "Rating",
            type:"bar",
            yAxisID: "avgRating",
            data: topActors.map(actor=>actor.ratings),
            ...generateRGBAStrings(1),
          },
          {
            label: "Votes",
            type:"bar",
            yAxisID: "reviews",
            data: topActors.map(actor=>actor.reviewCount),
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
          reviews: {
            type: 'linear',
            position: "right"
          }
        }
      }

    };
  };

  const topMovieGenresObject = ({genres}) => {
    return {
      data:{
        labels:genres.map(genre=>genre._id),
        datasets: [{
          label: "Top Movie Genres",
          data: genres.map(genre=>genre.count),
          ...generateRGBAStrings(genres.length)
        }],
      }
    };
  };

  const topTvGenresObject = ({genres}) => {
    return {
      data:{
        labels:genres.map(genre=>genre._id),
        datasets: [{
          label: "Top TV Genres",
          data: genres.map(genre=>genre.count),
          ...generateRGBAStrings(genres.length)
        }],
      }};
  };

  const topGrossingProps = (shows, label) => {
    console.debug('topgressing shows', shows);
    return {
      data: {
        labels: shows.map(show=>show.title),
        datasets: [{
          label:label,
          data:shows.map(show=>show.grossIncome),
          ...generateRGBAStrings(1)
        }]
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
          <Row >
            <Col xl="6">

              <div className="bg-light mt-4 p-1">
                <h4 className='p-2'>Top rated Movies</h4>
                <Chart {...topMoviesChartObject({topMovies})}/>

              </div>
            </Col>
            <Col xl="6">
              <div className="bg-light mt-4 p-1">
                <h4 className='p-2'>Top rated TV Shows</h4>
                <Chart {...topTVShowsChartObject({topTv})}/>

              </div>

            </Col>
          </Row>
          <div className="bg-light mt-4 p-1">
            <h4 className="text-center">Top Rated Actors</h4>
            <Row sm="8" lg="10">
              <Col  lg="10">
                <Chart {...topActorsChartObject({topActors})}/>
              </Col>
              <Col lg="2">
                <Table size="sm" borderless striped>
                  <thead>
                    <tr>
                      <th>Actor</th>
                      <th>Rating &nbsp;
                        <span className="text-muted">
                        (reviews)
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topActors.map(actor=>(
                      <tr key={actor._id}>
                        <td>
                          <Link to={`/admin/actors/${actor._id}`}>
                            {actor.name}

                          </Link>
                        </td>
                        <td>{actor.ratings.toFixed(2)}&nbsp;
                          <small className="text-muted">
                            ({actor.reviewCount})
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          <Row>
            <Col sm="6" lg="5">
              <h4>Top Movie Genres</h4>
              <PolarArea {...topMovieGenresObject({genres: popularMovieGenre})}/>
            </Col>
            <Col sm="6" lg="5">
              <h4>Top TV Genres</h4>
              <PolarArea {...topTvGenresObject({genres:popularTvGenre})}/>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="6">
              <Row>
                <Col 
                  className="mt-2"
                  md="6"
                >
                  <h4>Top Grossing Movies</h4>
                  <Table size="sm" borderless striped>
                    <thead>
                      <tr>
                        <th>Movie</th>
                        <th>Gross Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topGrossingMovie.map(movie=>(
                        <tr key={movie._id}>
                          <td>
                            <Link to={`/admin/shows/${movie._id}`}
                              className='no-text-decoration'
                            >{movie.title}
                            </Link>
                          </td>
                          <td>${toShorthand(movie.grossIncome)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col 
                  className="mt-2"
                  lg="6"
                >
                  
                  <h4>Top Grossing TV Shows</h4>
                  <Table size="sm" borderless striped>
                    <thead>
                      <tr>
                        <th>TV Show</th>
                        <th>Gross Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topGrossingTv.map(tv=>(
                        <tr key={tv._id}>
                          
                          <td>
                            <Link to={`/admin/shows/${tv._id}`}
                              className='no-text-decoration'
                            >{tv.title}
                            </Link>
                          </td>
                          <td>${toShorthand(tv.grossIncome)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
            <Col lg="6">
              <div>
                <BarChart {...topGrossingProps(topGrossingMovie, "Top Grossing Movies")}/>
              </div>
              <div>
                <BarChart {...topGrossingProps(topGrossingTv, "Top Grossing TV SHows")}/>
              </div>
            </Col>

          </Row>
        </>
        
      )}
     
    </Container>
  </>;
}
