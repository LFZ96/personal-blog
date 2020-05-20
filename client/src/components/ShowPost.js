import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './../utils/AuthContext';
import { getPost, deletePost, formatDate } from './../utils/requestsHelper';

export default function ShowPost(props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [slug, setSlug] = useState('');
  const [sanitizedHTML, setSanitizedHTML] = useState('');

  const [postAuthorId, setPostAuthorId] = useState('');

  const authApi = useContext(AuthContext);

  const renderPost = async () => {
    const getPostResult = await getPost(props.match.params.slug);
    setPostAuthorId(getPostResult.data.author._id);
    const post = getPostResult.data;

    setTitle(post.title);
    setAuthor(post.author.username);
    setCreatedAt(post.createdAt);
    setSlug(post.slug);
    setSanitizedHTML(post.sanitizedHTML);
  };

  useEffect(() => {
    renderPost();
  }, [authApi.auth, authApi.user]);

  const handleDeletion = async () => {
    await deletePost(slug);
  };

  const renderButtons = () => {
    if (authApi.auth && authApi.user) {
      if (authApi.user.userId === postAuthorId) {
        return (
          <>
            <Link to={`/posts/${slug}/edit`} className="btn btn-secondary mr-2">Edit</Link>
            <a href="/" className="btn btn-danger" onClick={handleDeletion}>Delete</a>
          </>
        );
      }
    }
  };

  return (
    <div className="card mx-auto w-75">
      <h2 className="card-header">{title}</h2>
      <div className="card-body">
        <h5 className="card-subtitle text-muted mb-4">By {author} on {formatDate(createdAt)}</h5>
        <p className="card-text" dangerouslySetInnerHTML={{__html: sanitizedHTML}}></p>
        {renderButtons()}
      </div>
    </div>
  );
}