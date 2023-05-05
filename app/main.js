// main.js

import { getSongs } from "./songs/songs.js"
import { getStart, parseStart, getFull } from "./formations/formations.js"
import { getCostumes } from "./costumes/costumes.js"
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

async function main() {

    // Songs
    let sND = true
    let song
    const vibes = prompt('What are the vibes of the piece you envision (ex: groovy)? ')
    let songs = await getSongs(openai, vibes, "")
    do {
        console.log(songs)
        const userSong = prompt("Which of the songs would you like to proceed with (give a number 1-3, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
        switch (userSong) {
            case '1':
                sND = false
                break
            case '2':
                sND = false
                break
            case '3':
                sND = false
                break
            case 'R':
                songs = await getSongs(openai, vibes, "")
                break
            default:
                const sFeedback = "Take into account the following feedback from a previous query: " + userSong + "."
                songs = await getSongs(openai, vibes, sFeedback)
        }
    } while(sND)

    // Formations
    let fND = true
    let full
    let stFms = await getStart(openai, song, vibes, "")
    do {
        let [stOne, stTwo, stThree, stFour, stFive] = parseStart(stFms)
        console.log(stFms)
        const userStart = prompt("Which of the starting formations would you like to proceed with (give a number 1-5, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
        switch (userStart) {
            case '1':
                full = await getFull(openai, song, vibes, stOne)
                console.log(full)
                fND = false
                break
            case '2':
                full = await getFull(openai, song, vibes, stTwo)
                console.log(full)
                fND = false
                break
            case '3':
                full = await getFull(openai, song, vibes, stThree)
                console.log(full)
                fND = false
                break
            case '4':
                full = await getFull(openai, song, vibes, stFour)
                console.log(full)
                fND = false
                break
            case '5':
                full = await getFull(openai, song, vibes, stFive)
                console.log(full)
                fND = false
                break
            case 'R':
                stFms = await getStart(openai, song, vibes, "")
                break
            default:
                const fFeedback = "Take into account the following feedback from a previous query: " + userStart + "."
                stFms = await getStart(openai, song, vibes, fFeedback)
        }
    } while (fND)

    // Costumes
    let costumes = await getCostumes(openai, song)
    console.log(costumes)
}

main()
