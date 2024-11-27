// server.js
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const apiKey = ' sk-_08cnPc2peJMu4kYLe7RTf8oqAFPK9-S0akcOk08QdT3BlbkFJZ5FvcsfxqfuFk9dsXld6F0B9yMCIC3WCLHeStOTCwA'; // Replace with your OpenAI API key
const openai = new OpenAI({
  apiKey: apiKey,
});

app.post('/emotion-color', async (req, res) => {
  const { emotion } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // Adjust the model as necessary
      messages: [
        { role: 'user', content: `What color best represents the emotion: "${emotion}"? Respond with an RGB HEX code only.` }
      ],
    });

    res.json({ color: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
