import React, { useState } from 'react';
import { api } from '../utils/api';
import { Button, Typography } from '@mui/material';
import AuthTextField from 'components/AuthTextField';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSignup(e: React.FormEvent) {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    api.post(
      '/api/user/signup',
      { username, email, password },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 201) {
          alert('Signup successful! Redirecting to Home Page...');
          window.location.href = '/';
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert('Error during signup. Please try again.');
        } else {
          alert('Error: ' + error.message);
        }
      });
  }

  return (
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
      <Typography style={{ color: 'black', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Signup</Typography>

      <AuthTextField
        label="Username"
        type="text"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />

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

      <AuthTextField 
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleSignup}
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
        Signup
      </Button>

      <Typography style={{ color: 'black', fontSize: '20px', marginTop: '20px' }}>
        Already have an account? 
        <Button 
          onClick={() => {window.location.href="/login"}}
          style={{ color: '#305CDE', fontSize: '20px', textTransform: 'none' }}
        >
          Login Here
        </Button>
      </Typography>
    </div>
  );
}

export default Signup;