import React, { useState, useContext } from 'react';

import AuthContext from './../utils/AuthContext';
import { createPost } from './../utils/requestsHelper';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');

  const authApi = useContext(AuthContext);

  const changeHandler = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    } else {
      setBody(e.target.value);
    }
  };

  const handleNewPost = async e => {
    e.preventDefault();

    const post = {
      author: authApi.user.userId,
      title,
      description,
      body
    };

    await createPost(post);

    window.location = '/';
  };

  return (
    <div className="card mx-auto w-75">
      <div className="card-body">
        <h1 className="card-title text-center">New Post</h1>

        <form onSubmit={handleNewPost} autoComplete="off">
          <div className="form-group mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={changeHandler}
              value={title}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={changeHandler}
              className="form-control"
              required
            >
            </textarea>
          </div>

          <div className="form-group">
            <label htmlFor="body">Body (Markdown) <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">What's markdown?</a></label>
            <textarea
              name="body"
              id="body"
              value={body}
              onChange={changeHandler}
              className="form-control"
              required
            >
              {body}
            </textarea>
          </div>

          <button type="submit" className="btn btn-primary">Post</button>
        </form>
      </div>
    </div>
  );
}