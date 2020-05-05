import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './Navbar';
import PostList from './PostList';
import NewPost from './NewPost';
import ShowPost from './ShowPost';
import EditPost from './EditPost';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/posts" exact component={PostList} />
        <Switch>
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:slug/edit" component={EditPost} />
          <Route path="/posts/:slug" component={ShowPost} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;