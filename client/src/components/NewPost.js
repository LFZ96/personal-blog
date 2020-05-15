import React, { useState, useContext } from 'react';

import AuthContext from './../utils/AuthContext';
import { createPost } from './../utils/requestsHelper';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');

  const authApi = useContext(AuthContext);

  const currentDate = new Date();

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
    <div className="card mx-auto w-50">
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

          {/* <h5 className="card-subtitle text-muted mb-4">By {authApi.user.userId} on {currentDate.toLocaleDateString()}</h5> */}

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
              {body}
            </textarea>
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}

// class NewPost extends Component {
//   state = {
//     title: '',
//       description: '',
//       body: ''
//   };

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
//       author: 'Logan Zipkes',
//       title: this.state.title,
//       description: this.state.description,
//       body: this.state.body
//     };

//     axios.post('/api/new', post)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err));

//     window.location = '/';
//   };

//   render() {
//     const currentDate = new Date();
//     return (
//       <div className="card mx-auto w-75">
//         <div className="card-body">
//           <h1 className="card-title text-center">New Post</h1>

//           <form onSubmit={this.onSubmit} autoComplete="off">
//             <div className="form-group mb-4">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 id="title"
//                 onChange={this.onChangeInput}
//                 value={this.state.title}
//                 className="form-control"
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
//                 {this.state.body}
//               </textarea>
//             </div>

//             <button type="submit" className="btn btn-primary">Save</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewPost;