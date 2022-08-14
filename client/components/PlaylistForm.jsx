import React from 'react';

const PlaylistForm = (props) => {

  // declare const for each of our drop downs
  // create React component for each element in drop down (stretch)
  const genres = ['']

  // onsubmit click handler for create playlist form 
  const handlePlaylistSubmit = (event) => {
    event.preventDefault();
    // send form data to backend
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    console.log(event.target[2].value);
    const genre = event.target[0].value;
    const tempo = event.target[1].value;
    const duration = event.target[2].value;
    // package form-data into an object
    const requestData = {genre, tempo, duration};
    console.log(requestData);
    // get request to backend, with body as requestData
    // use await
  }

  return (
  <div>
    <div className='formContainer'>
      <form className='playlist-form' onSubmit={handlePlaylistSubmit}>

        {/* Stretch feature: sliding scale for tempo
         <div>
          <label htmlFor="tempo">What tempo would you like your playlist to be?</label>
          <input type="range" id="tempo" name="tempo"
                min="1" max="2"/>
        </div> */}

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
