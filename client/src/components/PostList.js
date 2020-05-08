import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Pagination from './Pagination';

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
  state = {
    posts: [],
    currentPage: 1,
    totalPosts: 0
  };

  componentDidMount() {
    axios.get(`/api/posts?page=${this.state.currentPage}`)
      .then(res => {
        if (res.data.results.length > 0) {
          this.setState({ totalPosts: res.data.totalPosts, posts: res.data.results });
        }
      })
      .catch(err => console.log(err));
  }

  updatePage = pageNum => {
    axios.get(`/api/posts?page=${pageNum}`)
      .then(res => {
        if (res.data.results.length > 0) {
          this.setState({ posts: res.data.results, currentPage: pageNum });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const numOfPages = Math.ceil(this.state.totalPosts / 4);

    return (
      <>
        { this.state.posts.map(post => <Post post={post} key={post._id} />) }

        { this.state.totalPosts > 4 ? <Pagination pages={numOfPages} updatePage={this.updatePage} currentPage={this.state.currentPage} /> : '' }
      </>
    );
  }
}

export default PostList;