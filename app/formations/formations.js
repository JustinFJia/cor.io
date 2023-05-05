// formations.js

// Imports
import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import PromptSync from "prompt-sync"

// Loads .env into process.env
config()

// Configuring OpenAI API using the key from .env file
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
// Report if something went wrong with the API key
if (!configuration.apiKey) {
    console.log('The OpenAI API key seems to be missing')
}

// Setting up user input
const prompt = PromptSync();

// Global variable(s):
//     startFormations - string that GPT generated that represents the list of potential starting formations to give to the user
//     formtran - string that GPT generated that represents the complete list of formations and transitions to give to the user
let startFormations;
let formtran;

const format = 
`"X. Formation: Y
- W
- Z
"`;

const formatRest = 
`"T

X. Formation: Y
- W
- Z"`;

var userSongArtist;
var userVibes;

// Function that queries GPT for potential starting formations given a song
async function getStart() {
    userSongArtist = prompt('What is the song and artist (ex: "Motley Crew" by Post Malone)? ');
    userVibes = prompt('What are the vibes of the piece you envision? ');
    let apiQueryContent = 'Given the song ' + userSongArtist + ', generate a set of 5 potential starting formations for a '+userVibes+' dance piece that uses that song, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation.';
    // OpenAI ChatCompletion API query with parameters
    const startFormationsResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': apiQueryContent
        }],
        temperature: 0.25
    });
    // Parse API's HTTP response for actual textual response
    startFormations = startFormationsResponse.data.choices[0].message.content;
    // Report the model's response; can probably get rid of this once everything is hooked up together
    console.log(startFormations);

    getFormTran(startFormations);
}

// Function that queries GPT for more formations & transitions between formations given starting formation & song
async function getFormTran(formations) {
    var msgContent;
    var indexOfStart = 0;
    var indexOfEnd = 0;
    var chosenFormation = "";
    let userStartForm = prompt('Which of the starting formations would you like to proceed with?');
    // perhaps we should limit the user's input options so we don't need to clean the user input here
    // could give them the option of 1 to 5 or R where R is the option to requery GPT for more starting formation options
    switch (userStartForm) {
        case '1':
            indexOfStart = 3;
            indexOfEnd = formations.indexOf("2.");
            chosenFormation = formations.substring(indexOfStart, indexOfEnd);
            console.log(chosenFormation);
            msgContent = 'Given the song ' + userSongArtist + ', the vibe ' + userVibes + ', and starting with the formation "' + chosenFormation + '", create a list of 10 formations with transitions between them, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation. Then add a transition sentence in between each formation to describe how dancers get from one formation to the next.';
            console.log(msgContent);
            break
        case '2':
            indexOfStart = formations.indexOf("2.") + 3;
            indexOfEnd = formations.indexOf("3.");
            chosenFormation = formations.substring(indexOfStart, indexOfEnd);
            console.log(chosenFormation);
            msgContent = 'Given the song ' + userSongArtist + ', the vibe ' + userVibes + ', and starting with the formation "' + chosenFormation + '", create a list of 10 formations with transitions between them, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation.';
            console.log(msgContent);
            break
        case '3':
            indexOfStart = formations.indexOf("3.") + 3;
            indexOfEnd = formations.indexOf("4.");
            chosenFormation = formations.substring(indexOfStart, indexOfEnd);
            console.log(chosenFormation);
            msgContent = 'Given the song ' + userSongArtist + ', the vibe ' + userVibes + ', and starting with the formation "' + chosenFormation + '", create a list of 10 formations with transitions between them, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation.';
            console.log(msgContent);
            break
        case '4':
            indexOfStart = formations.indexOf("4.") + 3;
            indexOfEnd = formations.indexOf("5.");
            chosenFormation = formations.substring(indexOfStart, indexOfEnd);
            console.log(chosenFormation);
            msgContent = 'Given the song ' + userSongArtist + ', the vibe ' + userVibes + ', and starting with the formation "' + chosenFormation + '", create a list of 10 formations with transitions between them, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation.';
            console.log(msgContent);
            break
        case '5':
            indexOfStart = formations.indexOf("5.") + 3;
            chosenFormation = formations.substring(indexOfStart);
            console.log(chosenFormation);
            msgContent = 'Given the song ' + userSongArtist + ', the vibe ' + userVibes + ', and starting with the formation "' + chosenFormation + '", create a list of 10 formations with transitions between them, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation.';
            console.log(msgContent);
            break
        case 'R':
            // user wants to requery GPT
            // special logic here
            break
        default:
            // something must've gone wrong if you got here
            // maybe tell the user that something bad happened and reprompt them
    }
    // OpenAI ChatCompletion API query with parameters
    const formtranResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': msgContent
        }],
        temperature: 0.25
    });
    // Parse API's HTTP response for actual textual response
    formtran = formtranResponse.data.choices[0].message.content;
    // Report the model's response; can probably get rid of this once everything is hooked up together
    console.log(formtran);
}


// Calls function that gets start formations; can definitely get rid of this once everything is hooked up together as this file will just be an import to expose functions defined here
getStart()
//getFormTran()
