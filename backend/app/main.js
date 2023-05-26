// main.js

import { getSongs } from "./songs/songs.js"
import { getStart, getFull, getVis } from "./formations/formations.js"
import { getCostumes, getCostumeVis } from "./costumes/costumes.js"
import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

// Express config
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 8080

// OpenAI API config
config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
if (!configuration.apiKey) {
    console.log('The OpenAI API key seems to be missing')
}

// Store global state in JSON
var data = {
    "vibes": "",
    "songList": [{"songName": "", "songArtist": ""},
                 {"songName": "", "songArtist": ""},
                 {"songName": "", "songArtist": ""}],
    "songChoice": {"songName": "", "songArtist": ""},
    "startFormationList": [{"formation": "", "visualization": ""},
                           {"formation": "", "visualization": ""},
                           {"formation": "", "visualization": ""},
                           {"formation": "", "visualization": ""},
                           {"formation": "", "visualization": ""}],
    "startFormationChoice": {"formation": "", "visualization": ""},
    "fullFormationList": [{"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""},
                          {"formation": "", "visualization": "", "transition": ""}],
    "costumes": {"costumeSchema": "", "visualization": ""}
}

// Handle POST request for vibes
app.post('/vibes', async (req, res) => {
    const vibes = req.body.vibes
    try {
        if (vibes == null) {
            console.log("Didn't get a vibe")
        }
        data.vibes = vibes
        const songs = await getSongs(openai, vibes, "")
        data.songList[0].songName = songs[0].substring(0, songs[0].indexOf('by') - 1)
        data.songList[0].songArtist = songs[0].substring(songs[0].indexOf('by') + 3)
        data.songList[1].songName = songs[1].substring(0, songs[1].indexOf('by') - 1)
        data.songList[1].songArtist = songs[1].substring(songs[1].indexOf('by') + 3)
        data.songList[2].songName = songs[2].substring(0, songs[2].indexOf('by') - 1)
        data.songList[2].songArtist = songs[2].substring(songs[2].indexOf('by') + 3)
        return res.status(200).json({
            success: true,
            content: {"vibes": data.vibes, "songList": data.songList},
        })
    } catch(err) {
        console.log(err)
    }
})

// Handle POST request for song requery
app.post('/songsrequery', async (req, res) => {
    let feedback = req.body.feedback
    if (feedback == null || feedback == '') {
        feedback = "Don't give me the following songs: " + data.songList[0].songName + " by " + data.songList[0].songArtist + ", " + data.songList[1].songName + " by " + data.songList[1].songArtist + ", and " + data.songList[2].songName + " by " + data.songList[2].songArtist
    } else {
        feedback = "Don't give me the following songs: " + data.songList[0].songName + " by " + data.songList[0].songArtist + ", " + data.songList[1].songName + " by " + data.songList[1].songArtist + ", and " + data.songList[2].songName + " by " + data.songList[2].songArtist + ". Additionally, take into account the following feedback from a previous query: " + feedback + "."
    }
    try {
        const songs = await getSongs(openai, data.vibes, feedback)
        data.songList[0].songName = songs[0].substring(0, songs[0].indexOf('by') - 1)
        data.songList[0].songArtist = songs[0].substring(songs[0].indexOf('by') + 3)
        data.songList[1].songName = songs[1].substring(0, songs[1].indexOf('by') - 1)
        data.songList[1].songArtist = songs[1].substring(songs[1].indexOf('by') + 3)
        data.songList[2].songName = songs[2].substring(0, songs[2].indexOf('by') - 1)
        data.songList[2].songArtist = songs[2].substring(songs[2].indexOf('by') + 3)
        return res.status(200).json({
            success: true,
            content: {"vibes": data.vibes, "songList": data.songList},
        })
    } catch(err) {
        console.log(err)
    }
})

// Handle POST request for song selection/starting formation generation
app.post('/song', async (req, res) => {
    const chosenSong = req.body.song
    try {
        if (chosenSong == null) {
            console.log('No song chosen')
        }
        data.songChoice = chosenSong
        const startFormations = await getStart(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, data.vibes, "")
        data.startFormationList[0].formation = startFormations[0]
        data.startFormationList[0].visualization = getVis(startFormations[0], 0)
        data.startFormationList[1].formation = startFormations[1]
        data.startFormationList[1].visualization = getVis(startFormations[1], 0)
        data.startFormationList[2].formation = startFormations[2]
        data.startFormationList[2].visualization = getVis(startFormations[2], 0)
        data.startFormationList[3].formation = startFormations[3]
        data.startFormationList[3].visualization = getVis(startFormations[3], 0)
        data.startFormationList[4].formation = startFormations[4]
        data.startFormationList[4].visualization = getVis(startFormations[4], 0)
        return res.status(200).json({
            success: true,
            content: {"startFormationList": data.startFormationList},
        })
    } catch(err) {
        console.log(err)
    }
})

// Handle POST request for starting formations requery
app.post('/startformrequery', async (req, res) => {
    let feedback = req.body.feedback
    if (feedback == null || feedback == '') {
        feedback = "Don't give me the following list: " + data.startFormationList[0].formation + ", " + data.startFormationList[1].formation + ", " + data.startFormationList[2].formation + ", " + data.startFormationList[3] + ", " + data.startFormationList[4] + "."
    } else {
        feedback = "Don't give me the following list: " + data.startFormationList[0].formation + ", " + data.startFormationList[1].formation + ", " + data.startFormationList[2].formation + ", " + data.startFormationList[3] + ", " + data.startFormationList[4] + ". Additionally, take into account the following feedback from a previous query: " + feedback + "."
    }
    try {
        const startFormations = await getStart(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, data.vibes, feedback)
        data.startFormationList[0].formation = startFormations[0]
        data.startFormationList[0].visualization = getVis(startFormations[0], 0)
        data.startFormationList[1].formation = startFormations[1]
        data.startFormationList[1].visualization = getVis(startFormations[1], 0)
        data.startFormationList[2].formation = startFormations[2]
        data.startFormationList[2].visualization = getVis(startFormations[2], 0)
        data.startFormationList[3].formation = startFormations[3]
        data.startFormationList[3].visualization = getVis(startFormations[3], 0)
        data.startFormationList[4].formation = startFormations[4]
        data.startFormationList[4].visualization = getVis(startFormations[4], 0)
        return res.status(200).json({
            success: true,
            content: {"startFormationList": data.startFormationList}
        })
    } catch(err) {
        console.log(err)
    }
})

// Handle POST request for starting formation selection/full formation generation
app.post('/startform', async (req, res) => {
    const chosenStartForm = req.body.form
    try {
        if (chosenStartForm == null) {
            console.log('No starting formation chosen')
        }
        data.startFormationChoice = chosenStartForm
        const full = await getFull(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, data.vibes, data.startFormationChoice.formation, "")
        data.fullFormationList[0].formation = full[0].substring(0, full[0].indexOf('Transition') - 2)
        data.fullFormationList[0].visualization = getVis(full[0], 1)
        data.fullFormationList[0].transition = full[0].substring(full[0].indexOf('Transition'))
        data.fullFormationList[1].formation = full[1].substring(0, full[1].indexOf('Transition') - 2)
        data.fullFormationList[1].visualization = getVis(full[1], 1)
        data.fullFormationList[1].transition = full[1].substring(full[1].indexOf('Transition'))
        data.fullFormationList[2].formation = full[2].substring(0, full[2].indexOf('Transition') - 2)
        data.fullFormationList[2].visualization = getVis(full[2], 1)
        data.fullFormationList[2].transition = full[2].substring(full[2].indexOf('Transition'))
        data.fullFormationList[3].formation = full[3].substring(0, full[3].indexOf('Transition') - 2)
        data.fullFormationList[3].visualization = getVis(full[3], 1)
        data.fullFormationList[3].transition = full[3].substring(full[3].indexOf('Transition'))
        data.fullFormationList[4].formation = full[4].substring(0, full[4].indexOf('Transition') - 2)
        data.fullFormationList[4].visualization = getVis(full[4], 1)
        data.fullFormationList[4].transition = full[4].substring(full[4].indexOf('Transition'))
        data.fullFormationList[5].formation = full[5].substring(0, full[5].indexOf('Transition') - 2)
        data.fullFormationList[5].visualization = getVis(full[5], 1)
        data.fullFormationList[5].transition = full[5].substring(full[5].indexOf('Transition'))
        data.fullFormationList[6].formation = full[6].substring(0, full[6].indexOf('Transition') - 2)
        data.fullFormationList[6].visualization = getVis(full[6], 1)
        data.fullFormationList[6].transition = full[6].substring(full[6].indexOf('Transition'))
        data.fullFormationList[7].formation = full[7].substring(0, full[7].indexOf('Transition') - 2)
        data.fullFormationList[7].visualization = getVis(full[7], 1)
        data.fullFormationList[7].transition = full[7].substring(full[7].indexOf('Transition'))
        data.fullFormationList[8].formation = full[8].substring(0, full[8].indexOf('Transition') - 2)
        data.fullFormationList[8].visualization = getVis(full[8], 1)
        data.fullFormationList[8].transition = full[8].substring(full[8].indexOf('Transition'))
        data.fullFormationList[9].formation = full[9].substring(0, full[9].indexOf('Transition') - 2)
        data.fullFormationList[9].visualization = getVis(full[9], 1)
        data.fullFormationList[9].transition = full[9].substring(full[9].indexOf('Transition'))
        return res.status(200).json({
            success: true,
            content: {"fullFormationList": data.fullFormationList}
        })
    } catch(err) {
        console.log(err)
    }
})

// Listen on port 8080
app.listen(port, () => {
    console.log('listening on port ' + port)
})

// async function main() {
//         const userStart = prompt("Which of the starting formations would you like to proceed with (give a number 1-5, 'R' for a simple requery, or some feedback for a more advanced requery)? ") // eventually replace this line with input from frontend
//         switch (userStart) {
//             case '1':
//                 data.startFormationChoice = data.startFormationList[0]
//                 lND = true
//                 full = await getFull(openai, song, vibes, stFms[0], "")
//                 do { // this entire dowhile can eventually be replaced with an event that occurs whenever a button or something is pressed on the frontend, thereby triggering an update in the internal state
//                     data.fullFormationList[0].formation = full[0].substring(0, full[0].indexOf('Transition') - 2)
//                     data.fullFormationList[0].visualization = getVis(full[0], 1)
//                     data.fullFormationList[0].transition = full[0].substring(full[0].indexOf('Transition'))
//                     data.fullFormationList[1].formation = full[1].substring(0, full[1].indexOf('Transition') - 2)
//                     data.fullFormationList[1].visualization = getVis(full[1], 1)
//                     data.fullFormationList[1].transition = full[1].substring(full[1].indexOf('Transition'))
//                     data.fullFormationList[2].formation = full[2].substring(0, full[2].indexOf('Transition') - 2)
//                     data.fullFormationList[2].visualization = getVis(full[2], 1)
//                     data.fullFormationList[2].transition = full[2].substring(full[2].indexOf('Transition'))
//                     data.fullFormationList[3].formation = full[3].substring(0, full[3].indexOf('Transition') - 2)
//                     data.fullFormationList[3].visualization = getVis(full[3], 1)
//                     data.fullFormationList[3].transition = full[3].substring(full[3].indexOf('Transition'))
//                     data.fullFormationList[4].formation = full[4].substring(0, full[4].indexOf('Transition') - 2)
//                     data.fullFormationList[4].visualization = getVis(full[4], 1)
//                     data.fullFormationList[4].transition = full[4].substring(full[4].indexOf('Transition'))
//                     data.fullFormationList[5].formation = full[5].substring(0, full[5].indexOf('Transition') - 2)
//                     data.fullFormationList[5].visualization = getVis(full[5], 1)
//                     data.fullFormationList[5].transition = full[5].substring(full[5].indexOf('Transition'))
//                     data.fullFormationList[6].formation = full[6].substring(0, full[6].indexOf('Transition') - 2)
//                     data.fullFormationList[6].visualization = getVis(full[6], 1)
//                     data.fullFormationList[6].transition = full[6].substring(full[6].indexOf('Transition'))
//                     data.fullFormationList[7].formation = full[7].substring(0, full[7].indexOf('Transition') - 2)
//                     data.fullFormationList[7].visualization = getVis(full[7], 1)
//                     data.fullFormationList[7].transition = full[7].substring(full[7].indexOf('Transition'))
//                     data.fullFormationList[8].formation = full[8].substring(0, full[8].indexOf('Transition') - 2)
//                     data.fullFormationList[8].visualization = getVis(full[8], 1)
//                     data.fullFormationList[8].transition = full[8].substring(full[8].indexOf('Transition'))
//                     data.fullFormationList[9].formation = full[9].substring(0, full[9].indexOf('Transition') - 2)
//                     data.fullFormationList[9].visualization = getVis(full[9], 1)
//                     data.fullFormationList[9].transition = full[9].substring(full[9].indexOf('Transition'))
//                     for (let i = 0; i < 10; ++i) { let incr = i + 1; console.log(incr + '. ' + data.fullFormationList[i].formation); console.log(data.fullFormationList[i].visualization); console.log(data.fullFormationList[i].transition) } // eventually get rid of this line
//                     const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ") // eventually replace this line with input from frontend
//                     switch (userFull) {
//                         case 'N':
//                             lND = false
//                             break
//                         case 'R':
//                             full = await getFull(openai, song, vibes, stFms[0], "Don't give me the following list: " + full + ".")
//                             break
//                         default:
//                             const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
//                             full = await getFull(openai, song, vibes, stFms[0], lFeedback)
//                     }
//                 } while (lND)
//                 fND = false
//                 break
//             case '2':
//                 data.startFormationChoice = data.startFormationList[1]
//                 lND = true
//                 full = await getFull(openai, song, vibes, stFms[1], "")
//                 do { // this entire dowhile can eventually be replaced with an event that occurs whenever a button or something is pressed on the frontend, thereby triggering an update in the internal state
//                     data.fullFormationList[0].formation = full[0].substring(0, full[0].indexOf('Transition') - 2)
//                     data.fullFormationList[0].visualization = getVis(full[0], 1)
//                     data.fullFormationList[0].transition = full[0].substring(full[0].indexOf('Transition'))
//                     data.fullFormationList[1].formation = full[1].substring(0, full[1].indexOf('Transition') - 2)
//                     data.fullFormationList[1].visualization = getVis(full[1], 1)
//                     data.fullFormationList[1].transition = full[1].substring(full[1].indexOf('Transition'))
//                     data.fullFormationList[2].formation = full[2].substring(0, full[2].indexOf('Transition') - 2)
//                     data.fullFormationList[2].visualization = getVis(full[2], 1)
//                     data.fullFormationList[2].transition = full[2].substring(full[2].indexOf('Transition'))
//                     data.fullFormationList[3].formation = full[3].substring(0, full[3].indexOf('Transition') - 2)
//                     data.fullFormationList[3].visualization = getVis(full[3], 1)
//                     data.fullFormationList[3].transition = full[3].substring(full[3].indexOf('Transition'))
//                     data.fullFormationList[4].formation = full[4].substring(0, full[4].indexOf('Transition') - 2)
//                     data.fullFormationList[4].visualization = getVis(full[4], 1)
//                     data.fullFormationList[4].transition = full[4].substring(full[4].indexOf('Transition'))
//                     data.fullFormationList[5].formation = full[5].substring(0, full[5].indexOf('Transition') - 2)
//                     data.fullFormationList[5].visualization = getVis(full[5], 1)
//                     data.fullFormationList[5].transition = full[5].substring(full[5].indexOf('Transition'))
//                     data.fullFormationList[6].formation = full[6].substring(0, full[6].indexOf('Transition') - 2)
//                     data.fullFormationList[6].visualization = getVis(full[6], 1)
//                     data.fullFormationList[6].transition = full[6].substring(full[6].indexOf('Transition'))
//                     data.fullFormationList[7].formation = full[7].substring(0, full[7].indexOf('Transition') - 2)
//                     data.fullFormationList[7].visualization = getVis(full[7], 1)
//                     data.fullFormationList[7].transition = full[7].substring(full[7].indexOf('Transition'))
//                     data.fullFormationList[8].formation = full[8].substring(0, full[8].indexOf('Transition') - 2)
//                     data.fullFormationList[8].visualization = getVis(full[8], 1)
//                     data.fullFormationList[8].transition = full[8].substring(full[8].indexOf('Transition'))
//                     data.fullFormationList[9].formation = full[9].substring(0, full[9].indexOf('Transition') - 2)
//                     data.fullFormationList[9].visualization = getVis(full[9], 1)
//                     data.fullFormationList[9].transition = full[9].substring(full[9].indexOf('Transition'))
//                     for (let i = 0; i < 10; ++i) { let incr = i + 1; console.log(incr + '. ' + data.fullFormationList[i].formation); console.log(data.fullFormationList[i].visualization); console.log(data.fullFormationList[i].transition) } // eventually get rid of this line
//                     const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ") // eventually replace this line with input from frontend
//                     switch (userFull) {
//                         case 'N':
//                             lND = false
//                             break
//                         case 'R':
//                             full = await getFull(openai, song, vibes, stFms[1], "Don't give me the following list: " + full + ".")
//                             break
//                         default:
//                             const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
//                             full = await getFull(openai, song, vibes, stFms[1], lFeedback)
//                     }
//                 } while (lND)
//                 fND = false
//                 break
//             case '3':
//                 data.startFormationChoice = data.startFormationList[2]
//                 lND = true
//                 full = await getFull(openai, song, vibes, stFms[2], "")
//                 do { // this entire dowhile can eventually be replaced with an event that occurs whenever a button or something is pressed on the frontend, thereby triggering an update in the internal state
//                     data.fullFormationList[0].formation = full[0].substring(0, full[0].indexOf('Transition') - 2)
//                     data.fullFormationList[0].visualization = getVis(full[0], 1)
//                     data.fullFormationList[0].transition = full[0].substring(full[0].indexOf('Transition'))
//                     data.fullFormationList[1].formation = full[1].substring(0, full[1].indexOf('Transition') - 2)
//                     data.fullFormationList[1].visualization = getVis(full[1], 1)
//                     data.fullFormationList[1].transition = full[1].substring(full[1].indexOf('Transition'))
//                     data.fullFormationList[2].formation = full[2].substring(0, full[2].indexOf('Transition') - 2)
//                     data.fullFormationList[2].visualization = getVis(full[2], 1)
//                     data.fullFormationList[2].transition = full[2].substring(full[2].indexOf('Transition'))
//                     data.fullFormationList[3].formation = full[3].substring(0, full[3].indexOf('Transition') - 2)
//                     data.fullFormationList[3].visualization = getVis(full[3], 1)
//                     data.fullFormationList[3].transition = full[3].substring(full[3].indexOf('Transition'))
//                     data.fullFormationList[4].formation = full[4].substring(0, full[4].indexOf('Transition') - 2)
//                     data.fullFormationList[4].visualization = getVis(full[4], 1)
//                     data.fullFormationList[4].transition = full[4].substring(full[4].indexOf('Transition'))
//                     data.fullFormationList[5].formation = full[5].substring(0, full[5].indexOf('Transition') - 2)
//                     data.fullFormationList[5].visualization = getVis(full[5], 1)
//                     data.fullFormationList[5].transition = full[5].substring(full[5].indexOf('Transition'))
//                     data.fullFormationList[6].formation = full[6].substring(0, full[6].indexOf('Transition') - 2)
//                     data.fullFormationList[6].visualization = getVis(full[6], 1)
//                     data.fullFormationList[6].transition = full[6].substring(full[6].indexOf('Transition'))
//                     data.fullFormationList[7].formation = full[7].substring(0, full[7].indexOf('Transition') - 2)
//                     data.fullFormationList[7].visualization = getVis(full[7], 1)
//                     data.fullFormationList[7].transition = full[7].substring(full[7].indexOf('Transition'))
//                     data.fullFormationList[8].formation = full[8].substring(0, full[8].indexOf('Transition') - 2)
//                     data.fullFormationList[8].visualization = getVis(full[8], 1)
//                     data.fullFormationList[8].transition = full[8].substring(full[8].indexOf('Transition'))
//                     data.fullFormationList[9].formation = full[9].substring(0, full[9].indexOf('Transition') - 2)
//                     data.fullFormationList[9].visualization = getVis(full[9], 1)
//                     data.fullFormationList[9].transition = full[9].substring(full[9].indexOf('Transition'))
//                     for (let i = 0; i < 10; ++i) { let incr = i + 1; console.log(incr + '. ' + data.fullFormationList[i].formation); console.log(data.fullFormationList[i].visualization); console.log(data.fullFormationList[i].transition) } // eventually get rid of this line
//                     const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ") // eventually replace this line with input from frontend
//                     switch (userFull) {
//                         case 'N':
//                             lND = false
//                             break
//                         case 'R':
//                             full = await getFull(openai, song, vibes, stFms[2], "Don't give me the following list: " + full + ".")
//                             break
//                         default:
//                             const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
//                             full = await getFull(openai, song, vibes, stFms[2], lFeedback)
//                     }
//                 } while (lND)
//                 fND = false
//                 break
//             case '4':
//                 data.startFormationChoice = data.startFormationList[3]
//                 lND = true
//                 full = await getFull(openai, song, vibes, stFms[3], "")
//                 do { // this entire dowhile can eventually be replaced with an event that occurs whenever a button or something is pressed on the frontend, thereby triggering an update in the internal state
//                     data.fullFormationList[0].formation = full[0].substring(0, full[0].indexOf('Transition') - 2)
//                     data.fullFormationList[0].visualization = getVis(full[0], 1)
//                     data.fullFormationList[0].transition = full[0].substring(full[0].indexOf('Transition'))
//                     data.fullFormationList[1].formation = full[1].substring(0, full[1].indexOf('Transition') - 2)
//                     data.fullFormationList[1].visualization = getVis(full[1], 1)
//                     data.fullFormationList[1].transition = full[1].substring(full[1].indexOf('Transition'))
//                     data.fullFormationList[2].formation = full[2].substring(0, full[2].indexOf('Transition') - 2)
//                     data.fullFormationList[2].visualization = getVis(full[2], 1)
//                     data.fullFormationList[2].transition = full[2].substring(full[2].indexOf('Transition'))
//                     data.fullFormationList[3].formation = full[3].substring(0, full[3].indexOf('Transition') - 2)
//                     data.fullFormationList[3].visualization = getVis(full[3], 1)
//                     data.fullFormationList[3].transition = full[3].substring(full[3].indexOf('Transition'))
//                     data.fullFormationList[4].formation = full[4].substring(0, full[4].indexOf('Transition') - 2)
//                     data.fullFormationList[4].visualization = getVis(full[4], 1)
//                     data.fullFormationList[4].transition = full[4].substring(full[4].indexOf('Transition'))
//                     data.fullFormationList[5].formation = full[5].substring(0, full[5].indexOf('Transition') - 2)
//                     data.fullFormationList[5].visualization = getVis(full[5], 1)
//                     data.fullFormationList[5].transition = full[5].substring(full[5].indexOf('Transition'))
//                     data.fullFormationList[6].formation = full[6].substring(0, full[6].indexOf('Transition') - 2)
//                     data.fullFormationList[6].visualization = getVis(full[6], 1)
//                     data.fullFormationList[6].transition = full[6].substring(full[6].indexOf('Transition'))
//                     data.fullFormationList[7].formation = full[7].substring(0, full[7].indexOf('Transition') - 2)
//                     data.fullFormationList[7].visualization = getVis(full[7], 1)
//                     data.fullFormationList[7].transition = full[7].substring(full[7].indexOf('Transition'))
//                     data.fullFormationList[8].formation = full[8].substring(0, full[8].indexOf('Transition') - 2)
//                     data.fullFormationList[8].visualization = getVis(full[8], 1)
//                     data.fullFormationList[8].transition = full[8].substring(full[8].indexOf('Transition'))
//                     data.fullFormationList[9].formation = full[9].substring(0, full[9].indexOf('Transition') - 2)
//                     data.fullFormationList[9].visualization = getVis(full[9], 1)
//                     data.fullFormationList[9].transition = full[9].substring(full[9].indexOf('Transition'))
//                     for (let i = 0; i < 10; ++i) { let incr = i + 1; console.log(incr + '. ' + data.fullFormationList[i].formation); console.log(data.fullFormationList[i].visualization); console.log(data.fullFormationList[i].transition) } // eventually get rid of this line
//                     const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ") // eventually replace this line with input from frontend
//                     switch (userFull) {
//                         case 'N':
//                             lND = false
//                             break
//                         case 'R':
//                             full = await getFull(openai, song, vibes, stFms[3], "Don't give me the following list: " + full + ".")
//                             break
//                         default:
//                             const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
//                             full = await getFull(openai, song, vibes, stFms[3], lFeedback)
//                     }
//                 } while (lND)
//                 fND = false
//                 break
//             case '5':
//                 data.startFormationChoice = data.startFormationList[4]
//                 lND = true
//                 full = await getFull(openai, song, vibes, stFms[4], "")
//                 do { // this entire dowhile can eventually be replaced with an event that occurs whenever a button or something is pressed on the frontend, thereby triggering an update in the internal state
//                     data.fullFormationList[0].formation = full[0].substring(0, full[0].indexOf('Transition') - 2)
//                     data.fullFormationList[0].visualization = getVis(full[0], 1)
//                     data.fullFormationList[0].transition = full[0].substring(full[0].indexOf('Transition'))
//                     data.fullFormationList[1].formation = full[1].substring(0, full[1].indexOf('Transition') - 2)
//                     data.fullFormationList[1].visualization = getVis(full[1], 1)
//                     data.fullFormationList[1].transition = full[1].substring(full[1].indexOf('Transition'))
//                     data.fullFormationList[2].formation = full[2].substring(0, full[2].indexOf('Transition') - 2)
//                     data.fullFormationList[2].visualization = getVis(full[2], 1)
//                     data.fullFormationList[2].transition = full[2].substring(full[2].indexOf('Transition'))
//                     data.fullFormationList[3].formation = full[3].substring(0, full[3].indexOf('Transition') - 2)
//                     data.fullFormationList[3].visualization = getVis(full[3], 1)
//                     data.fullFormationList[3].transition = full[3].substring(full[3].indexOf('Transition'))
//                     data.fullFormationList[4].formation = full[4].substring(0, full[4].indexOf('Transition') - 2)
//                     data.fullFormationList[4].visualization = getVis(full[4], 1)
//                     data.fullFormationList[4].transition = full[4].substring(full[4].indexOf('Transition'))
//                     data.fullFormationList[5].formation = full[5].substring(0, full[5].indexOf('Transition') - 2)
//                     data.fullFormationList[5].visualization = getVis(full[5], 1)
//                     data.fullFormationList[5].transition = full[5].substring(full[5].indexOf('Transition'))
//                     data.fullFormationList[6].formation = full[6].substring(0, full[6].indexOf('Transition') - 2)
//                     data.fullFormationList[6].visualization = getVis(full[6], 1)
//                     data.fullFormationList[6].transition = full[6].substring(full[6].indexOf('Transition'))
//                     data.fullFormationList[7].formation = full[7].substring(0, full[7].indexOf('Transition') - 2)
//                     data.fullFormationList[7].visualization = getVis(full[7], 1)
//                     data.fullFormationList[7].transition = full[7].substring(full[7].indexOf('Transition'))
//                     data.fullFormationList[8].formation = full[8].substring(0, full[8].indexOf('Transition') - 2)
//                     data.fullFormationList[8].visualization = getVis(full[8], 1)
//                     data.fullFormationList[8].transition = full[8].substring(full[8].indexOf('Transition'))
//                     data.fullFormationList[9].formation = full[9].substring(0, full[9].indexOf('Transition') - 2)
//                     data.fullFormationList[9].visualization = getVis(full[9], 1)
//                     data.fullFormationList[9].transition = full[9].substring(full[9].indexOf('Transition'))
//                     for (let i = 0; i < 10; ++i) { let incr = i + 1; console.log(incr + '. ' + data.fullFormationList[i].formation); console.log(data.fullFormationList[i].visualization); console.log(data.fullFormationList[i].transition) } // eventually get rid of this line
//                     const userFull = prompt("Would you like to see a different list of formations and transitions ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ") // eventually replace this line with input from frontend
//                     switch (userFull) {
//                         case 'N':
//                             lND = false
//                             break
//                         case 'R':
//                             full = await getFull(openai, song, vibes, stFms[4], "Don't give me the following list: " + full + ".")
//                             break
//                         default:
//                             const lFeedback = "Don't give me the following list: " + full + ". Additionally, take into account the following feedback from a previous query: " + userFull + "."
//                             full = await getFull(openai, song, vibes, stFms[4], lFeedback)
//                     }
//                 } while (lND)
//                 fND = false
//                 break
//             case 'R':
//                 stFms = await getStart(openai, song, vibes, "Don't give me the following formations: " + stFms[0] + ", " + stFms[1] + ", " + stFms[2] + ", " + stFms[3] + ", or " + stFms[4] + ".")
//                 break
//             default:
//                 const fFeedback = "Don't give me the following formations: " + stFms[0] + ", " + stFms[1] + ", " + stFms[2] + ", " + stFms[3] + ", or " + stFms[4] + ". Additionally, take into account the following feedback from a previous query: " + userStart + "."
//                 stFms = await getStart(openai, song, vibes, fFeedback)
//         }
//     } while (fND)

//     // Costumes
//     let cND = true
//     let costumes = await getCostumes(openai, song, "")
//     do { // this entire dowhile can eventually be replaced with an event that occurs whenever a button or something is pressed on the frontend, thereby triggering an update in the internal state
//         data.costumes.costumeSchema = costumes
//         let temp = await getCostumeVis(openai, data.costumes.costumeSchema)
//         data.costumes.visualization = temp.data.data[0].url
//         console.log(data.costumes.costumeSchema) // eventually get rid of this line
//         console.log(data.costumes.visualization) // eventually get rid of this line
//         const userCostume = prompt("Would you like to see a different costume scheme ('N' to finish, 'R' for a simple requery, or some feedback for a more advanced requery)? ")
//         switch (userCostume) {
//             case 'N':
//                 cND = false
//                 break
//             case 'R':
//                 costumes = await getCostumes(openai, song, "Don't give me the following costume scheme: " + costumes + ".")
//                 break
//             default:
//                 const cFeedback = "Don't give me the following costume scheme: " + costumes + ". Additionally, take into account the following feedback from a previous query: " + userCostume + "."
//                 costumes = await getCostumes(openai, song, cFeedback)
//         }
//     } while (cND)

// }
