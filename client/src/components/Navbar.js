import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UnauthNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Posts</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-collapse collapse w-100 order-2 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/users/login" className="nav-link">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export const AuthNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/posts/new" className="nav-link">New Post</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-collapse collapse w-100 order-2 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// export default UnauthNavbar;