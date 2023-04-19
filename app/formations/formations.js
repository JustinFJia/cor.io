import { Configuration, OpenAIApi } from "openai"
const readline = require('readline')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

if (!configuration.apiKey) {
    console.log('The OpenAI API key seems to be missing')
}

const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

ui.question('some prompt to the user', async function(userResponse) {
    const openaiResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            'role': 'user',
            'content': userResponse
        }],
        temperature: 0.5
    })
    console.log(openaiResponse)
})
