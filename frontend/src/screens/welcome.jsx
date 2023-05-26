import { useState } from 'react';
import './styles.css';
import logoLarge from '../assets/logo-large.png';

const Welcome = () => {

    const goToGetSong = () => {
        window.location.pathname = "/start";
    }

    return (
        <div className='homepageBox'>
            <div className='homepageContent'>
                <p>let AI be your dance partner</p>
                <h1><img src={logoLarge} alt='logo'></img></h1>
                <button className='getStartedButton' onClick={goToGetSong}>get started</button>
            </div>
        </div>
    )
}

export default Welcome;