import React from 'react';
import { Component } from 'react';

class LoginPage extends Component {
  constructor () {
    super()
    this.state = {
      user: undefined
    }
  }; 

  checkAuth() {
    fetch('/api/checkUserAuth')
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.checkAuth()
  }

  

  render() {
    return (
      <div id="loginPage">
        <h3>Login to Spotify below to continue</h3>
        {this.state.user ? this.state.user.display_name : 'ksdfjlksj'}
        
      <a href='/api/auth'><button className="login" onClick={this.loginEvent}>Spotify Login</button></a>
      </div> 
    )
  };
}





export default LoginPage