import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
    data = data[data.length - 1].data

    for (let i = 0; i < 5; ++i) {
        const form = data.startFormationList[i].formation
        const lowerForm = form.toLowerCase()
        if (lowerForm.includes('v-shape')) {
            const idx = lowerForm.indexOf('v-shape')
            data.startFormationList[i].formation = form.substring(0, idx) + 'V Shape' + form.substring(idx + 7)
        } else if (lowerForm.includes('x-shape')) {
            const idx = lowerForm.indexOf('x-shape')
            data.startFormationList[i].formation = form.substring(0, idx) + 'X Shape' + form.substring(idx + 7)
        } else if (lowerForm.includes('semi-circle')) {
            const idx = lowerForm.indexOf('semi-circle')
            data.startFormationList[i].formation = form.substring(0, idx) + 'Semicircle' + form.substring(idx + 11)
        }

        const vis = data.startFormationList[i].visualization
        if (vis == '') {
            data.startFormationList[i].visualization = 'novis'
        }
    }
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
    const formFourDetail = formFour.substring(formFour.indexOf('-'))
    const formFive = data.startFormationList[4].formation
    const formFiveTitle = formFive.substring(0, formFive.indexOf('-'))
    const formFiveShape = formFiveTitle.substring(11)
    const formFiveDetail = formFive.substring(formFive.indexOf('-'))

    // Breaks formation details into array of bullet points
    const parseFormationDetails =(fm) => {
        var indices = [];
        for (var i=0; i<fm.length; i++) {
            if (fm[i] === "-") indices.push(i);
        }
        var details = [];
        for (var i=0; i<indices.length; i++) {
            if (i < indices.length-1) {
                details.push(fm.substring((indices[i] + 2), indices[i+1]));
            }
            else {
                details.push(fm.substring((indices[i] + 2)));
            }
        }
        return details;
    }

    const renderFormationDetails = (fms) => {
        var detailsParsed = parseFormationDetails(fms);
        return(
            <ul className='formationDetailsList'>
                {
                    detailsParsed.map(detail => {
                        return <li>{detail}</li>
                    })
                }
            </ul>
        );
    }

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
            document.getElementById('loader-container').style.display = 'flex'
            const res = await fetch("http://localhost:8080/startformrequery", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/start-formations'))
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
            document.getElementById('loader-container').style.display = 'flex'
            const res = await fetch("http://localhost:8080/fullform", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/full-formations'))
        } catch (err) {
            console.log(err)
        }
    }

    const togglePopupFormation = (i) => {
        const modal = document.getElementsByClassName('formationPopupBox')[i];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    const togglePopupRequery = () => {
        const modal = document.getElementsByClassName('requeryPopupBox')[0];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }

    return (
        <div className='selectStartFormationBox'>
            <div id='loader-container'></div>
            <div className='headerWhite'>
                <Link to='/songs'><FontAwesomeIcon icon={faArrowLeft} className='backButtonStartFormation' size='3x' /></Link>
                <h1><Link to="/"><img src={logoWhite} alt='logo'></img></Link></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='selectStartFormationContent'>
                <h2>Now, let’s pick out some dancer formations.</h2>
                <p className='headerText'>Here are five starting dancer formations. Click on one for more information.</p>
                <div className='formationCardsContainer'>
                    <div className='formationCard' id='formation-1' onClick={() => togglePopupFormation(0)}>
                        <p>{formOneShape}</p>
                    </div>
                    <div className='formationCard' id='formation-2' onClick={() => togglePopupFormation(1)}>
                        <p>{formTwoShape}</p>
                    </div>
                    <div className='formationCard' id='formation-3' onClick={() => togglePopupFormation(2)}>
                        <p>{formThreeShape}</p>
                    </div>
                    <div className='formationCard' id='formation-4' onClick={() => togglePopupFormation(3)}>
                        <p>{formFourShape}</p>
                    </div>
                    <div className='formationCard' id='formation-5' onClick={() => togglePopupFormation(4)}>
                        <p>{formFiveShape}</p>
                    </div>
                </div>
                <button className='requeryFormationsButton' id='requery' onClick={() => togglePopupRequery()}><FontAwesomeIcon icon={faArrowRotateRight} className='requery' size='lg' />regenerate formations list</button>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='formationPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(0)} />
                    <h3>{formOneTitle}</h3>
                    <div className='formationDetails'>
                        {renderFormationDetails(formOneDetail)}
                        <img src={'/src/assets/' + data.startFormationList[0].visualization + '.png'}></img>
                    </div>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(1)}>use this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='formationPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(1)} />
                    <h3>{formTwoTitle}</h3>
                    <div className='formationDetails'>
                        {renderFormationDetails(formTwoDetail)}
                        <img src={'/src/assets/' + data.startFormationList[1].visualization + '.png'}></img>
                    </div>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(2)}>use this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='formationPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer closeFormationPopup' onClick={() => togglePopupFormation(2)} />
                    <h3>{formThreeTitle}</h3>
                    <div className='formationDetails'>
                        {renderFormationDetails(formThreeDetail)}
                        <img src={'/src/assets/' + data.startFormationList[2].visualization + '.png'}></img>
                    </div>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(3)}>use this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='formationPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(3)} />
                    <h3>{formFourTitle}</h3>
                    <div className='formationDetails'>
                        {renderFormationDetails(formFourDetail)}
                        <img src={'/src/assets/' + data.startFormationList[3].visualization + '.png'}></img>
                    </div>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(4)}>use this formation</button>
                </div>
            </div>
            <div className='formationPopupBox' style={{ display: 'none' }}>
                <div className='formationPopupContainer'>
                    <FontAwesomeIcon icon={faXmark} size='xl' className='closePopupContainer' onClick={() => togglePopupFormation(4)} />
                    <h3>{formFiveTitle}</h3>
                    <div className='formationDetails'>
                        {renderFormationDetails(formFiveDetail)}
                        <img src={'/src/assets/' + data.startFormationList[4].visualization + '.png'}></img>
                    </div>
                    <button className='selectFormationButton' onClick={() => goToFullFormations(5)}>use this formation</button>
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
                            <input type="submit" value="submit feedback" className='submitFeedbackButton' onClick={(e) => requery(e, 'click')}></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GetStartFormation;