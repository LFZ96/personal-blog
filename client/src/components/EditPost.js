import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import AuthContext from './../utils/AuthContext';
import { getPost } from './../utils/requestsHelper';

export default function EditPost(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');

  const currentDate = new Date();

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

          {/* <h5 className="card-subtitle text-muted mb-4">By {authApi.auth} on {currentDate.toLocaleDateString()}</h5> */}

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

// class EditPost extends Component {
//   state = {
//     author: '',
//       title: '',
//       createdAt: '',
//       description: '',
//       body: ''
//   };

//   componentDidMount() {
//     axios.get(`/api/${this.props.match.params.slug}`)
//       .then(res => {
//         const post = res.data;

//         this.setState({
//           title: post.title,
//           author: post.author,
//           createdAt: post.createdAt,
//           description: post.description,
//           body: post.body
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   onChangeInput = e => {
//     const target = e.target;
//     const name = target.name;
//     const value = target.value;

//     this.setState({
//       [name]: value
//     });
//   };

//   onSubmit = e => {
//     e.preventDefault();

//     const post = {
//       author: this.state.author,
//       title: this.state.title,
//       description: this.state.description,
//       body: this.state.body
//     };

//     axios.post(`/api/${this.props.match.params.slug}/edit`, post)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
    
//     window.location = '/';
//   };

//   render() {
//     const currentDate = new Date();
    
//     return (
//       <div className="card mx-auto w-75">
//         <div className="card-body">
//           <h1 className="card-title text-center">Edit Post</h1>

//           <form onSubmit={this.onSubmit} autoComplete="off">
//             <div className="form-group">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 id="title"
//                 className="form-control"
//                 value={this.state.title}
//                 onChange={this.onChangeInput}
//                 required
//               />
//             </div>

//             <h5 className="card-subtitle text-muted mb-4">Written by {'Logan Zipkes'} on {currentDate.toLocaleDateString()}</h5>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 name="description"
//                 id="description"
//                 value={this.state.description}
//                 onChange={this.onChangeInput}
//                 className="form-control"
//                 required
//               >
//               </textarea>
//             </div>

//             <div className="form-group">
//               <label htmlFor="body">Body</label>
//               <textarea
//                 name="body"
//                 id="body"
//                 value={this.state.body}
//                 onChange={this.onChangeInput}
//                 className="form-control"
//                 required
//               >
//               </textarea>
//             </div>

//             <button type="submit" className="btn btn-primary">Save</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default EditPost;