import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ShowPost extends Component {
  state = {
    title: '',
      author: '',
      createdAt: '',
      body: '',
      slug: '',
      sanitizedHTML: ''
  };

  componentDidMount() {
    axios.get(`/api/${this.props.match.params.slug}`)
      .then(res => {
        const post = res.data;

        this.setState({
          title: post.title,
          author: post.author,
          createdAt: post.createdAt,
          body: post.body,
          slug: post.slug,
          sanitizedHTML: post.sanitizedHTML
        });
      })
      .catch(err => console.log(err));
  }

  deleteExercise = () => {
    axios.delete(`/api/${this.state.slug}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="card mx-auto w-75">
        <h2 className="card-header">{this.state.title}</h2>
        <div className="card-body">
          <h5 className="card-subtitle text-muted mb-4">Written by {this.state.author} on {this.state.createdAt.substring(0, 10)}</h5>
          <p className="card-text" dangerouslySetInnerHTML={{__html: this.state.sanitizedHTML}}></p>
          <Link to={`/posts/${this.state.slug}/edit`} className="btn btn-info mr-2">Edit</Link>
          <a href="/" className="btn btn-danger" onClick={this.deleteExercise}>Delete</a>
        </div>
      </div>
    );
  }
}

export default ShowPost;