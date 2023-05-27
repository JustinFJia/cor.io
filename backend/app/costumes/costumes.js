// costumes.js

// Gets potential costumes
export async function getCostumes(openai, song, feedback) {
    const qContent = 'Generate a brief costume scheme for dancers to wear for a dance piece to this song: ' + song + ". Keep your response short. " + feedback
    
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

// Gets base64 encoded image visualizing proposed costume scheme
export async function getCostumeVis(openai, costume) {
    const vis = await openai.createImage({
        prompt: costume,
        n: 1,
        size: "512x512",
        response_format: "b64_json"
    })
    return vis.data.data[0].b64_json
}
