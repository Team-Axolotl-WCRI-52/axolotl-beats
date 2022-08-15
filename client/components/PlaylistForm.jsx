import React from 'react';

const PlaylistForm = (props) => {

  // declare const for each of our drop downs
  // create React component for each element in drop down (stretch)
  // const genres = ['']

  // onsubmit click handler for create playlist form and send to backend
  const handlePlaylistSubmit = async (event) => {
    // prevent immediately reloading of page when form is submitted
    event.preventDefault();

    // add input from form to constants genre, tempo, and duration
    const genre = event.target[0].value;
    const tempo = event.target[1].value;
    const duration = event.target[2].value;

    // package form-data into an object
    const requestData = {genre, tempo, duration};
    console.log(requestData);
    // get request to backend, with body as requestData
    // use await
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
    } catch (error) { // handle errors
      console.log('Fetch error is:', error);
    }
    
  }

  return (
  <div>
    <div className='formContainer'>
      <form className='playlist-form' onSubmit={handlePlaylistSubmit}>

        <div className='dropdown-container'>
          <label className='dropdown-label'>
            What genre are you in the mood for?<br/>
            <select>
              <option value="electronic">Electronic</option>
              <option value="rap">Rap</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
            </select>
          </label>
        </div>

        <div className='dropdown-container'>
          <label className='dropdown-label'>
            What tempo would you like your playlist to follow?<br/>
            <select>
              <option value="fast">Fast</option>
              <option value="slow">Slow</option>
            </select>
            </label>
        </div>

        <div className='dropdown-container'>
          <label className='dropdown-label'>
          How long would you like your playlist to last?<br/>
            <select>
              <option value="30-min">30 minutes</option>
            </select>
          </label>
        </div>

        <input type="submit" value="Give me my playlist!"/>

      </form>

    </div>
  </div>
  )
};

export default PlaylistForm;