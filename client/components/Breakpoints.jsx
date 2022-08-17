import React from 'react';
import reactDom from 'react-dom';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function Breakpoints(props) {
  const { id, playlistData, setplaylistData } = props;

  // Get the changing value of time and set its state on change
  const [time, setTime] = useState();
  const timeChange = (e) => {
    setTime(e.target.value);
  };
  console.log('I ran the onChange', time);

  return (
    <div className='m-5'>
      <h3 className='py-3'>At Minute: </h3>
      <input
        name='minuteInput'
        value={playlistData[id].end_time}
        type='text'
        onChange={(e) => {
          const updateState = [...playlistData];

          updateState[id].end_time = e.target.value * 1;
          if (updateState[id + 1]) {
            updateState[id + 1].start_time = updateState[id].end_time;
          }

          setplaylistData(updateState);
        }}
      ></input>
      <br></br>
      <div className='m-3'>
        <label>
          <strong>BPM</strong>
        </label>
        <Slider
          type='number'
          onChange={(e) => {
            const updateState = [...playlistData];
            updateState[id].ending_bpm_target = e.target.value;
            if (updateState[id + 1]) {
              updateState[id + 1].starting_bpm_target = e.target.value;
            }
            setplaylistData(updateState);
          }}
          defaultValue={playlistData[id].ending_bpm_target}
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
          type='number'
          onChange={(e) => {
            const updateState = [...playlistData];
            updateState[id].custom_param_ending_values[0] =
              e.target.value / 100;
            if (updateState[id + 1]) {
              updateState[id + 1].custom_param_starting_values[0] =
                e.target.value / 100;
            }
            setplaylistData(updateState);
          }}
          defaultValue={playlistData[id].custom_param_ending_values[0] * 100}
          min={0}
          max={100}
          step={10}
          valueLabelDisplay='on'
        />
      </div>
    </div>
  );
}
export default Breakpoints;
