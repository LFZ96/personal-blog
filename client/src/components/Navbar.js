import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            {/* <Link to="/" className="nav-link">Posts</Link> */}
            <Link to="/" className="nav-link">Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/posts/new" className="nav-link">New Post</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;