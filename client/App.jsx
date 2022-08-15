import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PlaylistPage from './components/PlaylistPage.jsx';
import EmbeddedPlayer from './components/EmbeddedPlayer.jsx';
import TempReroute from './components/TempReroute.jsx';

import LoginPage from './components/LoginPage.jsx';
import './stylesheets/styles.scss'


const App = () => {
  return (
    <Router>
      <div id="app">
      <h1 id="title">Axolotl Beats: beats forEach</h1>
      <Routes>
        <Route path = '/' element={ <LoginPage /> }></Route>
        <Route path='/player' element={ <EmbeddedPlayer /> }></Route>
        <Route path='/playlistform' element={ <PlaylistPage/> }></Route>
    </Routes>
    < TempReroute />
    </div>
  </Router>
  )
};

export default App; 

