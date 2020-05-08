import React, { Component } from 'react';

class Registration extends Component {

  onSubmit = e => {
    
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}