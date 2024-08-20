const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/playerData', async (req, res) => {
    const playerId = req.query.id;
    try {
        const response = await axios.get(`https://www.fotmob.com/api/playerData?id=${playerId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching player data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
