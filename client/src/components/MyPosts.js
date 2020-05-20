import React, { useState, useEffect } from 'react';

import Pagination from './Pagination';
import PostCard from './PostCard';
import { getPostList } from './../utils/requestsHelper';

export default function MyPosts() {
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
    return posts.map(post => <PostCard post={post} key={post._id} />);
  };

  const handlePagination = () => {
    return totalPosts > 4 ? <Pagination pages={numPages} updatePage={updatePageHandler} currentPage={currentPage} /> : '';
  };

  return (
    <div>Hello</div>
  );

}