import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import '../styles/Home.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/status')
      .then((response) => {
        console.log("FOund: ", response);
        return response.json()
      })
      .then(data => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* From Backend */}
        <div>
          <h1>Backend Response</h1>
          <p>{data}</p>
        </div>

      </header>

    </div>
  );
}

export default App;
