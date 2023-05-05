// costumes.js

// Gets potential costumes
export async function getCostumes(openai, song) {
    const qContent = 'Generate a costume scheme for dancers to wear for a dance piece to this song: ' + song + "."
    
    const costumes = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': qContent
        }],
        temperature: 0.25
    })
    return costumes.data.choices[0].message.content
}
