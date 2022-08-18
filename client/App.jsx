import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./components/LoginPage.jsx";
import PlaylistPage from "./components/PlaylistPage.jsx";
import EmbeddedPlayer from "./components/EmbeddedPlayer.jsx";
import Navbar from "./components/Navbar.jsx";
import DancingStuff from './components/DancingStuff.jsx'
import DancingLeft from './components/DancingLeft.jsx';
import DancingRight from './components/DancingRight.jsx';
import History from './components/History.jsx';

import "./stylesheets/styles.scss";

// make App stateful -> class component
// define a handler that updates state (setState)
class App extends Component {
  constructor() {
    super();
    this.state = {
      playlistId: "Initial value",
      username: undefined,
      spotify_id: undefined,
      isLoggedIn: false,
    };
    // bind handler this component
    this.updatePlaylistId = this.updatePlaylistId.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.updateIsLoggedIn = this.updateIsLoggedIn.bind(this);
  }

  // should this be tied in with a lifecycle method?
  // define handler for playlistFormSubmit that will get passed down to PlaylistForm component
  // this needs to be passed down to PlaylistPage then to PlaylistForm
  updatePlaylistId(id) {
    console.log("argument id is:", id);
    // should update state to set playlistId to the one returned from the form
    this.setState({ playlistId: id });
    // re-render?
    console.log("this.state.playlistId is: ", this.state.playlistId);
  }

  // THUNDER-GOOSE:
  // need a new function that is invoked on CompountDidMount in order to GET fetch
  // spotify_id, display_name

  updateUserInfo(user) {
    // console.log('updateuserinfo arg', user)
    this.setState({
      playlistId: user.playlist_id,
      username: user.display_name,
      spotify_id: user.spotify_id,
    });
    console.log("updateUserInfo state: ", this.state);
  }

  updateIsLoggedIn(input) {
    this.setState({
      isLoggedIn: input,
    });
  }

  render() {
    console.log("this.state in render", this.state.playlistId);

    return (
      <Router>
        <div id="app">
          {this.state.isLoggedIn ? <Navbar
            isLoggedIn={this.state.isLoggedIn}
            updateIsLoggedIn={this.updateIsLoggedIn}
            updateUserInfo={this.updateUserInfo}
          /> : <div id="navBar"></div>}
          {this.state.isLoggedIn ? 
          <div id='title'>
          <div id='name' className="chill-pulse">Axolotl Beats</div>
          <div id='slogan' className="chill-pulse">beats forEach</div>
          </div> : 
          <div id='title'>
                <div id='name' className="pulse">Axolotl Beats</div>
                <div id='slogan' className="pulse">beats forEach</div>
          </div>}
          
          {this.state.isLoggedIn ? <></>: <DancingStuff />}
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/player"
              element={
                <div className="player-div">
                  <DancingLeft />
                  <EmbeddedPlayer
                    isLoggedIn={this.state.isLoggedIn}
                    updateIsLoggedIn={this.updateIsLoggedIn}
                    updateUserInfo={this.updateUserInfo}
                    playlistId={this.state.playlistId}
                    username={this.state.username}
                    spotify_id={this.state.spotify_id}
                  />
                  <DancingRight />
                </div>
                
              }
            ></Route>
            <Route
              path="/playlistform"
              element={
                <PlaylistPage
                  spotify_id={this.state.spotify_id}
                  updatePlaylistId={this.updatePlaylistId}
                />
              }
            ></Route>
          </Routes>
          {/* {this.state.isLoggedIn ? <History /> : <></>} */}
        </div>
        {/* <h1 onClick={this.getUserId} >Test Click Me</h1> */}
        {/* <nav className="end" id="navBar">
          End
        </nav> */}
      </Router>
    );
  }
}

export default App;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host

// GET /home.html HTTP/1.1
// Host: developer.mozilla.org
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
// Accept-Language: en-US,en;q=0.5
// Accept-Encoding: gzip, deflate, br
// Referer: https://developer.mozilla.org/testpage.html
// Connection: keep-alive
// Upgrade-Insecure-Requests: 1
// If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
// If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
// Cache-Control: max-age=0

//getuserid
// 'access=BQBQQL7-gOAWVOY2ITvMDesw9LXrLmO7ZPQnJHO8jkGmJ9ntmR-pKFBGCpPi6sT0y8P2Lro6QGMiEpkoGah4mrd8A0nEMG_KZtbtvVisXEfInL5m6a5GZqjgoV9SSZdaIHPIOY5V--iOpVMWCBHBLmhNwEYhULhCW0tFQMPNmzHC18ipvqWfV04UwisEtrYEHOq0p2V0jgT4Vg; refresh=AQAuQmh4Fl6FpgS_v7TImxTF6BsPoDgz5pi5OpsVyPkEJzmNQ0U2j4I4NTF5TxAJ5mhZltypKREvozXBfzKn2_H2q2KGUDBWiGgm59aT1VFiJe9D3GsP9LygRpNKBNerbyU'
// need to be checked!!
// const cookieValue = document.cookie
//   .split('; ')
//   .find((row) => row.startsWith('access='))
//   ?.split('=')[1];
// console.log('COOKIE is: ', cookieValue);

// const getOptions = {
//   'Content-Type': 'application/json',
//   'Authorization': cookieValue,
//   'Host': 'api.spotify.com'
// }

// fetch('api.spotify.com/v1/me HTTP/1.1', getOptions)
// .then((data) => data.json())
// .then((data) => {
//   // fetch('backend', postOptions)
//   console.log('fromspotify: ', data)
// })
