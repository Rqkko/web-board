import React, { useState } from 'react';
import { api } from '../utils/api';
import { Button, Typography } from '@mui/material';
import AuthTextField from 'components/AuthTextField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e: React.FormEvent) {
    api.post(
      '/api/user/login',
      { email, password },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert('Invalid credentials. Please try again.');
        } else {
          alert('Error: '+ error.message);
        }
      });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Typography style={{ color: 'black', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Login</Typography>

        <AuthTextField
          label="Email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <AuthTextField 
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleLogin}
          style={{
            marginTop: '20px',
            padding: '10px 100px',
            fontSize: '24px',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#F08A5D',
            color: '#fff',
            textTransform: 'none',
          }}
        >
          Login
        </Button>

        <Typography style={{ color: 'black', fontSize: '20px', marginTop: '20px' }}>
          Don't have an account? 
          <Button 
            onClick={() => {window.location.href="/signup"}}
            style={{ color: '#305CDE', fontSize: '20px', textTransform: 'none' }}
          >
            Signup Here
          </Button>
        </Typography>
      </div>
    </>
  );
}

export default Login;