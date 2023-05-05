// main.js

// import {  } from "./songs/songs.js"
import { getStart, parseStart, getFull } from "./formations/formations.js"
import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import PromptSync from "prompt-sync"

config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
if (!configuration.apiKey) {
    console.log('The OpenAI API key seems to be missing')
}
const prompt = PromptSync()

// Here are the prompts we gave to the user; should be incorporated into front end once ready
// What is the song and artist (ex: "Motley Crew" by Post Malone)? 
// What are the vibes of the piece you envision? 
// Which of the starting formations would you like to proceed with? 

// fill in songs part later

// Formations
let song = '"Black Beatles" by Rae Sremmurd' //hardcode these for now
let vibes = 'Swaggy'
let notDone = true
let stFms = getStart(openai, song, vibes, "")
do {
    let [stOne, stTwo, stThree, stFour, stFive] = parseStart(stFms)
    console.log(stFms)
    const userResponse = prompt("Which of the starting formations would you like to proceed with (give a number 1-5, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
    switch (userResponse) {
        case '1':
            full = getFull(openai, song, vibes, stOne)
            console.log(full)
            notDone = false
            break
        case '2':
            full = getFull(openai, song, vibes, stTwo)
            console.log(full)
            notDone = false
            break
        case '3':
            full = getFull(openai, song, vibes, stThree)
            console.log(full)
            notDone = false
            break
        case '4':
            full = getFull(openai, song, vibes, stFour)
            console.log(full)
            notDone = false
            break
        case '5':
            full = getFull(openai, song, vibes, stFive)
            console.log(full)
            notDone = false
            break
        case 'R':
            stFms = getStart(openai, song, vibes, "")
            break
        default:
            const feedback = "Take into account the following feedback from a previous query: " + userResponse + "."
            stFms = getStart(openai, song, vibes, feedback)
    }
} while (notDone)
