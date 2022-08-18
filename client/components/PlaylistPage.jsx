import React from 'react';
import PlaylistForm from './PlaylistForm.jsx';
import Breakpoint from './Breakpoint.jsx';
import Segment from './Segment.jsx';

function remixBreakpointsAndSegmentDataIntoAnArrForServer(
  breakpointsArr,
  segmentsArr
) {
  const arrForServer = [];
  for (let i = 0; i < segmentsArr.length; i++) {
    const custom_params = Object.keys(breakpointsArr[i].custom_params); // this implicitly assumes that breakpoint-objects i and i+1 have the same custom_params objects.... so really we should just update this in STATE at some point, and then the present code can be cleaned up slightly.
    const segmentObj = {
      start_time: breakpointsArr[i].minute,
      end_time: breakpointsArr[i + 1].minute,
      starting_bpm_target: breakpointsArr[i].bpm,
      ending_bpm_target: breakpointsArr[i + 1].bpm,
      genres: segmentsArr[i].genres,
      custom_params,
      custom_param_starting_values: custom_params.map(
        (parameterName) => breakpointsArr[i].custom_params[parameterName]
      ),
      custom_param_ending_values: custom_params.map(
        (parameterName) => breakpointsArr[i + 1].custom_params[parameterName]
      ),
    };

    arrForServer.push(segmentObj);
  }
  return arrForServer;
}

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
      <button
        type='button'
        onClick={() => {
          fetch('/api/getDynamicPlaylist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              playlistName: 'our beautiful playlist',
              segments: remixBreakpointsAndSegmentDataIntoAnArrForServer(
                breakpointsArr,
                segmentsArr
              ),
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
      >
        Create Playlist!
      </button>
    </div>
  );
};

export default PlaylistPage;
