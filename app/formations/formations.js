// formations.js

const format = 
`"X. Formation: Y
- W
- Z
"`

// Gets potential starting formations
export async function getStart(openai, song, vibes, feedback) {
    const qContent = 'Given the song ' + song + ', generate a set of 5 potential starting formations for a ' + vibes + ' dance piece that uses that song, and write each formation in the following format ' + format + ' where X is the number of the formation in the list of 5 formations, Y is the shape of the formation, and W and Z are bullet points describing the formation. ' + feedback

    const stFms = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': qContent
        }],
        temperature: 0.25
    })
    return stFms.data.choices[0].message.content
}

// Breaks full list of starting formations into components
export function parseStart(stFms) {
    const stOne = stFms.substring(3, stFms.indexOf("2."))
    const stTwo = stFms.substring(stFms.indexOf("2.") + 3, stFms.indexOf("3."))
    const stThree = stFms.substring(stFms.indexOf("3.") + 3, stFms.indexOf("4."))
    const stFour = stFms.substring(stFms.indexOf("4.") + 3, stFms.indexOf("5."))
    const stFive = stFms.substring(stFms.indexOf("5.") + 3)
    return [stOne, stTwo, stThree, stFour, stFive]
}

// Gets full list of formations and transitions
export async function getFull(openai, song, vibes, st) {
    const qContent = 'Given the song ' + song + ', the vibe ' + vibes + ', and starting with the formation "' + st + '", create a list of 10 formations with transitions between them, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation. Then add a transition sentence in between each formation to describe how dancers get from one formation to the next.'

    const full = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': qContent
        }],
        temperature: 0.25
    })
    return full.data.choices[0].message.content
}
