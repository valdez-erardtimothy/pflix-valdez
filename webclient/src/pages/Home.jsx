import React from 'react';
import {Button} from 'react-bootstrap';
import {useAlert} from 'react-alert';
function App() {
  let alert = useAlert();

  return (
    <div className="App container-fluid">
      <header className="App-header">
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <Button 
          variant="dark" 
          className="shadow"
          onClick={()=>{alert.show('alert boi');}}
        >I&apos;m a bootstrap button
        </Button>
      </header>
    </div>
  );
}

export default App;
