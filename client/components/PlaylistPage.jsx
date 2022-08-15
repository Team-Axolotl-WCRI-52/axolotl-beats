import React from 'react';
import PlaylistForm from './PlaylistForm.jsx';

const PlaylistPage = (props) => {

  return (
  <div>
    <h2>Welcome to Your Axolotl Playlist Page</h2>
    <PlaylistForm updatePlaylistId={props.updatePlaylistId}/>
    {/* placeholder for Spotify component with iFrame */}
  </div>
  )
};

export default PlaylistPage;
