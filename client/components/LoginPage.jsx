import React from 'react';
import { Component } from 'react';

class LoginPage extends Component {
  contructor () {
    super()
  }; 
  loginEvent = () => {
   render()  
    fetch('/api/auth')
      .then(response => response.json())
      .then(res => console.log(res))
      .catch(err => console.log(err, 'auth fetch failed'))
    }
    
    render() {
      return (
       <div id="loginPage">
        <h3>Login to Spotify here...</h3>
        <button className="login" onClick={this.loginEvent}>Spotify Login</button>
       </div> 
      )
    };
}





export default LoginPage