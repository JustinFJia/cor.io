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
    data = data[data.length - 1]

    const formOne = data.startFormationList[0].formation
    const formOneTitle = formOne.substring(0, formOne.indexOf('-'))
    const formOneShape = formOneTitle.substring(11)
    const formOneDetail = formOne.substring(formOne.indexOf('-'))
    const formTwo = data.startFormationList[1].formation
    const formTwoTitle = formTwo.substring(0, formTwo.indexOf('-'))
    const formTwoShape = formTwoTitle.substring(11)
    const formTwoDetail = formTwo.substring(formTwo.indexOf('-'))
    const formThree = data.startFormationList[2].formation
    const formThreeTitle = formThree.substring(0, formThree.indexOf('-'))
    const formThreeShape = formThreeTitle.substring(11)
    const formThreeDetail = formThree.substring(formThree.indexOf('-'))
    const formFour = data.startFormationList[3].formation
    const formFourTitle = formFour.substring(0, formFour.indexOf('-'))
    const formFourShape = formFourTitle.substring(11)
    const formFourDetail =formFour.substring(formFour.indexOf('-'))
    const formFive = data.startFormationList[4].formation
    const formFiveTitle = formFive.substring(0, formFive.indexOf('-'))
    const formFiveShape = formFiveTitle.substring(11)
    const formFiveDetail = formFive.substring(formFive.indexOf('-'))

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
                        <p>{formOneShape}</p>
                    </div>
                    <div className='formationCard' id='formation-2' onClick={() => togglePopupFormation(1)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>{formTwoShape}</p>
                    </div>
                    <div className='formationCard' id='formation-3' onClick={() => togglePopupFormation(2)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>{formThreeShape}</p>
                    </div>
                </div>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-4' onClick={() => togglePopupFormation(3)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>{formFourShape}</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={() => togglePopupFormation(4)}>
                        <FontAwesomeIcon icon={faCircleInfo} className='infoToolTip' />
                        <p>{formFiveShape}</p>
                    </div>
                </div>
                <button className='requeryButton' id='requery' onClick={() => togglePopupRequery()}><FontAwesomeIcon icon={faArrowRotateRight} className='requery' size='lg' />regenerate formations</button>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(0)} />
                    <h1>{formOneTitle}</h1>
                    <p>{formOneDetail}</p>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(1)}>select this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(1)} />
                    <h1>{formTwoTitle}</h1>
                    <p>{formTwoDetail}</p>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(2)}>select this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(2)} />
                    <h1>{formThreeTitle}</h1>
                    <p>{formThreeDetail}</p>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(3)}>select this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(3)} />
                    <h1>{formFourTitle}</h1>
                    <p>{formFourDetail}</p>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(4)}>select this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='requeryPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(4)} />
                    <h1>{formFiveTitle}</h1>
                    <p>{formFiveDetail}</p>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(5)}>select this formation</button>
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