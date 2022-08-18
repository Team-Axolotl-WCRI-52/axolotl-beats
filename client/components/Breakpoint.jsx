import React from 'react';
import reactDom from 'react-dom';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function Breakpoint(props) {
  const { id, breakpointsArr, setbreakpointsArr } = props;

  // Get the changing value of time and set its state on change

  let minuteZeroOrEntry;

  if (id === 0) {
    minuteZeroOrEntry = (<h3 className='py-3'>Minute: 0</h3>)
  } else {
    minuteZeroOrEntry = (
      <div>
      <label className='py-3' for="minute">Minute: </label>
      <input className ="w-10" id="minute"
        name='minuteInput'
        value={breakpointsArr[id].minute}
        type='text'
        onChange={(e) => {
          const updateState = [...breakpointsArr];
          updateState[id].minute = e.target.value * 1;
          setbreakpointsArr(updateState);
        }}
      ></input>
      </div>
    )
  };

  const minuteZeroOrEntry3 = (
      <input
        name='minuteInput'
        value={breakpointsArr[id].minute}
        type='text'
        onChange={(e) => {
          const updateState = [...breakpointsArr];
          updateState[id].minute = e.target.value * 1;
          setbreakpointsArr(updateState);
        }}
      ></input>
    )


  return (
    <div className='m-5'>
      {minuteZeroOrEntry}
      {/* <input
        name='minuteInput'
        value={breakpointsArr[id].minute}
        type='text'
        onChange={(e) => {
          const updateState = [...breakpointsArr];
          updateState[id].minute = e.target.value * 1;
          setbreakpointsArr(updateState);
        }}
      ></input> */}


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
            setbreakpointsArr(updateState);
          }}
          value={breakpointsArr[id].bpm}
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
            setbreakpointsArr(updateState);
          }}
          value={breakpointsArr[id].custom_params.danciness * 100}
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
