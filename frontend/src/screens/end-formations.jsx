import { useState } from 'react';
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateRight, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const GetMoreFormations = () => {

    const backToStartFormations = () => {
        window.location.pathname = "/select-start-formation";
    }

    const goToCostumes = () => {

    }

    const togglePopupDisplay = (e) => {
        console.log(e.currentTarget.id);
    }

    return (
        <div className='selectMoreFormationsBox'>
            <div className='headerWhite'>
                <FontAwesomeIcon icon={faArrowLeft} className='backButtonWhite' size='3x' onClick={backToStartFormations}/>
                <h1><img src={logoWhite} alt='logo'></img></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='selectMoreFormationsContent'>
                <p>Here are the other formations based on the starting formation you selected. Click on one for a more in-depth description.</p>
                <div className='formationCardsContainer' onClick={(e) => togglePopupDisplay(e)}>
                    <div className='formationCard' id='formation-1' onClick={(e) => togglePopupDisplay(e)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip'/>
                        <p>Formation 1</p>
                    </div>
                    <div className='formationCard' id='formation-2' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 2</p>
                    </div>
                    <div className='formationCard' id='formation-3' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 3</p>
                    </div>
                </div>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-4' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 4</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 5</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 6</p>
                    </div>
                </div>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-4' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 7</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 8</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={(e) => togglePopupDisplay(e)}>
                        <p>Formation 9</p>
                    </div>
                </div>
                <button className='requeryButton' id='requery' onClick={(e) => togglePopupDisplay(e)}><FontAwesomeIcon icon={faArrowRotateRight} className='requery' size='lg'/>Regenerate formations</button>
                <button className='requeryButton' id='requery' onClick={(e) => togglePopupDisplay(e)}><FontAwesomeIcon icon={faArrowRotateRight} className='requery' size='lg'/>Continue to costumes</button>
            </div>
        </div>
    )
}

export default GetMoreFormations;