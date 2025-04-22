import React, { useState } from 'react';
import { api } from '../utils/api';

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
        } else {
          alert('Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;