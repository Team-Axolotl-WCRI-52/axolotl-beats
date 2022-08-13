import React from 'react';
import { Component } from 'react';

class LoginPage extends Component {
    constructor () {
     super()   
    }
  loginEvent = () => {

      console.log('in event listener')
      fetch('/api/auth')
        .then(response => response.json())
        .then(res => console.log(res))
   
  }
  
  
    render() {
    return (
     <div id="loginPage">
      <h3>Login to Spotify here...</h3>
      <button className="login" onClick={this.loginEvent}>Spotify Login</button>
     </div> 
    )
  };

};



export default LoginPage