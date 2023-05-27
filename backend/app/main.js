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
app.post('/songs', async (req, res) => {
    const vibes = req.body.vibes
    try {
        if (vibes == null) {
            console.log("Didn't get a vibe")
        }
        data.vibes = vibes
        const songs = await getSongs(openai, vibes, "")
        for (let i = 0; i < 3; ++i) {
            data.songList[i].songName = songs[i].substring(0, songs[i].indexOf('by') - 1)
            data.songList[i].songArtist = songs[i].substring(songs[i].indexOf('by') + 3)
        }
        return res.status(200).json({
            success: true,
            content: {"data": data},
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
        for (let i = 0; i < 3; ++i) {
            data.songList[i].songName = songs[i].substring(0, songs[i].indexOf('by') - 1)
            data.songList[i].songArtist = songs[i].substring(songs[i].indexOf('by') + 3)
        }
        return res.status(200).json({
            success: true,
            content: {"data": data},
        })
    } catch(err) {
        console.log(err)
    }
})

// Handle POST request for song selection/starting formation generation
app.post('/startform', async (req, res) => {
    const chosenSong = req.body.song
    try {
        if (chosenSong == null) {
            console.log('No song chosen')
        }
        data.songChoice = chosenSong
        const startFormations = await getStart(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, data.vibes, "")
        for (let i = 0; i < 5; ++i) {
            data.startFormationList[i].formation = startFormations[i]
            data.startFormationList[i].visualization = getVis(startFormations[i], 0)
        }
        return res.status(200).json({
            success: true,
            content: {"data": data},
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
        for (let i = 0; i < 5; ++i) {
            data.startFormationList[i].formation = startFormations[i]
            data.startFormationList[i].visualization = getVis(startFormations[i], 0)
        }
        return res.status(200).json({
            success: true,
            content: {"data": data}
        })
    } catch(err) {
        console.log(err)
    }
})

// Handle POST request for starting formation selection/full formation generation
app.post('/fullform', async (req, res) => {
    const chosenStartForm = req.body.form
    try {
        if (chosenStartForm == null) {
            console.log('No starting formation chosen')
        }
        data.startFormationChoice = chosenStartForm
        const full = await getFull(openai, data.songChoice.songName + " by " + data.songChoice.songArtist, data.vibes, data.startFormationChoice.formation, "")
        for (let i = 0; i < 10; ++i) {
            if (!full[i].includes('Transition')) {
                data.fullFormationList[i].formation = full[i]
                data.fullFormationList[i].visualization = getVis(full[i], 0)
                data.fullFormationList[i].transition = ''
            } else {
                data.fullFormationList[i].formation = full[i].substring(0, full[i].indexOf('Transition') - 1)
                data.fullFormationList[i].visualization = getVis(full[i], 1)
                data.fullFormationList[i].transition = full[i].substring(full[i].indexOf('Transition'))
            }
        }
        return res.status(200).json({
            success: true,
            content: {"data": data}
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
        for (let i = 0; i < 10; ++i) {
            if (!full[i].includes('Transition')) {
                data.fullFormationList[i].formation = full[i]
                data.fullFormationList[i].visualization = getVis(full[i], 0)
                data.fullFormationList[i].transition = ''
            } else {
                data.fullFormationList[i].formation = full[i].substring(0, full[i].indexOf('Transition') - 1)
                data.fullFormationList[i].visualization = getVis(full[i], 1)
                data.fullFormationList[i].transition = full[i].substring(full[i].indexOf('Transition'))
            }
        }
        return res.status(200).json({
            success: true,
            content: {"data": data}
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
        data.costumes.visualization = temp
        return res.status(200).json({
            success: true,
            content: {"data": data}
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
        const vis = await getCostumeVis(openai, data.costumes.costumeSchema)
        data.costumes.visualization = vis
        return res.status(200).json({
            success: true,
            content: {"data": data}
        })
    } catch(err) {
        console.log(err)
    }
})

// Listen on port 8080
app.listen(port, () => {
    console.log('listening on port ' + port)
})
