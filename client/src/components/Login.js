import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChangeEmail = e => this.setState({ email: e.target.value });

  handleChangePassword = e => this.setState({ password: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/auth/login', user)
      .then(() => console.log('User sent'))
      .catch(err => console.log(err));

    window.location = '/';
  };

  render() {
    return (
      <div className="card w-50 mx-auto">
        <div className="card-body">
          <h1 className="card-title text-center">Login</h1>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={this.handleChangeEmail}
                value={this.state.email}
                className="form-control"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleChangePassword}
                value={this.state.password}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary mr-4">Login</button>
            <span>Don't have an account? <Link to="/users/register" className="text-primary">Register here</Link>.</span>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;