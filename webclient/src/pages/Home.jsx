import React from 'react';
import { Container } from 'react-bootstrap';
/* component imports */
import SearchBox from '../components/SearchBox';

/* component */
function Home() {
  return (
    <Container fluid className="p-0"> 
      <header className="App-header">
        <h1>Welcome to Pflix</h1>
      </header>
      <SearchBox redirectToSearchPage/>
    </Container>
  );
}

export default Home;
