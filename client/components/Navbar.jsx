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
            </nav>
            <div id='title'>
                <div id='name'>Axolotl Beats</div>
                <div id='slogan'>beats forEach</div>
            </div>
        </>
    )
}

export default Navbar