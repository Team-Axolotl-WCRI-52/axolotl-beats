import React from 'react';
import { Link } from 'react-router-dom';

const EmbeddedPlayer = props => {
  const uri = `https://open.spotify.com/embed/playlist/${props.playlistId}?utm_source=generator`
  return(
    <div>
      <iframe
        src={uri}
        width="100%"
        height="380"
        //allow="autoplay; clipboard-write; encrypted-media;"
      >
      </iframe>


      <div className='makePlaylist-container'>
        <Link to='/playlistform'><button className='makePlaylist'>Make a new playlist!</button></Link>
        </div>
      </div>
  )
}

export default EmbeddedPlayer;
//<iframe style="border-radius:12px"  width="100%" height="380" frameBorder="0" allowfullscreen=""  fullscreen; picture-in-picture">
//</iframe>