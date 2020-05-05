import React, { Component } from 'react';
import axios from 'axios';

class EditPost extends Component {
  state = {
    author: '',
      title: '',
      createdAt: '',
      description: '',
      body: ''
  };

  componentDidMount() {
    axios.get(`https://logan-zipkes-blog.herokuapp.com/posts/${this.props.match.params.slug}`)
      .then(res => {
        const post = res.data;

        this.setState({
          title: post.title,
          author: post.author,
          createdAt: post.createdAt,
          description: post.description,
          body: post.body
        });
      })
      .catch(err => console.log(err));
  }

  onChangeInput = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const post = {
      author: this.state.author,
      title: this.state.title,
      description: this.state.description,
      body: this.state.body
    };

    axios.post(`https://logan-zipkes-blog.herokuapp.com/posts/${this.props.match.params.slug}/edit`, post)
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
                onChange={this.onChangeInput}
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