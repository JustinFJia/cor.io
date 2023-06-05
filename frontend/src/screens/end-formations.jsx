import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CentralInfoContext } from '../context';

const GetMoreFormations = ({ updateCentralInfo }) => {

    const navigate = useNavigate()

    var currentIndex = 0;

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
            <ul className='finalFormationDetailsList'>
                {
                    detailsParsed.map(detail => {
                        return <li>{detail}</li>
                    })
                }
            </ul>
        );
    }

    const carouselNext = () => {
        console.log(currentIndex);
        document.getElementsByClassName('finalFormationCard')[currentIndex].style.display = 'none';
        if ((currentIndex + 1) > 9) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        console.log(currentIndex);
        document.getElementsByClassName('finalFormationCard')[currentIndex].style.display = 'flex';
    }

    const carouselBack = () => {
        console.log(currentIndex);
        document.getElementsByClassName('finalFormationCard')[currentIndex].style.display = 'none';
        if ((currentIndex - 1) < 0) {
            currentIndex = 9;
        } else {
            currentIndex -= 1;
        }
        console.log(currentIndex);
        document.getElementsByClassName('finalFormationCard')[currentIndex].style.display = 'flex';
    }

    return (
        <div className='selectMoreFormationBox'>
            <div id='loader-container'></div>
            <div className='headerWhite'>
                <Link to='/start-formations'><FontAwesomeIcon icon={faArrowLeft} className='backButtonWhite fullFormationsBackButton' size='3x' /></Link>
                <h1><Link to="/"><img src={logoWhite} alt='logo'></img></Link></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='selectMoreFormationContent'>
                <h2>Here’s your formation story.</h2>
                <div className='carouselContainer'>
                    <FontAwesomeIcon icon={faChevronLeft} size='3x' className='carouselButton' onClick={carouselBack} />
                    <div className='endFormationCardsContainer'>
                        <div className='finalFormationCard' id='formation-1' style={{display: 'flex'}}>
                            <h3>1. {formOneShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formOneDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[0].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-2' style={{display: 'none'}}>
                            <h3>2. {formTwoShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formTwoDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[1].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-3' style={{display: 'none'}}>
                            <h3>3. {formThreeShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formThreeDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[2].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-4' style={{display: 'none'}}>
                            <h3>4. {formFourShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formFourDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[3].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-5' style={{display: 'none'}}>
                            <h3>5. {formFiveShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formFiveDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[4].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-6' style={{display: 'none'}}>
                            <h3>6. {formSixShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formSixDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[5].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-7' style={{display: 'none'}}>
                            <h3>7. {formSevenShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formSevenDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[6].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-8' style={{display: 'none'}}>
                            <h3>8. {formEightShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formEightDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[7].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-9' style={{display: 'none'}}>
                            <h3>9. {formNineShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formNineDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[8].visualization + '.png'}></img>
                             </div>
                        </div>
                        <div className='finalFormationCard' id='formation-10' style={{display: 'none'}}>
                            <h3>10. {formTenShape}</h3>
                            <div className='formationDetails'>
                                {renderFormationDetails(formTenDetail)}
                                <img src={'/src/assets/' + data.fullFormationList[9].visualization + '.png'}></img>
                             </div>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} size='3x' className='carouselButton' onClick={carouselNext} />
                </div>
                <button className='continueToCostumesButton' onClick={() => goToCostumes()}>continue to costumes</button>
            </div>
        </div>
    )
}

export default GetMoreFormations;