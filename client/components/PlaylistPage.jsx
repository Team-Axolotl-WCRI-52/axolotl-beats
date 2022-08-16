import React from 'react';
import PlaylistForm from './PlaylistForm.jsx';

const PlaylistPage = (props) => {

  return (
  <div id='formPage'>
    <h1>Fill out the form below to generate a new playlist</h1>
    <PlaylistForm updatePlaylistId={props.updatePlaylistId}/>
    {/* placeholder for Spotify component with iFrame */}
  </div>
  )
};

export default PlaylistPage;
