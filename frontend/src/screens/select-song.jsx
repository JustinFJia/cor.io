import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CentralInfoContext } from '../context';

const SelectSong = ({ updateCentralInfo }) => {

    const navigate = useNavigate();

    const [feedback, updateFeedback] = useState(undefined)

    let data = useContext(CentralInfoContext)
    data = data[data.length - 1].data

    const skipFeedback = (e) => {
        updateFeedback('')
        requery(e, 'click')
    }

    const requery = async (event, cause) => {
        if (cause == 'key' && event.key != 'Enter') {
            return
        }
        event.preventDefault()
        togglePopupDisplay();
        try {
            const req = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback }),
            };
            const res = await fetch("http://localhost:8080/songsrequery", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/songs'));
        } catch (err) {
            console.log(err)
        }
    }

    const goToFormations = async (songNum) => {
        const song = data.songList[songNum - 1]
        try {
            const req = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ song }),
            }
            const res = await fetch("http://localhost:8080/startform", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/start-formations'))
        } catch (err) {
            console.log(err)
        }
    }

    const togglePopupDisplay = () => {
        const modal = document.getElementsByClassName('requeryPopupBox')[0];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    return (
        <div className='selectSongBox'>
            <div className='headerWhite'>
                <Link to='/start'><FontAwesomeIcon icon={faArrowLeft} className='backButtonSelectSong' size='3x' /></Link>
                <h1><Link to="/"><img src={logoWhite} alt='logo'></img></Link></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='selectSongContent'>
                <h2>Great!</h2>
                <p className='headerText'>Here are 3 songs with the vibe “{data.vibes}”. Which would you prefer?</p>
                <div className='songCardsContainer'>
                    <div className='songCard' onClick={() => goToFormations(1)}>
                        <p>{data.songList[0].songName}</p>
                        <p>by {data.songList[0].songArtist}</p>
                    </div>
                    <div className='songCard' onClick={() => goToFormations(2)}>
                        <p>{data.songList[1].songName}</p>
                        <p>by {data.songList[1].songArtist}</p>
                    </div>
                    <div className='songCard' onClick={() => goToFormations(3)}>
                        <p>{data.songList[2].songName}</p>
                        <p>by {data.songList[2].songArtist}</p>
                    </div>
                </div>
                <button className='requeryButton requery songsRequery' onClick={() => togglePopupDisplay()}><FontAwesomeIcon icon={faArrowRotateRight} size='1x' />regenerate songs list</button>
            </div>
            <div className='requeryPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupDisplay()} />
                    <p>Great! Do you have any feedback you want to include in your requery?</p>
                    <form className='userInput'>
                        <input type="text" className='userFeedback' onChange={(e) => updateFeedback(e.target.value)} onKeyDown={(e) => requery(e, 'key')}></input>
                        <div className='requeryButtonsContainer'>
                            <button className='skipFeedbackSongButton' onClick={(e) => skipFeedback(e)}>skip feedback</button>
                            <input type="submit" value="submit feedback" className='submitFeedbackSongButton' onClick={(e) => requery(e, 'click')}></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SelectSong;