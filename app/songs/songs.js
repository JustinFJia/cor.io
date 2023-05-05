// songs.js

// Gets potential songs
export async function getSongs(openai, vibes, feedback) {
    const qContent = 'Give me a list of 3 songs that are ' + vibes + '. Keep in mind that these songs should be songs that I can choreograph a dance to. ' + feedback

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
