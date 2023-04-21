import { Configuration, OpenAIApi } from "openai"
import readline from "readline"
import {config} from "dotenv"
import { start } from "repl"

config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

if (!configuration.apiKey) {
    console.log('The OpenAI API key seems to be missing')
}

const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let startFormations

async function getStart() {
    startFormations = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': 'Given the song "Motley Crew" by Post Malone, generate a set of 5 potential starting formations for a dance piece that uses that song.'
        }],
        temperature: 0.5
    })
    console.log(startFormations)
}

ui.question('ask the user something here', async function(userResponse) {
    const openaiResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': userResponse
        }],
        temperature: 0.5
    })
    console.log(openaiResponse)
})
