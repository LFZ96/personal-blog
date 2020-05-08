import React, { Component } from 'react';

class Login extends Component {
  onSubmit = () => {};

  render() {
    <div className="card">
      <h1 className="card-title">Login</h1>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
          </div>
        </form>
      </div>
    </div>
  }
}

export default Login;