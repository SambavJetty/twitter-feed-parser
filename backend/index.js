const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/tweets', async (req, res) => {
    const twitterId = req.query.twitter_id;

    if (!twitterId) {
        return res.status(400).json({ error: "Twitter ID is required" });
    }

    try {
        const response = await axios.get(`http://127.0.0.1:5000/getTweets`, {
            params: { twitter_id: twitterId }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve tweets" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
