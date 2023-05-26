import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import logoBlue from '../assets/logo-blue.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const GetSong = ({ updateCentralInfo }) => {

    const navigate = useNavigate();

    const [vibes, updateVibes] = useState(undefined);

    const goToSongsList = async (event, cause) => {
        if (cause == 'key' && event.key != 'Enter') {
            return;
        }
        event.preventDefault()
        try {
            const req = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ vibes }),
            };
            const res = await fetch("http://localhost:8080/vibes", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/select-song'));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='getSongBox'>
            <div className='headerWhite'>
                <FontAwesomeIcon icon={faArrowLeft} className='backButtonBlue' size='3x' onClick={() => navigate('/')} />
                <h1><img src={logoBlue} alt='logo'></img></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='getSongContainer'>
                <p>What are the vibes of your piece?</p>
                <form className='userInput'>
                    <input type="text" className='userVibes' onChange={(e) => updateVibes(e.target.value)} onKeyDown={(e) => goToSongsList(e, 'key')}></input>
                    <input type="submit" value="submit" className='getSongButton' onClick={(e) => goToSongsList(e, 'click')}></input>
                </form>
            </div>
        </div>
    )
}

export default GetSong;