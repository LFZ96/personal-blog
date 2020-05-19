import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './../utils/AuthContext';
import { login } from './../utils/requestsHelper';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authApi = useContext(AuthContext);

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();

    const loginResult = await login({ email, password });

    if (loginResult.data.success) {
      authApi.setAuth(true);
      authApi.setUser(loginResult.data.user);
    }
  };

  return (
    <div className="card w-50 mx-auto">
      <div className="card-body">
        <h1 className="card-title text-center">Login</h1>
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
              className="form-control"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={password}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary mr-4">Login</button>
          <span><Link to="/users/register" className="text-primary">Don't have an account? Register here</Link>.</span>
        </form>
      </div>
    </div>
  );
}