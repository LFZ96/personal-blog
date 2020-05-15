import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './../utils/AuthContext';
import { logout } from './../utils/requestsHelper';

export default function Navbar() {
  const authApi = useContext(AuthContext);

  const handleLogout = async e => {
    const logoutResult = await logout();

    authApi.setAuth(logoutResult.data.auth);
    authApi.setUser(null);
  };

  const renderNewPostButton = () => {
    if (authApi.auth) {
      return (
        <li className="nav-item">
          <Link to="/posts/new" className="nav-link">New Post</Link>
        </li>
      );
    }
  };

  const renderAuthButton = () => {
    if (authApi.auth) {
      return (
        <li className="nav-item">
          <button className="nav-link btn btn-danger text-light" onClick={handleLogout}>Logout</button>
        </li>
      );
    } else {
      return (
        <li className="nav-item">
          <Link to="/users/login" className="nav-link btn btn-primary text-light">Login</Link>
        </li>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">

    <span className="navbar-brand">
      <img src="logo.svg" width="50" height="50" alt="" />
    </span>

      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Posts</Link>
          </li>
          {renderNewPostButton()}
        </ul>
      </div>
      
      <div className="navbar-collapse collapse w-100 order-2 dual-collapse2">
        <ul className="navbar-nav ml-auto">
         {renderAuthButton()}
        </ul>
      </div>
    </nav>
  );
}