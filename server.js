// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // または 'axios'
require('dotenv').config(); // .env ファイルの読み込み

const app = express();
const PORT = 3000;

// OpenAI APIキー（.envファイルから取得）
const API_KEY = process.env.API_KEY;

// ミドルウェア
app.use(bodyParser.json());
app.use(express.static('.')); // index.html を提供するための設定

// POSTリクエストを処理するエンドポイント
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        res.json({ response: data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
