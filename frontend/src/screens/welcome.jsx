import { Link } from "react-router-dom";
import './styles.css';
import logoLarge from '../assets/logo-large.png';

const Welcome = () => {

    return (
        <div className='homepageBox'>
            <div className='homepageContent'>
                <p>let AI be your dance partner</p>
                <h1><img src={logoLarge} alt='logo'></img></h1>
                <Link to="/start"><button className='getStartedButton'>get started</button></Link>
            </div>
        </div>
    )
}

export default Welcome;