import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateRight, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CentralInfoContext } from '../context';

const GetStartFormation = () => {

    const navigate = useNavigate()

    const [feedback, updateFeedback] = useState(undefined)

    let data = useContext(CentralInfoContext)
    console.log(data)

    const goToFormations = () => {

    }

    const togglePopupDisplay = (e) => {
        var modal = document.getElementsByClassName('requeryPopupBox')[0];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    const FormationPopupDisplay1 = (e) => {
        var modal = document.getElementsByClassName('requeryPopupBox')[0];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    const FormationPopupDisplay2 = (e) => {
        var modal = document.getElementsByClassName('requeryPopupBox')[1];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    const FormationPopupDisplay3 = (e) => {
        var modal = document.getElementsByClassName('requeryPopupBox')[2];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }


    const FormationPopupDisplay4 = (e) => {
        var modal = document.getElementsByClassName('requeryPopupBox')[3];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    const FormationPopupDisplay5 = (e) => {
        var modal = document.getElementsByClassName('requeryPopupBox')[4];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    return (
        <div className='selectStartFormationBox'>
            <div className='headerWhite'>
                <FontAwesomeIcon icon={faArrowLeft} className='backButtonWhite' size='3x' onClick={() => navigate('/select-song')}/>
                <h1><img src={logoWhite} alt='logo'></img></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='selectStartFormationContent'>
                <p className='headerText'>Here’s are 5 starting formations. Click on one for a more in-depth description.</p>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-1' onClick={(e) => FormationPopupDisplay1(e)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip'/>
                        <p>Formation 1</p>
                    </div>
                    <div className='formationCard' id='formation-2' onClick={(e) => FormationPopupDisplay2(e)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip'/>
                        <p>Formation 2</p>
                    </div>
                    <div className='formationCard' id='formation-3' onClick={(e) => FormationPopupDisplay3(e)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip'/>
                        <p>Formation 3</p>
                    </div>
                </div>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-4' onClick={(e) => FormationPopupDisplay4(e)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip'/>
                        <p>Formation 4</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={(e) => FormationPopupDisplay5(e)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip'/>
                        <p>Formation 5</p>
                    </div>
                </div>
                <button className='requeryButton' id='requery' onClick={(e) => togglePopupDisplay(e)}><FontAwesomeIcon icon={faArrowRotateRight} className='requery' size='lg'/>regenerate songs list</button>
            </div>
            <div className='requeryPopupBox' style={{ display: 'none' }}>
                    <div className='requeryPopupContainer'>
                        <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={FormationPopupDisplay1}/>
                        <h1>Formation 1</h1>
                        <ol>
                            <li>description 1</li>
                            <li>description 2</li>
                            <li>description 3</li>
                        </ol>
                       
            </div>
                </div>
            <div className='requeryPopupBox' style={{ display: 'none' }}>
                    <div className='requeryPopupContainer'>
                        <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={FormationPopupDisplay2}/>
                        <h1>Formation 2</h1>
                        <ol>
                            <li>description 1</li>
                            <li>description 2</li>
                            <li>description 3</li>
                        </ol>
                       
                    </div>
            </div>
            <div className='requeryPopupBox' style={{ display: 'none' }}>
                    <div className='requeryPopupContainer'>
                        <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={FormationPopupDisplay3}/>
                        <h1>Formation 3</h1>
                        <ol>
                            <li>description 1</li>
                            <li>description 2</li>
                            <li>description 3</li>
                        </ol>
                       
                    </div>
            </div>
            <div className='requeryPopupBox' style={{ display: 'none' }}>
                    <div className='requeryPopupContainer'>
                        <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={FormationPopupDisplay4}/>
                        <h1>Formation 4</h1>
                        <ol>
                            <li>description 1</li>
                            <li>description 2</li>
                            <li>description 3</li>
                        </ol>
                       
                    </div>
            </div>
            <div className='requeryPopupBox' style={{ display: 'none' }}>
                    <div className='requeryPopupContainer'>
                        <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={FormationPopupDisplay5}/>
                        <h1>Formation 5</h1>
                        <ol>
                            <li>description 1</li>
                            <li>description 2</li>
                            <li>description 3</li>
                        </ol>
                       
                    </div>
            </div>
        </div>
    )
}

export default GetStartFormation;


