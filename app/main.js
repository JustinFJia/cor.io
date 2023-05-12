// main.js

import { getSongs, parseSongs } from "./songs/songs.js"
import { getStart, parseStart, getFull } from "./formations/formations.js"
import { getCostumes } from "./costumes/costumes.js"
import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import PromptSync from "prompt-sync"
import { writeFile } from "fs"

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

    // Visualization
    let vis = await openai.createImage({
        prompt: "Aerial view of a dance formation in the shape of a square",
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
    })
    await writeFile('./img.txt', vis.data.data[0].b64_json, (err) => {
        if (err) {
            console.log("didn't work :/")
        } else {
            console.log("worked :)")
        }
    })

    // Songs
    let sND = true
    let song
    const vibes = prompt('What are the vibes of the piece you envision (ex: groovy)? ')
    let songs = await getSongs(openai, vibes, "")
    do {
        let [songOne, songTwo, songThree] = parseSongs(songs)
        console.log(songs)
        const userSong = prompt("Which of the songs would you like to proceed with (give a number 1-3, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
        switch (userSong) {
            case '1':
                song = songOne
                sND = false
                break
            case '2':
                song = songTwo
                sND = false
                break
            case '3':
                song = songThree
                sND = false
                break
            case 'R':
                songs = await getSongs(openai, vibes, "Don't give me the following songs: " + songOne + ", " + songTwo + ", or " + songThree + ".")
                break
            default:
                const sFeedback = "Don't give me the following songs: " + songOne + ", " + songTwo + ", or " + songThree + ". Additionally, take into account the following feedback from a previous query: " + userSong + "."
                songs = await getSongs(openai, vibes, sFeedback)
        }
    } while(sND)

    // Formations
    let fND = true
    let lND
    let full
    let stFms = await getStart(openai, song, vibes, "")
    do {
        let [stOne, stTwo, stThree, stFour, stFive] = parseStart(stFms)
        console.log(stFms)
        const userStart = prompt("Which of the starting formations would you like to proceed with (give a number 1-5, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
        switch (userStart) {
            case '1':
                lND = true
                full = await getFull(openai, song, vibes, stOne, "")
                do {
                    console.log(full)
                    const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
                    switch (userFull) {
                        case 'N':
                            lND = false
                            break
                        case 'R':
                            full = await getFull(openai, song, vibes, stOne, "Don't give me the following list: " + full + ".")
                            break
                        default:
                            const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
                            full = await getFull(openai, song, vibes, stOne, lFeedback)
                    }
                } while (lND)
                fND = false
                break
            case '2':
                lND = true
                full = await getFull(openai, song, vibes, stTwo, "")
                do {
                    console.log(full)
                    const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
                    switch (userFull) {
                        case 'N':
                            lND = false
                            break
                        case 'R':
                            full = await getFull(openai, song, vibes, stTwo, "Don't give me the following list: " + full + ".")
                            break
                        default:
                            const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
                            full = await getFull(openai, song, vibes, stTwo, lFeedback)
                    }
                } while (lND)
                fND = false
                break
            case '3':
                lND = true
                full = await getFull(openai, song, vibes, stThree, "")
                do {
                    console.log(full)
                    const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
                    switch (userFull) {
                        case 'N':
                            lND = false
                            break
                        case 'R':
                            full = await getFull(openai, song, vibes, stThree, "Don't give me the following list: " + full + ".")
                            break
                        default:
                            const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
                            full = await getFull(openai, song, vibes, stThree, lFeedback)
                    }
                } while (lND)
                fND = false
                break
            case '4':
                lND = true
                full = await getFull(openai, song, vibes, stFour, "")
                do {
                    console.log(full)
                    const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
                    switch (userFull) {
                        case 'N':
                            lND = false
                            break
                        case 'R':
                            full = await getFull(openai, song, vibes, stFour, "Don't give me the following list: " + full + ".")
                            break
                        default:
                            const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
                            full = await getFull(openai, song, vibes, stFour, lFeedback)
                    }
                } while (lND)
                fND = false
                break
            case '5':
                lND = true
                full = await getFull(openai, song, vibes, stFive, "")
                do {
                    console.log(full)
                    const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
                    switch (userFull) {
                        case 'N':
                            lND = false
                            break
                        case 'R':
                            full = await getFull(openai, song, vibes, stFive, "Don't give me the following list: " + full + ".")
                            break
                        default:
                            const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
                            full = await getFull(openai, song, vibes, stFive, lFeedback)
                    }
                } while (lND)
                fND = false
                break
            case 'R':
                stFms = await getStart(openai, song, vibes, "Don't give me the following formations: " + stOne + ", " + stTwo + ", " + stThree + ", " + stFour + ", or " + stFive + ".")
                break
            default:
                const fFeedback = "Don't give me the following formations: " + stOne + ", " + stTwo + ", " + stThree + ", " + stFour + ", or " + stFive + ". Additionally, take into account the following feedback from a previous query: " + userStart + "."
                stFms = await getStart(openai, song, vibes, fFeedback)
        }
    } while (fND)

    // Costumes
    let cND = true
    let costumes = await getCostumes(openai, song, "")
    do {
        console.log(costumes)
        const userCostume = prompt("Would you like to see a different costume scheme ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
        switch (userCostume) {
            case 'N':
                cND = false
                break
            case 'R':
                costumes = await getCostumes(openai, song, "Don't give me the following costume scheme: " + costumes + ".")
                break
            default:
                const cFeedback = "Don't give me the following costume scheme: " + costumes + ". Additionally, take into account the following feedback from a previous query: " + userCostume + "."
                costumes = await getCostumes(openai, song, cFeedback)
        }
    } while (cND)

}

main()
