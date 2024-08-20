import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

// Abilita CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permette richieste da qualsiasi origine
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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
    console.log(`Proxy server running at http://localhost:${port}`);
});
