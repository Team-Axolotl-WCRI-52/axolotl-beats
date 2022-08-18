import React from 'react';
import PlaylistForm from './PlaylistForm.jsx';
import Breakpoint from './Breakpoint.jsx';
import Segment from './Segment.jsx';

const PlaylistPage = (props) => {
  const {
    playlistData,
    setplaylistData,
    breakpointsArr,
    setbreakpointsArr,
    segmentsArr,
    setSegmentsArr,
  } = props;

  const breakpoints = breakpointsArr.map((element, index) => {
    return (
      <Breakpoint
        key={`breakpoint-${index}`}
        id={index}
        breakpointsArr={breakpointsArr}
        setbreakpointsArr={setbreakpointsArr}
      />
    );
  });

  const segments = segmentsArr.map((element, index) => {
    console.log(segments);
    return (
      <Segment
        key={`segment-${index}`}
        id={index}
        segmentsArr={segmentsArr}
        setSegmentsArr={setSegmentsArr}
      />
    );
  });

  const result = [];
  breakpoints.forEach((element, index) => {
    result.push(element);
    if (segments[index]) {
      result.push(segments[index]);
    }
  });

  return (
    <div id='formPage'>
      <h1>Fill out the form below to generate a new playlist</h1>
      {/* <PlaylistForm
        playlistData={playlistData}
        setplaylistData={setplaylistData}
        updatePlaylistId={props.updatePlaylistId}
      /> */}
      {result}
      {/* placeholder for Spotify component with iFrame */}
    </div>
  );
};

export default PlaylistPage;
