import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  handleChangeUsername = e => this.setState({ username: e.target.value });

  handleChangeEmail = e => this.setState({ email: e.target.value });

  handleChangePassword = e => this.setState({ password: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/auth/register', user)
      .then(() => console.log('User sent'))
      .catch(err => console.log(err));

    window.location = '/users/login';
  };

  render() {
    return (
      <div className="card mx-auto w-50">
        <div className="card-body">
          <h1 className="card-title text-center">Register</h1>

          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChangeUsername}
                className="form-control"
                id="username"
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
                className="form-control"
                id="email"
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChangePassword}
                className="form-control"
                id="password"
                name="password"
              />
              {/* <small
                id="passwordHelp"
                className="form-text text-danger">
                Password must contain more than 8 characters, a capital (uppercase) letter, a digit, and one special character
              </small> */}
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="togglePasswordVisibility"
              />
              <label htmlFor="togglePasswordVisibility">Show password</label>
            </div>

            <button type="submit" className="btn btn-primary mr-4">Register</button>
            <span>Already have an account? <Link to="/users/login" className="text-primary">Login here</Link>.</span>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;