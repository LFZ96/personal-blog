import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Navbar from './Navbar';
import PostList from './PostList';
import NewPost from './NewPost';
import ShowPost from './ShowPost';
import EditPost from './EditPost';
import Login from './Login';
import Registration from './Registration';

const auth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signout(cb) {
    this.isAuthenticated = false
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route {...rest} render={props => (
    auth.isAuthenticated === true
    ? <Component {...props} />
    : <Redirect to="/users/login" />
  )} />
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={PostList} />
        <Switch>
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:slug/edit" component={EditPost} />
          {/* <PrivateRoute path="/posts/new" component={NewPost} />
          <PrivateRoute path="/posts/:slug/edit" component={EditPost} /> */}
          <Route path="/posts/:slug" component={ShowPost} />
        </Switch>
        <Route path="/users/login" component={Login} />
        <Route path="/users/register" component={Registration} />
      </div>
    </Router>
  );
};

export default App;