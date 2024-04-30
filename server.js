const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const OpenAIApi = require("openai");

// Setup OpenAI API configuration directly in the OpenAIApi instance
const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

// Setup server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint for ChatGPT
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
    });
    res.send(completion.data.choices[0].text);
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).send("Failed to communicate with OpenAI");
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
