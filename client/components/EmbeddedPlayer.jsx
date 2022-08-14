import React from 'react';

const EmbeddedPlayer = props => {
  const uri = 'https://open.spotify.com/playlist/5jqYSvS370tM8WRUxQoiHp?si=b31478fb6809433e'
  return(
    <div>
      <iframe
        src={uri}
        width="50%"
        height="380"
        //allow="autoplay; clipboard-write; encrypted-media;"
      >
      </iframe>
    </div>
  )
}

export default EmbeddedPlayer;
//<iframe style="border-radius:12px"  width="100%" height="380" frameBorder="0" allowfullscreen=""  fullscreen; picture-in-picture">
//</iframe>