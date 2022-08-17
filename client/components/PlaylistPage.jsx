import React from 'react';
import PlaylistForm from './PlaylistForm.jsx';

const PlaylistPage = (props) => {

  return (
    <div id='formPage'>
      <h1>Fill out the questions below to generate a new playlist</h1>
      <PlaylistForm updatePlaylistId={props.updatePlaylistId}/>
    </div>
  )
};

export default PlaylistPage;
