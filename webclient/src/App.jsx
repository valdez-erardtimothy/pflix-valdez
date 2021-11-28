import React from 'react';
import axios from 'axios';

async function testConnectMessage() {
  
  const { data }= await axios.get('/api/test');
  console.debug(data.message);
  return data.message;
};

function App() {
  const message = testConnectMessage();
  console.debug(message);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{typeof(message)}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
