import React from 'react';
import PlaylistForm from './PlaylistForm.jsx';

const PlaylistPage = (props) => {
  const {
    playlistData,
    setplaylistData,
    breakpointsArr,
    setbreakpointsArr,
    genresArr,
    setgenresArr,
  } = props;

  const segments = playlistData.map((element, index) => {
    return (
      <PlaylistForm
        key={index}
        id={index}
        playlistData={playlistData}
        setplaylistData={setplaylistData}
        breakpointsArr={breakpointsArr}
        setbreakpointsArr={setbreakpointsArr}
        genresArr={genresArr}
        setgenresArr={setgenresArr}
      />
    );
  });

  return (
    <div id='formPage'>
      <h1>Fill out the form below to generate a new playlist</h1>
      {/* <PlaylistForm
        playlistData={playlistData}
        setplaylistData={setplaylistData}
        updatePlaylistId={props.updatePlaylistId}
      /> */}
      {segments}
      {/* placeholder for Spotify component with iFrame */}
    </div>
  );
};

export default PlaylistPage;
