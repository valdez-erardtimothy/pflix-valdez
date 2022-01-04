import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
/* component imports */
import SearchBox from '../components/SearchBox';

/* component */
function Home() {
  return (<>
    <Helmet>
      <title>Welcome to Pflix!</title>
    </Helmet>
    <Container fluid className="p-0"> 
      <header className="App-header">
        <h1>Welcome to Pflix</h1>
      </header>
      <SearchBox redirectToSearchPage/>
    </Container>
  </>
  );
}

export default Home;
