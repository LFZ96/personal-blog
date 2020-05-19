import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getPost } from './../utils/requestsHelper';

export default function EditPost(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');

  const changeHandler = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    } else {
      setBody(e.target.value);
    }
  };

  const renderEditPost = async () => {
    const getPostResult = await getPost(props.match.params.slug);

    const post = getPostResult.data;

    setTitle(post.title);
    setDescription(post.description);
    setBody(post.body);
  };

  useEffect(() => {
    renderEditPost();
  }, []);

  const submitHandler = e => {
    e.preventDefault();

    const post = {
      title,
      description,
      body
    };

    axios.post(`/api/${props.match.params.slug}/edit`, post)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    window.location = '/';
  };

  return (
    <div className="card mx-auto w-75">
      <div className="card-body">
        <h1 className="card-title text-center">Edit Post</h1>

        <form onSubmit={submitHandler} autoComplete="off">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={title}
              onChange={changeHandler}
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
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              id="body"
              value={body}
              onChange={changeHandler}
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