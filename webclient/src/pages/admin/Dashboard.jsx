import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

/* action import */
import {load} from '../../features/admin/dashboardSlice';
import {startLoad, endLoad} from '../../features/loadingSlice';

/* helper import */
import {generateRGBAStrings} from '../../helpers/colorGenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

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

  /* helper methods  */

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
      <Row className="text-center" >
        <Col sm="6" className="bg-light">
          <h4>Shows</h4>
          <Doughnut 
            data={showCountPieData({tvCount,movieCount})}
          />
          <p className="mt-2">Total: {showCount}</p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          
        </Col>
      </Row>
    </Container>
  </>;
}
