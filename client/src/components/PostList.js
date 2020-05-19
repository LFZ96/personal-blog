import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';
import { updatePage, getPostList, formatDate, getPost, getAuth } from './../utils/requestsHelper';

function Post(props) {
  return (
    <div className="card mx-auto w-75 mb-3">
      <div className="card-body">
        <h2 className="card-title">{props.post.title}</h2>
        {/* <h6 className="card-subtitle text-muted mb-2">Written by {props.post.author} on {props.post.createdAt.substring(0, 10)}</h6> */}
        <h6 className="card-subtitle mb-4">By {props.post.author.username } on {formatDate(props.post.createdAt)}</h6>
        <p className="card-text">{props.post.description}</p>
        <Link to={`/posts/${props.post.slug}`} className="btn btn-primary">Read More</Link>
        {/* <Link to={`/posts/${props.post.author.username}/${props.post.slug}`} className="btn btn-primary">Read More</Link> */}
      </div>
    </div>
  );
};

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [authorIds, setAuthorIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const renderPostList = async () => {
    const postListResult = await getPostList(currentPage);

    const postData = postListResult.data.results;
    // console.log(postData);
    const authIds = postData.map(post => post.author);
    // console.log(authIds);

    const totalPostsData = postListResult.data.totalPosts;
    const numPagesPagesData = Math.ceil(totalPostsData / 4);
    // console.log(postListResult);

    if (postListResult.data.results.length > 0) {
      setPosts(postListResult.data.results);
      setTotalPosts(totalPostsData);
      setNumPages(numPagesPagesData);
      setAuthorIds(authIds);
    }
  };

  // const handleAuthorRender = async () => {
  //   // Loop through authorId list
  //   // const functionWithPromise = item => {
  //   //   return Promise.resolve('ok');
  //   // };

  //   // const getAuth = async item => {
  //   //   return functionWithPromise(item);
  //   // };

  //   const getData = async () => {
  //     return Promise.all(authorIds.map(id => getAuth(id)));
  //   };

  //   getData().then(data => {
  //     console.log(data);
  //   });

  //   return <h1>Hello</h1>;
  //   // Request for the author object for each ID and store inside array
  //   // Loop through author object array and map author name to new array
  // };

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
    // return posts.blogPosts.map((post, i) => (<Post post={post} author={posts.blogPostAuthors[i]} key={post._id} />));
    return posts.map(post => <Post post={post} key={post._id} />);
  };

  const handlePagination = () => {
    return totalPosts > 4 ? <Pagination pages={numPages} updatePage={updatePageHandler} currentPage={currentPage} /> : '';
  };

  return (
    <>
      {handlePostList()}
      {handlePagination()}
      {/* {handleAuthorRender()} */}
    </>
  );
}

// export default function PostList() {
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [numPages, setNumPages] = useState(0);

//   const renderPostList = async () => {
//     const postListResult = await getPostList(currentPage);

//     const postData = postListResult.data.results;
//     const totalPostsData = postListResult.data.totalPosts;
//     const numPagesPagesData = Math.ceil(totalPostsData / 4);
//     // console.log(postListResult);

//     if (postListResult.data.results.length > 0) {
//       setPosts(postListResult.data.results);
//       setTotalPosts(totalPostsData);
//       setNumPages(numPagesPagesData);
//     }
//   };

//   useEffect(() => {
//     renderPostList();
//   }, []);
  
//   const updatePageHandler = async pageNum => {
//     const updatePageResult = await getPostList(pageNum);

//     if (updatePageResult.data.results.length > 0) {
//       setPosts(updatePageResult.data.results);
//       setCurrentPage(pageNum);
//     }
//   };

//   const handlePostList = () => {
//     // return posts.blogPosts.map((post, i) => (<Post post={post} author={posts.blogPostAuthors[i]} key={post._id} />));
//     return posts.map(post => <Post post={post} key={post._id} />);
//   };

//   const handlePagination = () => {
//     return totalPosts > 4 ? <Pagination pages={numPages} updatePage={updatePageHandler} currentPage={currentPage} /> : '';
//   };

//   return (
//     <>
//       {handlePostList()}
//       {handlePagination()}
//     </>
//   );
// }

// class PostList extends Component {
//   state = {
//     posts: [],
//     currentPage: 1,
//     totalPosts: 0
//   };

//   componentDidMount() {
//     axios.get(`/api/posts?page=${this.state.currentPage}`)
//       .then(res => {
//         if (res.data.results.length > 0) {
//           this.setState({ totalPosts: res.data.totalPosts, posts: res.data.results });
//         }
//       })
//       .catch(err => console.log(err));
//   }

//   updatePage = pageNum => {
//     axios.get(`/api/posts?page=${pageNum}`)
//       .then(res => {
//         if (res.data.results.length > 0) {
//           this.setState({ posts: res.data.results, currentPage: pageNum });
//         }
//       })
//       .catch(err => console.log(err));
//   };

//   render() {
//     const numOfPages = Math.ceil(this.state.totalPosts / 4);

//     return (
//       <>
//         { this.state.posts.map(post => <Post post={post} key={post._id} />) }

//         { this.state.totalPosts > 4 ? <Pagination pages={numOfPages} updatePage={this.updatePage} currentPage={this.state.currentPage} /> : '' }
//       </>
//     );
//   }
// }

// export default PostList;