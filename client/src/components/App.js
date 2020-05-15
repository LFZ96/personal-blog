import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';
import Routes from './../routes/Routes';
import AuthContext from './../utils/AuthContext';
import { isAuthenticated } from './../utils/requestsHelper';

// class App extends React.Component {
//   state = {
//     auth: false,
//     user: null
//   };

//   componentDidMount() {
//     axios.get('/auth/isAuthenticated')
//       .then(res => {
//         if (res.data.auth) {
//           this.setState({ auth: true, user: res.data.user });
//         }
//       })
//       .catch(err => console.log(err));
//   }

//   render() {
//     return (
//       <div className="container">
//         <AuthContext.Provider value={{auth: this.state.auth, user: this.state.user}}>
//           <Router>
//             <Navbar />
//             <Routes />
//           </Router>
//         </AuthContext.Provider>
//       </div>
//     );
//   }
// }

export default function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const readSession = async () => {
    const isAuthenticatedResult = await isAuthenticated();

    if (isAuthenticatedResult.data.auth) {
      setAuth(true);
      setUser(isAuthenticatedResult.data.user);
    }
  };

  useEffect(() => {
    readSession();
  }, []);

  return (
    <div className="container">
      <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}