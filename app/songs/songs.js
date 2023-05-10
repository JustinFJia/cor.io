// songs.js

const format = `X. "S" by A`

// Gets potential songs
export async function getSongs(openai, vibes, feedback) {
    const qContent = 'Give me a list of 3 songs that are ' + vibes + '. Put it in the following format, ' + format + ', where X is the number of the song in the list of 3 songs, S is the name of the song, and A is the name of the artist that made the song. Keep in mind that these songs should be songs that I can choreograph a dance to. ' + feedback

    const songs = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': qContent
        }],
        temperature: 0.25
    })
    return songs.data.choices[0].message.content
}

// Breaks list of songs into components
export function parseSongs(songs) {
    const songOne = songs.substring(3, songs.indexOf("2."))
    const songTwo = songs.substring(songs.indexOf("2.") + 3, songs.indexOf("3."))
    const songThree = songs.substring(songs.indexOf("3.") + 3)
    return [songOne, songTwo, songThree]
}
