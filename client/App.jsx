import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx';
import PlaylistPage from './components/PlaylistPage.jsx';
import EmbeddedPlayer from './components/EmbeddedPlayer.jsx';
import TempReroute from './components/TempReroute.jsx';

const App = () => {
  return (
    <Router>
      <div>
      <h1>Axolotl Beats: beats forEach</h1>
      <PlaylistPage />
      <Routes>
        <Route path = '/' element={ <LoginPage /> }></Route>
        <Route path='/player' element={ <EmbeddedPlayer /> }></Route>
    </Routes>
    < TempReroute />
    </div>
  </Router>
  )
};

export default App; 

