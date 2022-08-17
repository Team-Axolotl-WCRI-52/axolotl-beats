import React from 'react';
import reactDom from 'react-dom';
import Slider from '@mui/material/Slider';

function Breakpoints(props) {
  const { id, playlistData, setplaylistData } = props;

  return (
    <div className='m-5'>
      <h3 className='py-3'>At Minute: </h3>
      <input name='minuteInput'></input>
      <br></br>
      <div className='m-3'>
        <label>
          <strong>BPM</strong>
        </label>
        <Slider
          aria-label='Always visible'
          defaultValue={playlistData[id].starting_bpm_target}
          min={30}
          max={200}
          valueLabelDisplay='on'
        />
      </div>
      <div className='m-3'>
        <label>
          <strong>Danciness</strong>
        </label>
        <Slider
          aria-label='Always visible'
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.01}
          valueLabelDisplay='on'
        />
      </div>
    </div>
  );
}
export default Breakpoints;
