import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    let passInput = document.getElementById('password');
    if (passInput.type === 'password') {
      passInput.type = 'text';
    } else {
      passInput.type = 'password';
    }
  };

  const handleRegistrationAlert = message => {
    // console.log(message);
    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  };

  const handleRegistration = e => {
    e.preventDefault();

    const user = {
      username,
      email,
      password
    };

    axios.post('/auth/register', user)
      .then(res => {
        console.log(res.data);
        if (res.data.success === true) {
          window.location = '/users/login';
        }
      })
      .catch(err => handleRegistrationAlert(err));
  };

  return (
    <div className="card mx-auto w-50">
      <div className="card-body">
        <h1 className="card-title text-center mb-4">Register</h1>

        {/* {handleRegistrationAlert("That email already exists")} */}

        <form autoComplete="off" onSubmit={handleRegistration}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              className="form-control"
              id="username"
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              id="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              id="password"
              name="password"
            />
            <small id="passwordHelp" className="form-text text-muted">Must contain between 8-64 characters, at least one lowercase letter, at least one upper case letter, at least one numerical digit, and at least one special character (!@#$%^{'&'}*).</small>
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="togglePasswordVisibility"
              onClick={togglePasswordVisibility}
            />
            <label htmlFor="togglePasswordVisibility">Show password</label>
          </div>

          <button type="submit" className="btn btn-primary mr-4">Register</button>
          <span><Link to="/users/login" className="text-primary">Already have an account? Login here</Link>.</span>
        </form>
      </div>
    </div>
  );
}