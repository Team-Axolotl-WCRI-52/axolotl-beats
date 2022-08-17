import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
// class LoginPage extends Component {
//   constructor () {
//     super()
//   }; 
//   // loginEvent = () => {

//   //   fetch('/api/auth')
//   //     .then(response => response.json())
//   //     .then(res => console.log(res))
//   //     .catch(err => console.log(err, 'auth fetch failed'))
//   //   }
  
//   // workaround: set button to link to frontend path "/api/auth"
//   // this represents a "GET" request that is proxied to localhost:3000/api/auth on backend
//   // gets around CORS issue for now, but may need to address CORS for user input form submission

//   render() {
//     return (
//       <div id="loginPage">
//       <h3>Login to Spotify below to continue</h3>
//       <a href='http://localhost:8080/api/auth'><button className="login" onClick={this.loginEvent}>Spotify Login</button></a>
//       </div> 
//     )
//   };
// }

const LoginPage = () => {

  const navigate = useNavigate();
  return (
    <div id="loginPage">
      <h3>Login to Spotify below to continue</h3>
      <a href='http://localhost:8080/api/auth'><button className="login" onClick={this.loginEvent}>Spotify Login</button></a>
    </div>
  )
};



export default LoginPage