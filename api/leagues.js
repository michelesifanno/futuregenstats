import Fotmob from 'fotmob';

const fotmob = new Fotmob();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const leagues = await fotmob.getAllLeagues();
        res.status(200).json(leagues);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leagues data' });
    }
}
