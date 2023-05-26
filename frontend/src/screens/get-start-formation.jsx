import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateRight, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CentralInfoContext } from '../context';

const GetStartFormation = ({ updateCentralInfo }) => {

    const navigate = useNavigate()

    const [feedback, updateFeedback] = useState(undefined)

    let data = useContext(CentralInfoContext)
    console.log(data) // delete eventually
    data = data[data.length - 1]

    const skipFeedback = (e) => {
        updateFeedback('')
        requery(e, 'click')
    }

    const requery = async (event, cause) => {
        if (cause == 'key' && event.key != 'Enter') {
            return
        }
        event.preventDefault()
        try {
            const req = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback }),
            }
            const res = await fetch("http://localhost:8080/startformrequery", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/select-start-formation'))
        } catch (err) {
            console.log(err)
        }
    }

    const goToFullFormations = async (formNum) => {
        const form = data.startFormationList[formNum - 1]
        try {
            const req = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ form }),
            }
            const res = await fetch("http://localhost:8080/startform", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/select-more-formations'))
        } catch (err) {
            console.log(err)
        }
    }

    const togglePopupFormation = (i) => {
        var modal = document.getElementsByClassName('formationPopupBox')[i];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    const togglePopupRequery = () => {
        var modal = document.getElementsByClassName('requeryPopupBox')[0];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    return (
        <div className='selectStartFormationBox'>
            <div className='headerWhite'>
                <FontAwesomeIcon icon={faArrowLeft} className='backButtonWhite' size='3x' onClick={() => navigate('/select-song')} />
                <h1><img src={logoWhite} alt='logo'></img></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='selectStartFormationContent'>
                <p className='headerText'>Here’s a list of 5 starting formations. Click on one for a more in-depth description.</p>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-1' onClick={() => togglePopupFormation(0)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>Formation 1</p>
                    </div>
                    <div className='formationCard' id='formation-2' onClick={() => togglePopupFormation(1)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>Formation 2</p>
                    </div>
                    <div className='formationCard' id='formation-3' onClick={() => togglePopupFormation(2)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>Formation 3</p>
                    </div>
                </div>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-4' onClick={() => togglePopupFormation(3)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>Formation 4</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={() => togglePopupFormation(4)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>Formation 5</p>
                    </div>
                </div>
                <button className='requeryButton' id='requery' onClick={() => togglePopupRequery()}><FontAwesomeIcon icon={faArrowRotateRight} className='requery' size='lg' />regenerate songs list</button>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(0)} />
                    <h1>Formation 1</h1>
                    <ol>
                        <li>description 1</li>
                        <li>description 2</li>
                        <li>description 3</li>
                    </ol>
                    {/* after the `select this formation` button is added here, make it call "goToFullFormations" on click */}
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(1)} />
                    <h1>Formation 2</h1>
                    <ol>
                        <li>description 1</li>
                        <li>description 2</li>
                        <li>description 3</li>
                    </ol>
                    {/* after the `select this formation` button is added here, make it call "goToFullFormations" on click */}
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(2)} />
                    <h1>Formation 3</h1>
                    <ol>
                        <li>description 1</li>
                        <li>description 2</li>
                        <li>description 3</li>
                    </ol>
                    {/* after the `select this formation` button is added here, make it call "goToFullFormations" on click */}
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(3)} />
                    <h1>Formation 4</h1>
                    <ol>
                        <li>description 1</li>
                        <li>description 2</li>
                        <li>description 3</li>
                    </ol>
                    {/* after the `select this formation` button is added here, make it call "goToFullFormations" on click */}
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(4)} />
                    <h1>Formation 5</h1>
                    <ol>
                        <li>description 1</li>
                        <li>description 2</li>
                        <li>description 3</li>
                    </ol>
                    {/* after the `select this formation` button is added here, make it call "goToFullFormations" on click */}
                </div>
            </div>
            <div className='requeryPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupRequery()} />
                    <p>Great! Do you have any feedback you want to include in your requery?</p>
                    <form className='userInput'>
                        <input type="text" className='userFeedback' onChange={(e) => updateFeedback(e.target.value)} onKeyDown={(e) => requery(e, 'key')}></input>
                        <div className='requeryButtonsContainer'>
                            <button className='skipFeedbackButton' onClick={(e) => skipFeedback(e)}>skip feedback</button>
                            <input type="submit" value="submit feedback" className='getSongButton' onClick={(e) => requery(e, 'click')}></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GetStartFormation;