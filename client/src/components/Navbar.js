import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './../utils/AuthContext';
import { logout } from './../utils/requestsHelper';

export default function Navbar() {
  const authApi = useContext(AuthContext);

  const handleLogout = async e => {
    await logout();

    authApi.setAuth(false);
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
          <Link to="/users/login" className="nav-link btn btn-secondary text-light">Login</Link>
        </li>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-custom-dark mb-4">

      <span className="navbar-brand">
        <img className="logo" src="logo.svg" width="50" height="50" alt="" />
      </span>

      {/* <span className="navbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
          <symbol id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 238.55 286.02">
              <path d="M80.25 249.45v-1.2l148.8-218V9.05h-182v.01H12.33v269.6h150v-.01h68.72v-29.2H80.25zM47.13 38.25h136.72v1.2L47.13 239.42V38.25zm169.49 233.1H22.96v-14h.03l-.01-235.7h14l.01 235.71h179.63v13.99z"/>
          </symbol>
        </svg>

        <svg class="logo-box__logo"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo"></use></svg>
      </span> */}

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
          {/* <li className="nav-item">
            <Link to={`/${}`} className="nav-link">My Posts</Link>
          </li> */}
         {renderAuthButton()}
        </ul>
      </div>
    </nav>
  );
}