const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require("openai");

const app = express();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Allow your frontend URL
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// POST endpoint
app.post('/api/ai', async (req, res) => {
    try {
        const inputText = req.body.inputText;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {"role": "system", "content": "You are an assistant helping user analyze their dreams. Respond should be in paragraph format, avoid using any markdown symbols."},
                {"role": "user", "content": `Write an analysis based on the description of my dream: "${inputText}"`}
            ]
        });

        res.json({analysis: completion.choices[0].message.content});
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({error: 'Failed to fetch response from OpenAI.'});
    }
});

// Start the server
const PORT = process.env.PORT || 7071;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
