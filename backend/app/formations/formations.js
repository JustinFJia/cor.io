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
    return parseStart(stFms.data.choices[0].message.content)
}

// Breaks full list of starting formations into components
function parseStart(stFms) {
    const stOne = stFms.substring(3, stFms.indexOf("2."))
    const stTwo = stFms.substring(stFms.indexOf("2.") + 3, stFms.indexOf("3."))
    const stThree = stFms.substring(stFms.indexOf("3.") + 3, stFms.indexOf("4."))
    const stFour = stFms.substring(stFms.indexOf("4.") + 3, stFms.indexOf("5."))
    const stFive = stFms.substring(stFms.indexOf("5.") + 3)
    return [stOne, stTwo, stThree, stFour, stFive]
}

// Gets full list of formations and transitions
export async function getFull(openai, song, vibes, st, feedback) {
    const qContent = 'Given the song ' + song + ', the vibe ' + vibes + ', and starting with the formation "' + st + '", create a list of 10 formations with transitions between them, and write it in the following format ' + format + ' where X is the number of the formation, Y is the shape of the formation, and W and Z are bullet points describing the formation. Then add a transition sentence in between each formation to describe how dancers get from one formation to the next.' + feedback

    const fullFms = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': qContent
        }],
        temperature: 0.25
    })
    return parseFull(fullFms.data.choices[0].message.content)
}

// Breaks full list of formations into components
function parseFull(fullFms) {
    const fullOne = fullFms.substring(3, fullFms.indexOf("2."))
    const fullTwo = fullFms.substring(fullFms.indexOf("2.") + 3, fullFms.indexOf("3."))
    const fullThree = fullFms.substring(fullFms.indexOf("3.") + 3, fullFms.indexOf("4."))
    const fullFour = fullFms.substring(fullFms.indexOf("4.") + 3, fullFms.indexOf("5."))
    const fullFive = fullFms.substring(fullFms.indexOf("5.") + 3, fullFms.indexOf("6."))
    const fullSix = fullFms.substring(fullFms.indexOf("6.") + 3, fullFms.indexOf("7."))
    const fullSeven = fullFms.substring(fullFms.indexOf("7.") + 3, fullFms.indexOf("8."))
    const fullEight = fullFms.substring(fullFms.indexOf("8.") + 3, fullFms.indexOf("9."))
    const fullNine = fullFms.substring(fullFms.indexOf("9.") + 3, fullFms.indexOf("10."))
    const fullTen = fullFms.substring(fullFms.indexOf("10.") + 3)
    return [fullOne, fullTwo, fullThree, fullFour, fullFive, fullSix, fullSeven, fullEight, fullNine, fullTen]
}

// Gets text-based visualization of formation if the formation is recognized
export function getVis(form, isFull) {
    if (isFull) {
        form = form.substring(0, form.indexOf('Transition') - 2)
    }
    const formatted = form.replace(/-/g, '').replace(/\s/g, '').toLowerCase()
    if (formatted.includes('diagonalline')) {
        return `Here's what this could look like from above:
           O
          O
         O
        O`
    } else if (formatted.includes('line')) {
        return `Here's what this could look like from above:
        O
        O
        O
        O`
    } if (formatted.includes('pyramid') | formatted.includes('triangle')) {
        return `Here's what this could look like from above:
           O
          O O
         O O O
        O O O O`
    } if (formatted.includes('box') | formatted.includes('square')) {
        return `Here's what this could look like from above:
        O O O O O
        O       O
        O       O
        O O O O O`
    } if (formatted.includes('diamond')) {
        return `Here's what this could look like from above:
          O
         O O
        O   O
         O O
          O`
    } if (formatted.includes('vshape') | formatted.includes('vformation')) {
        return `Here's what this could look like from above:
        O     O
         O   O
          O O
           O`
    } if (formatted.includes('heart')) {
        return `Here's what this could look like from above:
         O   O
        O  O  O
         O   O
          O O
           O`
    } if (formatted.includes('star')) {
        return `Here's what this could look like from above:
             O
            O O
         O O   O O
          O  O  O
         O       O`
    } if (formatted.includes('semicircle')) {
        return `Here's what this could look like from above:
            O
         O  O
        O   O
        O   O
         O  O
            O`
    } else if (formatted.includes('circle')) {
        return `Here's what this could look like from above:
            O  O
         O        O
        O          O
        O          O
         O        O
            O  O`
    }
    return ''
}
