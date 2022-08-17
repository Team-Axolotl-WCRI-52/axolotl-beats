import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        const url = 'https://accounts.spotify.com/en/logout';
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');
        setTimeout(() => {
            navigate('/');
            spotifyLogoutWindow.close()
        }, 2000);
    }

    return (
        <>
            <nav id='navBar'>
                <ul className="navList">
                    <li className='links' id='logoutButton' onClick={logout}><a className='bye'>Logout</a></li>
                </ul>
                <ul className="navList">
                    <li className='links' id='create-playlist' onClick={() => navigate('/playlistform')}><a className='bye' id='create-playlist1'>Create a new Playlist</a></li>
                    {/* <li> Create Playlist</li> */}
                </ul>
                <ul className="navList">
                    <li className='links' id='play-beats' onClick={() => navigate('/player')}><a className='bye'>Play some beats!</a></li>
                    {/* <li>Go to player</li> */}
                </ul>
            </nav>
            <div id='title'>
                <div id='name'>Axolotl Beats</div>
                <div id='slogan'>beats forEach</div>
            </div>
        </>
    )
}

export default Navbar