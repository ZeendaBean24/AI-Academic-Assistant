const { app } = require('@azure/functions');
const { OpenAI } = require("openai");

app.http('getAIResponse', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'ai',
    handler: async (request, context) => {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const body = await request.json();
        inputText = body.inputText;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
              {"role": "system", "content": "You are a assistant helping user analyze their dreams. User will give you the description of the dream, you help me them analyze them. Respond should be in paragraph format, avoid using any markdown symbol"},
              {"role": "user", "content": `Write an analysis based on the description of my dream: "${inputText}"`}
            ]
          });
    },
});

