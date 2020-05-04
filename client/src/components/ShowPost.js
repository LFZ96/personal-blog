import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ShowPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      createdAt: '',
      body: '',
      slug: ''
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/posts/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          author: res.data.author,
          createdAt: res.data.createdAt,
          body: res.data.body,
          slug: res.data.slug
        });
      })
      .catch(err => console.log(err));
  }

  deleteExercise = () => {
    axios.delete(`http://localhost:5000/posts/${this.state.slug}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="card mx-auto w-75">
        <h2 className="card-header">{this.state.title}</h2>
        <div className="card-body">
          <h5 className="card-subtitle text-muted mb-4">Written by {this.state.author} on {this.state.createdAt.substring(0, 10)}</h5>
          <p className="card-text">{this.state.body}</p>
          <Link to={`/posts/${this.state.slug}/edit`} className="btn btn-info mr-2">Edit</Link>
          <a href="/" className="btn btn-danger" onClick={this.deleteExercise}>Delete</a>
        </div>
      </div>
    );
  }
}

export default ShowPost;