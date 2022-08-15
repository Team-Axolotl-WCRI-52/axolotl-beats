import React from 'react';
import { Link } from 'react-router-dom';

const TempReroute = () => {
  return(
    <div>
      <Link to='/player'>Player</Link>
      <Link to='/playlistform'>Playlist Form</Link>
    </div>
  )
}

export default TempReroute;