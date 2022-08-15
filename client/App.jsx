import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PlaylistPage from './components/PlaylistPage.jsx';
import EmbeddedPlayer from './components/EmbeddedPlayer.jsx';
import TempReroute from './components/TempReroute.jsx';

import LoginPage from './components/LoginPage.jsx';
import './stylesheets/styles.scss';
// import img from '/client/stylesheets/logo.png'



const App = () => {
  return (
    <Router>
      <div id="app">
        <nav id='navBar'>
            {/* <img >{ img }</img> */}
            {/* src='/client/stylesheets/logo.png' */}
          <ul className="navList">
            <li className='links' id='logoutButton' ><a className='bye' href='http://google.com'>Logout</a></li>
            {/* <li className='links' id='formRedirect'><a className='bye' href='http://localhost:8080/playlistform'>Playlist Form</a></li> */}
          </ul>
        </nav>
      <div id='title'>
        <div id="name">Axolotl Beats</div>
        <div id='slogan'>beats forEach</div>
      </div>
      <Routes>
        <Route path = '/' element={ <LoginPage /> }></Route>
        <Route path='/player' element={ <EmbeddedPlayer /> }></Route>
        <Route path='/playlistform' element={ <PlaylistPage/> }></Route>
    </Routes>
    {/* <div id='links'>
      < TempReroute />
    </div> */}
    </div>
    <nav className='end' id='navBar'>End</nav>
  </Router>
  )
};

export default App; 

