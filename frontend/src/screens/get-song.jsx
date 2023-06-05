import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const GetSong = ({ updateCentralInfo }) => {

    const navigate = useNavigate();

    const [vibes, updateVibes] = useState(undefined);

    const goToSongsList = async (event, cause) => {
        if ((cause == 'key' && event.key != 'Enter') || document.getElementById('userVibes').value == "") {
            return;
        }
        event.preventDefault()
        try {
            document.getElementsByClassName('getSongButton')[0].style.backgroundColor = "#276bd0";
            const req = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ vibes }),
            };
            document.getElementById('loader-container').style.display = 'flex'
            const res = await fetch("http://localhost:8080/songs", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/songs'));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='getSongBox'>
            <div id='loader-container'></div>
            <div className='headerWhite'>
                <Link to='/'><FontAwesomeIcon icon={faArrowLeft} className='backButtonVibes' size='3x' /></Link>
                <h1><Link to="/"><img src={logoWhite} alt='logo'></img></Link></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='getSongContainer'>
                <h2>Let's find you a song.</h2>
                <div className='getSongContent'>
                    <p>What are the vibes you envision?</p>
                    <form className='userInput'>
                        <input required type="text" id='userVibes' className='userVibes' onChange={(e) => updateVibes(e.target.value)} onKeyDown={(e) => goToSongsList(e, 'key')}></input>
                        <input type="submit" value="submit" className='getSongButton' onClick={(e) => goToSongsList(e, 'click')}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GetSong;