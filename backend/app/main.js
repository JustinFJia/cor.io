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

// Handle POST request for full formations requery
app.post('/fullformrequery', async (req, res) => {
    let feedback = req.body.feedback
    if (feedback == null || feedback == '') {
        feedback = "Don't give me the following list: " + data.fullFormationList[0].formation + ", " + data.fullFormationList[1].formation + ", " + data.fullFormationList[2].formation + ", " + data.fullFormationList[3].formation + ", " + data.fullFormationList[4].formation + ", " + data.fullFormationList[5].formation + ", " + data.fullFormationList[6].formation + ", " + data.fullFormationList[7].formation + ", " + data.fullFormationList[8].formation + ", " + data.fullFormationList[9].formation + "."
    } else {
        feedback = "Don't give me the following list: " + data.fullFormationList[0].formation + ", " + data.fullFormationList[1].formation + ", " + data.fullFormationList[2].formation + ", " + data.fullFormationList[3].formation + ", " + data.fullFormationList[4].formation + ", " + data.fullFormationList[5].formation + ", " + data.fullFormationList[6].formation + ", " + data.fullFormationList[7].formation + ", " + data.fullFormationList[8].formation + ", " + data.fullFormationList[9].formation + ". Additionally, take into account the following feedback from a previous query: " + feedback + "."
    }
    try {
        const full = await getFull(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, data.vibes, data.startFormationChoice.formation, feedback)
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

// Handle GET request for costumes
app.get('/costumes', async (req, res) => {
    try {
        const costumes = await getCostumes(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, "")
        data.costumes.costumeSchema = costumes
        let temp = await getCostumeVis(openai, data.costumes.costumeSchema)
        data.costumes.visualization = temp.data.data[0].url
        return res.status(200).json({
            success: true,
            content: {"costumes": data.costumes}
        })
    } catch(err) {
        console.log(err)
    }
})

// Handle POST request for costumes requery
app.post('/costumesrequery', async(req, res) => {
    let feedback = req.body.feedback
    if (feedback == null || feedback == '') {
        feedback = "Don't give me the following costume scheme: " + data.costumes.costumeSchema + "."
    } else {
        feedback = "Don't give me the following costume scheme: " + data.costumes.costumeSchema + ". Additionally, take into account the following feedback from a previous query: " + feedback + "."
    }
    try {
        const costumes = await getCostumes(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, feedback)
        data.costumes.costumeSchema = costumes
        let temp = await getCostumeVis(openai, data.costumes.costumeSchema)
        data.costumes.visualization = temp.data.data[0].url
        return res.status(200).json({
            success: true,
            content: {"costumes": data.costumes}
        })
    } catch(err) {
        console.log(err)
    }
})

// Listen on port 8080
app.listen(port, () => {
    console.log('listening on port ' + port)
})
