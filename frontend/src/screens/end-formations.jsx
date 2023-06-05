import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateRight, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CentralInfoContext } from '../context';

const GetMoreFormations = ({ updateCentralInfo }) => {

    const navigate = useNavigate()

    const [feedback, updateFeedback] = useState(undefined)

    let data = useContext(CentralInfoContext)
    data = data[data.length - 1].data

    for (let i = 0; i < 9; ++i) {
        const form = data.fullFormationList[i].formation
        const lowerForm = form.toLowerCase()
        if (lowerForm.includes('v-shape')) {
            const idx = lowerForm.indexOf('v-shape')
            data.fullFormationList[i].formation = form.substring(0, idx) + 'V Shape' + form.substring(idx + 7)
        } else if (lowerForm.includes('x-shape')) {
            const idx = lowerForm.indexOf('x-shape')
            data.fullFormationList[i].formation = form.substring(0, idx) + 'X Shape' + form.substring(idx + 7)
        } else if (lowerForm.includes('semi-circle')) {
            const idx = lowerForm.indexOf('semi-circle')
            data.fullFormationList[i].formation = form.substring(0, idx) + 'Semicircle' + form.substring(idx + 11)
        }

        const vis = data.fullFormationList[i].visualization
        if (vis == '') {
            data.fullFormationList[i].visualization = 'novis'
        }
    }
    const formOne = data.fullFormationList[0].formation
    const formOneTitle = formOne.substring(0, formOne.indexOf('-'))
    const formOneShape = formOneTitle.substring(11)
    const formOneDetail = formOne.substring(formOne.indexOf('-'))
    const formTwo = data.fullFormationList[1].formation
    const formTwoTitle = formTwo.substring(0, formTwo.indexOf('-'))
    const formTwoShape = formTwoTitle.substring(11)
    const formTwoDetail = formTwo.substring(formTwo.indexOf('-'))
    const formThree = data.fullFormationList[2].formation
    const formThreeTitle = formThree.substring(0, formThree.indexOf('-'))
    const formThreeShape = formThreeTitle.substring(11)
    const formThreeDetail = formThree.substring(formThree.indexOf('-'))
    const formFour = data.fullFormationList[3].formation
    const formFourTitle = formFour.substring(0, formFour.indexOf('-'))
    const formFourShape = formFourTitle.substring(11)
    const formFourDetail = formFour.substring(formFour.indexOf('-'))
    const formFive = data.fullFormationList[4].formation
    const formFiveTitle = formFive.substring(0, formFive.indexOf('-'))
    const formFiveShape = formFiveTitle.substring(11)
    const formFiveDetail = formFive.substring(formFive.indexOf('-'))
    const formSix = data.fullFormationList[5].formation
    const formSixTitle = formSix.substring(0, formSix.indexOf('-'))
    const formSixShape = formSixTitle.substring(11)
    const formSixDetail = formSix.substring(formSix.indexOf('-'))
    const formSeven = data.fullFormationList[6].formation
    const formSevenTitle = formSeven.substring(0, formSeven.indexOf('-'))
    const formSevenShape = formSevenTitle.substring(11)
    const formSevenDetail = formSeven.substring(formSeven.indexOf('-'))
    const formEight = data.fullFormationList[7].formation
    const formEightTitle = formEight.substring(0, formEight.indexOf('-'))
    const formEightShape = formEightTitle.substring(11)
    const formEightDetail = formEight.substring(formEight.indexOf('-'))
    const formNine = data.fullFormationList[8].formation
    const formNineTitle = formNine.substring(0, formNine.indexOf('-'))
    const formNineShape = formNineTitle.substring(11)
    const formNineDetail = formNine.substring(formNine.indexOf('-'))
    const formTen = data.fullFormationList[9].formation
    const formTenTitle = formTen.substring(0, formTen.indexOf('-'))
    const formTenShape = formTenTitle.substring(11)
    const formTenDetail = formTen.substring(formTen.indexOf('-'))

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
            const res = await fetch("http://localhost:8080/fullformrequery", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/full-formations'))
        } catch (err) {
            console.log(err)
        }
    }

    const goToCostumes = async () => {
        try {
            const req = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
            document.getElementById('loader-container').style.display = 'flex'
            const res = await fetch("http://localhost:8080/costumes", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/costumes'))
        } catch (err) {
            console.log(err)
        }
    }

    const togglePopupFormation = (i) => {
        const modal = document.getElementsByClassName('formationPopupBox')[i]
        if (modal.style.display == 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex'
        }
    }

    const togglePopupRequery = () => {
        const modal = document.getElementsByClassName('requeryPopupBox')[0];
        if (modal.style.display == 'flex') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'flex'
        }
    }

    return (
        <div className='selectMoreFormationBox'>
            <div id='loader-container'></div>
            <div className='headerWhite'>
                <Link to='/start-formations'><FontAwesomeIcon icon={faArrowLeft} className='backButtonWhite' size='3x' /></Link>
                <h1><Link to="/"><img src={logoWhite} alt='logo'></img></Link></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='selectMoreFormationContent'>
                <p className='headerText'>Here are the other formations based on the starting formation you selected. Click on one for a more in-depth description.</p>
                <div className='formationCardsContainer'>
                    <div className='finalFormationCard' id='formation-1' onClick={() => togglePopupFormation(0)}>
                        <p>{formOneShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-2' onClick={() => togglePopupFormation(1)}>
                        <p>{formTwoShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-3' onClick={() => togglePopupFormation(2)}>
                        <p>{formThreeShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-4' onClick={() => togglePopupFormation(3)}>
                        <p>{formFourShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-5' onClick={() => togglePopupFormation(4)}>
                        <p>{formFiveShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-6' onClick={() => togglePopupFormation(5)}>
                        <p>{formSixShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-7' onClick={() => togglePopupFormation(6)}>
                        <p>{formSevenShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-8' onClick={() => togglePopupFormation(7)}>
                        <p>{formEightShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-9' onClick={() => togglePopupFormation(8)}>
                        <p>{formNineShape}</p>
                    </div>
                    <div className='finalFormationCard' id='formation-10' onClick={() => togglePopupFormation(9)}>
                        <p>{formTenShape}</p>
                    </div>
                </div>
                <div className='finalFormationsButtonsContainer'>
                    <button className='selectFormationButton' onClick={() => goToCostumes()}>continue</button>
                </div>
            </div>
        </div>
    )
}

export default GetMoreFormations;