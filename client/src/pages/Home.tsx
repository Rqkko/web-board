import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { api } from '../utils/api';
import '../styles/Home.css';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/api/user/getUsername', {
      withCredentials: true,
    })
      .then(response => response.data)
      .then(data => setData(data.message))
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.href = '/login';
        } else {
          alert("Error fetching data: " + error);
        }
      });
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
          <h1>Your Username (Response from Backend)</h1>
          <p>{data}</p>
        </div>

      </header>

    </div>
  );
}

export default Home;
