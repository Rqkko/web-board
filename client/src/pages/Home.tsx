import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { Button } from '@mui/material';

function Home() {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/user/getUsername', {
      withCredentials: true,
    })
      .then(response => response.data)
      .then(data => setUsername(data.message))
      .catch((error) => {
        console.log("Error fetching data: " + error);
      });
    api.get('/api/user/getUserId', {
      withCredentials: true,
    })
      .then(response => response.data)
      .then(data => {
        setUserId(data.message);
      })
      .catch((error) => {
        console.log("Error fetching data: " + error);
      });
  }, [navigate]);

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

        {username ? (
          <div>
            {/* From Backend */}
            <h1>Your Username (Response from Backend)</h1>
            <p>{username}</p>
          </div>
        ) : (
            <Button 
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              backgroundColor: '#1976d2',
              color: '#fff',
              textTransform: 'none',
            }} 
            onClick={() => navigate('/login')}
            >
            Login
            </Button>
        )}
        {userId && (
          <div>
            {/* From Backend */}
            <h1>Your User ID (Response from Backend)</h1>
            <p>{userId}</p>
          </div>
        )}

      </header>

    </div>
  );
}

export default Home;
