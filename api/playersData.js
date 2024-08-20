// /api/playerData.js

import axios from 'axios';

export default async function handler(req, res) {
    const playerId = req.query.id;

    if (!playerId) {
        return res.status(400).json({ error: 'Player ID is required' });
    }

    try {
        const response = await axios.get(`https://www.fotmob.com/api/playerData?id=${playerId}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching player data:', error);
        res.status(500).json({ error: 'Error fetching player data' });
    }
}
