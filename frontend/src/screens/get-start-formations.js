body * {
    box-sizing: border-box;
}
  
body {
  font-family: 'Kumbh Sans', sans-serif;
  margin: 0;
  background-color: white;
}

@import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+Display:wght@700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

p {
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 30px;
    margin: 0;
}

button, .getSongButton {
    border: none;
    border-radius: 30px;
    font-size: 24px;
    font-family: 'Kumbh Sans', sans-serif;
    height: 70px;
    width: 220px;
}

input {
    font-family: 'Kumbh Sans', sans-serif;
}

.homepageBox {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #0C4FB1 0%, #A0BAE1 60.94%, #FFFFFF 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.homepageContent {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.homepageContent p {
    color: white;
    font-size: 24px;
}

.homepageContent button {
    margin-top: 10px;
    background-color: #F6F6F6;
    color: #0C6CB1;
}

.homepageContent button:hover {
    background-color: #0C4FB1;
    color: white;
    transition: 0.4s ease;
}

.headerWhite {
    width: 100vw;
    /*border: solid 1px red;*/
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content:space-between;
    height: 10vh;
    padding: 20px;
    
    
}

.headerWhite h1{
    margin-top: 4.5vh;
}

.backButtonBlue {
    color: #0C4FB1;
}

.backButtonBlue:hover {
    color:#276bd0;
}

.backButtonWhite {
    color: #E1F0FF;
}

.backButtonWhite:hover {
    color: white;
}

.getSongContainer {
    height: 90vh;
    width: 100vw;
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.getSongContainer p {
    color:#0C4FB1;
}

.getSongContainer form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userInput .userVibes, .userFeedback {
    height: 50px;
    width: 60vw;
    border-radius: 25px;
    /*border: solid 1px #276bd0;*/
    border: none;
    padding: 0px 20px;
    font-size: 20px;
    background-color: #dfdfdf;
}

.userInput {
    gap: 20px;
}

.userVibes:focus, .userFeedback:focus {
    border: solid 3px #0C4FB1;
    background-color: #F6F6F6;
}

.getSongButton {
    background-color: #0C4FB1;
    color: white;
}

.getSongButton:hover {
    background-color: #276bd0;
    transition: 0.4s ease;
}

.selectSongBox, .selectStartFormationBox {
    background: linear-gradient(180deg, #0C4FB1 0%, #A0BAE1 60.94%, #FFFFFF 100%);
}

.selectSongContent, .selectStartFormationContent {
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5vh;
}



.songCardsContainer {
    display: flex;
    gap: 5vw;
}

.songCard {
    color: #0C4FB1;
    background-color: white;
    width: 25vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 30px;
    padding: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.songCard:hover {
    filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.25));
    background-color: #0C4FB1;
    color: white;
    transition: 0.4s ease;
}

.headerText{
    color: white;
    
}



.songCard p {
    text-align: center;
    font-size: 28px;
}

.requeryButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: transparent;
    color: #0C4FB1;
    border: 1px solid #0C4FB1;
    width: 300px;
}

.requeryButton:hover {
    background-color: #0C4FB1;
    transition: 0.4s ease;
    color: white;
}

.requeryPopupBox {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
}

.requeryPopupContainer {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    background-color: white;
    height: 50%;
    width: 60%;
    border-radius: 30px;
    padding: 30px;
    color:#0C4FB1;
    z-index: 3;
    
}

.requeryPopupContainer h1 {
    margin-top: 2vh;
    margin-bottom: 2vh;

}


.requeryPopupContainer ol {
    margin-top: 2vh;
    margin-bottom: 2vh;

}

.closePopupContainer {
    cursor: pointer;
    float: right;
    position: absolute;
    padding: 20px;
    top: 0;
    right: 0;

    
    
}

.closePopupContainer:hover {
    color: #276bd0;
}

.userFeedback {
    width: 55vw;
}

.requeryButtonsContainer {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 4vh;
    margin-top: 4vh;
}

.skipFeedbackButton {
    background-color: transparent;
    border: 1px solid #0C4FB1;
    color: #0C4FB1;
}

.skipFeedbackButton:hover {
    background-color: #276bd0;
    border: none;
    color: white;
    transition: 0.4s ease;
}

.selectFormationButton {
    background-color: transparent;
    border: 1px solid #0C4FB1;
    color: #0C4FB1;
}

.selectFormationButton:hover {
    background-color: #276bd0;
    border: none;
    color: white;
    transition: 0.4s ease;
}

.selectStartFormationBox {
    height: 90vh;
    width: 100vw;
}

.formationCardsContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5vw;
}



.infoToolTip{
    position: relative;
    top: -50px;
    right: -110px;
}


.formationCard {
    background-color: white;
    width: 20vw;
    height: 28vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 30px;
    padding: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}



.formationCard:hover {
    color: white;
    background-color: #0C4FB1; 
    transition: 0.4s ease;
      
}