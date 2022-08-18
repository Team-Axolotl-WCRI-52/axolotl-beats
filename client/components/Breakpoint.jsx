import React from 'react';
import reactDom from 'react-dom';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function Breakpoint(props) {
  const { id, breakpointsArr, setbreakpointsArr } = props;

  // Get the changing value of time and set its state on change

  return (
    <div className='m-5'>
      <h3 className='py-3'>At Minute: </h3>
      <input
        name='minuteInput'
        value={breakpointsArr[id].minute}
        type='text'
        onChange={(e) => {
          const updateState = [...breakpointsArr];
          updateState[id].minute = e.target.value * 1;
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
            const updateState = [...breakpointsArr];
            updateState[id].bpm = e.target.value;
            setplaylistData(updateState);
          }}
          defaultValue={breakpointsArr[id].bpm}
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
            const updateState = [...breakpointsArr];
            updateState[id].custom_params.danciness = e.target.value;
            setplaylistData(updateState);
          }}
          defaultValue={breakpointsArr[id].custom_params.danciness * 100}
          min={0}
          max={100}
          step={10}
          valueLabelDisplay='on'
        />
      </div>
    </div>
  );
}
export default Breakpoint;
