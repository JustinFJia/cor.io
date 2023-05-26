import { useState } from 'react';
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateRight, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const GetCostume = () => {

    const backToFormation = () => {
        window.location.pathname = "/get-start-formation";
    }

    const goToFormations = () => {

    }

    const togglePopupDisplay = (e) => {
        console.log(e.currentTarget.id);
    }

    return (
        <div className='getSongBox'>
            <div className='headerWhite'>
                <p>See your curated costume scheme below. Follow it directly or use it for inspiration!</p>
                <FontAwesomeIcon icon={faArrowLeft} className='backButtonBlue' size='3x' onClick={backToWelcome}/>
                <h1><img src={logoBlue} alt='logo'></img></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='getSongContainer'>
                <form className='userInput' action="./select-costume">
                    <input type="text" className='userVibes'></input>
                    <input type="submit" value="submit" className='getCostumeButton'></input>
                </form>
            </div>
        </div>
    )
}

export default GetStartFormation;