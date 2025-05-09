import React, { useState } from 'react';
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { api } from '../utils/api';
import AuthTextField from 'components/AuthTextField';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const redirectPath = new URLSearchParams(window.location.search).get('redirect');

  function handleSignup(e: React.FormEvent) {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    api.post(
      '/api/user/signup',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.status === 201) {
          if (redirectPath) {
            window.location.href = redirectPath;
            return;
          }
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

  function handleProfilePictureChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
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

      {/* Profile Picture Upload */}
      <div
        style={{
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            borderRadius: '50%',
          }}
          ref={fileInputRef}
          onChange={handleProfilePictureChange}
        />
        <Avatar
          src={preview || undefined}
          alt="Profile Picture"
          sx={{
            width: 100,
            height: 100,
            backgroundColor: '#ccc',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': { 
              backgroundColor: '#ddd',
              boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.2)'
            },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          {!preview && 'Upload'}
        </Avatar>

        {preview && (
          <IconButton style={{ position: 'absolute', left: 100, top: 60}}>
            <DeleteIcon
              style={{ fontSize: '32px', color: 'red', justifyItems: 'end' }}
              onClick={() => {
                setProfilePicture(null);
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            />
          </IconButton>
        )}
      </div>

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
