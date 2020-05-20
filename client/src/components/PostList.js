import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';
import { getPostList, formatDate } from './../utils/requestsHelper';

function Post(props) {
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
};

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const renderPostList = async () => {
    const postListResult = await getPostList(currentPage);

    const totalPostsData = postListResult.data.totalPosts;
    const numPagesPagesData = Math.ceil(totalPostsData / 4);

    if (postListResult.data.results.length > 0) {
      setPosts(postListResult.data.results);
      setTotalPosts(totalPostsData);
      setNumPages(numPagesPagesData);
    }
  };

  useEffect(() => {
    renderPostList();
  }, []);
  
  const updatePageHandler = async pageNum => {
    const updatePageResult = await getPostList(pageNum);

    if (updatePageResult.data.results.length > 0) {
      setPosts(updatePageResult.data.results);
      setCurrentPage(pageNum);
    }
  };

  const handlePostList = () => {
    return posts.map(post => <Post post={post} key={post._id} />);
  };

  const handlePagination = () => {
    return totalPosts > 4 ? <Pagination pages={numPages} updatePage={updatePageHandler} currentPage={currentPage} /> : '';
  };

  return (
    <>
      {handlePostList()}
      {handlePagination()}
    </>
  );
}