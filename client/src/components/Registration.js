import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    let passInput = document.getElementById('password');
    if (passInput.type === 'password') {
      passInput.type = 'text';
    } else {
      passInput.type = 'password';
    }
  };

  const handleRegistration = e => {
    e.preventDefault();

    const user = {
      username,
      email,
      password
    };

    axios.post('/auth/register', user)
      .then(res => {
        console.log(res.data);
        if (res.data.success === true) {
          window.location = '/users/login';
        }
        // } else {
        //   throw new Error('Registration unsuccessful');
        // }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="card mx-auto w-50">
      <div className="card-body">
        <h1 className="card-title text-center mb-4">Register</h1>

        <form autoComplete="off" onSubmit={handleRegistration}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              className="form-control"
              id="username"
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              id="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              id="password"
              name="password"
            />
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="togglePasswordVisibility"
              onClick={togglePasswordVisibility}
            />
            <label htmlFor="togglePasswordVisibility">Show password</label>
          </div>

          <button type="submit" className="btn btn-primary mr-4">Register</button>
          <span><Link to="/users/login" className="text-primary">Already have an account? Login here</Link>.</span>
        </form>
      </div>
    </div>
  );
}

// class Registration extends Component {
//   state = {
//     username: '',
//     email: '',
//     password: ''
//   };

//   // handleChangeUsername = e => this.setState({ username: e.target.value });
//   handleChangeUsername = e => this.setState({ username: e.target.value });

//   handleChangeEmail = e => this.setState({ email: e.target.value });

//   handleChangePassword = e => this.setState({ password: e.target.value });

//   togglePasswordVisibility = () => {
//     let passInput = document.getElementById('password');
//     if (passInput.type === 'password') {
//       passInput.type = 'text';
//     } else {
//       passInput.type = 'password';
//     }
//   };

//   handleSubmit = e => {
//     e.preventDefault();

    // const user = {
    //   username: this.state.username,
    //   email: this.state.email,
    //   password: this.state.password
    // };

//     axios.post('/auth/register', user)
//       .then(res => {
//         console.log(res.data);
//         if (res.data.success === true) {
//           window.location = '/users/login';
//         }
//         // } else {
//         //   throw new Error('Registration unsuccessful');
//         // }
//       })
//       .catch(err => console.log(err));
//   };

//   render() {
//     return (
//       <div className="card mx-auto w-50">
//         <div className="card-body">
//           <h1 className="card-title text-center mb-4">Register</h1>

//           <form autoComplete="off" onSubmit={this.handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 value={this.state.username}
//                 onChange={this.handleChangeUsername}
//                 className="form-control"
//                 id="username"
//                 name="username"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 value={this.state.email}
//                 onChange={this.handleChangeEmail}
//                 className="form-control"
//                 id="email"
//                 name="email"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 value={this.state.password}
//                 onChange={this.handleChangePassword}
//                 className="form-control"
//                 id="password"
//                 name="password"
//               />
//             </div>

//             <div className="form-check mb-4">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="togglePasswordVisibility"
//                 onClick={this.togglePasswordVisibility}
//               />
//               <label htmlFor="togglePasswordVisibility">Show password</label>
//             </div>

//             <button type="submit" className="btn btn-primary mr-4">Register</button>
//             <span><Link to="/users/login" className="text-primary">Already have an account? Login here</Link>.</span>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Registration;