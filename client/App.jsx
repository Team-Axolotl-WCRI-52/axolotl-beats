import React, { useState, Component } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx';
import PlaylistPage from './components/PlaylistPage.jsx';
import EmbeddedPlayer from './components/EmbeddedPlayer.jsx';
import TempReroute from './components/TempReroute.jsx';
import Slider from '@mui/material/Slider';

import './stylesheets/styles.scss';
import './stylesheets/app.css';

// make App stateful -> class component
// define a handler that updates state (setState)
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       playlistId: 'Initial value',
//     };
//     // bind handler this component
//     this.updatePlaylistId = this.updatePlaylistId.bind(this);
//   }

// should this be tied in with a lifecycle method?
// define handler for playlistFormSubmit that will get passed down to PlaylistForm component
// this needs to be passed down to PlaylistPage then to PlaylistForm
// updatePlaylistId(id) {
//   console.log('argument id is:', id);
//   // should update state to set playlistId to the one returned from the form
//   this.setState({ playlistId: id });
//   // re-render?
//   console.log('this.state.playlistId is: ', this.state.playlistId);
// }

// render() {
//   console.log('this.state in render', this.state.playlistId);

function App() {
  const [playlistId, setplaylistId] = useState('Initial value');
  const [playlistData, setplaylistData] = useState([
    {
      start_time: 0,
      end_time: 45,
      starting_bpm_target: 60,
      ending_bpm_target: 120,
      genres: ['rock', 'dance', 'funk'],
      custom_params: ['danciness'],
      custom_param_starting_values: [0.5],
      custom_param_ending_values: [0.9],
    },
    {
      start_time: 45,
      end_time: 90,
      starting_bpm_target: 120,
      ending_bpm_target: 130,
      genres: ['rock', 'dance', 'funk'],
      custom_params: ['danciness'],
      custom_param_starting_values: [0.9],
      custom_param_ending_values: [0.95],
    },
  ]);

  // AMG (wed. 5pm): could also include as state a 'custom_parameter_names' array, e.g. ['danciness', 'speechiness']. then, update the function definition remixBreakpointsAndSegmentDataIntoAnArrForServer to be a little cleaner.

  const [breakpointsArr, setbreakpointsArr] = useState([
    {
      minute: 0, // the starting breakpoint-object will ALWAYS have its minute-value equal to 0, and the user cannot change this
      bpm: 60,
      custom_params: { danciness: 0.5 },
    },
    {
      minute: 45,
      bpm: 120,
      custom_params: { danciness: 0.8 },
    },
    {
      minute: 80,
      bpm: 130,
      custom_params: { danciness: 0.9 },
    },
    {
      minute: 95,
      bpm: 150,
      custom_params: { danciness: 1 },
    },
  ]);

  const [segmentsArr, setSegmentsArr] = useState([
    {
      genres: ['rock', 'dance', 'funk'],
    },
    {
      genres: ['metal'],
    },
    {
      genres: ['metal', 'classical'],
    },
  ]);

  return (
    <Router>
      <div id='app'>
        <nav id='navBar'>
          <ul className='navList'>
            <li className='links' id='logoutButton'>
              <a className='bye' href='http://google.com'>
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <div id='title'>
          <div id='name'>Axolotl Beats</div>
          <div id='slogan'>beats forEach</div>
        </div>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route
            path='/player'
            element={<EmbeddedPlayer playlistId={playlistId} />}
          ></Route>
          <Route
            path='/playlistform'
            element={
              <PlaylistPage
                setplaylistId={setplaylistId}
                playlistData={playlistData}
                setplaylistData={setplaylistData}
                breakpointsArr={breakpointsArr}
                setbreakpointsArr={setbreakpointsArr}
                segmentsArr={segmentsArr}
                setSegmentsArr={setSegmentsArr}
              />
            }
          ></Route>
        </Routes>
      </div>
      <nav className='end' id='navBar'>
        End
      </nav>
    </Router>
  );
}

export default App;
