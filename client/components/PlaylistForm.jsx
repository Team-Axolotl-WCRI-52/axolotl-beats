import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breakpoints from './Breakpoints.jsx';
import Genres from './Genres.jsx';

const PlaylistForm = (props) => {
  // props.updatePlaylistId("TEST ARGUMENT 123324732473289");
  const { id, playlistData, setplaylistData } = props;

  const [showButton, setShowButton] = useState(false);
  // declare const for each of our drop downs
  // create React component for each element in drop down (stretch)
  // const genres = ['']

  // onsubmit click handler for create playlist form and send to backend
  const handlePlaylistSubmit = async (event) => {
    // prevent immediately reloading of page when form is submitted
    event.preventDefault();

    // add input from form to constants genre, tempo, and duration
    const playlistName = event.target[0].value;
    const playlistDescription = event.target[1].value;
    const genre = event.target[2].value;
    const tempo = event.target[3].value;
    // change this in the form and cast as a number
    const duration = parseInt(event.target[4].value);

    console.log('type of duration', typeof duration);

    // package form-data into an object
    const requestData = {
      playlistName,
      playlistDescription,
      genre,
      tempo,
      duration,
    };
    console.log(requestData);
    // get request to backend, with body as requestData
    // use await
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };
    // declare const for endpoint to submit playlist form data to
    const playlistSubmitUrl = '/api/getPlaylist';

    // attempting to do fetch with async / await and try/catch block
    try {
      // make request to backend and save response to const
      const response = await fetch(playlistSubmitUrl, requestOptions);
      // console.log('response: ', response);
      // console.log('parsed response: ', JSON.parse(response));
      // jsonify response and save to const playlist
      const playlist = await response.json();
      console.log('playlist id:', playlist);
      // TODO: save playlist data to state and render Spotify iFrame component
      // potentially redirect user as well to new landing page with Spotify iFrame component
      // invoke props.updatePlaylistId, passing in test ID
      props.updatePlaylistId(playlist);

      // display button
      setShowButton(true);
    } catch (error) {
      // handle errors
      console.log('Fetch error is:', error);
    }
  };

  return (
    <div className='border-2 border-sky-500 border-indigo-500 rounded-md'>
      <Breakpoints
        id={id}
        playlistData={playlistData}
        setplaylistData={setplaylistData}
      />
      <label>Genres</label>
      <Genres
        id={id}
        playlistData={playlistData}
        setplaylistData={setplaylistData}
      />
      {/* <div className='formContainer'>
        <form className='playlist-form' onSubmit={handlePlaylistSubmit}>
          <div className='div_input-container'>
            What is the name of your new playlist?
            <label className='input-label'>
              <input className='inputBox'></input>
            </label>
          </div>

          <div className='div_input-container'>
            What is the description of your new playlist?
            <label className='input-label'>
              <input className='inputBox'></input>
            </label>
          </div>

          <div className='dropdown-container'>
            <label className='dropdown-label'>
              What genre are you in the mood for?
              <br />
              <select className='dropdown-menu'>
                <option disabled selected>
                  Select Your Genre
                </option>
                <option value='electronic'>Electronic</option>
                <option value='k-pop'>K-Pop</option>
                <option value='work-out'>Workout</option>
                <option value='jazz'>Jazz</option>
                <option value='classical'>Classical</option>
              </select>
            </label>
          </div>

          <div className='dropdown-container'>
            <label className='dropdown-label'>
              What tempo would you like your playlist to follow?
              <br />
              <select className='dropdown-menu'>
                <option disabled selected>
                  Select Your Tempo
                </option>
                <option value='fast'>Fast</option>
                <option value='slow'>Slow</option>
              </select>
            </label>
          </div>

          <div className='dropdown-container'>
            <label className='dropdown-label'>
              How long would you like your playlist to last?
              <br />
              <select className='dropdown-menu'>
                <option disabled selected>
                  Select Your Duration
                </option>
                <option value='30'>30 minutes</option>
                <option value='60'>60 minutes</option>
                <option value='90'>90 minutes</option>
              </select>
            </label>
          </div>
          <div>
            <button
              type='button'
              onClick={(e) => console.table(props.playlistData)}
            >
              Check Incoming Playlist Data
            </button>
          </div>

          <input
            className='makePlaylist'
            type='submit'
            value='Give me my playlist!'
          />
        </form>

        {showButton && (
          <Link to='/player'>
            <button className='makePlaylist'>Take me to my new playlist</button>
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default PlaylistForm;
