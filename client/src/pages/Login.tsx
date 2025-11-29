import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

import { api } from '../utils/api';
import AuthTextField from 'components/AuthTextField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirectPath = new URLSearchParams(window.location.search).get('redirect');

  function handleLogin(e: React.FormEvent) {
    api.post(
      '/api/user/login',
      { email, password },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 200) {
  
          if (redirectPath) {
            window.location.href = redirectPath
            return;
          }
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

  function handleSignupClick() {
    if (redirectPath) {
      window.location.href = '/signup?redirect=' + redirectPath;
      return;
    }
    window.location.href = '/signup';
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '0 20px',
          backgroundColor: '#FFFFFF',
          overflowX: 'hidden',
          boxSizing: 'border-box',
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

        <Typography
          style={{
            color: 'black',
            fontSize: '20px',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',   // center whole row
            alignItems: 'center',
            gap: '4px',                  // space between text and button
            textAlign: 'center',
          }}
        >
          <span>Don&apos;t have an account?</span>

          <Button
            onClick={() => { window.location.href = "/signup"; }}
            style={{
              color: '#305CDE',
              fontSize: '20px',
              textTransform: 'none',
              padding: 0,
              minWidth: 0,               // keeps it link-sized
            }}
          >
            Signup Here
          </Button>
        </Typography>
      </div>
    </>
  );
}

export default Login;
