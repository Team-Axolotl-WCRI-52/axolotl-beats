import React from 'react';

import LoginPage from './components/LoginPage.jsx';
import PlaylistPage from './components/PlaylistPage.jsx';

const App = () => {
  return (
    <div>
      <h1>Axolotl Beats: beats forEach</h1>
      <LoginPage />
      {/* MAKE SURE TO REMOVE THIS BELOW */}
      <PlaylistPage />
    </div>
  );
};

export default App;
