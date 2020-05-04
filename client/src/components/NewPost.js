import React, { Component } from 'react';
import axios from 'axios';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: ''
    };
  }

  onChangeInput = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  // onChangeTitle = e => {
  //   this.setState({ title: e.target.value });
  // };

  // onChangeDescription = e => {
  //   this.setState({ description: e.target.value });
  // };

  // onChangeBody = e => {
  //   this.setState({ body: e.target.value });
  // };

  onSubmit = e => {
    e.preventDefault();

    const post = {
      author: 'Logan Zipkes',
      title: this.state.title,
      description: this.state.description,
      body: this.state.body
    };

    axios.post('http://localhost:5000/posts/new', post)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    window.location = '/';
  };

  render() {
    return (
      <div className="card mx-auto w-75">
        <div className="card-body">
          <h1 className="card-title text-center">New Post</h1>

          <form onSubmit={this.onSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={this.onChangeInput}
                value={this.state.title}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={this.state.description}
                onChange={this.onChangeInput}
                className="form-control"
                required
              >
              </textarea>
            </div>

            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                id="body"
                value={this.state.body}
                onChange={this.onChangeInput}
                className="form-control"
                required
              >
                {this.state.body}
              </textarea>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewPost;