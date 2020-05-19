import React, { useContext } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import PostList from './../components/PostList';
import NewPost from './../components/NewPost';
import EditPost from './../components/EditPost';
import ShowPost from './../components/ShowPost';
import Login from './../components/Login';
import Registration from './../components/Registration';
import AuthContext from './../utils/AuthContext';

export default function Routes() {
  return (
    <>
      <Route path="/" exact component={PostList} />

      <Switch>
        <ProtectedRoute path="/posts/new" component={NewPost} />
        <ProtectedRoute path="/posts/:slug/edit" component={EditPost} />
        <Route path="/posts/:slug" component={ShowPost} />
        <UnprotectedRoute path="/users/login" component={Login} />
        <UnprotectedRoute path="/users/register" component={Registration} />
      </Switch>
    </>
  );
}

const UnprotectedRoute = ({ component: Component, ...rest }) => {
  const authApi = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => !authApi.auth ? <Component {...props} /> : <Redirect to="/" />}
    />
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authApi = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => authApi.auth ? <Component {...props} /> : <Redirect to="/users/login" />}
    />
  );
};