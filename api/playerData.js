import Fotmob from 'fotmob';

const fotmob = new Fotmob();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Player ID is required' });
  }

  try {
    const playerData = await fotmob.getPlayer(id);
    res.status(200).json(playerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching player data' });
  }
}
