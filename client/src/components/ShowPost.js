import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './../utils/AuthContext';
import { getPost, deletePost, formatDate, getAuth } from './../utils/requestsHelper';

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
            <Link to={`/posts/${slug}/edit`} className="btn btn-info mr-2">Edit</Link>
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

// export default function ShowPost(props) {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [createdAt, setCreatedAt] = useState('');
//   // const [body, setBody] = useState('');
//   const [slug, setSlug] = useState('');
//   const [sanitizedHTML, setSanitizedHTML] = useState('');

//   const [postAuthorId, setPostAuthorId] = useState('');

//   const authApi = useContext(AuthContext);

//   const renderPost = async () => {
//     const getPostResult = await getPost(props.match.params.slug);
//     setPostAuthorId(getPostResult.data.author);
//     const post = getPostResult.data;

//     setTitle(post.title);
//     setAuthor(post.author);
//     setCreatedAt(post.createdAt);
//     // setBody(post.body);
//     setSlug(post.slug);
//     setSanitizedHTML(post.sanitizedHTML);
//   };

//   useEffect(() => {
    
//     renderPost();
//   }, []);

//   const handleDeletion = async () => {
//     await deletePost(slug);
//   };

//   const renderButtons = () => {
//     if (authApi.auth) {
//       if (authApi.user.userId === postAuthorId) {
//         return (
//           <>
//             <Link to={`/posts/${slug}/edit`} className="btn btn-info mr-2">Edit</Link>
//             <a href="/" className="btn btn-danger" onClick={handleDeletion}>Delete</a>
//           </>
//         );
//       }
//     }
//   };

//   // const renderAuth = async () => {
//   //   const authName = await getAuth(author);
//   //   // console.log(authName.data.user.name.first);
//   //   return authName.data.user.name.first;
//   // };

//   return (
//     <div className="card mx-auto w-75">
//       <h2 className="card-header">{title}</h2>
//       <div className="card-body">
//         <h5 className="card-subtitle text-muted mb-4">By {author} on {formatDate(createdAt)}</h5>
//         <p className="card-text" dangerouslySetInnerHTML={{__html: sanitizedHTML}}></p>
//         {renderButtons()}
//       </div>
//     </div>
//   );
// }

// class ShowPost extends Component {
//   state = {
//     title: '',
//       author: '',
//       createdAt: '',
//       body: '',
//       slug: '',
//       sanitizedHTML: ''
//   };

//   componentDidMount() {
//     axios.get(`/api/${this.props.match.params.slug}`)
//       .then(res => {
//         const post = res.data;

//         this.setState({
//           title: post.title,
//           author: post.author,
//           createdAt: post.createdAt,
//           body: post.body,
//           slug: post.slug,
//           sanitizedHTML: post.sanitizedHTML
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   handleDeletion = () => {
//     axios.delete(`/api/${this.state.slug}`)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   };

//   renderButtons = () => {
//     const authApi = useContext(AuthContext);

//     if (authApi.auth) {
//       return (
//         <>
//           <Link to={`/posts/${this.state.slug}/edit`} className="btn btn-info mr-2">Edit</Link>
//           <a href="/" className="btn btn-danger" onClick={this.handleDeletion}>Delete</a>
//         </>
//       );
//     }
//   };

//   render() {
//     return (
//       <div className="card mx-auto w-75">
//         <h2 className="card-header">{this.state.title}</h2>
//         <div className="card-body">
//           <h5 className="card-subtitle text-muted mb-4">Written by {this.state.author} on {this.state.createdAt.substring(0, 10)}</h5>
//           <p className="card-text" dangerouslySetInnerHTML={{__html: this.state.sanitizedHTML}}></p>
//           {this.renderButtons()}
//         </div>
//       </div>
//     );
//   }
// }

// export default ShowPost;