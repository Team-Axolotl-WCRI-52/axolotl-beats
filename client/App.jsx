import React, { Component } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx';
import PlaylistPage from './components/PlaylistPage.jsx';
import EmbeddedPlayer from './components/EmbeddedPlayer.jsx';
import TempReroute from './components/TempReroute.jsx';

import './stylesheets/styles.scss';


// make App stateful -> class component
// define a handler that updates state (setState) 
class App extends Component {
  constructor() {
    super();
    this.state = {
      playlistId: 'Initial value'
    };
    // bind handler this component 
    this.updatePlaylistId = this.updatePlaylistId.bind(this);
  }

  // should this be tied in with a lifecycle method?
  // define handler for playlistFormSubmit that will get passed down to PlaylistForm component 
  // this needs to be passed down to PlaylistPage then to PlaylistForm
  updatePlaylistId (id) {
    console.log('argument id is:', id);
    // should update state to set playlistId to the one returned from the form 
    this.setState({playlistId: id})
    // re-render?
    console.log('this.state.playlistId is: ', this.state.playlistId);
  }


  render() {

    console.log('this.state in render', this.state.playlistId);

    return (
      <Router>
        <div id='app'>
          <nav className = 'flex flex-row flex-end'>
              <ul className="navList">
                <li className='links' id='logoutButton' ><a className='bye' href='http://google.com'>Logout</a></li>
              </ul>
            </nav>
          <div id='title'>
            <div id='name'>Axolotl Beats</div>
            <div id='slogan'>beats forEach</div>
          </div>
        <Routes>
          <Route path = '/' element={ <LoginPage /> }></Route>
          <Route path='/player' element={ <EmbeddedPlayer playlistId={this.state.playlistId}/> }></Route>
          <Route path='/playlistform' element={ <PlaylistPage updatePlaylistId={this.updatePlaylistId}/> }></Route>
      </Routes>
      </div>
      <nav className='end' id='navBar'>End</nav>
    </Router>
    )
}
};

export default App; 

