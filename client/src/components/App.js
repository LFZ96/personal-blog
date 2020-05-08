import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './Navbar';
import PostList from './PostList';
import NewPost from './NewPost';
import ShowPost from './ShowPost';
import EditPost from './EditPost';
import Login from './Login';
import Registration from './Registration';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={PostList} />
        <Switch>
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:slug/edit" component={EditPost} />
          <Route path="/posts/:slug" component={ShowPost} />
        </Switch>
        <Route path="/users/login" component={Login} />
        <Route path="/users/register" component={Registration} />
      </div>
    </Router>
  );
};

export default App;