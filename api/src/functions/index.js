const { OpenAI } = require("openai");

module.exports = async function (context, req) {
    // Pre-configure response headers for CORS
    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        status: 200  // default success status
    };

    // Handle OPTIONS request for CORS preflight
    if (req.method === "OPTIONS") {
        context.res.status = 204;  // No Content
        return;
    }

    // Proceed if the request is not OPTIONS
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // Parsing the JSON body from the request
        const body = await req.json();
        const inputText = body.inputText;

        // Calling OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {"role": "system", "content": "You are an assistant helping user analyze their dreams. User will give you the description of the dream, you help them analyze them. Respond should be in paragraph format, avoid using any markdown symbols."},
                {"role": "user", "content": `Write an analysis based on the description of my dream: "${inputText}"`}
            ]
        });

        // Assigning the response body
        context.res.body = { analysis: completion.choices[0].message.content };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Internal Server Error"
        };
    }
}
