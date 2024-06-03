const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: '',
});

app.get("/paraphrase", async(req, res) => {
    const text = "my name is Huong";


    return res.json({
        data: 'One of names that I use is Huong'
    })

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `Given an English input text, You are tasked with providing several paraphrased versions of the input text.`,
            },
            {
                role: 'user',
                content: text,
            },
        ],
    });

    return res.json({
        data: response.choices[0].message.content,
    });
});

app.listen(4000, () => {
    console.log("Listen on the port 4000...");
});
