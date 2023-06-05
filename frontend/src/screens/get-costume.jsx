import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles.css';
import logoWhite from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CentralInfoContext } from '../context';

const GetCostume = ({ updateCentralInfo }) => {

    const navigate = useNavigate()

    const [feedback, updateFeedback] = useState(undefined)

    let data = useContext(CentralInfoContext)
    data = data[data.length - 1].data

    const vis = 'data:image/png; base64, ' + data.costumes.visualization

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
            const res = await fetch("http://localhost:8080/costumesrequery", req).then((res) => (res.json())).then((res) => updateCentralInfo(res.content)).then(() => navigate('/costumes'))
        } catch(err) {
            console.log(err)
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
        <div className='getCostumeBox'>
            <div id='loader-container'></div>
            <div className='headerWhite'>
                <Link to='/full-formations'><FontAwesomeIcon icon={faArrowLeft} className='backButtonWhite' size='3x' /></Link>
                <h1><Link to="/"><img src={logoWhite} alt='logo'></img></Link></h1>
                <div className='headerSpacer'></div>
            </div>
            <div className='headerText'>
                    <h2>Here's a possible costume scheme.</h2>
                    <p>You can follow it directly or use it for inspiration!</p>
            </div> 
            <div className='getCostumeContent'>
                <div class='bigCostumes'>
                <div class='costumeDetails'>
                    <p>{data.costumes.costumeSchema}</p>
                    <button className='requeryButtonCost' id='requery' onClick={() => togglePopupRequery()}><FontAwesomeIcon icon={faArrowRotateRight} className='requery' size='lg' />regenerate costumes</button>
                </div>
                <img src={vis}></img>

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

export default GetCostume;