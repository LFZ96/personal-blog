import React, { Component } from 'react';
import axios from 'axios';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      title: '',
      createdAt: '',
      description: '',
      body: ''
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/posts/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          author: res.data.author,
          createdAt: res.data.createdAt,
          description: res.data.description,
          body: res.data.body
        });
      })
      .catch(err => console.log(err));
  }

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangeBody = e => {
    this.setState({ body: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const post = {
      author: this.state.author,
      title: this.state.title,
      description: this.state.description,
      body: this.state.body
    };

    axios.post(`http://localhost:5000/posts/${this.props.match.params.slug}/edit`, post)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    window.location = '/';
  };

  render() {
    return (
      <div className="card mx-auto w-75">
        <div className="card-body">
          <h1 className="card-title text-center">Edit Post</h1>

          <form onSubmit={this.onSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
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
                onChange={this.onChangeBody}
                className="form-control"
                required
              >
              </textarea>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;