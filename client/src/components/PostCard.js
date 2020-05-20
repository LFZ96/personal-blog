import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from './../utils/requestsHelper';

export default function PostCard(props) {
  return (
    <div className="card mx-auto w-75 mb-4">
      <div className="card-body">
        <h2 className="card-title">{props.post.title}</h2>
        <h6 className="card-subtitle mb-4">By {props.post.author.username } on {formatDate(props.post.createdAt)}</h6>
        <p className="card-text">{props.post.description}</p>
        <Link to={`/posts/${props.post.slug}`} className="btn btn-primary">Read More</Link>
      </div>
    </div>
  );
}