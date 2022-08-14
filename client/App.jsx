import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx';
import PlaylistPage from './components/PlaylistPage.jsx';
import EmbeddedPlayer from './components/EmbeddedPlayer.jsx';
import TempReroute from './components/TempReroute.jsx';

const App = () => {
  return (
    <Router>
      <div>
      <h1>Axolotl Beats: beats forEach</h1>
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

