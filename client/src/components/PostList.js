import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = props => {
  return (
    <div className="card mx-auto w-75 mb-4">
      <div className="card-body">
        <h2 className="card-title">{props.post.title}</h2>
        <h6 className="card-subtitle text-muted mb-2">Written by {props.post.author} on {props.post.createdAt.substring(0, 10)}</h6>
        <p className="card-text">{props.post.description}</p>
        <Link to={`/posts/${props.post.slug}`} className="btn btn-primary">Read More</Link>
      </div>
    </div>
  );
};

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/')
      .then(res => {
        if (res.data.length > 0) {
          console.log(res);
          this.setState({ posts: res.data });
        }
      })
      .catch(err => console.log(err));
  }

  postList() {
    return this.state.posts.map(post => <Post post={post} key={post._id} />);
  }

  render() {
    return (
      <>
        {this.state.posts.map(post => <Post post={post} key={post._id} />)}
      </>
    );
  }
}

export default PostList;