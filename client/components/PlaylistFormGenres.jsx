import React from 'react';

const PlaylistFormGenres = (props) => {
  return(
    
    <div className='dropdown-container'>
      <label className='dropdown-label'>
        What genre are you in the mood for?<br/>
        <select className='dropdown-menu'>
          <option disabled selected>Select Your Genre</option>
          <option value="electronic">Electronic</option>
          <option value="k-pop">K-Pop</option>
          <option value="work-out">Workout</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Classical</option>
          <option value="add-new-genre">Add New Genre</option>
        </select>
      </label>
    </div>
  )
}

export default PlaylistFormGenres;