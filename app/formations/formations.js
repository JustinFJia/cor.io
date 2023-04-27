// formations.js

// Imports
import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

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

// Makes user interface through terminal
const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Global variable(s):
//     startFormations - string that GPT generated that represents the list of potential starting formations to give to the user
//     formtran - string that GPT generated that represents the complete list of formations and transitions to give to the user
let startFormations
let formtran

// Function that queries GPT for potential starting formations given a song
async function getStart() {
    let userSongArtist
    ui.question('What is the song and artist (ex: "Motley Crew" by Post Malone)?', async function(userResponse) {
        userSongArtist = userResponse
    })
    apiQueryContent = 'Given the song ' + userSongArtist + ', generate a set of 5 potential starting formations for a dance piece that uses that song.'
    // OpenAI ChatCompletion API query with parameters
    const startFormationsReponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': apiQueryContent
        }],
        temperature: 0.5
    })
    // Parse API's HTTP response for actual textual response
    startFormations = startFormationsReponse.data.choices[0].message.content
    // Report the model's response; can probably get rid of this once everything is hooked up together
    console.log(startFormations)
}

// Function that queries GPT for more formations & transitions between formations given starting formation & song
async function getFormTran() {
    ui.question('Which of the starting formations would you like to proceed with?', async function(userResponse) {
        // perhaps we should limit the user's input options so we don't need to clean the user input here
        // could give them the option of 1 to 5 or R where R is the option to requery GPT for more starting formation options
        let msgContent
        switch (userResponse) {
            case 1:
                //msgContent = 
                break
            case 2:
                //msgContent = 
                break
            case 3:
                //msgContent = 
                break
            case 4:
                //msgContent = 
                break
            case 5:
                //msgContent = 
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
            temperature: 0.5
        })
        // Parse API's HTTP response for actual textual response
        formtran = formtranResponse.data.choices[0].message.content
        // Report the model's response; can probably get rid of this once everything is hooked up together
        console.log(formtran)
    })
}

// Calls function that gets start formations; can definitely get rid of this once everything is hooked up together as this file will just be an import to expose functions defined here
getStart()
//getFormTran()
