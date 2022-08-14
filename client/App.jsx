import React from 'react';

import LoginPage from './components/LoginPage.jsx';
import './stylesheets/styles.scss'

const App = () => {
  return (
    <div id="app">
      <h1 id="title">Axolotl Beats: beats forEach</h1>
      <LoginPage />
    </div>
  );
};

export default App;